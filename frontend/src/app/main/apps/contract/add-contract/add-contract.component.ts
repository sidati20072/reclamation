import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ContractModel} from '../contract.model';
import {ContractService} from '../contract.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-add-contract',
    templateUrl: './add-contract.component.html',
    styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent {

    action: string;
    contract: ContractModel = {} as ContractModel;
    recForm: FormGroup;
    dialogTitle: string;
    roles: string;
    isPro: boolean;

    constructor(
        public matDialogRef: MatDialogRef<AddContractComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private contractService: ContractService, private datePipe: DatePipe
    ) {
        // Set the defaults
        this.action = _data.action;
        this.contract = _data.contract;
        this.dialogTitle = 'Contrat';
         this.buildForm();
    }


    buildForm() {
        this.recForm = this._formBuilder.group({
            id: [this.contract.id || null],
            nom: [this.contract.nom || '', Validators.required],
            raisonSociale: [this.contract.raisonSociale || ''],
            payment: [this.contract.payment || ''],
            date: [this.contract.date || new Date()],
            address: [this.contract.address || ''],
            lastPayment: [this.contract.lastPayment || ''],
            paymentDuration: [this.contract.paymentDuration || ''],
            loyer: [this.contract.loyer || ''],
        });

    }

    save() {
        this.recForm.value.date = this.datePipe.transform(this.recForm.value.date.toString(), 'yyyy-MM-d');

        this.contractService.save(this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du contract', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }
}
