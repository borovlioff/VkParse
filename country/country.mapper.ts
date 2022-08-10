import { City, CountryEntity } from "./Country.entity";

export class CountryMapper{
    static mapToDomain(id: number, title: string, city: City[]){
        return new CountryEntity(id, title, city)
    }
}