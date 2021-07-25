import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DocumentModel} from '../../room/room.model';

@Component({
    selector: 'app-fiche',
    templateUrl: './fiche.component.html',
    styleUrls: ['./fiche.component.scss']
})
export class FicheComponent implements OnInit {
    public data: any;
    public document: DocumentModel;
    constructor(
        public matDialogRef: MatDialogRef<FicheComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any) {

        this.data = _data.data;
        this.document = this.data.doc;
    }

    ngOnInit() {}

}
