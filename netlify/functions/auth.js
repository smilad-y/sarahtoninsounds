// Self-hosted OAuth entry point for Decap CMS's `github` backend
// (admin/config.yml). Netlify Identity + Git Gateway is deprecated —
// this is the standard replacement: a small Netlify Function this site
// owns and controls, instead of depending on a third party's OAuth
// relay for the ability to publish.
//
// Setup (one-time, in the GitHub org/account that owns this repo and in
// the Netlify site's dashboard — not something this code can do itself):
//   1. Create a GitHub OAuth App (github.com/settings/developers) with
//      its Authorization callback URL set to:
//        <this site's real URL>/.netlify/functions/callback
//   2. Set OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET as Netlify
//      environment variables from that OAuth App's credentials.
//   3. Replace the base_url placeholder in admin/config.yml with this
//      site's real URL.
//
// GET /.netlify/functions/auth — redirects the CMS login popup to
// GitHub's own authorize screen.
exports.handler = async function handler() {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return {
      statusCode: 500,
      body: "OAUTH_CLIENT_ID is not set. See the setup steps in netlify/functions/auth.js."
    };
  }

  const params = new URLSearchParams({
    client_id: clientId,
    scope: "repo,user"
  });

  return {
    statusCode: 302,
    headers: {
      Location: "https://github.com/login/oauth/authorize?" + params.toString()
    }
  };
};
