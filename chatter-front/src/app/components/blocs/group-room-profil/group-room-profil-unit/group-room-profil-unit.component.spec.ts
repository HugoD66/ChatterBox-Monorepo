import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRoomProfilUnitComponent } from './group-room-profil-unit.component';

describe('GroupRoomProfilUnitComponent', () => {
  let component: GroupRoomProfilUnitComponent;
  let fixture: ComponentFixture<GroupRoomProfilUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupRoomProfilUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupRoomProfilUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
