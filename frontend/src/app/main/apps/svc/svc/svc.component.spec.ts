import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcComponent } from './svc.component';

describe('SvcComponent', () => {
  let component: SvcComponent;
  let fixture: ComponentFixture<SvcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
