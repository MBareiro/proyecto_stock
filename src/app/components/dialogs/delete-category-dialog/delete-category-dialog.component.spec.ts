import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoryDialogComponent } from './delete-category-dialog.component';

describe('DeleteCategoryDialogComponent', () => {
  let component: DeleteCategoryDialogComponent;
  let fixture: ComponentFixture<DeleteCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
