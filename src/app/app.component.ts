import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'geocorona';
  loaded = false;
  
  ngOnInit() {
    setTimeout(() => {
      this.loaded = true; // TODO set loaded after d3 has loaded, not just an arbitrary time
    }, 3);
  }

  public videoEvent(tabChangeEvent: MatTabChangeEvent) {
    var vid = <HTMLVideoElement>(document.getElementById("myVideo"));
    if(tabChangeEvent.index == 2) { vid.pause(); } 
    else { vid.play(); }
  }
}
