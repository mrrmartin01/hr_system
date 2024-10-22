import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/database/mongodb";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await clientPromise; // Connect to MongoDB
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found");
          }
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }
          return { id: user._id, email: user.email, name: `${user.firstname} ${user.lastname}` };
        } catch (error) {
          console.log(`User couldn't login because ==> ${error.message}`);
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const [firstname, lastname] = profile.name.split(" ");
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            firstname,
            lastname,
            email: user.email,
            image: user.image,
            password: "",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});