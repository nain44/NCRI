import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable()
export class PrivilegesStore {
    userPrivileges = [];
    privilegeHash: any = {
        "ads.views.AddProductLogo": {},
        "ads.views.AddThirdPartyPortal": {},
        "ads.views.EditThirdPartyPortal": {},
        "ads.views.FetchProductLogo": {},
        "ccm.views.AddCommissionCompensation": {},
        "ccm.views.ApproveMultipleCommissionCompensation": {},
        "ccm.views.CancelMultipleCommissionCompensation": {},
        "ccm.views.PendingCommissionCompensationWithSuggestion": {},
        "ccm.views.EditCommissionCompensation": {},
        "ccm.views.FetchCommissionCompensationHistory": {},
        "ccm.views.UsersList": {},
        "uam.views.ApproveMultipleUser": {},
        "uam.views.CancelMultipleUser": {},
        "uam.views.CreateUser": {},
        "uam.views.DeleteUser": {},
        "uam.views.EditUser": {},
        "uam.views.UsersList": {},
        "afm.views.AddFieldMapping": {},
        "afm.views.EditFieldMapping": {},
        "afm.views.DeleteFieldMapping": {},
        "afm.views.FieldMappingList": {},
            };
    constructor() {

        //fetching privileges from storge
        let data = localStorage.getItem('details');
        if (data) {
            data = JSON.parse(data);
            if (data['user_privileges']) {
                this.userPrivileges = data['user_privileges'];
                this.normalizePrivilegesData();
            }

        }
    }

    normalizePrivilegesData() {
        let uniqeValues = Array.from(new Set(this.userPrivileges.map(it => it.resource_code)));
        uniqeValues.map(it => {
            let category = {};
            this.userPrivileges.filter(p => p.resource_code === it)
                .map(it => {
                    category[it.category.toLowerCase()] = it.category.toLowerCase();
                });
            this.privilegeHash[it] = category;
        });
        console.log(this.privilegeHash)
    }

}