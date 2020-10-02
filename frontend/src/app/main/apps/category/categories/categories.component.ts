import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';

import {CategoriesService} from 'app/main/apps/category/categories.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {AddCategoryComponent} from '../add-category/add-category.component';


@Component({
    selector: 'categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    animations: fuseAnimations
})
export class CategoriesComponent implements OnInit, OnDestroy {
    categories: any[];
    categoryList: any[];
    filteredCategories: any[];
    currentCategory: string;
    searchTerm: string;
    dialogRef: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
        private categoriesService: CategoriesService,
        private _matDialog: MatDialog,
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
        // Subscribe to categories
        this.categoriesService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.filteredCategories = this.categoryList = this.categories = categories;
            });
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
            panelClass: 'add-contact-form-dialog',
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

                this.categoriesService.addCategories(name, desc, file, 0);
            });
    }

    deleteCategory(id) {
        this.categoriesService.deleteCategorie(id);

    }

    /**
     * Filter categories by term
     */
    filterCategoriesByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredCategories = this.categories;
        } else {
            this.filteredCategories = this.categories.filter((category) => {
                return category.name.toLowerCase().includes(searchTerm);
            });
        }
    }
}
