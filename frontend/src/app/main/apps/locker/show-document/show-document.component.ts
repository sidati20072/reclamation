import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {DocumentService} from '../../room/document.service';
import {DocumentModel} from '../../room/room.model';

@Component({
    selector: 'app-show-document',
    templateUrl: './show-document.component.html',
    styleUrls: ['./show-document.component.scss']
})
export class ShowDocumentComponent {
    doc: DocumentModel | any;
    selectedDoc: string;

    constructor(
        public matDialogRef: MatDialogRef<ShowDocumentComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private documentService: DocumentService
    ) {
        this.doc = _data.doc;
        this.voir(this.doc);
    }


    voir(doc: DocumentModel) {
        this.documentService.getDocument(doc.id).subscribe((value: any) => {
            this.selectedDoc = 'data:application/pdf;base64,' + value.docSrc;
            console.log(this.selectedDoc);
        }, error1 => {
            console.log(error1);
        });
    }

    showErrorMsg() {

    }

    pdfRendered() {

    }

    showLoadingMsg() {

    }
}
