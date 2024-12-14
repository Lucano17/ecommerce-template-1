import { NextResponse } from "next/server";
import { userUpdate } from "@/actions/auth/update-user";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "El email es obligatorio." }, { status: 400 });
    }

    const updatedUser = await userUpdate(email, name, password);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar el usuario." }, { status: 500 });
  }
}
