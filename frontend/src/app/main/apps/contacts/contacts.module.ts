import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule, FuseWidgetModule} from '@fuse/components';

import {ContactsComponent} from 'app/main/apps/contacts/contacts.component';
import {ContactsService} from 'app/main/apps/contacts/contacts.service';
import {ContactsContactFormDialogComponent} from 'app/main/apps/contacts/contact-form/contact-form.component';
import {MatRadioModule} from '@angular/material/radio';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ChartsModule} from 'ng2-charts';
import {AgGridModule} from 'ag-grid-angular';
import {RoleRendererComponent} from '../../../shared/renderer/role-renderer/role-renderer.component';
import {SharedModule} from '../../../shared/shared.module';

const routes: Routes = [
    {
        path     : '**',
        component: ContactsComponent,
        resolve  : {
            contacts: ContactsService
        }
    }
];

@NgModule({
    declarations   : [
        ContactsComponent,
        ContactsContactFormDialogComponent,
    ],
    imports        : [
        RouterModule.forChild(routes),
        MatRadioModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        NgxChartsModule,
        ChartsModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        AgGridModule.withComponents([RoleRendererComponent]),
        SharedModule
    ],
    providers      : [
        ContactsService],
    entryComponents: [
        ContactsContactFormDialogComponent,
    ]
})
export class ContactsModule
{
}
