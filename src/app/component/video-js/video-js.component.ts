import { Component, Input, AfterViewInit }                                      from '@angular/core';

import videojs                                                                  from 'video.js'

@Component({
  selector: 'spm-video-js',
  templateUrl: './video-js.component.html',
  styleUrls: ['./video-js.component.scss']
})
export class VideoJsComponent implements AfterViewInit {

 private _player: any;

 @Input() public idx: string;
 @Input() public url: string;
 @Input() public poster: string;

 constructor() {}

 ngAfterViewInit() {
   

   this._player = videojs(document.getElementById(`video_${this.idx}`), {}, function() {

     let aspectRatio = 264/640;
     let myPlayer = this;
     let id = myPlayer.id();

     function resizeVideoJS(){
       var width = document.getElementById(id).parentElement.offsetWidth;
       myPlayer.width(width);
       myPlayer.height( width * aspectRatio );
     }
     resizeVideoJS();
     window.onresize = resizeVideoJS;
   });
  }
}
