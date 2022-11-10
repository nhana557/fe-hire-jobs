// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function Peler(req, res) {
  const result = await axios.get(`${process.env.API_BACKEND}review`);

  const detail = JSON.parse(JSON.stringify(result.data.data))
  return detail;
}
