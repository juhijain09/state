import { Action } from '@ngrx/store';

export const TOGGLE_MODEL = '[Model] Toggle';

export class ToggleModalAction implements Action {
    type = TOGGLE_MODEL;

    constructor(public payload: boolean) {}
}
