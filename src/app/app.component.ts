import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'geocorona';
  loaded = false;
  
  ngOnInit() {
    setTimeout(() => {
      this.loaded = true; // TODO set loaded after d3 has loaded, not just an arbitrary time
    }, 3000);
  }
}
