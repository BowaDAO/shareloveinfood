import { NextResponse } from "next/server";
import { connectDatabase } from "@/utilities/connectDatabase";
import User from "@/models/user";

export const POST = async (req: Request) => {
  const body = await req.json();

  const email = body.email;

  const refinedEmail = email.toLowerCase();

  try {
    await connectDatabase();

    const userExists = await User.findOne({ email: refinedEmail });

    if (userExists) {
      return NextResponse.json(
        { message: "User account already exist, please sign in." },
        { status: 401 }
      );
    }

    const user = await User.create({
      ...body,
      email: refinedEmail,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
