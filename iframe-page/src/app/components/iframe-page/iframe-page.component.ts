import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-iframe-page',
  templateUrl: './iframe-page.component.html',
  styleUrls: ['./iframe-page.component.scss']
})
export class IframePageComponent implements OnDestroy {

  messageForSend = new FormControl();

  messages: Array<string> = [];

  stopListening: Function;

  constructor(private renderer: Renderer2) {
    this.stopListening =
      renderer.listen('window', 'message', this.handleMessage.bind(this));
  }

  handleMessage(event: MessageEvent) {
    console.log('ПРИШЛО:', event.data);
    this.messages.push(event.data);
  }

  ngOnDestroy() {
    this.stopListening();
  }

  onSend(): void {
    console.log(this.messageForSend.value);
    parent.postMessage(this.messageForSend.value, '*'/* location.origin */);
  }
}
