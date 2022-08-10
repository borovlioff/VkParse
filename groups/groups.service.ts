import { GroupsSearchParams } from 'vk-io/lib/api/schemas/params';

export class GroupsService{
    constructor(
        private readonly _groupsRepository
    ){}

    getAll(option:GroupsSearchParams){
        const groups = this._groupsRepository.getAll(option);
        return groups;
    }

    getAdmins(groups: number[]){
        const admins = this._groupsRepository.getAdmins( groups );
        return admins;
    }
}