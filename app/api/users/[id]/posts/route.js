import { connectToDB } from "@utils/database";
import Meme from "@models/meme";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const memes = await Meme.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(memes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch memes", { status: 500 });
  }
};
