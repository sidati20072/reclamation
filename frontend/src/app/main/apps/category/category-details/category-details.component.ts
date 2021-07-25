import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';
import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import {CategoryService} from 'app/main/apps/category/category.service';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CategoriesService} from '../categories.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EditCategoryComponent} from '../edit-category/edit-category.component';
import {AlertComponent} from '../../contacts/alert/alert.component';

@Component({
    selector: 'category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CategoryDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
    category: any;
    output: JSON;
    obj: any;

    categoryForm: FormGroup;
    categoryImage: File;
    categoryImageUrl: any;

    subCategories: any[];

    currentCategory: string;
    searchTerm: string;
    dialogRef: any;

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
        private categoryService: CategoryService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private categoriesService: CategoriesService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar
    ) {


        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';


        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.categoryService.onCategoryChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(category => {
                this.category = category;
            });

        // Subscribe to sub Category
        this.categoryService.subCatChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.subCategories = categories;
            });

        this.categoryForm = this._formBuilder.group({
            name: this._formBuilder.control(this.category.name, Validators.required),
            description: this._formBuilder.control(this.category.description, Validators.required)
        });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    newCategory() {
        this.dialogRef = this._matDialog.open(AddCategoryComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                const name = response[1].value.name;
                const desc = response[1].value.description;
                const file = response[2][0];

                this.categoryService.addsubCategories(name, desc, file, 0);
            });
    }

    editSubCategory(index) {
        this.dialogRef = this._matDialog.open(EditCategoryComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                subCat: this.subCategories[index]
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.obj = {
                    'name': response[1].value.name,
                    'description': response[1].value.description
                };
                this.output = <JSON>this.obj;
                this.categoryService.changeSubCategoryImg(this.subCategories[index].id, response[2]);
                this.categoryService.editSubCategorie(this.subCategories[index].id, this.output);

            });
    }

    deleteCategory(id) {
        this.categoryService.deleteSubCategorie(id);
    }

    selectedFile(file) {
        this.categoryImage = file.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file.target.files[0]);
        reader.onload = (_event) => {
            this.categoryImageUrl = reader.result;
        };
    }

    editCategory(form) {
        this.obj = {
            'name': form.value.name,
            'description': form.value.description
        };
        this.output = <JSON>this.obj;
        this.categoryService.changeCategoryImg(this.category.id, this.categoryImage);
        this.categoryService.editCategorie(this.category.id, this.output);
        this._snackBar.openFromComponent(AlertComponent, {
            duration: 3 * 1000,
        });
    }


    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
