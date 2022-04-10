import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  @Output() sendMessage = new EventEmitter();
  @Input() messages: Array<string> = [];

  message = new FormControl('');

  constructor() {}

  onSend(): void {
    console.log(this.message.value);
    this.sendMessage.emit(this.message.value);
  }

}
