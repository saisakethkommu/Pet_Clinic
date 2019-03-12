import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {


@Input() orderBy;// one way data flow
@Input() orderType;// one way data flow
@Output() queryEvt = new EventEmitter<string>();
@Output() orderEvt = new EventEmitter<string>();

  
  handleQuery(query: string){
    this.queryEvt.emit(query);// emit this event when someone typesi nteh search box
  }

  handleSort(orderItems){
    this.orderBy = orderItems.orderBy;
    this.orderType = orderItems.orderType;
    this.orderEvt.emit(orderItems);
  }
  constructor() { }

  ngOnInit() {
  }

}
