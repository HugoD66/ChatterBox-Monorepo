import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendProfilComponent } from './friend-profil.component';

describe('FriendProfilComponent', () => {
  let component: FriendProfilComponent;
  let fixture: ComponentFixture<FriendProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendProfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
