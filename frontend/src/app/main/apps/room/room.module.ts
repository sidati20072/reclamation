import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoomComponent} from './room.component';
import {AgGridModule} from 'ag-grid-angular';
import {ContactsService} from '../contacts/contacts.service';
import {SharedModule} from '../../../shared/shared.module';
import {RoomService} from './room.service';
import {AddReclamationComponent} from './add-reclamation/add-reclamation.component';
import {AddReclamationDocsComponent} from './add-reclamation-docs/add-reclamation-docs.component';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';
import {MatDatepickerModule} from '@angular/material';
import {CupboardComponent} from './cupboard/cupboard.component';
import {AddCupboardComponent} from './add-cupboard/add-cupboard.component';
import {LockerComponent} from '../locker/locker.component';
import {AddLockerComponent} from '../locker/add-locker/add-locker.component';
import {DocumentListComponent} from '../locker/document-list/document-list.component';
import {MoveDocumentComponent} from '../locker/move-document/move-document.component';
import {AddBoitierComponent} from '../locker/add-boitier/add-boitier.component';
import {BoitierComponent} from '../locker/boitier/boitier.component';
import {BlockStatusComponent} from '../../../shared/renderer/block-status/block-status.component';
import {FicheComponent} from '../locker/fiche/fiche.component';
import {NgxPrintModule} from 'ngx-print';

const routes: Routes = [
    {
        path: '',
        component: RoomComponent,
    },
    {
        path: ':id',
        component: LockerComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [
        RoomComponent,
        AddReclamationComponent,
        AddReclamationDocsComponent,
        CupboardComponent,
        AddCupboardComponent,
        LockerComponent,
        AddLockerComponent,
        DocumentListComponent,
        MoveDocumentComponent,
        BoitierComponent,
        AddBoitierComponent,
        FicheComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AgGridModule.withComponents([IdRendererComponent, DocRendererComponent, BlockStatusComponent]),
        SharedModule,
        MatDatepickerModule,
        NgxPrintModule,


    ],
    entryComponents: [
        AddReclamationComponent,
        AddReclamationDocsComponent,
        AddCupboardComponent,
        AddLockerComponent,
        MoveDocumentComponent,
        AddBoitierComponent,
        FicheComponent
    ],
    providers: [
        ContactsService,
        RoomService,
        DatePipe
    ],
    exports: [
        DocumentListComponent
    ]
})
export class RoomModule {
}
