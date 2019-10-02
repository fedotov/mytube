import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVideo } from '../../IVideo';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent {

  @Input() video: IVideo;
  @Output() onClick = new EventEmitter<void>();

  constructor() { }

}
