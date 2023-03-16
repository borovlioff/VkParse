
export type CityId = number;
export type CountryId = number;

export class CountryEntity{
    constructor(
        private readonly _id:CountryId,
        private readonly _code:string,
        private readonly _title:string,
        private readonly _city: City[]
    ){}
}

export class CityEntity{
    constructor(
        private readonly _id:CityId,
        private readonly _title:string,
        private readonly _area?: string,
        private readonly _region?: string
    ){}
}


export interface City{
id:CityId,
title:string,
area?: string,
region?: string
}

export  interface CountryCode{
    code:string,
    title:string
}


export interface Country extends CountryCode{
    id:number,
}

export interface CountryCitys extends Country{
    items:City[]
}