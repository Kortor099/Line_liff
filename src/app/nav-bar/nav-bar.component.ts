import { Component } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private service: ServiceService) { }
  linelogout(){
    this.service.linelogout();
  }
  

}
