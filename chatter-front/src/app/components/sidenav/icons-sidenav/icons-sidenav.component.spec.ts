import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsSidenavComponent } from './icons-sidenav.component';

describe('IconsSidenavComponent', () => {
  let component: IconsSidenavComponent;
  let fixture: ComponentFixture<IconsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
