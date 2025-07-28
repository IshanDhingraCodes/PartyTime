import { db } from "../lib/db.js";
import fs from "fs";
import path from "path";

function deleteImageFile(imageUrl) {
  if (!imageUrl) return;
  const filePath = path.join(
    process.cwd(),
    imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl
  );
  fs.unlink(filePath, (err) => {
    if (err) console.error(err);
  });
}

export const createDecoration = async (req, res) => {
  const {
    title,
    description,
    originalPrice,
    discountedPrice,
    discountPercentage,
    categoryId,
  } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const decoration = await db.decoration.create({
      data: {
        title,
        description,
        originalPrice: parseFloat(originalPrice),
        discountedPrice: parseFloat(discountedPrice),
        discountPercentage: parseFloat(discountPercentage),
        imageUrl,
        categoryId,
      },
      include: {
        category: true,
      },
    });
    res.status(201).json(decoration);
  } catch (error) {
    res.status(400).json({ message: "Could not create decoration." });
  }
};

export const getDecorations = async (req, res) => {
  const { categoryId, search } = req.query;
  const where = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const decorations = await db.decoration.findMany({
    where,
    include: {
      category: true,
    },
  });
  res.json(decorations);
};

export const getDecoration = async (req, res) => {
  const { id } = req.params;
  const decoration = await db.decoration.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
  if (!decoration)
    return res.status(404).json({ message: "Decoration not found." });
  res.json(decoration);
};

export const updateDecoration = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    originalPrice,
    discountedPrice,
    discountPercentage,
    categoryId,
  } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const oldDecoration = await db.decoration.findUnique({ where: { id } });
    if (imageUrl && oldDecoration && oldDecoration.imageUrl) {
      deleteImageFile(oldDecoration.imageUrl);
    }

    const data = {
      title,
      description,
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      discountPercentage: parseFloat(discountPercentage),
      categoryId,
    };
    if (imageUrl) data.imageUrl = imageUrl;

    const decoration = await db.decoration.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
    res.json(decoration);
  } catch (error) {
    res.status(400).json({ message: "Could not update decoration." });
  }
};

export const deleteDecoration = async (req, res) => {
  const { id } = req.params;
  try {
    const decoration = await db.decoration.findUnique({ where: { id } });
    if (decoration && decoration.imageUrl) {
      deleteImageFile(decoration.imageUrl);
    }
    await db.decoration.delete({ where: { id } });
    res.json({ message: "Decoration deleted." });
  } catch (error) {
    res.status(400).json({ message: "Could not delete decoration." });
  }
};
