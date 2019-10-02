import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IVideo } from '../IVideo';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {

  @Input()
  set video(video: IVideo) {
    if (!video) {
      return;
    }
    console.log(video);
    this.player.cueVideoById({
      videoId: video.id
    });
    this.player.playVideo();
  }

  player;

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
        // videoId: this.getVideo(),
        events: {
          // onReady: this.onPlayerReady.bind(this),
        },
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          // playlist: 'UG3sfZKtCQI,ALZHF5UqnU4,x9ZkC3OgI78',
          rel: 0,
          showInfo: 0
        }
      });
    };
  }

  onPlayerReady(event) {
    console.log(event);

    const videoId = 'fDRk2CW7AFk';
    event.target.cueVideoById({
      'videoId': videoId
    });
    event.target.playVideo();
  }

}
