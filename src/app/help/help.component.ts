import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent {
  constructor(private viewportScroller: ViewportScroller) {}

  public scrollTo(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
