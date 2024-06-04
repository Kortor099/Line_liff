import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Line_liff';
  
  constructor(private service: ServiceService) { }
  ngOnInit(): void {
    this.service.lineliff();
  }

}
