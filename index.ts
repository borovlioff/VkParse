import 'dotenv/config'; 
import * as citys from "./citys2.json"
import * as countrys from "./countrys.json"
import { GroupsService } from './groups/groups.service';
import { GetGroupFromCountryOut, GroupsRepository } from './groups/groups.repository';
import { CountryService } from "./country/Country.service";
import { JSONCountryAdapter } from "./country/JSONCountry.adapter";
import { VKApiAdapter } from './country/VKApi.Adapter';
import { save } from './util/JSONFile';
import {promises as fs} from "fs";

const TOKEN  = process.env.VK_TOKEN;
const vkApi = new VKApiAdapter(process.env.VK_TOKEN);
const groupsService = new GroupsService(new GroupsRepository(TOKEN), new CountryService(new JSONCountryAdapter(citys)));

export default async function start(querys:string[]) {
    let groups:GetGroupFromCountryOut[] = [];
    let groupCounts = 0;
    for(let query of querys){
        const result = await groupsService.getGroupFromCountry({
            country_id:1,
            q: query,
            sort:5,
            count:1000,
        });
        groups = groups.concat(result);
    }
    
   
    if(groups.length > 0){
        let csv = "Город\tСсылка\tНазвание\n";
        let newRow = false;
        for(let groupIndex = 0; groupIndex < groups.length; groupIndex++){
            if(groups[groupIndex]?.city){
            csv+=`${groups[groupIndex].city.title}\t`;
            
            for(let groupInfoIndex = 0; groupInfoIndex < groups[groupIndex].items.length; groupInfoIndex++){
                if(groups[groupIndex].items[groupInfoIndex]?.id){
                    csv+=`${newRow?"\t":""}https://vk.com/club${groups[groupIndex].items[groupInfoIndex].id}\t${groups[groupIndex].items[groupInfoIndex].name}\t\n`;
                    newRow = true;
                    groupCounts++
                } else{
                    console.log(`Bug`);
                    console.log(groups[groupIndex].city.title,groups[groupIndex].items.length, groups[groupIndex].items[groupInfoIndex]);
                }
           }
           newRow = false;
        }
        }
        const group_ids = groups.flatMap((group) => group.items.map(g => g.id));
        // const group_idsString = group_ids.join("\n");

        const admins_id = await groupsService.getAdmins(group_ids);


    await fs.writeFile('./groups.csv', csv);
    await fs.writeFile('./admins.txt', admins_id.join("\n"));
    console.log("End:"+ groupCounts + "groups search")
    }
//     const countryService = new CountryService(vkApi)
//     //const allCity = await countryService.getAllCityByCountry({country_id:1});
//     const allCity = await countryService.getAllCity({big_city:true, countrys:countrys });
//     await save({name:"citys2", data: allCity})
//     console.log(`end`);
}

start(["Wildberries"]);