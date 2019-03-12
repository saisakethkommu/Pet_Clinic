import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTimes, faPlus} from '@fortawesome/free-solid-svg-icons';
import { without, findIndex } from 'lodash';// search for an object and return the array of  object withtheout the object being searched for

library.add(faTimes, faPlus);

@Component({
  selector: 'app-root',
   templateUrl: './app.component.html'
  // template:'<h1>Wisdom Pet Application</h1>',
  //template:'<h1>{{title}}</h1>',
      // template:`
      // <h1>{{title}}</h1>,
      // <p>{{description}}</p>
      // `,
})
export class AppComponent implements OnInit{
  title = 'Pets Clinic';
  
  theList: object[];
  modifiedList: object[];
  orderBy: string;
  orderType: string;
  lastIndex : number;

  addApt(theApt: any){//it will recieve the appointment which is an object
    theApt.aptID = this.lastIndex; 
    this.theList.unshift(theApt) ;//unshift is used to push the element into the array 
    this.modifiedList.unshift(theApt);
    this.lastIndex++;
  }

  deleteApt(theApt: object){//it will recieve the appointment which i)s an object
    this.theList = without(this.theList, theApt);//modify the list 
    this.modifiedList = without(this.theList, theApt);
  }  
  updateApt(aptInfo) {
    let aptIndex: number;
    let modifiedIndex: number;

    aptIndex = findIndex(this.theList, {aptId: aptInfo.theApt.aptId});
    modifiedIndex = findIndex(this.modifiedList, {aptId: aptInfo.theApt.aptId});

    this.theList[aptIndex][aptInfo.labelName] = aptInfo.newValue;
    this.modifiedList[modifiedIndex][aptInfo.labelName] = aptInfo.newValue;
  }
  searchApt(theQuery: string){
    this.modifiedList = this.theList.filter(eachItem =>{
      return(
        eachItem['petName'].toLowerCase().includes(theQuery.toLowerCase()) ||
        eachItem['petName'].toLowerCase().includes(theQuery.toLowerCase()) ||  
        eachItem['petName'].toLowerCase().includes(theQuery.toLowerCase()) 
      );
    });
  }

  sortItems(){
   
      let order: number;

      if(this.orderType == 'asc'){
        order = 1; 
      }
      else{
        order = -1;
      }

      this.modifiedList.sort((a,b) => {
      if(a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase()){return 1 * order;}
          
      if(a[this.orderBy].toLowerCase() < b[this.orderBy].toLowerCase() ){return -1 * order; }  
           
    });
  }

  orderApt(orderObj: any){
    this.orderBy = orderObj.orderBy;
    this.orderType = orderObj.orderType;
    this.sortItems();
  }

  
  constructor(private http: HttpClient) {
      this.orderBy = 'petName';// you can sort the list according to your convinience by changing the orderby type and replace wit different form element ID 
      this.orderType = 'asc';// change the same for desc

   }

  ngOnInit(): void  {
    this.lastIndex = 0;
    this.http.get<Object[]>('../assets/data.json').subscribe(data => {
      
     // console.log(data)
     this.theList = data.map((item: any ) => {
       item.aptID = this.lastIndex ++;
       return item;
     });
     this.modifiedList = data;
     this.sortItems();
    } );
      
  }
}
