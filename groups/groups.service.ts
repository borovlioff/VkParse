import { GroupsSearchParams } from 'vk-io/lib/api/schemas/params';
import { City } from '../country/Country.entity';
import { CountryService } from '../country/Country.service';
import { GroupsRepository } from './groups.repository';



export class GroupsService{
    constructor(
        private readonly _groupsRepository: GroupsRepository,
        private readonly _countryService: CountryService,
    ){}

    async getGroup(option:GroupsSearchParams){
        const groups = await this._groupsRepository.getGroup(option);
        return groups;
    }

    async getGroupFromAllCity(option:GroupsSearchParams):Promise<City[]>{
      let citys =  await this._countryService.getAllCity();
      let groups = [];
      for ( let city of citys){
        const group = await this.getGroup({
            ...option,
            city_id:city.id
        });
        groups.concat(group);
      }
      return groups;
    }

    async getGroupFromCountry(param){

    }

    getAdmins(groups: number[]){
        const admins = this._groupsRepository.getAdmins( groups );
        return admins;
    }
}