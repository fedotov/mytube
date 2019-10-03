import { Component } from '@angular/core';
import { IVideo } from './IVideo';
import { VideoService } from './services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playingVideo: IVideo;
  watchList: IVideo[];

  constructor(private videoService: VideoService) {
    this.videoService.onWatchHistory.subscribe((history) => {
      this.watchList = history;
    });
  }

  async onPlay(video: IVideo) {
    this.playingVideo = video;
    await this.videoService.watch(video);
    await this.videoService.updateWatchHistory();
  }

  async onPlayFromHistory(video: IVideo) {
    this.playingVideo = video;
  }
}
