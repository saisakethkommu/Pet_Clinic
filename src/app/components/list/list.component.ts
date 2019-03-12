import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
@Input() aptList;
@Output() deleteEvt = new EventEmitter(); 
@Output() updateEvt = new EventEmitter();//creating the emmiter for the event which would broadcast the vent on the user action and captured in the parent module
handleDelete(theApt: object){
  //console.log(theApt);
  this.deleteEvt.emit(theApt);//trigger the event 
}
handleUpdate(theApt: object, labelName: string, newValue: string) {
  this.updateEvt.emit({
    theApt: theApt,
    labelName: labelName,
    newValue: newValue
  });
}
}
