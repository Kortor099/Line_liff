import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchResult: string = '';

  handleSearch(searchName: string): void {
    this.searchResult = searchName;
  }
}
