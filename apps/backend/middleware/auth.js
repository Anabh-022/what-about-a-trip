import { db } from "@repo/database/client";
import jwt from "jsonwebtoken";
export async function authUser(req, res, next) {
  try {
    const header = req.headers["Authorization"];
    if (!header)
      return res.status(401).json({ error: "Unauthoroized" });

    try {
      const user = jwt.verify(header, "password")
    }
    catch (e) {
      return res.status(401).json({ error: "Unauthoroized" });
    }

    let validuser = null;
    try {
      validuser = await db.user.findUnique({
        where: {
          id: user.id
        }
      })
    }
    catch (e) {
      return res.status(401).json({ error: "Unauthoroized" });

    }
    next();
  }
  catch (e) {
    res.status(500).json({ "error": "Internal Server Error" });
  }
}
