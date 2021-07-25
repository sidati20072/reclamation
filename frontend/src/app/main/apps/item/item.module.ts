import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import {RouterModule, Routes} from '@angular/router';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatPaginatorModule, MatGridListModule,
  MatRippleModule,
  MatSelectModule, MatTableModule, MatToolbarModule, MatSlideToggleModule, MatProgressSpinnerModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseSidebarModule} from '../../../../@fuse/components';
import { AddItemComponent } from './add-item/add-item.component';
import { SelectCategoryComponent } from './select-category/select-category.component';

const routes: Routes = [
  {
    path     : '',
    component: ItemComponent,

  },
  {
    path      : '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [ItemComponent, AddItemComponent, SelectCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    TranslateModule,
    MatPaginatorModule,
    FuseSharedModule,
    FuseSidebarModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    ItemComponent,
    AddItemComponent,
    SelectCategoryComponent
  ]
})
export class ItemModule { }
