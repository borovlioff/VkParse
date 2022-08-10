import { City } from "./Country.entity";

export interface CountryPort{

    getAllCity():Promise<City[]>

    getCityByCountry(countryName:string):Promise<City[]>

    getCityByName(cityName:string):Promise<City>
}