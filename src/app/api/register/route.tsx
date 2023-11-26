import { prisma } from '@/db';
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password, username, gender } = await req.json()

  try {
    const user = await prisma.login.create({
      data: {
        email,
        group_id: 1,
        sex: gender,
        userid: username,
        user_pass: password,
      },
    })

    return NextResponse.json({})
  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
