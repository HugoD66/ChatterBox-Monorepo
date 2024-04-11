import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMessageUnitComponent } from './last-message-unit.component';

describe('LastMessageUnitComponent', () => {
  let component: LastMessageUnitComponent;
  let fixture: ComponentFixture<LastMessageUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastMessageUnitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LastMessageUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
