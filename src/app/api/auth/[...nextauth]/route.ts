import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import mongodbClient from "@/utils/mongodbClient";
import { SignInSchema } from "@/schemas";
import { getUserByEmailAction } from "@/actions/auth";
import bcrypt from "bcryptjs";
import { environment } from "@/environments";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmailAction(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: environment.nextauthSecret,
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  adapter: MongoDBAdapter(mongodbClient),
  theme: {
    colorScheme: "light",
  },
});

export { handler as GET, handler as POST };
