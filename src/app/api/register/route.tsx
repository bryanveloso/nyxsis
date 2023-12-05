import { prisma } from '@/db';
import { NextResponse } from "next/server"
import { useRouter } from "next/navigation"

export async function POST(req: Request) {
  const router = useRouter()
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

    return router.replace("/register/success")
  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
