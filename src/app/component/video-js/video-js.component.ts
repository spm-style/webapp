import { Component, Input, AfterViewInit, ViewChild, ElementRef }                                      from '@angular/core';

// import videojs from 'videojs'                                                                from 'video.js'
import videojs from 'video.js'

@Component({
  selector: 'spm-video-js',
  templateUrl: './video-js.component.html',
  styleUrls: ['./video-js.component.scss']
})
export class VideoJsComponent implements AfterViewInit {

  private _player: any;

  @Input() public url: string;
  @Input() public poster: string;

  @ViewChild('video') private _video:ElementRef

  constructor() {}

  ngAfterViewInit() {
    // console.log('test', this._video, videojs)
    // this._player = videojs(this._video.nativeElement, {}, function() {
    //   // console.log('video ---->', this._video)
    //   let aspectRatio = 264/640
    //   let myPlayer = this
    //   let id = myPlayer.id()
    //   function resizeVideoJS(){
    //     let width = this._video.nativeElement.parentElement.offsetWidth
    //     myPlayer.width(width)
    //     myPlayer.height( width * aspectRatio )
    //   }
    //   resizeVideoJS()
    //   window.onresize = resizeVideoJS
    // })
  }
}
