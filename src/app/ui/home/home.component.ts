import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuAction } from '../left-menu/left-menu.component';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public userFullName: string;
  public userId: number;
  public showSettings: boolean = false; //para mostrar la rueda del menú plataforma
  public env: any = environment;
  public isAuthenticatedSubscription: Subscription;
  public menuActions: MenuAction[] = []; º
  public menuMode: 'side' | 'over' | 'push' = 'side';
  public initialAction: number;
  public avatar: string;

  @ViewChild(MatSidenav, { static: true })
  public sidemenu: MatSidenav;

  constructor(private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  
    this.prepareMenuActions();
  }

  ngOnDestroy() {

  }


  goToHome() {
    this.router.navigateByUrl("/");
  }

  toggleShowLeftMenu() {
    this.sidemenu.toggle();
  }

  isMobile() {
    return window.matchMedia(`(max-width: 800px)`).matches;
  }

  prepareMenuActions() {
    this.initialAction = 0; 

    this.menuActions = [
      { icon: "home-alt", label: 'Home', link: ['/'], show: true },
      {
        label: 'Hashes', show: true, items: [
          { label: 'MD5', link: [`/hash/md5`], show: true },
          { label: 'SHA-1', link: [`/hash/sha1`], show: true },
          { label: 'SHA-256', link: [`/hash/sha256`], show: true },
          { label: 'SHA-384', link: [`/hash/sha384`], show: true },
          { label: 'SHA-512', link: [`/hash/sha512`], show: true },
        ],
      },
      {
        label: 'Encode/Decode', show: true, items: [
          { label: 'Encode Base64', link: [`/base64/encode`], show: true },
          { label: 'Decode Base64', link: [`/base64/decode`], show: true },
        ],
      },
      {
        label: 'Random', show: true, items: [
          { label: 'Integer', link: [`/random/int`], show: true },
          { label: 'Decimal', link: [`/random/decimal`], show: true },
          { label: 'Names', link: [`/random-names`], show: true },
        ],
      }
    ];
  }

}