import { CountryPort, GetCityByCountryParams, GetCityByNameParams } from "./Contry.port";
import { CountryCitys } from "./Country.entity";

type CitysJsonFile = CountryCitys[];

export class JSONCountryAdapter implements CountryPort {
    constructor(
        private readonly _citysFile:CitysJsonFile
    ){}

    async getAllCity(){
      let citys = [];
      for(let i = 0; i < this._citysFile.length; i++){
        citys = citys.concat(this._citysFile[i].items);
      }
      return citys;
    }

    async getCityByCountry(param:GetCityByCountryParams){
        const country = this._citysFile.find( objContry => objContry.title.toLowerCase() === param.countryName.toLowerCase());
        return country.items;
    }

    async getCityByName(param:GetCityByNameParams){
      const country = this._citysFile.find((country)=> country.id === param.country_id);
      const city = country.items.find( objCity => objCity.title.toLowerCase() === param.name.toLowerCase() );
      return city;
    }

    
    async getCountryByCode(param){
      const country = this._citysFile.find( objContry => objContry.code === param.code);
        return country;
    }

    async getAllCountry(param){
        return this._citysFile;
    }

    async getAllCityByCountry(param) {
      return this._citysFile.find( country => country.id === param.country_id).items
    }
}