import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQouteDialogComponent } from './create-qoute-dialog.component';

describe('CreateQouteDialogComponent', () => {
  let component: CreateQouteDialogComponent;
  let fixture: ComponentFixture<CreateQouteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQouteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQouteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
