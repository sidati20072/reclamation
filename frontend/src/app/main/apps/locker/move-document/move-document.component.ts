import {Component, Inject} from '@angular/core';
import {DocumentModel, DocumentStatus} from '../../room/room.model';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {DocumentService} from '../../room/document.service';
import {SvcService} from '../../svc/svc.service';

@Component({
    selector: 'app-move-document',
    templateUrl: './move-document.component.html',
    styleUrls: ['./move-document.component.scss']
})
export class MoveDocumentComponent {
    action: string;
    doc: DocumentModel = {} as DocumentModel;
    dialogTitle: string;
    locker;
    type;
    note: any;
    services;
    selectedService: any;

    constructor(
        public matDialogRef: MatDialogRef<MoveDocumentComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private documentService: DocumentService, private svcService: SvcService
    ) {

        this.doc = _data.doc;
        this.dialogTitle = 'Fiche de sortie';
        this.svcService.getAll().subscribe(value => {
            this.services = value;
        });
    }


    save() {
        const data = {id: this.doc.id, serviceId: this.selectedService};
        this.documentService.move(data).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de l update ', '', {
                duration: 1000,
            });
        });
    }
}
