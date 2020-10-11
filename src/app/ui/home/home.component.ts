import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RootService } from 'src/app/services/root-service';
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

  public remoteIp: Observable<string> = this.rootService.remoteIp();
  @ViewChild(MatSidenav, { static: true })
  public sidemenu: MatSidenav;

  constructor(private router: Router,
    private rootService: RootService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  
    this.prepareMenuActions();
  }

  ngOnDestroy() {

  }

  @HostListener('window:resize', [])
  onResize() {
    this.menuMode = (this.isMobile()) ? 'over' : 'side';
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
      { icon: "home", label: 'Home', link: ['/'], show: true },
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
        label: 'Oracle', show: true, items: [
          { label: 'Ask to the oracle', link: [`/oracle`], show: true },
        ]
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
