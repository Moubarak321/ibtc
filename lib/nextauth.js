import NextAuth from "next-auth";

export default NextAuth({
  // ...
  debug: process.env.local === "development", // Active les logs en dev
  // ...
});