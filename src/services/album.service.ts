import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {

  constructor(private http: HttpClient) { }

  searchAlbum(name: string, page: number){
      return this.http.get<[]>(`${environment.apiUrl}?method=album.search&album=${name}&api_key=${environment.apiKey}&format=json&limit=10&page=${page}`);
  }

}
