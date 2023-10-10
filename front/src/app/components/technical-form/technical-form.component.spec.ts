import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalFormComponent } from './technical-form.component';

describe('TechnicalFormComponent', () => {
  let component: TechnicalFormComponent;
  let fixture: ComponentFixture<TechnicalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalFormComponent]
    });
    fixture = TestBed.createComponent(TechnicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
