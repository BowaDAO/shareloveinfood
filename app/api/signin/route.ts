import { NextResponse } from "next/server";
import { connectDatabase } from "@/utilities/connectDatabase";
import User from "@/models/user";

export const POST = async (req: Request, res: Response) => {
  const { email, password } = await req.json();

  const refinedEmail = email.toLowerCase();

  try {
    await connectDatabase();

    const user = await User.findOne({ email: refinedEmail });

    if (!user) {
      return NextResponse.json(
        {
          message: "Oops! Invalid credentials, please check and try again.",
        },
        { status: 401 }
      );
    }

    const passwordIsCorrect = await user.checkPassword(password);

    if (!passwordIsCorrect) {
      return NextResponse.json(
        { message: "Invalid password, please check and try again." },
        { status: 401 }
      );
    } else {
      return NextResponse.json(user);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
