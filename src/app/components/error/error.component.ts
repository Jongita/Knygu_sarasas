import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
 @Input()
 message:String="";

 @Output()
 close=new EventEmitter();

// Kad pats po tam tikro laiko bandytu parsiust sarasa
//  constructor(){
//   setTimeout(()=>{
//     this.close.emit();
//   },5000);
//  }


 public closeClick(){
   this.close.emit();
 }

}

