import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgForm } from '@angular/forms';


export interface Character {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  // origin: {
  //   name: string;
  //   url: string;
  // };
  location: {
    name: string;
    // url: string;
  };
  image: string;
  // episode: string[];
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  searchName: string = '';
  isSearch: boolean = false;

  @Output() searchEvent = new EventEmitter<string>();
  searchResult: string = '';

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.service.getCharacters().subscribe(data => {
      console.log("API data: ", data);
      this.convertData(data.results);
      console.log("Converted data: ", this.characters);
    });
  }

  convertData(data: any[]): void {
    let _data: Character[] = [];
    for (let i = 0; i < data.length; i++) {
      _data.push({
        name: data[i].name || "",
        status: data[i].status || "",
        species: data[i].species || "",
        type: data[i].type || "",
        gender: data[i].gender || "",
        // origin: {
        //   name: data[i].origin?.name || "",
        //   url: data[i].origin?.url || ""
        // },
        location: {
          name: data[i].location?.name || "",
          // url: data[i].location?.url || ""
        },
        image: data[i].image || "",
        // episode: data[i].episode || [],
      });
    }
    this.characters = _data;
  }

  search(input: NgForm) {
    this.service.searchCharacters(this.searchName).subscribe((data: any) => {
      this.characters = data.results;
      this.searchEvent.emit(this.searchName); 
    });

    if (input.invalid) {
      this.isSearch = true;
      return;
    }
  }
}

// name: data[i]['name'] || "",
//         status: data[i]['status'] || "",
//         species: data[i]['species'] || "",
//         type: data[i]['type'] || "",
//         gender: data[i]['gender'] || "",
//         origin: {
//           name: data[i].origin?.name || "",
//           url: data[i].origin?.url || ""
//         },
//         location: {
//           name: data[i].location?.name || "",
//           url: data[i].location?.url || ""
//         },
//         image: data[i]['image'] || "",
//         episode: data[i]['episode'] || [],
//         url: data[i]['url'] || "",
//         created: data[i]['created'] || ""