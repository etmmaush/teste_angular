export class Artist {
    name: string;
    listeners: string;
    mbid: string;
    url: string;
    image: string;
    
    constructor(name: string, listeners: string, mbid: string, url: string, image: string){
        this.name = name;
        this.listeners = listeners;
        this.mbid = mbid;
        this.url = url;
        this.image = image
    }
}
