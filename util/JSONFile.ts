import { promises as fs} from "fs";

export async function save({name,data}){
    await fs.writeFile(`./${name}.json`, JSON.stringify(data));
}

export async function read(name){
   const result = await fs.readFile(`./${name}.json`);
   const citys = JSON.parse(result.toString())
   return citys;
}

