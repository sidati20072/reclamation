import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatDialog, MatDialogModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { CategoriesComponent } from 'app/main/apps/category/categories/categories.component';
import { CategoryDetailsComponent } from 'app/main/apps/category/category-details/category-details.component';
import { CategoriesService } from 'app/main/apps/category/categories.service';
import { CategoryService } from 'app/main/apps/category/category.service';
import { FuseSidebarModule } from '@fuse/components';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { EditCategoryComponent } from './edit-category/edit-category.component';


const routes = [
    {
        path     : '',
        component: CategoriesComponent,
        resolve  : {
            category: CategoriesService
        }
    },
    {
        path     : 'sub/:catId',
        component: CategoryDetailsComponent,
        resolve  : {
            category: CategoryService
        }
    },
    {
        path      : '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        CategoriesComponent,
        CategoryDetailsComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        FuseSharedModule,
        FuseSidebarModule,
        MatDialogModule,
        MatGridListModule,
        NgxSpinnerModule,
    ],
    
    providers   : [
        CategoriesService,
        CategoryService
    ],
    entryComponents: [
        AddCategoryComponent,
        EditCategoryComponent
    ]
})
export class CategoryModule
{
}
