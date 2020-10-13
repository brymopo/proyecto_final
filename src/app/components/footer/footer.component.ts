import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    faFacebook = faFacebook;
    faInstagram = faInstagram;
    faTwitter = faTwitter;
    faYoutube = faYoutube;

}
