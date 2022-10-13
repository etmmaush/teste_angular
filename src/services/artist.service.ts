import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ArtistService {

  constructor(private http: HttpClient) { }

  searchArtist(name: string, page: number){
      return this.http.get<[]>(`${environment.apiUrl}?method=artist.search&artist=${name}&api_key=${environment.apiKey}&format=json&limit=10&page=${page}`);
  }

}
