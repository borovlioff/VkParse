import { VK } from "vk-io";

export class VKApiRepository{
    vk:VK
    constructor(private readonly _token:string){
        this.vk = new VK({
            token: _token
        });
    }

   async getAllCity(){
        const allCountries = (await this.vk.api.database.getCountries({
            need_all: 1,
            })).items ;
        
            let countrieIndex= 0;
            for(let country of allCountries){
                if(country.id){
                    allCountries[countrieIndex].city = await this.vk.api.database.getCities({
                        country_id: country.id,
                        need_all: 1
                    });
                }
                  countrieIndex++;
            }
    }

    async getCityByCountry(countryName:string){
        const countrys = (await this.vk.api.database.getCountries({
            need_all:1
            })).items ;
        const country = countrys.find( objContry => objContry.title.toLowerCase() === countryName.toLowerCase());
        const citys = await this.vk.api.database.getCities({
            country_id: country.id,
            need_all: 1
        });
        return citys;
    }

    getCityByName(name:string){

    }
}