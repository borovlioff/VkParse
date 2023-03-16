import { getAllCity } from "../country/Country.service";
import getGroup from "../index";
import api from "./api";

(async ()=>{
  let method = parseInt(await api("1 : Get city?\n2 : Get group in city\n3 : Get all group in country\n"));
  if(method == 1) {
    await getAllCity(process.env.VK_TOKEN).then((res)=>{console.log(res)},(err)=>{console.warn(err)});
  }
  if( method == 2){
    let query = await api("Group name?\n");
    await getGroup([query],{});
  }
 
})()