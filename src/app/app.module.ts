import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { AlbumSearchComponent } from './album-search/album-search.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ArtistSearchComponent,
    AlbumSearchComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
