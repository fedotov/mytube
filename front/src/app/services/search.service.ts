import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from '../../assets/config.json';
import { IVideo } from '../IVideo';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  @Output() onSearch = new EventEmitter<IVideo[]>();

  constructor(private http: HttpClient) { }

  public async makeSearch(str: string) {
    const searchList = <IVideo[]> await this.http.get(config.server + '/search?q=' + str).toPromise();
    this.onSearch.emit(searchList);
  }
}
