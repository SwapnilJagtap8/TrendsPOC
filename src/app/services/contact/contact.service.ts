import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { userContactModel } from 'src/app/entities/contact/userContactModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getContactList() {
    return this.http.get<any>(this.url + "/users");
  }

  addUserDetail(userPayload: userContactModel) {
    return this.http.post(this.url + "/users", userPayload);
  }
}
