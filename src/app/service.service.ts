import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import liff from '@line/liff';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://rickandmortyapi.com/api';
  os: ReturnType<typeof liff.getOS>;

  constructor(private http: HttpClient) { }

  
  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character`);
  }


  getEpisodes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode`);
  } getCharacter(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/location`);
  }

  lineliff(): void {
    liff.init({ liffId: '2005367776-kKr8zaDn' }).then(() => {
      // this.os = liff.getOS();
      if (!liff.isLoggedIn()) {
        liff.login()
      }
    }).catch(console.error);
  }

  linelogout(): void {
    liff.logout();
    liff.closeWindow();
  }

  searchCharacters(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/?name=${name}`);
  }


}
