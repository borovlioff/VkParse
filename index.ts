import 'dotenv/config'; 
import * as citys from "./citys2.json"
import * as countrys from "./countrys.json"
import { GroupsService } from './groups/groups.service';
import { GroupsRepository } from './groups/groups.repository';
import { CountryService } from "./country/Country.service";
import { JSONCountryAdapter } from "./country/JSONCountry.adapter";
import { VKApiAdapter } from './country/VKApi.Adapter';
import { save } from './util/JSONFile';
import {promises as fs} from "fs";

const TOKEN  = process.env.VK_TOKEN;
const vkApi = new VKApiAdapter(process.env.VK_TOKEN);
const groupsService = new GroupsService(new GroupsRepository(TOKEN), new CountryService(new JSONCountryAdapter(citys)));

export default async function start(querys:string[]) {
    let groups = [];
    for(let query of querys){
        const result = await groupsService.getGroupFromCountry({
            q: query,
            sort:5,
            count:1
        });
        groups = groups.concat(result);
    }
    
   
    if(groups.length > 0){
        const group_ids = groups.map((group) => {return group.id});
        const group_idsString = group_ids.join("\n");

        const admins_id = await groupsService.getAdmins(group_ids);


    await fs.writeFile('./groups.txt', group_idsString);
    await fs.writeFile('./admins.txt', admins_id.join("\n"));
    console.log("End:"+ groups.length + "groups search")
    }
//     const countryService = new CountryService(vkApi)
//     //const allCity = await countryService.getAllCityByCountry({country_id:1});
//     const allCity = await countryService.getAllCity({big_city:true, countrys:countrys });
//     await save({name:"citys2", data: allCity})
//     console.log(`end`);
}

start(["Автосервис"]);