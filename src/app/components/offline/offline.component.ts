import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css']
})
export class OfflineComponent implements OnInit {
  public featureId:string;
  public picsArray = [
    "2C8OVBKaWCSJsuWsADaVVSBG.jpg",    
    "5skuE5mVSQCxHfG5Aj8KXd7O.jpg",
    "QCWx84GY25e3bkMkRLH5lgW7.jpg",
    "vsA_qWbGX1wfWGmluBIMDw87.jpg"
  ];

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

  getUrl(id:string){
    return `http://localhost:3000/getImage?image=${id}`;
  }
  

}
