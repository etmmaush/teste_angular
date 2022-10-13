import { Component, OnInit } from '@angular/core';
import { faTimes, faShareSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  faShareSquare = faShareSquare;
  faTimes = faTimes;
  list: any = [];    

  constructor() { }

  ngOnInit(): void {
    this.list = JSON.parse(localStorage.getItem('historyArr') || '')
    console.log(this.list)
  }
  
  delete(foo: any){
    console.log(this.list.indexOf(foo));
    let index = this.list.indexOf(foo);
    if (index > -1) {
        this.list.splice(index, 1);    
    }
    let newArr = JSON.stringify(this.list);
    localStorage.setItem('historyArr', newArr);
  }

}
