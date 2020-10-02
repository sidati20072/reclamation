import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ReclamationModel} from '../reclamation.model';
import {ReclamationService} from '../reclamation.service';

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
        private _formBuilder: FormBuilder, private reclamationService: ReclamationService
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier Reclamation';
            this.reclamation = _data.contact;
        } else {
            this.dialogTitle = 'Nouvel Reclamation';
        }
        this.recForm = this.buildForm();
    }

    buildForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.reclamation.id || null],
            lot: [this.reclamation.lot || '', Validators.required],
            etat: [this.reclamation.etat || '']
        });

    }

    save() {
        this.reclamationService.save(this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du reclamation', '',{
                duration: 1000,
            });
            console.log(error1);
        });
    }
}
