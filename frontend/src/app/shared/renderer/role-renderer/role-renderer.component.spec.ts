import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRendererComponent } from './role-renderer.component';

describe('RoleRendererComponent', () => {
  let component: RoleRendererComponent;
  let fixture: ComponentFixture<RoleRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
