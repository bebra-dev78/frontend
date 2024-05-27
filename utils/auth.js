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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?email=${credentials.email}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((u) =>
            u === null
              ? null
              : bcrypt.compareSync(credentials.password, u.password)
              ? u
              : null
          ),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: "bebra",
};
