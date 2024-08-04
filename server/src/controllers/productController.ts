import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET http://localhost:5000/products //
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // req includes data //
    const search = req.query.search?.toString();

    // get products //
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    // return products //
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

// POST http://localhost:5000/products //
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;

    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
  }
};
