import { db } from "../lib/db.js";

export const createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = await db.message.create({
      data: { name, email, message },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: "Could not send message." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await db.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: "Could not fetch messages." });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await db.message.delete({ where: { id } });
    res.json({ message: "Message deleted." });
  } catch (error) {
    res.status(400).json({ message: "Could not delete message." });
  }
};
