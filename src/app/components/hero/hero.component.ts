import { Component, OnInit } from '@angular/core';
import { fade } from '../../animation';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations:[fade]
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
