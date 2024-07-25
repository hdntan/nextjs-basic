// import { decodeJWT } from "@/lib/utils"

// type PayloadJWT = {
//   iat: number
//   exp: number
//   tokenType: string
//   userId: number
// }

export async function POST(request: Request) {
  const res = await request.json();
  console.log("🚀 ~ POST ~ res:", res);
  const sessionToken = res.sessionToken as string;
  const expiresAt = res.expiresAt as string;
  if (!sessionToken) {
    return Response.json(
      { message: " khong co session token" },
      {
        status: 400,
      }
    );
  }

  // const payload  = decodeJWT<PayloadJWT>(sessionToken)
  const expiresDate = new Date(expiresAt).toUTCString()
   return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
      },
    }
  );
}
