//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseAPI = "https://api.themoviedb.org/3";
  private apiKey = "5f79797eded17e8dd6a8b2f47eb10756";

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getPopularMovie( page = 1 ){
    return this.http.get(this.baseAPI + `/tv/popular?page=${page}&api_key=`  + this.apiKey);
  }

  getLatestMovie( page = 1 ){
    return this.http.get(this.baseAPI + `/tv/on_the_air?page=${page}&api_key=`  + this.apiKey);
  }

  getShowDetails( tvshowid ){
    return this.http.get(this.baseAPI + `/tv/${tvshowid}?&api_key=` + this.apiKey);
  }


}
