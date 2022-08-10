import { chunk } from 'lodash';
import { VK } from 'vk-io';
import { GroupsSearchParams } from 'vk-io/lib/api/schemas/params';

export class GroupsRepository{
    vk:VK;
    constructor(private readonly _token){
        this.vk = new VK({
            token: _token
        });
    }
    
    async getAll(option:GroupsSearchParams){
        const groups = await this.vk.api.groups.search({
            ...option,
            count: 1000
        });
        return groups.items;
    }

    async getAdmins(groups: number[]) {
        const groupIdsChunk = chunk(groups, 500);
        let adminsAll = [];
        let admins_id:number[] = [];

        function getAdminId(group){
            let ids = [];
            if(group?.contacts && group.contacts.length > 0){
                let indexContact = 0;
                let contactsLength = group.contacts.length;
                for(;indexContact < contactsLength; indexContact++){
                    const contact = group.contacts[indexContact];
                    if(contact.user_id != undefined){
                        ids.push(contact.user_id);
                    }
                }
            }
            return ids as number[]
        }

        for (let admins of groupIdsChunk){
            const contacts = await this.vk.api.groups.getById({
                group_ids: admins,
                fields: ["contacts"]
            });
            adminsAll = adminsAll.concat(contacts)
        }

        let i = 0
        for(;i<adminsAll.length;i++){
            admins_id.push(...getAdminId(adminsAll[i]));
        }    
        return admins_id;
        }
}