import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface Character {
  name: string;
  image: string;
}

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  episodes: Episode[] = [];
  characterDetails: Character[] = [];
  isModalVisible = false;

  constructor(private api: ServiceService) {}

  ngOnInit(): void { 
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.api.getEpisodes().subscribe(data => {
      console.log("API epi: ", data);
      this.convertData(data.results);
      console.log("Converted epi: ", this.episodes);
    });
  }

  convertData(data: any[]): void {
    let _data: Episode[] = [];
    for (let i = 0; i < data.length; i++) {
      _data.push({
        id: data[i].id || 0,
        name: data[i].name || "",
        air_date: data[i].air_date || "",
        episode: data[i].episode || "",
        characters: data[i].characters || [],
      });
    }
    this.episodes = _data;
  }

  showCharacterDetails(episode: Episode): void {
    this.characterDetails = [];
    episode.characters.forEach(url => {
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
