import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonClientComponent } from './common-client.component';

describe('CommonClientComponent', () => {
  let component: CommonClientComponent;
  let fixture: ComponentFixture<CommonClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
