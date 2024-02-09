import NextAuth from "next-auth"
import {authOptions} from "@/utils/authutil"


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

