import { GroupsSearchParams } from 'vk-io/lib/api/schemas/params';
import { City, CountryId } from '../country/Country.entity';
import { CountryService } from '../country/Country.service';
import {  GroupsRepository } from './groups.repository';

export interface GetGroupFromCountryParams extends GroupsSearchParams{
    country_id:CountryId
}

export class GroupsService{
    constructor(
        private readonly _groupsRepository: GroupsRepository,
        private readonly _countryService: CountryService,
    ){}

    async getGroup(params:GroupsSearchParams){
        const groups = await this._groupsRepository.getGroup(params);
        return groups;
    }

    async getGroupFromAllCity(params:GroupsSearchParams):Promise<City[]>{
      let citys =  await this._countryService.getAllCity();
      let groups = [];
      for ( let city of citys){
        const group = await this.getGroup({
            ...params,
            city_id:city.id
        });
        groups.concat(group);
      }
      return groups;
    }

    async getGroupFromCountry(params:GetGroupFromCountryParams){
        const {country_id, ...serachParams} = params;
        const country = await this._countryService.getAllCityByCountry({ country_id: country_id})
        return await this._groupsRepository.getGroupFromCountry({citys: country,  ...serachParams})
    }

    getAdmins(groups: number[]){
        const admins = this._groupsRepository.getAdmins( groups );
        return admins;
    }
}