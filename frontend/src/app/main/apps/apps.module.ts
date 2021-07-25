import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {SharedModule} from '../../shared/shared.module';
import {NgxPrintModule} from 'ngx-print';

const routes = [
    {
        path: 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path: 'dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path: 'utilisateur',
        loadChildren: './contacts/contacts.module#ContactsModule'
    },
    {
        path: 'rooms',
        loadChildren: './room/room.module#RoomModule'
    },
    {
        path: 'service',
        loadChildren: './svc/svc.module#SvcModule'
    },
    {
        path: 'documents',
        loadChildren: './document/document.module#DocumentModule'
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        AgGridModule,
        SharedModule,
        NgxPrintModule
    ],
    exports: [],
    declarations: []
})
export class AppsModule {
}
