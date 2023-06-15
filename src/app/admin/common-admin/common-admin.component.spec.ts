import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAdminComponent } from './common-admin.component';

describe('CommonAdminComponent', () => {
  let component: CommonAdminComponent;
  let fixture: ComponentFixture<CommonAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
