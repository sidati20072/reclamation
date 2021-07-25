import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReclamationDocsComponent } from './add-reclamation-docs.component';

describe('AddReclamationDocsComponent', () => {
  let component: AddReclamationDocsComponent;
  let fixture: ComponentFixture<AddReclamationDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReclamationDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReclamationDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
