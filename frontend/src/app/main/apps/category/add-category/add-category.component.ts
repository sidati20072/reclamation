import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
    categoryForm: FormGroup;
    category: Category;
    file:any;
    categoryImageUrl: string | ArrayBuffer;


  constructor(public matDialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder) {
        this.category = new Category({});
        this.file=0;
        this.categoryForm = this.createContactForm();
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
        this.file=event.target.files;
        var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); 
            reader.onload = (_event) => { 
            this.categoryImageUrl = reader.result; 
            }
    }


}
