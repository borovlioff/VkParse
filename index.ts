
import 'dotenv/config'; 
import { promises as fs} from "fs"
import { GroupsService } from './groups/groups.service';
import { GroupsRepository } from './groups/groups.repository';
import { CountryService } from "./country/Country.service";
import { JSONCountryAdapter } from "./country/JSONCountry.adapter";

const TOKEN  = process.env.VK_TOKEN;

new CountryService(new JSONCountryAdapter());
const groupsService = new GroupsService(new GroupsRepository(TOKEN));

export default async function start(querys:string[]) {
    let groups = [];
    for(let query of querys){
        const result = await groupsService.getAll({
            q: query,
            country_id:1,
            city_id:73,
            sort:5
        });
        groups = groups.concat(result);
    }
    
    const group_ids = groups.map((group) => group.id);
    const group_idsString = group_ids.join("\n");

    const admins_id = await groupsService.getAdmins(group_ids);


    await fs.writeFile('./groups.txt', group_idsString);
    await fs.writeFile('./admins.txt', admins_id.join("\n"));
}

start(["Вк"]);