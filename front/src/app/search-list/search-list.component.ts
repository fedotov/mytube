import { Component, EventEmitter, Output } from '@angular/core';
import { VideoService } from '../services/video.service';
import { IVideo } from '../IVideo';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent {

  protected videos: IVideo[];

  @Output() onPlay = new EventEmitter<IVideo>();

  constructor(private search: VideoService) {
    search.onSearch.subscribe((videos) => {
      this.videos = videos;
    });
  }

  onClick(video: IVideo) {
    this.videos = null;
    this.onPlay.emit(video);
  }
}
