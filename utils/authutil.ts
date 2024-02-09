import type { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import {getUserDetails,createUserDetails, updateUserDetailsRole, updateUserAPIKey} from "@/dbutil/userdb"
import {html, text} from "@/utils/verificationemail"
import { addNewUserCreditsToLedger } from "./ledgerutil";
import { createTransport } from "nodemailer"
import { getMongoConnection } from "@/dbutil/ap2mongo";


//console.log("NEXTAUTH_URL "+process.env.NEXTAUTH_URL);

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    session:{strategy:'jwt'},
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    /*  TwitterProvider({
        clientId: process.env.TWITTER_LOGIN_CONSUMER_API_KEY as string,
        clientSecret: process.env.TWITTER_LOGIN_CONSUMER_SECRET as string
      }),
      FacebookProvider({
        clientId: process.env.FB_LOGIN_APP_ID as string,
        clientSecret: process.env.FB_LOGIN_APP_SECRET as string
      }),*/
        EmailProvider({
          server: process.env.SMTP_SERVER,
          from: "datavids@apsquared.co",
          async sendVerificationRequest(params) {
            const { identifier, url, provider } = params
            const { host } = new URL(url)
            // NOTE: You are not required to use `nodemailer`, use whatever you want.
            const transport = createTransport(provider.server)
            console.log("Sening auth email");
            const result = await transport.sendMail({
              to: identifier,
              from: provider.from,
              subject: `Sign in to DataVids.io`,
              text: text({ url, host }),
              html: html({ url, host }),
            })
            console.log("Email Login response "+JSON.stringify(result));
            const failed = result.rejected.concat(result.pending).filter(Boolean)
            if (failed.length) {
              throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
          }
        },
        }),
      // ...add more providers here
    ],
    callbacks: {
      //async redirect({ url, baseUrl }) {
        //console.log(`URL: ${url}`)
        //console.log(`BASEURL: ${baseUrl}`)
      //  return baseUrl
      //},
      async jwt({ token, trigger, user }) {
          //console.log('USER: '+JSON.stringify(user));
          //console.log('TOK: '+JSON.stringify(token));
          //user means first time called
          //console.log("jwt call back "+trigger);
          //console.log("USER: "+JSON.stringify(user));
        
          if (user){
              if (user?.id) token.id = user.id;
              if (user?.name) token.name = user.name;
              if (user?.email) token.email = user.email;
              if (user?.role) {
                token.role = user.role;
              } else {
                let therole = 'BASICUSER';
                if (user.email == 'fsa317@gmail.com' || user.email == 'michael.apap@gmail.com'){
                  therole = 'ADMIN';
                }
                token.role = user.role;
              }
          }
          if (user || (trigger && trigger=='update') ){
              //refresh token
                  const udetails = await getUserDetails(token.id);
                  console.log("do lookup");
                  console.log(JSON.stringify(udetails));
                  if (udetails && udetails.userid){
                      //existing user
                      token.nickname=udetails.nickname;
  
                      if (!udetails.role)
                      {
                        let therole = 'BASICUSER';
                        if (user.email == 'fsa317@gmail.com' || user.email == 'michael.apap@gmail.com'){
                          therole = 'ADMIN';
                        }
                        token.role = therole;
                        await updateUserDetailsRole(udetails.userid,therole);
                      } else {
                        token.role = udetails.role;
                      }

                      if (!udetails.apikey){
                        console.log("creating api key");
                        await updateUserAPIKey(udetails.userid);
                      }
  
  
                  } else {
                      console.log("New user");
                      await addNewUserCreditsToLedger(user.id);
                      const parts = user.email?.split("@") as string[];
                      const nick = parts[0];
                      let therole = 'BASICUSER';
                      if (user.email == 'fsa317@gmail.com' || user.email == 'michael.apap@gmail.com'){
                        therole = 'ADMIN';
                      }
                      await createUserDetails({
                        userid: user.id,
                        nickname: nick,
                        role: therole,                 
                      });
                      token.nickname=nick;
                      token.role=therole;
                  }
  
              }
          
          return token;
      },
      async session({ session, token, user }) {
  
          if (token.id && session.user) session.user.id = token.id;
          if (token.name && session.user) session.user.name = token.name;
          if (token.nickname && session.user) session.user.nickname = token.nickname;
          if (token.role && session.user) session.user.role = token.role;

          //console.log("SESSION: "+JSON.stringify(session));
        
          return session;
      },
      
    },
    events: {
      signIn: async (message) => { console.info('CUSTOM EVENT signIn'); },
      signOut: async (message) => { /* on signout */ },
      createUser: async (message) => { console.info('CUSTOM EVENT createUser '+JSON.stringify(message));  },
      linkAccount: async (message) => { /* account linked to a user */ },
      session: async (message) => { 
        //console.log("session event")
       },
    },
    adapter: MongoDBAdapter(getMongoConnection(),{databaseName:process.env.MAIN_DB}),
  }