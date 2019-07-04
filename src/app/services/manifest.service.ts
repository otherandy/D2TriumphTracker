import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { flatMap, map, retryWhen, tap, delay, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { Manifest } from '../models/manifest';


@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  //#region VariableDeclarations
  public manifest: Manifest;
  private mVersion: string;

  private readonly bungieUrl = 'https://www.bungie.net/Platform';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'X-API-KEY': 'df0d5a0d48254ad9a9b8d17837efc8d1'
    })
  };
  //#endregion

  constructor(private http: HttpClient) { }

  // checkManifest() {
  //   return this.getManifestUrl().pipe(
  //     retryWhen(errors => {
  //       return errors.pipe(
  //         tap(() => console.log("error, retrying get manifest...")),
  //         delay(100)
  //       )
  //     }),
  //     map(url => {
  //       if(url && this.mVersion && this.mVersion === url) {
  //         return of(true);
  //       }
  //       else if(url) {
  //         return
  //       }
  //     })
  //   )
  // }

  returnManifest(): Observable<boolean> {
    return this.getManifestUrl().pipe(
      retryWhen(errors => {
        return errors.pipe(
          tap(() => console.log('error, retrying get manifest...')),
          delay(100)
        );
      }),
      flatMap((url: string) => {
        return this.getManifestJSON(url).pipe(
          map(data => {
            this.manifest = this.toManifest(data);
            return true;
          }),
          catchError(err => {
            return of(false);
          })
        );
      })
    );
  }

  getManifestUrl() {
    const apiUrl = `${this.bungieUrl}/Destiny2/Manifest/`;
    return this.http.get(apiUrl, this.httpOptions).pipe(
      map( (data: any) => {
        let response: any;
        try {
          response = data.Response.jsonWorldContentPaths.en;
          // console.log('Got Manifest URL')
          return response;
        } catch (err) {
          console.log(`Error getting URL! \n${err}`);
          throw err;
        }
      })
    );
  }

  getManifestJSON(url: string) {
    if (url) {
      const apiUrl = `https://www.bungie.net${url}`;
      return this.http.get(apiUrl);
    } else {
      console.log('invalid URL returned.');
    }
  }

  toManifest(response): Manifest {
    try {
      const buildManifest: Manifest = new Manifest();
      buildManifest.DestinyObjectiveDefinition = response.DestinyObjectiveDefinition;
      buildManifest.DestinyPresentationNodeDefinition = response.DestinyPresentationNodeDefinition;
      buildManifest.DestinyRecordDefinition = response.DestinyRecordDefinition;
      return buildManifest;
    } catch (err) {
      console.log(`Error while handling manifest data.\n${err}`);
      throw err;
    }

  }

}
