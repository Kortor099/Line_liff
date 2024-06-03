import { Component } from '@angular/core';
import { ServiceService } from '../service.service';



export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: any;
  location: any;
  image: string;
  episode: string[];
  url: string;
  created: string;
}



@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  locations: Location[] = [];
  characterDetails: Character[] = [];
  isModalVisible = false;

  constructor(private api: ServiceService) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.api.getLocations().subscribe(data => {
      console.log("API lo: ", data);
      this.convertData(data.results);
      console.log("Converted lo: ", this.locations);
    });
  }

  convertData(data: any[]): void {
    let _data: Location[] = [];
    for (let i = 0; i < data.length; i++) {
      _data.push({
        id: data[i].id || 0,
        name: data[i].name || "",
        type: data[i].type || "",
        dimension: data[i].dimension || "",
        residents: data[i].residents || [],
        url: data[i].url || "",
        created: data[i].created || ""
      });
    }
    this.locations = _data;
  }

  showCharacterDetails(locations: Location): void {
    this.characterDetails = [];
    locations.residents.forEach(url => {
      const id = url.split('/').pop();
      if (id) {
        this.api.getCharacter(id).subscribe(data => {
          this.characterDetails.push(data);
        });
      }
      console.log('cha epi', this.characterDetails);
    });

    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
