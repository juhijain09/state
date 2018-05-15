import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpDataService {
    constructor(private http: HttpClient) {}

    doGet(url) {
        return this.http
                .get<any>(url)
                .subscribe(
                res => {
                  return res;
                },
                err => {
                  console.log('Error occured');
                });
    }
    doPost(url, payload) {
        return this.http
                .post<any>(url, payload)
                .subscribe(
                    res => {
                      return res;
                    },
                    err => {
                      console.log('Error occured');
                });
    }
}
