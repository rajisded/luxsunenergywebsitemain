import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, requirement, urgency } = body;

    // Validate required fields
    if (!name || !email || !phone || !requirement || !urgency) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    // Validate Indian phone number (allow optional spaces, hyphens, and parens)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid Indian phone number. Must be a valid 10-digit number." },
        { status: 400 }
      );
    }

    // Save to Supabase via Prisma
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        name,
        email,
        phone,
        requirement,
        urgency,
      },
    });

    return NextResponse.json(
      { success: true, id: quoteRequest.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save quote request:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
