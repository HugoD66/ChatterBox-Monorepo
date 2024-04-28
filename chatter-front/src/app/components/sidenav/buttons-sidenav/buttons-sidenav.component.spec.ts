import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsSidenavComponent } from './buttons-sidenav.component';

describe('ButtonsSidenavComponent', () => {
  let component: ButtonsSidenavComponent;
  let fixture: ComponentFixture<ButtonsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
