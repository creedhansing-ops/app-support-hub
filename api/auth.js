export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send("OAUTH_CLIENT_ID is not configured in Vercel Environment Variables");
  }

  // Redirect to GitHub OAuth Authorization page
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  res.redirect(authUrl);
}
