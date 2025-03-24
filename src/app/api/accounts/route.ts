import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const payload = await prisma.login.findMany()
    const total = await prisma.login.count()
    return Response.json({ payload, total }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
