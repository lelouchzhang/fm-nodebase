import { betterAuth } from "better-auth";
import { polar, checkout, portal } from "@polar-sh/better-auth";
import { polarClient } from "./polar"
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "c44cbacc-70d3-4521-b377-fe5dd7c97611",
              slug: "Pro-Nodebase"
            }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true
        }),
        portal()
      ]
    })
  ]
});
