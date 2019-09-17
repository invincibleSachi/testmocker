import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMockComponent } from './edit-mock.component';

describe('EditMockComponent', () => {
  let component: EditMockComponent;
  let fixture: ComponentFixture<EditMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
