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
