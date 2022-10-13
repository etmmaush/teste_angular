import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { AlbumSearchComponent } from './album-search/album-search.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
        { path: 'artist', component: ArtistSearchComponent },
        { path: 'album', component: AlbumSearchComponent },
        { path: 'history', component: HistoryComponent },
    ]
 },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
