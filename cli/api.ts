import * as readline from "readline";
import { stdin as input, stdout as output } from 'process';

export default function prompt(question:string){
    const rl = readline.createInterface({ input, output });
    return new Promise<string|undefined>(
        resolve => rl.question(question, (ans) =>{
            rl.close();
            return ans
        })
    );
}