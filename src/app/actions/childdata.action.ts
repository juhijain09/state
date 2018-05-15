import { Action } from '@ngrx/store';
import { ChildData } from '../models';

export const GET_CLASS_CHILD = '[Child] Class Data';
export const UPDATE_CLASS_CHILD = '[Child] Update Class Data';
export const GET_ORG_CHILD = '[Child] Org Data';

export class GetChildDataAction implements Action {
    type = GET_CLASS_CHILD;

    constructor(public payload: string ) {}
}
export class GetOrgDataAction implements Action {
    type = GET_ORG_CHILD;

    constructor(public payload: string ) {}
}
export class UpdateChildDataAction implements Action {
    type = UPDATE_CLASS_CHILD;

    constructor(public payload: ChildData ) {}
}
