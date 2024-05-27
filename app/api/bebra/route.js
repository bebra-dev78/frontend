import { getServerSession } from "next-auth/next";

import { authConfig } from "#/utils/auth";

export async function GET() {
  const s = await getServerSession(authConfig);

  if (s === null) {
    return Response.json(null);
  } else {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?email=${s.user.email}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    return Response.json([
      user,
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/keys`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "X-TRADIFY-UID": user.id,
        },
      }).then((res) => res.json()),
    ]);
  }
}
