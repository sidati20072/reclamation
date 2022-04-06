import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReclamationService} from '../reclamation.service';
import {DatePipe} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-add-payment-line',
    templateUrl: './add-payment-line.component.html',
    styleUrls: ['./add-payment-line.component.scss']
})
export class AddPaymentLineComponent {

    action: string;
    paymentLine = {};
    recForm: FormGroup;
    dialogTitle: string;
    roles: string;
    reclamationId: any;

    constructor(
        public matDialogRef: MatDialogRef<AddPaymentLineComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private reclamationService: ReclamationService, private datePipe: DatePipe
    ) {
        // Set the defaults
        this.action = _data.action;
        this.reclamationId = _data.id;
        this.dialogTitle = 'Payment Line';
        this.buildForm();
    }

    buildForm() {
        this.recForm = this._formBuilder.group({
            amount: [, Validators.required],
        });

    }

    save() {
        this.reclamationService.savePaymentLine(this.reclamationId, this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du payment', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }

}
