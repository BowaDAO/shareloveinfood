import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { validateId } from "@/utilities/validateId";
import { connectDatabase } from "@/utilities/connectDatabase";
import Item from "@/models/item";

export const GET = async (req: Request, { params }: { params: Params }) => {
  validateId(params.id);

  try {
    await connectDatabase();

    const item = await Item.findById(params.id);

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request) => {
  const { recipient, itemId } = await req.json();

  try {
    await connectDatabase();

    const item = await Item.findById(itemId);

    if (item) {
      item.recipient = recipient;
      item.status = "requested";
    }

    await item.save();

    return NextResponse.json({ message: "success." });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
