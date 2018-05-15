import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import {
    ENVIRONMENT,
    ChildClasses
  } from '../constant';

import 'rxjs/add/operator/map';

import { ChildData } from '../models';

@Injectable()
export class UserService {
    private isUserLoggedIn;
    public username;

    constructor(private http: HttpClient) {
        this.isUserLoggedIn = false;
    }

    setUserLoggedIn() {
        this.isUserLoggedIn = true;
        this.username = 'testuser';
    }

    getUserLoggedIn() {
        return this.isUserLoggedIn;
    }
}
