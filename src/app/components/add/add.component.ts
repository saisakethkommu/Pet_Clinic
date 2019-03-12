
import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  showForm: boolean;

  @Output() addEvt = new EventEmitter();

  toggleAptDisplay() {
    this.showForm = !this.showForm;
  }

  toggleIcon(){
    
  }  
  handleAdd(formInfo: any) {
     // any is for nay type vaiable
  // tempItem is used to compbine two tyeps of attributes required for appointment petname,owner,etc
    const tempItem: object = {
      petName: formInfo.petName,
      ownerName: formInfo.ownerName,
      aptDate: formInfo.aptDate + ' ' + formInfo.aptTime,
      aptNotes: formInfo.aptNotes
    };
     //the above object needs to be sent as event 
     //below code is to take the information from one sub componenet to its parent component
    this.addEvt.emit(tempItem);// braodcasr the event
    this.showForm = !this.showForm;// toggle the information after submiting the form
  }

  constructor() {
    this.showForm = true;// show form is a variable
  }

  ngOnInit() {}
}
