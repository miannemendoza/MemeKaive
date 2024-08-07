import { connectToDB } from "@utils/database";
import Meme from "@models/meme";

export const dynamic = "force-dynamic";
export const POST = async (req) => {
  const { userId, meme, tag } = await req.json();
  try {
    await connectToDB();

    const newmeme = new Meme({
      creator: userId,
      meme,
      tag,
    });

    await newmeme.save();
    return new Response(JSON.stringify(newmeme), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new Meme", { status: 500 });
  }
};
