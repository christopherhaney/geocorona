import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  benParagraph = "Write about yourself in the benParagraph string in about.component.ts!"

  chrisParagraph = "Chris Haney is a recent graduate with a Bachelor's in Computer Science from Boise State University. "
  + "He currently works at Micron Technology as a software engineer. "
  + "He likes to DJ and play Super Smash Bros. Ultimate in his spare time!"

  rossParagraph = "Write about yourself in the rossParagraph string in about.component.ts!"

  devList = [
    {
      img: 'ben',
      paragraph: this.benParagraph
    },
    {
      img: 'chris',
      paragraph: this.chrisParagraph
    },
    {
      img: 'ross',
      paragraph: this.rossParagraph
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }
}
