import { db } from "@repo/database/client";

export async function getMessage(req, res) {
  try {
    const messages = await db.chatRoom.findMany({
      include: {
        author: {
          select: {
            userName: true
          }
        }
      }
    });
    res.json({ messages });
  }
  catch (e) {
    console.log("Error in get messages controller\n", e);
    res.status(500).json({ error: "Internal Server Error" });

  }
}
