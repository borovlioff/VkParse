import { VK } from "vk-io";
import { sleep } from "../util/sleep";
import { CountryPort, GetAllCityByCountryParams, GetAllCityParams, GetCityByCountryParams, GetCityByNameParams } from "./Contry.port";
import { City, Country, CountryCitys, CountryCode } from "./Country.entity";
import { CityDTO, CountryDTO } from "./country.mapper";

export class VKApiAdapter implements CountryPort {
    vk: VK
    constructor(private readonly _token: string) {
        this.vk = new VK({
            token: _token
        });
    }

    async getCountryByCode(param) {
        try {
            const res = await this.vk.api.database.getCountries({
                code: param.code
            });
            return {
                count: res.count,
                items: res.items.map(CountryDTO)
            };
        } catch (error) {
            console.warn(error);
        }
    }

    async getAllCountry(param) {
        try {
            const counrtysData = [];
            for (const country of param.countrys) {
                const res = await this.getCountryByCode(country.code);
                if (res.items[0].id !== 0) {
                    counrtysData.push({
                        ...country,
                        id: res.items[0].id
                    })
                }
            }
            return counrtysData
        } catch (error) {
            console.warn(error);
        }

    }

    async getAllCity(param: GetAllCityParams) {
        const citysAll: CountryCitys[] = [];
        let countrieIndex = 0;

        for (let country of param.countrys) {
            if (country.id) {
                let citys;
                if (param.big_city) {
                    citys = await this.getCityByCountry({ country_id: country.id })      
                } else {
                    citys = await this.getAllCityByCountry({ country_id: country.id });
                }
                citysAll.push({
                    items: citys.items,
                    ...country
                })
            }
            countrieIndex++;
        }
        return citysAll;
    }

    async getCityByCountry(param:GetCityByCountryParams) {
        try {
            console.log(`Country id:${param.country_id}`);
            const citys = await this.vk.api.database.getCities({
                country_id: param.country_id,
                ...param
            });
            console.log(`Count city:${citys.count}`);
            return {
                count: citys.count,
                items: citys.items.map(CityDTO)
            }
        } catch (error) {
            console.warn(error);
        }

    }

    async getAllCityByCountry(param:GetAllCityByCountryParams) {
        try {
            console.log(`Country ${param.country_id}`);
            let citys = [];
            let count = 0;
            let curentIndex = 0;
            let step = 1000;

            const firstReq = await this.vk.api.database.getCities({
                country_id: param.country_id,
                count: 1000,
                need_all: 1
            });
            console.log("Count city:",firstReq.count)
            if (firstReq.count <= 100) {
                return {
                    count: firstReq.count,
                    items: citys.map(CityDTO)
                }
            } else {
                citys.push(...firstReq.items);
                count = firstReq.count;
                let iteration = Math.ceil(count / step);
                console.log("iteration:",iteration)
                console.log("memory:",process.memoryUsage().heapUsed/1024)
                for (let i = 0; i <= iteration; i++) {
                    console.log(i)
                    count - curentIndex < step ? step = count - curentIndex : null;
                    await sleep(async () => {
                        const res = await this.vk.api.database.getCities({
                            country_id: param.country_id,
                            offset: step,
                            count: step,
                            need_all: 1
                        });
                        citys.push(...res.items);
                        console.log("memory:",process.memoryUsage().heapUsed/1024)
                        curentIndex += step;
                    }, 3000);
                }
                return {
                    count: count,
                    items: citys.map(CityDTO)
                }
            }

        } catch (error) {
            console.warn(error);
        }

    }

    async getCityByName(param: GetCityByNameParams) {
        try {
            const city = await this.vk.api.database.getCities({ q: param.name, country_id: param.country_id });
            return CityDTO(city.items[0])
        } catch (error) {
            console.warn(error);
        }
    }
}