import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
    categoryForm: FormGroup;
    category: Category;
    file:any;
    action:any;
    link:string;
    categoryImageUrl: string | ArrayBuffer;

    constructor(public matDialogRef: MatDialogRef<AddCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder) {
            this.category = new Category({});
            this.file=0;
            this.categoryForm = this.createContactForm();
            this.action = _data.action;
            this.link=_data.subCat.image.link;
        this.categoryForm = this._formBuilder.group({
            name: this._formBuilder.control(_data.subCat.name, Validators.required),
            description: this._formBuilder.control(_data.subCat.description, Validators.required)
        })
         }

  ngOnInit() {
  }
  createContactForm(): FormGroup {
    return this._formBuilder.group({
        id      : [this.category.id],
        name    : [this.category.name],
        description: [this.category.description],
        image: [this.category.image],
    });
    }
    selectFile1(event){
        this.file=event.target.files[0];
        var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); 
            reader.onload = (_event) => { 
            this.categoryImageUrl = reader.result; 
            }
    }

}
