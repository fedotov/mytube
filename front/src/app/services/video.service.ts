import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from '../../assets/config.json';
import { IVideo } from '../IVideo';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  @Output() onSearch = new EventEmitter<IVideo[]>();
  @Output() onWatchHistory = new EventEmitter<IVideo[]>();

  constructor(private http: HttpClient) {
    this.updateWatchHistory()
      .catch((err) => console.log(err));
  }

  public async makeSearch(str: string) {
    try {
    const searchList = <IVideo[]> await this.http.get(config.server + '/search?q=' + str).toPromise();
    this.onSearch.emit(searchList);
    } catch (err) {
      console.log(err);
    }
  }

  public async watch(video: IVideo) {
    try {
    await this.http.post(config.server + '/history', video).toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  public async updateWatchHistory() {
    try {
    const history = <IVideo[]> await this.http.get(config.server + '/history').toPromise();
    this.onWatchHistory.emit(history);
    } catch (err) {
      console.log(err);
    }
  }

  public async delete(video: IVideo) {
    try {
      await this.http.delete(config.server + '/history?q=' + video.id).toPromise();
      await this.updateWatchHistory();
    } catch (err) {
      console.log(err);
    }
  }
}
