import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {OrderComponent} from './order/order.component';

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
        path: 'reclamations',
        loadChildren: './reclamation/reclamation.module#ReclamationModule'
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
    ],
    declarations: [OrderComponent]
})
export class AppsModule {
}
