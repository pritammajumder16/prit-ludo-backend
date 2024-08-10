import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LudoLogicComponent } from './ludo-logic.component';

describe('LudoLogicComponent', () => {
  let component: LudoLogicComponent;
  let fixture: ComponentFixture<LudoLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LudoLogicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LudoLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
