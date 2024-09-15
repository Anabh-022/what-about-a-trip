import { publishSchema } from "schema-zod/blogSchema";

export async function publishController(req, res) {
  try {
    const body = req.body;
    const parsedBody = publishSchema.safeParse(body);
    if (!parsedBody.success)
      return res.status(400).json({ error: "Invalid Request Body" });

    console.log(parsedBody);
  }
  catch (e) {
    console.log("error at blog publishController\n", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function bulkController(req, res) {

}
export async function idController(req, res) {

}
