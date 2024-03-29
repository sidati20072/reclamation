import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ReclamationModel} from '../reclamation.model';
import {ReclamationService} from '../reclamation.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-add-reclamation',
    templateUrl: './add-reclamation.component.html',
    styleUrls: ['./add-reclamation.component.scss']
})
export class AddReclamationComponent {

    action: string;
    reclamation: ReclamationModel = {} as ReclamationModel;
    recForm: FormGroup;
    dialogTitle: string;
    roles: string;
    isPro: boolean;

    constructor(
        public matDialogRef: MatDialogRef<AddReclamationComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private reclamationService: ReclamationService, private datePipe: DatePipe
    ) {
        // Set the defaults
        this.action = _data.action;
        this.reclamation = _data.reclamation;
        this.dialogTitle = 'Reclamation';
         this.buildForm();
    }

    buildForm() {
        this.recForm = this._formBuilder.group({
            id: [this.reclamation.id || null],
            lot: [this.reclamation.lot || '', Validators.required],
            ncin: [this.reclamation.ncin || '', Validators.required],
            total: [this.reclamation.total || '', Validators.required],
            etat: [this.reclamation.etat || ''],
            role: [this.reclamation.role || ''],
            nom: [this.reclamation.nom || ''],
            date: [this.reclamation.nom || new Date()],
            degrevement: [this.reclamation.degrevement || '']
        });

    }

    save() {
        this.recForm.value.date = this.datePipe.transform(this.recForm.value.date.toString(), 'yyyy-MM-d');
        this.reclamationService.save(this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du reclamation', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }
}
