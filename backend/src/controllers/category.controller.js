import { db } from "../lib/db.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await db.category.create({ data: { name } });
    res.status(201).json({
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Category already exists or invalid data." });
  }
};

export const getCategories = async (req, res) => {
  const categories = await db.category.findMany();
  res.json(categories);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await db.category.update({
      where: { id },
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Could not update category." });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await db.category.delete({ where: { id } });
    res.json({ message: "Category deleted." });
  } catch (error) {
    res.status(400).json({ message: "Could not delete category." });
  }
};
