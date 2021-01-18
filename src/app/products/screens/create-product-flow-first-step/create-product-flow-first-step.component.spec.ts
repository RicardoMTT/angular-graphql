import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductFlowFirstStepComponent } from './create-product-flow-first-step.component';

describe('CreateProductFlowFirstStepComponent', () => {
  let component: CreateProductFlowFirstStepComponent;
  let fixture: ComponentFixture<CreateProductFlowFirstStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductFlowFirstStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductFlowFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
