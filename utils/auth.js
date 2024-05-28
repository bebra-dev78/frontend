import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: (credentials) =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/comparePassword?email=${credentials.email}&password=${credentials.password}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((p) =>
            p === 200
              ? fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?email=${credentials.email}`,
                  {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                      "Content-Type": "application/json",
                      Secret: "bebra",
                    },
                  }
                ).then((res) => res.json())
              : null
          ),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: "bebra",
};
