import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserListUnitComponent } from './add-user-list-unit.component';

describe('AddUserListUnitComponent', () => {
  let component: AddUserListUnitComponent;
  let fixture: ComponentFixture<AddUserListUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserListUnitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserListUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
