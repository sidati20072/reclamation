import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoitierComponent } from './add-boitier.component';

describe('AddBoitierComponent', () => {
  let component: AddBoitierComponent;
  let fixture: ComponentFixture<AddBoitierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoitierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoitierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
