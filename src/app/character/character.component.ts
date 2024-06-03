import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';



export interface Character {
  // count: number;
  // pages: number;
  // next: string;

  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  searchName: string = '';


  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    // this.service.lineliff();
    this.getCharacters();
  }

  getCharacters(): void {
    this.service.getCharacters().subscribe(data => {
      console.log("API data: ", data);
      this.convertData(data.results);
      console.log("Converted data: ", this.characters);
    });

    // this.service.getCharacters().subscribe(data => {
    //   console.log("API data: ", data);
    //   this.characters.push(data.results);
    //   this.convertData(this.characters);
    //   // console.log("Converted data: ", this.characters);
    // });
  }

  convertData(data: any[]): void {
    let _data: Character[] = [];
    for (let i = 0; i < data.length; i++) {
      _data.push({
        
        id: data[i].id || 0,
        name: data[i].name || "",
        status: data[i].status || "",
        species: data[i].species || "",
        type: data[i].type || "",
        gender: data[i].gender || "",
        origin: {
          name: data[i].origin?.name || "",
          url: data[i].origin?.url || ""
        },
        location: {
          name: data[i].location?.name || "",
          url: data[i].location?.url || ""
        },
        image: data[i].image || "",
        episode: data[i].episode || [],
        url: data[i].url || "",
        created: data[i].created || ""
      });
      // console.log(_data);
    }
    this.characters = _data;
    
  }


  search() {
    this.service.searchCharacters(this.searchName).subscribe((data: any) => {
      this.characters = data.results;
    });
  }
 
}

// name: data[i].name || "",
//         status: data[i].status || "",
//         species: data[i].species || "",
//         type: data[i].type || "",
//         gender: data[i].gender || "",
//         origin: {
//           name: data[i].origin?.name || "",
//           url: data[i].origin?.url || ""
//         },
//         location: {
//           name: data[i].location?.name || "",
//           url: data[i].location?.url || ""
//         },
//         image: data[i].image || "",
//         episode: data[i].episode || [],
//         url: data[i].url || "",
//         created: data[i].created || ""