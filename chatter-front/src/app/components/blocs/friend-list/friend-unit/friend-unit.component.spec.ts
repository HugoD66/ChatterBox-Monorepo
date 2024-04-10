import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendUnitComponent } from './friend-unit.component';

describe('FriendUnitComponent', () => {
  let component: FriendUnitComponent;
  let fixture: ComponentFixture<FriendUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
