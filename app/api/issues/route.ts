import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/lib/prisma";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validationResult = createIssueSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error.issues, { status: 400 });
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
