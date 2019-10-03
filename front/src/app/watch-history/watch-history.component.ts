import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVideo } from '../IVideo';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-watch-history',
  templateUrl: './watch-history.component.html',
  styleUrls: ['./watch-history.component.css']
})
export class WatchHistoryComponent {

  @Input() watchList: IVideo[];
  @Output() onPlay = new EventEmitter<IVideo>();

  constructor(private videoService: VideoService) { }

  onDelete(video: IVideo) {
    console.log(video.id);
    this.videoService.delete(video);
  }
}
