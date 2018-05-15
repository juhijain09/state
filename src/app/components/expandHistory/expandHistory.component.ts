import { Component, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'expand-history',
  templateUrl: './expandHistory.component.html',
  styleUrls: ['./expandHistory.component.css']
})

export class ExpandHistoryComponent implements OnChanges {
   @Input() public expandHistory;
   @Input() public currentNode;

   constructor() {}
   public ngOnChanges() {

       if (this.expandHistory) {
           console.log('from expand:-' , this.expandHistory);
       }

   }
}
