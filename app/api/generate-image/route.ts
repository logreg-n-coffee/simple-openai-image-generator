import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const POST = async (req: NextRequest) => {
  // get request from body
  let reqBody = null;

  if (req.body) {
    const bodyData = await new Response(req.body).text();
    reqBody = JSON.parse(bodyData);
  }

  const prompt = reqBody.prompt;

  if (!prompt) {
    return NextResponse.json({ error: "No prompt provided" }); // Bad Request
  }

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
    });

    return NextResponse.json({
      imageUrl: response.data.data[0].url,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || error.toString(),
    });
  }
};

const GET = async (req: NextRequest) => {
  return NextResponse.json({ message: "Only POST Methods are allowed" });
};

export { POST, GET };
