import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserActionTableComponent } from './user-action-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from '../../services/account-service/account.service';
import { AccountMockService } from '../../services/account-service/account.mock.service';
import { accounts } from '../../mock/database-entities';
import { of } from 'rxjs';

describe('UserActionTableComponent', () => {
  let component: UserActionTableComponent;
  let fixture: ComponentFixture<UserActionTableComponent>;

  let accountService: AccountService = new AccountMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserActionTableComponent],
      imports: [HttpClientModule, ReactiveFormsModule, NgbCollapseModule, BrowserAnimationsModule],
      providers: [{ provide: AccountService, useValue: accountService }],
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    spyOn(accountService, 'getApplicants').and.returnValue(of({ accounts: accounts }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a list of applicants on page load', () => {
    expect(accountService.getApplicants).toHaveBeenCalled();
  });
  it('should convert each fetched account into a row in the table', () => {
    expect(component.users.length).toEqual(accounts.length);
    expect(fixture.debugElement.nativeElement.querySelectorAll('.user-result-row').length).toEqual(accounts.length);
  });
  it('approving user should call backend and remove applicant from list', () => {
    const firstRowButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.approve-button');
    spyOn(accountService, 'approveApplicant').and.callThrough();
    const initialLength = component.users.length;
    firstRowButton.click();
    expect(accountService.approveApplicant).toHaveBeenCalled();
    expect(component.users.length).toEqual(initialLength - 1);
  });
  it('clicking deny should expand the deny details', () => {
    expect(component.users[0].isCollapsed).toBeTrue();
    const firstRowButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.deny-button');
    firstRowButton.click();
    expect(component.users[0].isCollapsed).toBeFalse();
  });
  it('should not be able to deny without reason', () => {
    spyOn(accountService, 'denyApplicant').and.callThrough();
    const firstRowButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.submit-deny');
    firstRowButton.click();
    expect(accountService.denyApplicant).toHaveBeenCalledTimes(0);
  });
  it('cancelling deny should recollapse', () => {
    expect(component.users[0].isCollapsed).toBeTrue();
    const firstRowButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.deny-button');
    firstRowButton.click();
    expect(component.users[0].isCollapsed).toBeFalse();
    const firstRowCancel: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.cancel-button');
    firstRowCancel.click();
    expect(component.users[0].isCollapsed).toBeTrue();
  })
  it('when deny form valid, should be able to submit, call backend, remove applicant', () => {
    spyOn(accountService, 'denyApplicant').and.callThrough();
    const firstRowSubmitButton = fixture.debugElement.nativeElement.querySelector('.submit-deny');
    component.users[0].denyForm.get('reason0')?.setValue('test reason');
    expect(component.users[0].denyForm.invalid).toBeFalse();
    const initialLength = component.users.length;
    firstRowSubmitButton.click();
    expect(accountService.denyApplicant).toHaveBeenCalled();
    expect(component.users.length).toEqual(initialLength - 1);
  });
});
