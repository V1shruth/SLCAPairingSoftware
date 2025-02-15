import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }
        return user;
      },
    }),
    GitHubProvider({
      clientId: "Ov23ligude5VuxhBHFEX",
      clientSecret: "e5576f5e012f8dc6d225c0a9e28d4a7a06d22f78",
    }),
    GoogleProvider({
      clientId: "168767987177-i9f6susi2e5didjl93eo7c4kvlartld9.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
});


/*export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: "168767987177-i9f6susi2e5didjl93eo7c4kvlartld9.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }
        return user;
      },
    }),
     GitHubProvider({
      clientId: "your_github_client_id",
      clientSecret: "your_github_client_secret",
    }),
  ],
  secret:"atr5-gt65-9jet",
}
export default NextAuth(authOptions)*/