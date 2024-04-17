import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRoomProfilComponent } from './group-room-profil.component';

describe('GroupRoomProfilComponent', () => {
  let component: GroupRoomProfilComponent;
  let fixture: ComponentFixture<GroupRoomProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupRoomProfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupRoomProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
