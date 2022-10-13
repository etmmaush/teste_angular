import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlbumService } from '../../services/album.service'
import { Album } from './album';

import { faSearch, faShareSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.scss']
})

export class AlbumSearchComponent implements OnInit {

  faSearch = faSearch;
  faShareSquare = faShareSquare;

  albums: Album[] = [];
  searchName: string = '';
  page = 1;
  imgLoaded = false;
    
  search: string = '';
    
  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
   ) { }

  async ngOnInit(): Promise<void>{
    this.route.queryParams
     .subscribe(async params => {
        if (params['search']){
            if (params['search'].length > 0){
                this.searchName = params['search'];
                this.albums = await this.pesquisaAlbum(params['search'], this.page);     
            }
        }
    });
  }

  searchForm = this.formBuilder.group({
    name:''
  });

   async pesquisaAlbum(name: string, page: number): Promise<Album[]>{
    return new Promise((resolve,reject) => {
      this.albumService.searchAlbum(name, page).subscribe((data: any) => {
        let tempAlbums = data.results.albummatches.album;

        tempAlbums.forEach((artist: any) => {
            artist.image = Object.values(artist.image[2])[0];
        })  

        resolve(data.results.albummatches.album);
        return tempAlbums;   
        }, (error: any) => {
        reject(error);
      });
    });
  }

  async onSubmit() {

    let form: any = this.searchForm.value;
    if (form.name.length > 0){
        let history = {
            "categoryName": 'Álbum',
            "category": 'album',
            "name": form.name 
        }

        let historyArr = [];
        historyArr = JSON.parse(localStorage.getItem('historyArr') || '[]');
        historyArr.push(history);
        localStorage.setItem('historyArr', JSON.stringify(historyArr));

        this.imgLoaded = false;
        this.page = 1;

        this.searchName = form.name;
        this.albums = await this.pesquisaAlbum(this.searchName, this.page);
        console.log(this.albums)
    }

  }

  async onScroll() {
    let tempAlbums = await this.pesquisaAlbum(this.searchName, this.page++);
    this.albums.push(...tempAlbums); 
  }

}
