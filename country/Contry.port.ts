import { City, Country, CountryCitys, CountryCode } from "./Country.entity";


export interface GetCityByCountryParams {
    count?:number, 
    offset?:number, 
    need_all?: 1 ,
    country_id?: number,
    countryName?: string
 };

 export interface GetAllCityParams{
    countrys:Country[],
    big_city?:boolean;
 }

 export interface GetAllCityByCountryParams{
    country_id: number,
 }

export interface GetAllCityByCountryParams{
    country_id:number
}

export interface GetCountryByCodeParams{
    code:string
}

export interface GetAllCountryParams{
    code:Country[]
}

export type GetCityByNameParams = {name: string, country_id:number}

export interface Response<T>{
    count:number,
    items:T[]
}

export interface CountryPort{

    getCityByName(param:GetCityByNameParams):Promise<City>

    getAllCity(param:GetAllCityParams):Promise<CountryCitys[]>

    getCityByCountry(param:GetCityByCountryParams):Promise<City[]>

    getAllCityByCountry(param:GetAllCityByCountryParams):Promise<City[]>
    
    getCountryByCode(param:GetCountryByCodeParams):Promise<Country>

    getAllCountry(param:GetAllCountryParams):Promise<Country[]>
}