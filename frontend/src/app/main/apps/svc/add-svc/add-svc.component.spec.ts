import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSvcComponent } from './add-svc.component';

describe('AddSvcComponent', () => {
  let component: AddSvcComponent;
  let fixture: ComponentFixture<AddSvcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSvcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
