import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoveFriendComponent } from './dialog-remove-friend.component';

describe('DialogRemoveFriendComponent', () => {
  let component: DialogRemoveFriendComponent;
  let fixture: ComponentFixture<DialogRemoveFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRemoveFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRemoveFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
