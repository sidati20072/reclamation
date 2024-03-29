import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReclamationComponent} from './reclamation.component';
import {AgGridModule} from 'ag-grid-angular';
import {ContactsService} from '../contacts/contacts.service';
import {SharedModule} from '../../../shared/shared.module';
import {ReclamationService} from './reclamation.service';
import {AddReclamationComponent} from './add-reclamation/add-reclamation.component';
import {AddReclamationDocsComponent} from './add-reclamation-docs/add-reclamation-docs.component';
import {DetailReclamationComponent} from './detail-reclamation/detail-reclamation.component';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MatDatepickerModule} from '@angular/material';
import {PaymentLineComponent} from './payment-line/payment-line.component';
import { AddPaymentLineComponent } from './add-payment-line/add-payment-line.component';

const routes: Routes = [
    {
        path: '',
        component: ReclamationComponent,
    },
    {
        path: ':id',
        component: DetailReclamationComponent,
    },
    {
        path: 'account/:id',
        component: PaymentLineComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [ReclamationComponent, AddReclamationComponent, AddReclamationDocsComponent, DetailReclamationComponent, PaymentLineComponent, AddPaymentLineComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AgGridModule.withComponents([IdRendererComponent, DocRendererComponent]),
        SharedModule,
        PdfViewerModule,
        MatDatepickerModule
    ],
    entryComponents: [AddReclamationComponent, AddReclamationDocsComponent,AddPaymentLineComponent],
    providers: [
        ContactsService,
        ReclamationService,
        DatePipe,
    ],
})
export class ReclamationModule {
}
