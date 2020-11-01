import { Component, OnInit } from '@angular/core';
import { fade } from '../../animation';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css'],
  animations:[fade]
})
export class Page404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
