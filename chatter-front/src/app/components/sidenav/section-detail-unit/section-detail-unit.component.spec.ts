import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDetailUnitComponent } from './section-detail-unit.component';

describe('SectionDetailUnitComponent', () => {
  let component: SectionDetailUnitComponent;
  let fixture: ComponentFixture<SectionDetailUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDetailUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionDetailUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
