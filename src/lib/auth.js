import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/database/mongodb"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
          const client = await clientPromise
          const db = client.db()
          const user = await db.collection('users').findOne({ email: credentials.email })
          
          if (!user) {
            throw new Error("No user found")
          }
          
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          )
          
          if (!isValidPassword) {
            throw new Error("Invalid password")
          }
          
          return { id: user._id.toString(), email: user.email, name: `${user.firstname} ${user.lastname}` }
        } catch (error) {
          console.log(`User couldn't login because ==> ${error.message}`)
          throw new Error("Failed to login")
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const [firstname, lastname] = profile.name.split(" ")
        const client = await clientPromise
        const db = client.db()
        const existingUser = await db.collection('users').findOne({ email: user.email })
        if (!existingUser) {
          await db.collection('users').insertOne({
            firstname,
            lastname,
            email: user.email,
            image: user.image,
            password: "",
          })
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}