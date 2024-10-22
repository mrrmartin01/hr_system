import clientPromise from "@/lib/database/mongodb";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    await clientPromise;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    console.log("Found user:", user.email);
    console.log("Stored hashed password:", user.password);
    console.log("Provided password:", password);

    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }

    // If the password matches, return success response
    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Signin error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to sign in", error: error.message }),
      { status: 500 }
    );
  }
}