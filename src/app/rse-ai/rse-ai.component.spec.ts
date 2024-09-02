import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RseAIComponent } from './rse-ai.component';

describe('RseAIComponent', () => {
  let component: RseAIComponent;
  let fixture: ComponentFixture<RseAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RseAIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RseAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
