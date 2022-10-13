import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ArtistService } from '../../services/artist.service'
import { Artist } from './artist';

import { faSearch, faShareSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.scss']
})

export class ArtistSearchComponent implements OnInit {

  faSearch = faSearch;
  faShareSquare = faShareSquare;

  artists: Artist[] = [];
  name: string = '';
  page = 1;
  imgLoaded = false;
    
  search: string = '';
    
  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
   ) { }

  async ngOnInit(){
    this.route.queryParams
     .subscribe(async params => {
        if (params['search']){
            if (params['search'].length > 0){
                this.artists = await this.pesquisaArtista(params['search'], this.page);         
            }
        }
    });
  }

  searchForm = this.formBuilder.group({
    name:''
  });

   async pesquisaArtista(name: string, page: number): Promise<Artist[]>{
    return new Promise((resolve,reject) => {
      this.artistService.searchArtist(name, page).subscribe((data: any) => {
        let tempArtists = data.results.artistmatches.artist;

        tempArtists.forEach((artist: any) =>{
            artist.image = "../../assets/imgs/placeholder_artist.png";
            if(artist.mbid){
            const url = `https://musicbrainz.org/ws/2/artist/${artist.mbid}?inc=url-rels&fmt=json`;
                fetch(url)
                    .then(res => res.json())
                    .then((out) => {
                        const relations = out.relations;
                        for (let i = 0; i < relations.length; i++) {
                            if (relations[i].type === 'image') {
                                let image_url = relations[i].url.resource;
                                if (image_url.startsWith('https://commons.wikimedia.org/wiki/File:')) {
                                    const filename = image_url.substring(image_url.lastIndexOf('/') + 1);
                                    image_url = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + filename;
                                    artist.image = image_url;                             
                                }
                            }
                        }
                    })
                    .catch(err => { throw console.log(err) });
             }
        })
        resolve(data.results.artistmatches.artist);
        return tempArtists;   
        }, (error: any) => {
        reject(error);
      });
    });
  }

  async onSubmit() {
    let form: any = this.searchForm.value;
    if (form.name.length > 0){

        let history = {
            "categoryName": 'Artísta',
            "category": 'artist',
            "name": form.name 
        }

        let historyArr = [];
        historyArr = JSON.parse(localStorage.getItem('historyArr') || '[]');       
        historyArr.push(history);
        localStorage.setItem('historyArr', JSON.stringify(historyArr));

        this.imgLoaded = false;
        this.page = 1;

        this.artists = await this.pesquisaArtista(form.name, this.page);
    }

  }

  async onScroll() {
    let form: any = this.searchForm.value;
       
    let tempArtists = await this.pesquisaArtista(form.name, this.page++);
    this.artists.push(...tempArtists); 
  }

}
