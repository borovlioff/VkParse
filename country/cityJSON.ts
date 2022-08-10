import { promises as fs} from "fs";

export async function cityToJson(city){
    await fs.writeFile('./city.json', JSON.stringify(city));
}

export async function cityFromJson(){
   const result = await fs.readFile('./city.json');
   const citys = JSON.parse(result.toString())
   return citys;
}

