import getGroup from "../index";
import api from "./api";

(async ()=>{
  let query = await api("Group name?\n");
  await getGroup([query]);
})()