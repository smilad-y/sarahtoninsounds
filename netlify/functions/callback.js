// GitHub's OAuth redirect target (paired with auth.js — see the setup
// steps there). Exchanges the one-time `code` for an access token, then
// hands that token back to the Decap CMS popup window via the
// postMessage handshake Decap's github backend expects: the opener
// window sends "authorizing:github" and waits for a same-shaped
// "authorization:github:success:{...}" (or ":error:{...}") message in
// return before it trusts the origin.
const https = require("https");

function exchangeCodeForToken(code) {
  const body = JSON.stringify({
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    code: code
  });

  return new Promise(function (resolve, reject) {
    const req = https.request(
      {
        hostname: "github.com",
        path: "/login/oauth/access_token",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      function (res) {
        let data = "";
        res.on("data", function (chunk) {
          data += chunk;
        });
        res.on("end", function () {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function renderPostMessagePage(status, payload) {
  const message = "authorization:github:" + status + ":" + JSON.stringify(payload);
  return (
    "<!DOCTYPE html><html><body><script>" +
    "(function () {" +
    "function receiveMessage(e) {" +
    "window.opener.postMessage(" + JSON.stringify(message) + ", e.origin);" +
    "window.removeEventListener('message', receiveMessage, false);" +
    "}" +
    "window.addEventListener('message', receiveMessage, false);" +
    "window.opener.postMessage('authorizing:github', '*');" +
    "})();" +
    "</script></body></html>"
  );
}

exports.handler = async function handler(event) {
  const code = event.queryStringParameters && event.queryStringParameters.code;
  if (!code) {
    return { statusCode: 400, body: "Missing OAuth code." };
  }
  if (!process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET) {
    return {
      statusCode: 500,
      body: "OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET are not set. See the setup steps in netlify/functions/auth.js."
    };
  }

  try {
    const tokenResponse = await exchangeCodeForToken(code);
    if (tokenResponse.error) {
      return {
        statusCode: 401,
        headers: { "Content-Type": "text/html" },
        body: renderPostMessagePage("error", tokenResponse)
      };
    }
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: renderPostMessagePage("success", {
        token: tokenResponse.access_token,
        provider: "github"
      })
    };
  } catch (err) {
    return { statusCode: 500, body: "OAuth callback error: " + err.message };
  }
};
