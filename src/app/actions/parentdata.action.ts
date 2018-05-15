import { Action } from '@ngrx/store';
import { ParentData } from '../models';

export const GET_ACCOUNT_PARENT = '[Parent] Account Data';
export const UPDATE_ACCOUNT_PARENT = '[Parent] Update Account Data';

export class GetParentDataAction implements Action {
    type = GET_ACCOUNT_PARENT;
}

export class UpdateParentDataAction implements Action {
    type = UPDATE_ACCOUNT_PARENT;

    constructor(public payload: ParentData ) {}
}
