import { connectToDB } from "@utils/database";
import Meme from "@models/meme";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const meme = await Meme.findById(params.id).populate("creator");
    if (!meme) {
      return new Response("Meme not found", { status: 404 });
    }
    return new Response(JSON.stringify(meme), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch meme", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { meme, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing meme by ID
    const existingmeme = await Meme.findById(params.id);

    if (!existingmeme) {
      return new Response("Meme not found", { status: 404 });
    }

    // Update the meme with new data
    existingmeme.meme = meme;
    existingmeme.tag = tag;

    await existingmeme.save();

    return new Response("Successfully updated the memes", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Meme", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Meme.findByIdAndRemove(params.id);
    return new Response("Meme successfully deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the Meme", { status: 500 });
  }
};
