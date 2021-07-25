import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoitierComponent } from './boitier.component';

describe('BoitierComponent', () => {
  let component: BoitierComponent;
  let fixture: ComponentFixture<BoitierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoitierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoitierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
