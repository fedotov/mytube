import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VideoService } from '../services/video.service';
import { IVideo } from '../IVideo';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  @Output() onPlay = new EventEmitter<IVideo>();

  constructor(private search: VideoService) { }

  ngOnInit() {
  }

  onSearchChange(str: string) {
    this.search.makeSearch(str);
  }
}
