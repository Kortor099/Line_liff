import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import liff from '@line/liff';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://rickandmortyapi.com/api';
  profile: any;

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character`);
  }
  getEpisodes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode`);
  }
  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/location`);
  }

  getCharacter(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }

  Lifflogin() {
    liff.init({ liffId: '2005367776-kKr8zaDn' }).then(() => {
      // this.os = liff.getOS();
      if (liff.isLoggedIn()) {
        this.getUserProfile();
      }
      else {
        liff.login();
      }
    }).catch(console.error);
  }

  linelogout(): void {
    if (liff.isLoggedIn()) {
      liff.logout();
      liff.closeWindow();
    }
  }

  getUserProfile() {
    return liff.getProfile()
      .then(profile => {
        this.profile = profile;
        return this.profile;
      })
      .catch((err: any) => {
        console.error('Error getting profile', err);
        throw err;
      });
  }

  searchCharacters(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/?name=${name}`);
  }


}
