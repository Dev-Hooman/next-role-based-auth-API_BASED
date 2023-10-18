import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';

import { connectToDB } from '@/utils/database';
import User from '@/model/user';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {

        console.log("Profile Sub id: ", profile.sub)
        const defaultRole = ["none"];
        await connectToDB();

        const user = await User.findOne({ email: profile.email });
        console.log("Register User: ", user)

        if (user !== null) {
          return {
            id: user._id,
            username: user.username,
            email: user.email,
            image: user.image,
            role: user.role
          }
        }

        const newUser = new User({
          _id: profile.sub,
          email: profile.email,
          username: profile.name,
          image: profile.picture,
          role: defaultRole,
        });

        await newUser.save();

        return {
          id: profile.sub,
          username: profile.name,
          email: profile.email,
          image: profile.picture,
          role: defaultRole
        }
      }
    }),
    CredentialsProvider({
      credentials: {
        username: { type: 'text', placeholder: 'user@email.com' },
        password: { type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        await connectToDB();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not registered");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid Password");

        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {

      if (user) {
        token.role = user.role
      }

      if (trigger === 'update' || session?.role || session?.firstName || session?.lastName || session?.username) {
        console.log("Trigger update")
        token.username = session.username
        token.firstName = session.firstName
        token.lastName = session.lastName
        token.role = session.role
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        const email = session.user.email;
        try {
          await connectToDB();
          const sessionUser = await User.findOne({ email });
          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
            session.user.firstName = sessionUser.firstName;
            session.user.lastName = sessionUser.lastName;
            session.user.name = sessionUser.username
            session.user.role = sessionUser.role;
            session.user.twoFactorAuthStatus = sessionUser.twoFactorAuthStatus
          }
        } catch (error) {
          console.error(
            "Error fetching user session data from the database: ",
            error
          );
        }
      }

      return session;
    }
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
