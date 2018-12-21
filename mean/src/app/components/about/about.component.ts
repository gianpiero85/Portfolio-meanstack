import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public email: string;
  public image: string;


  constructor() {
     this.title = "Gianpiero Maccarrone";
     this.subtitle = "Web Developer";
     this.email = "gianpiero85@gmail.com";
     this.image = "assets/img/gianpiero.jpg";
  }

  ngOnInit() {
  }

}
