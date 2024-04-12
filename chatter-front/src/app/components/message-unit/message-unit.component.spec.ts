import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageUnitComponent } from './message-unit.component';

describe('MessageUnitComponent', () => {
  let component: MessageUnitComponent;
  let fixture: ComponentFixture<MessageUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
