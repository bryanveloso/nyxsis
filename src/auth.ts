import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        if (!user) {
          throw new Error("No user found")
        }

        return user
      },
    }),
  ],
})
