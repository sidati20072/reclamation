import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectCategoryComponent} from '../select-category/select-category.component';
import {UserModel} from '../../../../models/UserModel';
import {ItemService} from '../../../../Services/item.service';
import {ItemModel} from '../../../../models/ItemModel';
import {MediaService} from '../../../../Services/media.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  imgsURL: any[] = [];
  selectedFiles: any[] = [];
  users: UserModel[];
  selectedCategory;
  item: ItemModel;
  btnTitle = 'AJOUTER';
  title = 'Ajouter';
  showSpinner: boolean;
  constructor(public matDialogRef: MatDialogRef<AddItemComponent>, private itemService: ItemService,
              @Inject(MAT_DIALOG_DATA) private data: any, public dialog: MatDialog,
              private formBuilder: FormBuilder, private mediaService: MediaService) {}

  ngOnInit() {
    this.users = this.data.users;
    if (this.data.item) {
      this.item = this.data.item;
    }
    this.buildForm();
  }

  buildForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      reduction: [],
      promo: [false],
      categoryId: [, Validators.required],
      userId: [, Validators.required]
    });

    if (this.item) {
      this.title = 'Modifier';
      this.btnTitle = 'MODIFIER';
      this.itemForm.patchValue({
        name: this.item.name,
        description: this.item.description,
        price: this.item.price,
        reduction: this.item.reduction,
        promo: this.item.promo,
        categoryId: this.item.category.name,
        userId: this.item.resto.id
      });
      this.selectedCategory = this.item.category;
    }
  }

  get promo() {
    return this.itemForm.get('promo');
  }

  get userId() {
    return this.itemForm.get('userId');
  }

  get categoryId() {
    return this.itemForm.get('categoryId');
  }

  selectFiles(event) {
    for (const file of event.target.files) {
      this.selectedFiles.push(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgsURL.push(reader.result);
      };
    }
  }

  showSelectCategory() {
    const dialogRef = this.dialog.open(SelectCategoryComponent, {
      panelClass: 'item-dialog',
      data: {userId: this.userId.value, selectedCategory: this.selectedCategory}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedCategory = result.selectedCategory;
        this.categoryId.setValue(result.selectedCategory.name);
      }
    });
  }

  removeFile(i: number) {
    this.selectedFiles.splice(i, 1);
    this.imgsURL.splice(i, 1);
  }

  postItem() {

    if (!this.itemForm.valid) {
      return;
    }

    const item = new ItemModel();
    if (this.item) {
      item.id = this.item.id;
    }
    item.name = this.itemForm.get('name').value;
    item.description = this.itemForm.get('description').value;
    item.price = this.itemForm.get('price').value;
    item.promo = this.itemForm.get('promo').value;
    item.reduction = this.itemForm.get('reduction').value;
    item.categoryId = this.selectedCategory.id;
    item.restoId = this.itemForm.get('userId').value;

    this.showSpinner = true;
    this.itemService.createItem(item, this.selectedFiles)
        .pipe(finalize(() => this.showSpinner = false))
        .subscribe(
        value => {
          this.matDialogRef.close({refresh: true});
        },
        error1 => {

        }
    );
  }

  deleteFile(id: string) {
    this.showSpinner = true;
    this.mediaService.deleteMedia(id)
        .pipe(finalize(() => this.showSpinner = false))
        .subscribe(
        () => {
          this.item.medias.splice(this.item.medias.findIndex(media => media.id === id), 1);
        },
        () => {
        }
    );
  }
}
