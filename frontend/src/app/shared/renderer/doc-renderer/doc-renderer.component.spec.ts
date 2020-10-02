import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRendererComponent } from './doc-renderer.component';

describe('DocRendererComponent', () => {
  let component: DocRendererComponent;
  let fixture: ComponentFixture<DocRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
