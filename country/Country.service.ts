import { VK } from 'vk-io';
import {  cityToJson } from './cityJSON';
import { CountryPort } from './Contry.port';



export class CountryService{
    constructor(
        private readonly countryRepository: CountryPort,
    ){}

    getAllCity(){
      return this.countryRepository.getAllCity();
    }

    getCityByCountry(countryName:string){
        return this.countryRepository.getCityByCountry(countryName)
    }

    getCityByName(cityName:string){
        return this.countryRepository.getCityByName(cityName);
    }
}

export async function getAllCity(token){
    const vk = new VK({
        token: token
    });
    const allCountries = (await vk.api.database.getCountries({
    need_all: 1,
    })).items ;

    let countrieIndex= 0;
    for(let country of allCountries){
        if(country.id){
            allCountries[countrieIndex].city = await vk.api.database.getCities({
                country_id: country.id,
                need_all: 1
            });
        }
          countrieIndex++;
    }


    

    cityToJson(allCountries);
}
