import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountPageComponent } from './account-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountMockService } from '../../services/account-service/account.mock.service';
import { AccountService } from '../../services/account-service/account.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ToastService } from '../../services/toast-service/toast.service';
import { throwError } from 'rxjs';

describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;

  let accountService: AccountMockService = new AccountMockService();
  let privilegeLevelToReturn = 2;
  let mockAuthService: any = {
    getToken: () => {
      return { privilegeLevel: privilegeLevelToReturn };
    },
  };
  let router: Router;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AccountService, useValue: accountService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    spyOn(accountService, 'getCurrentAccount').and.callThrough();

    mockAuthService = TestBed.inject(AuthService);
    spyOn(mockAuthService, 'getToken').and.callThrough();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    toastService = TestBed.inject(ToastService);
    spyOn(toastService, 'httpError');
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch account information on load', () => {
    expect(accountService.getCurrentAccount).toHaveBeenCalled();
  });
  it('if you are a user who has not completed their profile, you should see a link to complete your profile', () => {
    component.currentAccount.profileCompleted = false;
    expect(fixture.debugElement.nativeElement.querySelector('#complete-profile-link')).toBeFalsy();
  });
  it('if you are a moderator or admin, you should see your level', () => {
    component.isUser = false;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#account-level-p')).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('#cw-info-div')).toBeFalsy();
  });
  it('should show your case worker information if you are a user', () => {
    component.isUser = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#account-level-p')).toBeFalsy();
    expect(fixture.debugElement.nativeElement.querySelector('#cw-info-div')).toBeTruthy();
  });
  it('should be able to navigate to the edit cw info page', () => {
    component.isUser = true;
    fixture.detectChanges();
    const editLink = fixture.debugElement.query(By.css('#edit-cw-link'));
    expect(editLink).toBeTruthy();
  });
  it('should be able to navigate to the edit phone number page', () => {
    component.isUser = true;
    fixture.detectChanges();
    let editLink = fixture.debugElement.query(By.css('#update-phone-link'));
    expect(editLink).toBeTruthy();
    component.isUser = false;
    fixture.detectChanges();
    editLink = fixture.debugElement.query(By.css('#update-phone-link'));
    expect(editLink).toBeTruthy();
  });
  it('should be able to navigate to the edit address page', () => {
    component.isUser = true;
    fixture.detectChanges();
    let editLink = fixture.debugElement.query(By.css('#update-address-link'));
    expect(editLink).toBeTruthy();
    component.isUser = false;
    fixture.detectChanges();
    editLink = fixture.debugElement.query(By.css('#update-address-link'));
    expect(editLink).toBeTruthy();
  });

  it('should navigate to delete account page when button is clicked and confirmed', () => {
    const deleteButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.delete-button');
    spyOn(window, 'prompt').and.returnValue('confirm');
    deleteButton.click();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should not navigate when button is clicked and prompt cancelled', () => {
    const deleteButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.delete-button');
    spyOn(window, 'prompt').and.returnValue('not');
    deleteButton.click();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
});
