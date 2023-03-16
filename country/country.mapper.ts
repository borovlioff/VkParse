import { City, Country } from "./Country.entity";



export function CountryDTO(country:Partial<Country>):Country{
    return { id: country.id ?? 0, code: country.code ?? '', title: country.title ?? '' };
}

export function CityDTO(city: {id?:number, title?:string} & Partial<City>):City{
    
    return { ...city, id: city.id ?? 0, title: city.title ?? ""}
}
