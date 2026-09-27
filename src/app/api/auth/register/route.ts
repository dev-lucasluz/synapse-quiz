import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, setSessionCookie } from "@/lib/auth";
import { generateReferralCode } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { name, email, password, referralCode } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 409 }
      );
    }

    // Resolve referrer
    let referredById: string | null = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
        include: { referrals: true },
      });
      if (referrer) {
        // Antifraude: max 2 referrals counted
        const confirmedReferrals = referrer.referrals.length;
        if (confirmedReferrals < 2) {
          referredById = referrer.id;
        }
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);
    let newReferralCode = generateReferralCode();

    // Ensure unique referral code
    let codeExists = await prisma.user.findUnique({
      where: { referralCode: newReferralCode },
    });
    while (codeExists) {
      newReferralCode = generateReferralCode();
      codeExists = await prisma.user.findUnique({
        where: { referralCode: newReferralCode },
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        referralCode: newReferralCode,
        referredById,
      },
    });

    const token = await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
