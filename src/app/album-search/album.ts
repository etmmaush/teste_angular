export class Album {
    name: string;
    artist: string;
    url: string;
    image: string;
    
    constructor(name: string, artist: string, url: string, image: string){
        this.name = name;
        this.artist = artist;
        this.url = url;
        this.image = image;
    }
}
