import axios from "axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    req.status(500);
  }
  const phone = req.body.number;
  console.log(phone);
  const endpoint = "https://api.penpencil.co/v1/users/get-otp?smsType=0";
  const payload = {
    username: phone,
    countryCode: '+91',
    organizationId: '5eb393ee95fab7468a79d189'

  };
  const resp = await axios.post(endpoint, payload);
  console.log(resp.data)
  res.status(resp.status).json(resp.data);
};

export default handler;
