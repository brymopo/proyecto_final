import { Component, OnInit } from '@angular/core';
import { fade } from '../../../animation';

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.css'],
  animations: [fade]
})
export class EmailValidateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }  

}
