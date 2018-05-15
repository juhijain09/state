import { Action } from '@ngrx/store';

export const TOGGLE_CREATE_NODE = '[CreateNode] Toggle';
export const CREATE_NEW_NODE = '[CreateNode] New Node';
export const CREATE_NODE_RESULT = '[CreateNode] Node Result';
export const CREATE_NEW_PRINCIPAL = '[CreateNode] New Principal';
export const CREATE_NEW_DATAITEM = '[CreateNode] New DataItem';
export const RESPONSE_STATUS = '[Status] Response status';

export class ToggleCreateNodeAction implements Action {
    type = TOGGLE_CREATE_NODE;

    constructor(public payload: boolean) {}
}
export class CreateNewNodeAction implements Action {
    type = CREATE_NEW_NODE;

    constructor(public payload: {}) {}
}
export class CreatePrincipalNodeAction implements Action {
    type = CREATE_NEW_PRINCIPAL;

    constructor(public payload: {}) {}
}
export class CreateDataItemAction implements Action {
    type = CREATE_NEW_DATAITEM;

    constructor(public payload: {}) {}
}
export class CreateNodeResultAction implements Action {
    type = CREATE_NODE_RESULT;

    constructor(public payload: {}) {}
}
export class ResponseStatusAction implements Action {
    type = RESPONSE_STATUS;

    constructor(public payload: any) {}
}
