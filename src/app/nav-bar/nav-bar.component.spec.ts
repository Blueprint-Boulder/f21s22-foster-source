import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AccountService } from "../services/account-service/account.service";
import { AccountMockService } from "../services/account-service/account.mock.service";
import { AuthService } from "../services/auth-service/auth.service";
import { Router } from "@angular/router";
import { accounts } from "../mock/database-entities";

describe('NavBarComponent', async () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  let accountService: AccountService = new AccountMockService();
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{provide: AccountService, useValue: accountService}]
    })
    .compileComponents();
    accountService = TestBed.inject(AccountService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('user is logged out', () => {
    it('Should only see home and login', () => {
      const home = fixture.debugElement.nativeElement.querySelector('.home-link');
      const login = fixture.debugElement.nativeElement.querySelector('.login-link');
      expect(home).toBeTruthy();
      expect(login).toBeTruthy();
    })
  });

  describe('user is logged in', async () => {
    it('should call auth service and account service logout on logout', async () => {
      spyOn(authService, 'logout');
      spyOn(accountService, 'logout').and.callThrough();
      spyOn(router, 'navigate');
      component.logout();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(authService.logout).toHaveBeenCalled();
        expect(accountService.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalled();
        const respite = fixture.debugElement.nativeElement.querySelector('.respite-link');
        expect(respite).toBeFalsy();
      });
    })
    describe('as user', async () => {
      it('should not be able to see administration page', async () => {
        component.isMod = false;
        component.currentAccount = accounts[0];
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const admin = fixture.debugElement.nativeElement.querySelector('.admin-link');
          expect(admin).toBeFalsy();
          const profile = fixture.debugElement.nativeElement.querySelector('.profile-link');
          expect(profile).toBeTruthy();
        });
      })
    });
    describe('as at least mod', async () => {
      it('should be able to see administration page and not profile page', async () => {
        component.isMod = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const admin = fixture.debugElement.nativeElement.querySelector('.admin-link');
          expect(admin).toBeTruthy();
          const profile = fixture.debugElement.nativeElement.querySelector('.profile-link');
          expect(profile).toBeFalsy();
        });
      })
    })
    it('should get current account on login event', async () => {
      spyOn(accountService, 'getCurrentAccount').and.callThrough();
      component.loggedIn();
      expect(accountService.getCurrentAccount).toHaveBeenCalled();
    })
  })
});
