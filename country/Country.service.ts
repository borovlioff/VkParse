import * as Countrys from "../countrys.json"
import { CountryPort, GetAllCityByCountryParams, GetAllCityParams, GetAllCountryParams, GetCityByCountryParams, GetCityByNameParams, GetCountryByCodeParams } from './Contry.port';


export class CountryService {
    constructor(
        private readonly countryRepository : CountryPort,
    ) { }

    async getCountryByCode(param:GetCountryByCodeParams) {
        return await this.countryRepository.getCountryByCode({code:param.code});
    }

    async getCountryByName(name: string) {
        return Countrys.find(objContry => objContry.title.toLowerCase() === name.toLowerCase());
    }

    async getAllCity(param?:GetAllCityParams) {
        return await this.countryRepository.getAllCity({countrys:Countrys, ...param});
    }

    async getCityByName(param:GetCityByNameParams) {
        return await this.countryRepository.getCityByName(param);
    }

    async getCityByCountry(param:GetCityByCountryParams) {
        const citys = await this.countryRepository.getCityByCountry(param)
        return citys;

    }
    async getAllCityByCountry(param:GetAllCityByCountryParams) {
        return this.countryRepository.getAllCityByCountry({country_id:param.country_id});
    }

    async getAllCountry(param:GetAllCountryParams){
        return await this.countryRepository.getAllCountry({code:param.code});
    }
}
