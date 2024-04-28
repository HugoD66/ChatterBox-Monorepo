import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSidenavComponent } from './contact-sidenav.component';

describe('ContactSidenavComponent', () => {
  let component: ContactSidenavComponent;
  let fixture: ComponentFixture<ContactSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
