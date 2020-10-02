import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
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
    MatPaginatorModule,
    MatBadgeModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';


const routes: Routes = [
    {
        path     : '',
        component: OrderListComponent,

    },
    {
        path      : '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [

    OrderListComponent,

    OrderDetailComponent],
    imports        : [
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
        MatBadgeModule
    ],
    providers: [

    ],
    entryComponents: [
        OrderDetailComponent
    ]
})
export class OrderModule
{
}
