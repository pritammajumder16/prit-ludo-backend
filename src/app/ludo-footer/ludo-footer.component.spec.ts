import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LudoFooterComponent } from './ludo-footer.component';

describe('LudoFooterComponent', () => {
  let component: LudoFooterComponent;
  let fixture: ComponentFixture<LudoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LudoFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LudoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
