import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CategoriesService} from '../../../../Services/categories.service';
import {CategoryModel} from '../../../../models/CategoryModel';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {
  catgeories: CategoryModel[];
  selectedCategory: number;
  constructor(public matDialogRef: MatDialogRef<SelectCategoryComponent>, private categoryService: CategoriesService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.getCategories();
    this.selectedCategory = this.data.selectedCategory ? this.data.selectedCategory.id : null;
  }

  getCategories() {
    this.categoryService.getParentCategories(this.data.userId).subscribe(
        (value: CategoryModel[]) => {
          this.catgeories = value;
        },
        error1 => {

        }
    );
  }

  selectCategory(category: CategoryModel) {
      this.selectedCategory = category.id;
      this.matDialogRef.close({selectedCategory: category});
  }
}
