import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { LocationComponent } from './location/location.component';
import { EpisodeComponent } from './episode/episode.component';

const routes: Routes = [
  { path: 'character', component: CharacterComponent },
  { path: 'location', component: LocationComponent },
  { path: 'episode', component: EpisodeComponent },
  { path: '', redirectTo: '/character', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
