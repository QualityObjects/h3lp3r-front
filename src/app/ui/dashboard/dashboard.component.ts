import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  welcomeMessage: string = '';

  constructor(
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit() {

  }


}

