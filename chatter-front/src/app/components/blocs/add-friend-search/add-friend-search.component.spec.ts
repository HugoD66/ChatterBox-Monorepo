import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendSearchComponent } from './add-friend-search.component';

describe('AddFriendSearchComponent', () => {
  let component: AddFriendSearchComponent;
  let fixture: ComponentFixture<AddFriendSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFriendSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFriendSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
