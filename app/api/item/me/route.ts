import Item from "@/models/item";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities/authOption";

export const GET = async (req: Request, res: Response) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user._id;

  try {
    const availableItems = await Item.find({ provider: userId });

    return NextResponse.json(availableItems);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
