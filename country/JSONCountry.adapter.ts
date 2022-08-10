import * as countrys from "../city.json";
import { CountryPort } from "./Contry.port";
import { City } from "./Country.entity";

export class JSONCountryAdapter implements CountryPort{
    constructor(){}

    async getAllCity(){
      let citys = [];
      countrys.map( country => citys.push(country.city.items) );
      return citys;
    }

    async getCityByCountry(countryName:string){
        const country = countrys.find( objContry => objContry.title.toLowerCase() === countryName.toLowerCase());
        return country.city.items;
    }

    async getCityByName(cityName:string){
      let citys:City[] = [];
      countrys.map( country => citys.concat(country.city.items) );
      const city = citys.find( objCity => objCity.title.toLowerCase() === cityName.toLowerCase() );
      return city;
    }
}