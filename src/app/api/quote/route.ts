import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, category, requirement, urgency } = body;

    // Validate required fields
    if (!name || !email || !phone || !category || !requirement || !urgency) {
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

    // Validate Indian phone number
    const validateIndianPhone = (ph: string): boolean => {
      const cleaned = ph.replace(/[^\d+]/g, "");
      if (cleaned.startsWith("+91")) {
        return /^[6-9]\d{9}$/.test(cleaned.slice(3));
      }
      if (cleaned.length === 10) {
        return /^[6-9]\d{9}$/.test(cleaned);
      }
      if (cleaned.length === 11 && cleaned.startsWith("0")) {
        return /^[6-9]\d{9}$/.test(cleaned.slice(1));
      }
      if (cleaned.length === 12 && cleaned.startsWith("91")) {
        return /^[6-9]\d{9}$/.test(cleaned.slice(2));
      }
      return false;
    };

    if (!validateIndianPhone(phone)) {
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
        category,
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
