import axios from "axios";
import { parse } from 'url'

export const authenticate = async (request) => {
  const { tk } = parse(request.url, true).query
  console.log(tk);
  let res;
  try {
    res = await axios.post("http://localhost:3000/api/v1/user/auth", {
      tk
    })
  }
  catch (e) {
    //console.log(false);
    return false;
  }
  //console.log(res.data);
  return true;
}
