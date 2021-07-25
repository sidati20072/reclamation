import {Component, Inject} from '@angular/core';
import {DocumentModel, SvcModel} from '../room.model';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DocumentService} from '../document.service';
import {SvcService} from '../../svc/svc.service';

@Component({
    selector: 'app-add-reclamation-docs',
    templateUrl: './add-reclamation-docs.component.html',
    styleUrls: ['./add-reclamation-docs.component.scss']
})
export class AddReclamationDocsComponent {
    selectedFiles: FileList;

    action: string;
    doc: DocumentModel = {} as DocumentModel;
    dialogTitle: string;
    boitier;
    type;
    services: SvcModel[];
    serviceOrigin: SvcModel = {} as SvcModel;


    constructor(
        public matDialogRef: MatDialogRef<AddReclamationDocsComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar, private svcService: SvcService,
        private _formBuilder: FormBuilder, private documentService: DocumentService
    ) {
        this.getServices();
        this.doc = _data.doc;
        this.boitier = _data.doc.boitier;
        // Set the defaults
        this.dialogTitle = 'Ajout document';
    }

    selectFiles(event) {
        this.selectedFiles = event.target.files;
    }

    upload() {
        const formData: FormData = new FormData();
        formData.append('document', this.selectedFiles[0]);
        formData.append('documentType', this.type);
        formData.append('isBlocked', 'false');
        formData.append('permis', this.doc.permis);
        formData.append('acte', this.doc.acte);
        formData.append('titreFoncier', this.doc.titreFoncier);
        formData.append('quittance', this.doc.quittance);
        formData.append('serviceOriginId', '' + this.serviceOrigin.id);
        formData.append('titreFoncier', this.doc.titreFoncier);
        formData.append('number', this.doc.number);
        formData.append('documentType', this.doc.documentType);
        formData.append('order', this.doc.order);


        this.documentService.save(this.boitier.id, formData).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du document', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }

    private getServices() {
        this.svcService.getAll().subscribe((value : any) => {
            this.services = value;
        });
    }
}
