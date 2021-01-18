import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductFlowSecondStepComponent } from './create-product-flow-second-step.component';

describe('CreateProductFlowSecondStepComponent', () => {
  let component: CreateProductFlowSecondStepComponent;
  let fixture: ComponentFixture<CreateProductFlowSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductFlowSecondStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductFlowSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
