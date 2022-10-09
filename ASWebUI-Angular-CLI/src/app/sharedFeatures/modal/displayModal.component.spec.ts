import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayModalModalComponent } from './displayModal.component';

describe('ModalComponent', () => {
  let component: DisplayModalModalComponent;
  let fixture: ComponentFixture<DisplayModalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayModalModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayModalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
