import axios from "axios";
import crypto from 'crypto';

const handler = async (req, res) => {
  if (req.method !== "POST") return req.status(500);

  const client_secret = crypto.randomBytes(64).toString('hex');
  const phone = req.body.number;
  const otp = req.body.otp;
  const endpoint = "https://api.penpencil.co/v3/oauth/token";
  const payload = {
    username: phone,
    otp,
    'client_id': "system-admin",
    client_secret,
    grant_type: "password",
    organizationId: "5eb393ee95fab7468a79d189",
    latitude: 0,
    longitude: 0
}
  const resp = await axios.post(endpoint, payload);

  res.status(resp.status).json(resp.data);
};

export default handler;
