import Item from "@/models/item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities/authOption";
import { NextResponse } from "next/server";
import { connectDatabase } from "@/utilities/connectDatabase";
import mongoose from "mongoose";

export const POST = async (req: Request, res: Response) => {
  const { name, location, description, images } = await req.json();

  const session = await getServerSession(authOptions);

  const userId = session?.user._id;

  try {
    await connectDatabase();

    const item = await Item.create({
      name,
      location,
      description,
      images,
      provider: userId,
      status: "available",
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request, res: Response) => {
  try {
    await connectDatabase();

    const availableItems = await Item.find({ status: "available" });

    return NextResponse.json(availableItems);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
