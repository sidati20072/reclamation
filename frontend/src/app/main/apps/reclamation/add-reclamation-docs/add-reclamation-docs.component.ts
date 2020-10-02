import {Component, Inject} from '@angular/core';
import {ReclamationModel, DocumentType} from '../reclamation.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ReclamationService} from '../reclamation.service';

@Component({
    selector: 'app-add-reclamation-docs',
    templateUrl: './add-reclamation-docs.component.html',
    styleUrls: ['./add-reclamation-docs.component.scss']
})
export class AddReclamationDocsComponent {
    selectedFiles: FileList;

    action: string;
    reclamation: ReclamationModel = {} as ReclamationModel;
    recForm: FormGroup;
    dialogTitle: string;
    roles: string;
    isPro: boolean;
    type;

    constructor(
        public matDialogRef: MatDialogRef<AddReclamationDocsComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private reclamationService: ReclamationService
    ) {
        // Set the defaults
        this.dialogTitle = 'Ajout document a la reclamation (lot : ' + _data.reclamation.lot + ')';
    }

    selectFiles(event) {
        this.selectedFiles = event.target.files;
    }

    upload() {

        this.reclamationService.addDocument(this.selectedFiles, this.type, this._data.reclamation.id).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du reclamation', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }
    getType(): typeof DocumentType{
        return DocumentType;
    }
}
