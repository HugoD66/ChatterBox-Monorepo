import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMessageComponent } from './last-message.component';

describe('LastMessageComponent', () => {
  let component: LastMessageComponent;
  let fixture: ComponentFixture<LastMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LastMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
