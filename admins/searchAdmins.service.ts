import { VK } from 'vk-io';
import {chunk} from 'lodash';


export async function searchAdmins(group_ids:number[], token){
    const vk = new VK({
        token: token
    });
    
    const groupIdsChunk = chunk(group_ids, 500);
    let adminsAll = [];
    let admins_id:number[] = [];



    for (let admins of groupIdsChunk){
        const contacts = await vk.api.groups.getById({
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