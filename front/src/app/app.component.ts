import { Component } from '@angular/core';
import { IVideo } from './IVideo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  video: IVideo;

  onPlay(video: IVideo) {
    this.video = video;
  }
}
