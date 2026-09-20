import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "mock_id",
      clientSecret: process.env.GITHUB_SECRET || "mock_secret",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "super-secret-hackathon-key",
})

export { handler as GET, handler as POST }
