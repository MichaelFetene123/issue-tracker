import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createIssueSchema } from "../../validationSchema";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validationResult = createIssueSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error.format(), { status: 400 });
  }
  // 
  const createdIssue = await prisma.issue.create({
    data: {
      title: validationResult.data.title,
      description: validationResult.data.description,
    },
  });

  return NextResponse.json(createdIssue, { status: 201 });
};
