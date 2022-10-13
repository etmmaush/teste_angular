import { Artist } from './artist';

export class ArtistList {
    artistmatches: {
        artist: Artist[]
    };
    opensearch:itemsPerPage: number;
    opensearch:startIndex: number;
    opensearch:totalResults: number;
    opensearch:Query: {
        searchTerms: string,
        startPage: number
    }
    
    
    constructor(artistmatches: {artist: Artist[]}, opensearch:itemsPerPage: number, opensearch:startIndex: number, opensearch:totalResults, opensearch:Query: {searchTerms: string, startPage: number}){
        this.artistmatches = artistmatches;
        this.opensearch:itemsPerPage = opensearch:itemsPerPage;
        this.opensearch:startIndex = opensearch:startIndex;
        this.opensearch:totalResults = opensearch:totalResults;
        this.opensearch:Query = opensearch:Query;
    }
}
