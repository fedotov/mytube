import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IVideo } from '../IVideo';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  player;

  @Input()
  set video(video: IVideo) {
    if (!video) {
      return;
    }

    const { videoId } = video;
    this.player.cueVideoById({ videoId });
    this.player.playVideo();
  }

  constructor() { }

  ngAfterViewInit() {
    const doc = (<any>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showInfo: 0
        }
      });
    };
  }

}
