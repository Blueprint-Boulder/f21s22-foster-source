import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistTableComponent } from './blacklist-table.component';
import { HttpClientModule } from '@angular/common/http';
import { BlacklistService } from '../../services/blacklist-service/blacklist.service';
import { BlacklistMockService } from '../../services/blacklist-service/blacklist.mock.service';

describe('BlacklistTableComponent', () => {
  let component: BlacklistTableComponent;
  let fixture: ComponentFixture<BlacklistTableComponent>;

  let blacklistService: BlacklistService = new BlacklistMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlacklistTableComponent],
      imports: [HttpClientModule],
      providers: [{ provide: BlacklistService, useValue: blacklistService }],
    }).compileComponents();
    blacklistService = TestBed.inject(BlacklistService);
    spyOn(blacklistService, 'getBlacklistedUsers').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a list of blacklisted users', () => {
    expect(blacklistService.getBlacklistedUsers).toHaveBeenCalled();
    expect(component.blacklist.length).toBeGreaterThan(0);
  });
  it('should not unban a user if unban button is clicked and prompt is cancelled', () => {
    const firstButton = fixture.debugElement.nativeElement.querySelector('.remove-button');
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(blacklistService, 'deleteFromBlacklist').and.callThrough();
    const initialLength = component.blacklist.length;
    firstButton.click();
    expect(blacklistService.deleteFromBlacklist).toHaveBeenCalledTimes(0);
    expect(component.blacklist.length).toEqual(initialLength);
  });
  it('should unban and remove from list if unban button clicked and prompt confirmed', () => {
    const firstButton = fixture.debugElement.nativeElement.querySelector('.remove-button');
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(blacklistService, 'deleteFromBlacklist').and.callThrough();
    const initialLength = component.blacklist.length;
    firstButton.click();
    expect(blacklistService.deleteFromBlacklist).toHaveBeenCalled();
    expect(component.blacklist.length).toEqual(initialLength - 1);
  });
});
