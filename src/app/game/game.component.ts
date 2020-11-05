import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  public pauseVideo(event: Event) {
    console.log("I work");
    var vid = <HTMLVideoElement>(document.getElementById("myVideo"));
    vid.pause();
  }
}








