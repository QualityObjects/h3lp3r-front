import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


export class MenuAction {
  icon?: string;
  label?: string;
  link?: string[];
  show: boolean = true;
  items?: MenuAction[];

  constructor(data: Partial<MenuAction>) {
    Object.assign(this, data);
  }
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', 'overflow-y': 'hidden', display: 'none', opacity: 0})),
      state('expanded', style({height: '*', display: 'block', opacity: 1})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
    trigger('iconExpansion', [
      state('collapsed', style({transform: 'rotate(180deg)'})),
      state('expanded', style({transform: 'rotate(0deg)'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ]  
})
export class LeftMenuComponent implements OnInit {
  public currentMenu? : string | null = null;  // para saber qué página se está mostrando
  public collapsedMenus : any = {}; //menú seleccionado
  @Input('initialAction') public initialAction? : number;
  @Input('actions') public actions? : MenuAction[];
  @Input('sidemenu') public sidemenu? : MatSidenav;


  constructor(private location: Location, 
              private router: Router) {    
  }

  ngOnDestroy(){
  }
  
  ngOnInit() {
    this.initSelectedMenuActionFromUrl();
    if (this.actions && this.currentMenu == null && this.initialAction != null) {
      this.currentMenu = this.actions[this.initialAction]?.link![0];
    }
  }
  
  private findActionByUrl(path: string, actions: MenuAction[]) : MenuAction | null {
    for(let action of actions) {
      if (action.link && action.link[0] === path) {
        return action;
      }
      if (action.items && action.items.length > 0) {
        let act = this.findActionByUrl(path, action.items);
        if (!!act) return act;
      }
    }
    return null;
  }

  private initSelectedMenuActionFromUrl() {
    let current = location.pathname;
    let action = this.findActionByUrl(current, this.actions!);
    if (!!action) {
      this.currentMenu = action.link && action.link[0];
    }
  }
    
  closeIfMobile() : void {
    if (this.isMobile()) {
      this.sidemenu!.close();
    }
  }

  isMobile() : boolean {
    return window.matchMedia(`(max-width: 800px)`).matches;
  }

  setMenu(menuLink:string[]) {
    this.currentMenu = menuLink[0];
    this.closeIfMobile();
  }
 
  toggleMenu(menuIndex: number) {
    this.collapsedMenus[menuIndex] = !this.collapsedMenus[menuIndex];
  }

}
