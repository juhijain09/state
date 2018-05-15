import { Action } from '@ngrx/store';
import { ContractTypeData } from '../models';

export const GET_DATA_CONTRACTTYPE = '[ContractType] Data';
export const UPDATE_DATA_CONTRACTTYPE = '[ContractType] Update Data';
export const GET_DATA_ORGASSET = '[OrgAsset] Data';
export const UPDATE_DATA_ORGASSET = '[OrgAsset] Update Data';

export class GetContractTypeDataAction implements Action {
    type = GET_DATA_CONTRACTTYPE;
}

export class UpdateContractTypeDataAction implements Action {
    type = UPDATE_DATA_CONTRACTTYPE;

    constructor(public payload: ContractTypeData ) {}
}
export class GetOrgAssetsAction implements Action {
    type = GET_DATA_ORGASSET;
}
export class UpdateOrgAssetsDataAction implements Action {
    type = UPDATE_DATA_ORGASSET;

    constructor(public payload: {} ) {}
}
