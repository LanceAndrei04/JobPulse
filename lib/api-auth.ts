import { NextResponse } from "next/server";

export function requireAdminApiAuth(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    !process.env.ADMIN_API_SECRET ||
    authHeader !== `Bearer ${process.env.ADMIN_API_SECRET}`
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }

  return null;
}
