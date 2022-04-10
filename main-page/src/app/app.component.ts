import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  iframeURL;

  stopListening: Function;

  messages: Array<string> = [];
  // private isInited = false;

  iframe!: HTMLIFrameElement;

  constructor(
    private domSanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {
    this.iframeURL= this.domSanitizer.bypassSecurityTrustResourceUrl('http://localhost:4201/');

    this.stopListening =
      this.renderer.listen('window', 'message', this.handleMessage.bind(this));
  }

  loadIframe(iframeTagName: HTMLIFrameElement) {
    this.iframe = iframeTagName;
    // if (this.isInited) {

      // this.stopListening =
      // this.renderer.listen('window', 'message', this.handleMessage.bind(this));

      // You can receive response from iframe if any
    //   this.renderer.listen('window', 'message', (event) => {

    //     if (event.origin !== 'http://localhost:4201/') {
    //       return;
    //     }

    //     console.log('ПРИШЛО:', event.data);

    //  });
    // }
  }

  handleMessage(event: MessageEvent) {
    console.log('ПРИШЛО:', event.data);
    this.messages.push(event.data);
  }

  sendMessage(message: string) {
    const iframeWindow = this.iframe.contentWindow;
    if (iframeWindow) {
      iframeWindow.postMessage(message, '*');
    }
  }

  ngOnDestroy() {
    this.stopListening();
  }
}
