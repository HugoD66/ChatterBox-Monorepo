import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSettingsFriendComponent } from './dialog-settings-friend.component';

describe('DialogSettingsFriendComponent', () => {
  let component: DialogSettingsFriendComponent;
  let fixture: ComponentFixture<DialogSettingsFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSettingsFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSettingsFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
