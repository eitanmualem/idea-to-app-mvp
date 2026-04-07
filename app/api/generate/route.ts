import { NextResponse } from "next/server";
import { mockGeneratedApp } from "@/lib/mock/generatedApp";

export async function POST() {
  return NextResponse.json(mockGeneratedApp);
}