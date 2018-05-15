import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'left-nav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent {
   @Input() public nodeName;

  constructor(private router: Router) {}
  home() {
  	this.router.navigate(['/']);
  }
}
