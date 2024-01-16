import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "610604093563-12n5vis7gjlcq3d6sjmmbh5kuvcaoffk.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
})
