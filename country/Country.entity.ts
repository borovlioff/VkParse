
export type CityId = number;
export type CountryId = number;

export class CountryEntity{
    constructor(
        private readonly _id:CountryId,
        private readonly _title:string,
        private readonly _city: City[]
    ){}
}

export interface City{
id:CityId,
title:string,
area?: string,
region?: string
}