import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET http://localhost:5000/expenses //
export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expensesByCategorySummaryRaw =
      await prisma.expenseByCategory.findMany({
        orderBy: {
          date: "desc",
        },
      });

    const expenseByCategorySummary = expensesByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );

    res.json(expenseByCategorySummary);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};
