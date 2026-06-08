export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  if (!clientId || !clientSecret) {
    return res.status(500).send("OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET is missing");
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const data = await response.json();
    const token = data.access_token;

    if (!token) {
      return res.status(400).send(`Failed to get token: ${JSON.stringify(data)}`);
    }

    // Pass the token back to Decap CMS via postMessage
    const script = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:github:success:{"token":"${token}", "provider":"github"}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        
        window.opener.postMessage("authorizing:github", "*");
      </script>
    `;

    res.status(200).setHeader('Content-Type', 'text/html').send(script);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
}
