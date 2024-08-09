import Meme from "@models/meme";
import { connectToDB } from "@utils/database";
export const revalidate = 1; //revalidate api every 1 second
export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const searchKey = searchParams.get("search")
      ? searchParams.get("search").toString()
      : "";

    if (searchKey) {
      const memes = await Meme.find({ meme: { $regex: searchKey } }).populate(
        "creator"
      );
      return new Response(JSON.stringify(memes), { status: 200 });
    }

    const memes = await Meme.find({}).populate("creator");
    console.log("meme", memes);
    return new Response(JSON.stringify(memes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all memes", { status: 500 });
  }
};
