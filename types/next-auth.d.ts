import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
      user?: User;
  }

  interface User {
    nickname: string,
    role:string,
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
      id: string,
      name: string,
      role: string,
      nickname: string,
  }
}