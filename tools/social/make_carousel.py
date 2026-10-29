#!/usr/bin/env python3
"""Sarahtonin Sounds carousel generator.

Usage:  python3 make_carousel.py post.json

Reads a small JSON file (see example-chill.json), pulls the mood's colors and art
from the site repo's content/listen/moods.json, and writes 1080x1350 PNG slides
to out/<post-name>/.
"""
import json, random, sys, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

HERE = Path(__file__).resolve().parent


def find_repo_root(start):
    """Walk up from this script until we hit the site repo (it has content/listen/moods.json)."""
    for d in [start, *start.parents]:
        if (d / "content/listen/moods.json").is_file():
            return d
    sys.exit("Couldn't find the Sarahtonin Sounds repo above " + str(start))


REPO = find_repo_root(HERE)
IMG = REPO / "assets/images"
FONTS = REPO / "assets/fonts"
FONT_CACHE = HERE / ".font-cache"
W, H = 1080, 1350
PAPER = (255, 230, 172)  # #FFE6AC, the site's one paper color
INK = (38, 30, 28)


def ttf(name):
    """Pillow can't read woff2, so decompress the site's copy to a cached TTF when needed."""
    src = FONTS / f"{name}.woff2"
    out = FONT_CACHE / f"{name}.ttf"
    if not src.is_file():
        sys.exit(f"Missing font: {src}")
    if not out.is_file() or out.stat().st_mtime < src.stat().st_mtime:
        try:
            from fontTools.ttLib import TTFont
            f = TTFont(str(src))
        except ImportError:
            sys.exit("Font conversion needs fonttools and brotli: pip install fonttools brotli")
        FONT_CACHE.mkdir(exist_ok=True)
        f.flavor = None
        f.save(str(out))
    return out


FONT_DISPLAY = ttf("Perandory-SemiCondensed")
FONT_BODY = ttf("IMFellEnglish-Regular")
FONT_BODY_I = ttf("IMFellEnglish-Italic")
FONT_NOTE = ttf("SueEllenFrancisco")


def font(path, size):
    return ImageFont.truetype(str(path), size)


def load(path, size=None):
    im = Image.open(path).convert("RGBA")
    if size:
        im.thumbnail(size, Image.LANCZOS)
    return im


def paper_bg(seed):
    """Warm paper: site paper tile, tinted to #FFE6AC, with a little grain."""
    tile = Image.open(IMG / "journal/paper-tile.webp").convert("RGB")
    rnd = random.Random(seed)
    bg = Image.new("RGB", (W, H))
    for x in range(0, W, tile.width):
        for y in range(0, H, tile.height):
            bg.paste(tile, (x, y))
    tint = Image.new("RGB", (W, H), PAPER)
    bg = ImageChops.multiply(bg, tint)
    # lift it back toward the paper color so it isn't muddy
    bg = Image.blend(bg, tint, 0.45)
    return bg.convert("RGBA")


def shadow(im, offset=(8, 12), blur=14, opacity=90):
    pad = blur * 3
    sh = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    alpha = im.split()[3].point(lambda a: a * opacity // 255)
    sh.paste((0, 0, 0, 255), (pad, pad), alpha)
    return sh.filter(ImageFilter.GaussianBlur(blur)), pad, offset


def place(canvas, im, center, angle=0, shadowed=True):
    im = im.rotate(angle, expand=True, resample=Image.BICUBIC)
    x, y = int(center[0] - im.width / 2), int(center[1] - im.height / 2)
    if shadowed:
        sh, pad, off = shadow(im)
        canvas.alpha_composite(sh, (x - pad + off[0], y - pad + off[1]))
    canvas.alpha_composite(im, (x, y))


def paper_card(size, color=(250, 243, 226)):
    """A torn-ish index card: paper tile cropped to size with uneven edges."""
    tile = Image.open(IMG / "journal/paper-tile.webp").convert("RGB")
    card = Image.new("RGB", size)
    for x in range(0, size[0], tile.width):
        for y in range(0, size[1], tile.height):
            card.paste(tile, (x, y))
    card = Image.blend(card, Image.new("RGB", size, color), 0.5).convert("RGBA")
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    rnd = random.Random(size[0] * 7 + size[1])
    pts = []
    step = 18
    for x in range(0, size[0], step):
        pts.append((x, rnd.randint(0, 5)))
    for y in range(0, size[1], step):
        pts.append((size[0] - rnd.randint(1, 6), y))
    for x in range(size[0], 0, -step):
        pts.append((x, size[1] - rnd.randint(1, 6)))
    for y in range(size[1], 0, -step):
        pts.append((rnd.randint(0, 5), y))
    d.polygon(pts, fill=255)
    card.putalpha(mask)
    return card


def wrap(draw, text, fnt, max_w):
    lines = []
    for para in text.split("\n"):
        words, cur = para.split(), ""
        for w in words:
            t = (cur + " " + w).strip()
            if draw.textlength(t, font=fnt) <= max_w:
                cur = t
            else:
                lines.append(cur)
                cur = w
        lines.append(cur)
    return lines


def draw_block(draw, text, fnt, xy, max_w, fill=INK, spacing=1.28, align="left"):
    lines = wrap(draw, text, fnt, max_w)
    x, y = xy
    lh = int(fnt.size * spacing)
    for ln in lines:
        tx = x
        if align == "center":
            tx = x + (max_w - draw.textlength(ln, font=fnt)) / 2
        draw.text((tx, y), ln, font=fnt, fill=fill)
        y += lh
    return y


def fit_text(draw, text, path, max_w, max_h, start, minimum, spacing=1.28):
    size = start
    while size > minimum:
        f = font(path, size)
        n = len(wrap(draw, text, f, max_w))
        if n * int(size * spacing) <= max_h:
            return f
        size -= 2
    return font(path, minimum)


def mood_info(mood_id):
    cfg = json.load(open(REPO / "content/listen/moods.json"))
    for m in cfg["moods"]:
        if m["id"] == mood_id:
            if m.get("color") in (None, "UNDECIDED") or not m.get("art"):
                sys.exit(f"Mood '{mood_id}' has no color/art yet. Not guessing one.")
            hexcol = cfg["labelColors"][m["color"]]
            return m, hexcol
    sys.exit(f"No mood with id '{mood_id}' in moods.json")


def asset(p):
    return REPO / p.lstrip("/")


def tape_with_text(canvas, tape_img, text, center, angle, light_text, size_hint=84):
    t = tape_img.copy()
    d = ImageDraw.Draw(t)
    fnt = font(FONT_DISPLAY, size_hint)
    tw = d.textlength(text, font=fnt)
    while tw > t.width * 0.78 and size_hint > 30:
        size_hint -= 4
        fnt = font(FONT_DISPLAY, size_hint)
        tw = d.textlength(text, font=fnt)
    col = (255, 250, 240) if light_text else INK
    bbox = fnt.getbbox(text)
    th = bbox[3] - bbox[1]
    d.text(((t.width - tw) / 2, (t.height - th) / 2 - bbox[1] - 4), text, font=fnt, fill=col)
    place(canvas, t, center, angle)


def slide_cover(post, mood, hexcol):
    c = paper_bg(1)
    art = mood["art"]
    circle = load(asset(art["circle"]))
    circle = circle.resize((700, 700), Image.LANCZOS)
    place(c, circle, (W / 2, 640), -6)
    tape = load(asset(art["tape"]), (880, 300))
    light = mood.get("labelText") == "light"
    tape_with_text(c, tape, mood["name"].upper(), (W / 2, 250), -3, light, 110)
    d = ImageDraw.Draw(c)
    desc = post.get("cover_line") or mood_descriptor(mood["id"])
    if desc:
        f = fit_text(d, desc, FONT_BODY_I, 800, 130, 50, 32)
        draw_block(d, desc, f, (140, 1060), 800, align="center")
    d.text((W / 2, 1290), post.get("handle", "@sarahtoninsounds"), font=font(FONT_NOTE, 44),
           fill=INK, anchor="mm")
    return c


def mood_descriptor(mood_id):
    try:
        words = json.load(open(REPO / "content/listen/mood-words.json"))
        for m in words["moods"]:
            if m["id"] == mood_id and m.get("descriptor") not in (None, "", "UNDECIDED"):
                return m["descriptor"]
    except FileNotFoundError:
        pass
    return ""


def slide_song(item, mood, hexcol, idx):
    c = paper_bg(10 + idx)
    art = mood["art"]
    light = mood.get("labelText") == "light"
    d = ImageDraw.Draw(c)
    body = item.get("text", "")
    f = fit_text(d, body, FONT_BODY, 740, 640, 46, 30)
    lines = wrap(d, body, f, 740)
    text_h = len(lines) * int(f.size * 1.28)
    card_h = max(580, 245 + text_h + 100)
    card_w = 900
    # center tape + card as one group
    group_h = card_h + 120
    top = (H - group_h) / 2
    card_top = top + 120
    card = paper_card((card_w, card_h))
    place(c, card, (W / 2, card_top + card_h / 2), 1.2 * (-1) ** idx)
    tape = load(asset(art["tape"]), (700, 240))
    tape_with_text(c, tape, item["title"].upper(), (W / 2, card_top - 10), 2.5 * (-1) ** idx, light, 90)
    d = ImageDraw.Draw(c)
    d.text((W / 2, card_top + 125), item["artist"], font=font(FONT_BODY_I, 52), fill=INK, anchor="mm")
    draw_block(d, body, f, (170, card_top + 205), 740)
    circ = load(asset(art["circle"])).resize((110, 110), Image.LANCZOS)
    place(c, circ, (W / 2 + card_w / 2 - 30, card_top + card_h - 20), 8)
    return c


def slide_close(post, mood, hexcol):
    c = paper_bg(99)
    art = mood["art"]
    vinyl = load(asset(art["vinyl"])).resize((760, 760), Image.LANCZOS)
    place(c, vinyl, (W / 2, 560), 0)
    tape = load(asset(art["tape"]), (860, 300))
    light = mood.get("labelText") == "light"
    tape_with_text(c, tape, post.get("close_title", f"{mood['name']} playlist").upper(), (W / 2, 1050), -2, light, 80)
    d = ImageDraw.Draw(c)
    line = post.get("close_line", "Full playlist on Spotify and Apple Music. Link in bio.")
    d.text((W / 2, 1190), line, font=font(FONT_BODY, 40), fill=INK, anchor="mm")
    d.text((W / 2, 1275), post.get("handle", "@sarahtoninsounds"), font=font(FONT_NOTE, 44),
           fill=INK, anchor="mm")
    return c


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    post = json.load(open(sys.argv[1]))
    mood, hexcol = mood_info(post["mood"])
    name = post.get("name", post["mood"])
    out = HERE / "out" / name
    out.mkdir(parents=True, exist_ok=True)
    slides = [slide_cover(post, mood, hexcol)]
    for i, item in enumerate(post.get("songs", []), 1):
        slides.append(slide_song(item, mood, hexcol, i))
    slides.append(slide_close(post, mood, hexcol))
    for i, s in enumerate(slides, 1):
        p = out / f"{name}-{i:02d}.png"
        s.convert("RGB").save(p, optimize=True)
        print(p)


if __name__ == "__main__":
    main()
