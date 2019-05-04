import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AlertService } from '../../../_services/alert';
import { AuthenticationService } from '../../../_services/authentication';
import { UserService} from '../../../_services/user';

import { User } from '../../../_models/user';

import { MenuItems } from '../../../shared/menu-items/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy, OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }

  ngOnInit() {
    // this.loadAllUsers();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authentication/login']);
  }

}
