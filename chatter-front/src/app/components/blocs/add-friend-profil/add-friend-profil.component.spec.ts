import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendProfilComponent } from './add-friend-profil.component';

describe('AddFriendProfilComponent', () => {
  let component: AddFriendProfilComponent;
  let fixture: ComponentFixture<AddFriendProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFriendProfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFriendProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
