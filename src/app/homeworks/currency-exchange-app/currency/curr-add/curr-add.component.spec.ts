import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrAddComponent } from './curr-add.component';

describe('CurrAddComponent', () => {
  let component: CurrAddComponent;
  let fixture: ComponentFixture<CurrAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
