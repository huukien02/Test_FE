import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message } = req.body;

  const response = await fetch(
    "https://chat-gpt-be-pi.vercel.app/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    }
  );

  const data = await response.json();
  res.status(200).json({
    data,
  });
}
