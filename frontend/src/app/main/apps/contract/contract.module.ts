import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContractComponent} from './contract.component';
import {AgGridModule} from 'ag-grid-angular';
import {ContactsService} from '../contacts/contacts.service';
import {SharedModule} from '../../../shared/shared.module';
import {ContractService} from './contract.service';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MatDatepickerModule} from '@angular/material';
import {DetailContractComponent} from './detail-contract/detail-contract.component';
import {AddContractDocsComponent} from './add-contract-docs/add-contract-docs.component';
import {AddContractComponent} from './add-contract/add-contract.component';

const routes: Routes = [
    {
        path: '',
        component: ContractComponent,
    },
    {
        path: ':id',
        component: DetailContractComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [ContractComponent, AddContractDocsComponent, DetailContractComponent, AddContractComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AgGridModule.withComponents([IdRendererComponent, DocRendererComponent]),
        SharedModule,
        PdfViewerModule,
        MatDatepickerModule
    ],
    entryComponents: [AddContractDocsComponent, AddContractComponent],
    providers: [
        ContactsService,
        ContractService,
        DatePipe,
    ],
})
export class ContractModule {
}
