import axios from "axios";
import { BACKEND_URL } from "./config";

export async function checkLogin() {
  const tk = localStorage.getItem("token");
  if (!tk) {
    return { status: false };
  }

  try {
    const user = await axios.post(`${BACKEND_URL}/api/v1/user/auth`, { tk });
    return { status: true, id: user.data.id };
  }
  catch (e) {
    return { status: false };
  }
}


