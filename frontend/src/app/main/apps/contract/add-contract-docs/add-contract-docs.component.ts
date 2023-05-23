import {Component, Inject} from '@angular/core';
import {ContractModel} from '../contract.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ContractService} from '../contract.service';

@Component({
    selector: 'app-add-contract-docs',
    templateUrl: './add-contract-docs.component.html',
    styleUrls: ['./add-contract-docs.component.scss']
})
export class AddContractDocsComponent {
    selectedFiles: FileList;

    action: string;
    contract: ContractModel = {} as ContractModel;
    recForm: FormGroup;
    dialogTitle: string;
    roles: string;
    isPro: boolean;
    type;

    constructor(
        public matDialogRef: MatDialogRef<AddContractDocsComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private contractService: ContractService
    ) {
        // Set the defaults
        this.dialogTitle = 'Ajout document a la contract (Num dossier : ' + _data.contract.lot + ')';
    }

    selectFiles(event) {
        this.selectedFiles = event.target.files;
    }

    upload() {

        this.contractService.addDocument(this.selectedFiles, this.type, this._data.contract.id).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du contract', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }

    getType(): typeof DocumentType {
        return DocumentType;
    }
}
