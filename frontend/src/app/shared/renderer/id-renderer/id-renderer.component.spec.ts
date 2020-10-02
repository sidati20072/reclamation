import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdRendererComponent } from './id-renderer.component';

describe('IdRendererComponent', () => {
  let component: IdRendererComponent;
  let fixture: ComponentFixture<IdRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
