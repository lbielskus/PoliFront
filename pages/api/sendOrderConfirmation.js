import postmark from 'postmark';

const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, body } = req.body;

    try {
      await client.sendEmail({
        From: 'info@politravel.lt',
        To: to,
        Subject: subject,
        HtmlBody: body,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
