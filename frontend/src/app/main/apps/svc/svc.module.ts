import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AgGridModule} from 'ag-grid-angular';
import {SharedModule} from '../../../shared/shared.module';
import {SvcService} from './svc.service';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';
import { SvcComponent } from './svc/svc.component';
import { AddSvcComponent } from './add-svc/add-svc.component';

const routes: Routes = [
    {
        path: '',
        component: SvcComponent,
    },

    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [SvcComponent, AddSvcComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AgGridModule.withComponents([IdRendererComponent, DocRendererComponent]),
        SharedModule,
    ],
    entryComponents: [AddSvcComponent],
    providers: [
        SvcService,
    ],
})
export class SvcModule {
}
