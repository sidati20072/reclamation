import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AgGridModule} from 'ag-grid-angular';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';
import {BlockStatusComponent} from '../../../shared/renderer/block-status/block-status.component';
import {SharedModule} from '../../../shared/shared.module';
import { ShowDocumentListComponent} from './show-document/show-document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';


const routes: Routes = [
    {
        path: '',
        component: ShowDocumentListComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [ShowDocumentListComponent, DocumentDetailComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AgGridModule.withComponents([IdRendererComponent, DocRendererComponent, BlockStatusComponent]),
        SharedModule,
    ],
    entryComponents: [

    ]
})
export class DocumentModule {
}
