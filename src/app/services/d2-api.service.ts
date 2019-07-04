import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { User, UserInfo } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class D2ApiService {

  public manifest: any;
  private readonly bungieUrl = 'https://www.bungie.net/Platform';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'X-API-KEY': 'df0d5a0d48254ad9a9b8d17837efc8d1'
    })
  };

  constructor(private http: HttpClient) { }

  searchUser(userInfo: UserInfo): Observable<User> {
    const apiUrl = `${this.bungieUrl}/Destiny2/SearchDestinyPlayer/${userInfo.platform}/${userInfo.username}/`;
    return this.http.get(apiUrl, this.httpOptions)
      .pipe(
        // Do some piping
        map(
          (data: any) => {
            // Edit this later
            // Need to make sure the response is valid
            // Check the error codes and the like.
            const response = data.Response;
            /*
             * parse the "response" data from the api call
             * Grab only the user we searched for, no more than that.
             */
            if (response.length === 0) {
              return null;
            } else if (response.length > 1) {
              for (const item of response) {
                if (item.displayName === userInfo.username) {
                  return item;
                }
              }
            } else {
              return response[0];
            }
          }
        )
      );
  }

  getTriumphsById(user: User): Observable<any> {
    const apiUrl = `${this.bungieUrl}/Destiny2/${user.membershipType}/Profile/${user.membershipId}/?components=900`;
    return this.http.get(apiUrl, this.httpOptions)
      .pipe(
        map(
          (data: any) => {
            // placeholder
            let response;
            // console.log(response);
            // DO STUFF
            try {
              response = data.Response;
            } catch (err) {
              response = null;
            } finally {
              // tslint:disable-next-line: no-unsafe-finally
              return response;
            }
          }
        )
      );
  }

  //#region MANIFEST

  //#endregion

}
