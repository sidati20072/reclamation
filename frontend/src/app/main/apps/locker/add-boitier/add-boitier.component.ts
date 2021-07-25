import {Component, Inject} from '@angular/core';
import {BoitierModel} from '../../room/room.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {BoitierService} from '../../room/boitier.service';

@Component({
    selector: 'app-add-boitier',
    templateUrl: './add-boitier.component.html',
    styleUrls: ['./add-boitier.component.scss']
})
export class AddBoitierComponent {

    action: string;
    boitier: BoitierModel = {} as BoitierModel;
    recForm: FormGroup;
    dialogTitle: string;
    locker;

    constructor(
        public matDialogRef: MatDialogRef<AddBoitierComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private boitierService: BoitierService
    ) {
        // Set the defaults
        this.action = _data.action;
        this.boitier = _data.boitier;
        this.dialogTitle = 'Boitier';
        this.locker = _data.boitier.locker;
        this.buildForm();
    }

    buildForm() {
        this.recForm = this._formBuilder.group({
            id: [this.boitier.id || null],
            number: [this.boitier.number || '', Validators.required],
            note: [this.boitier.note || ''],
            createdAt: [this.boitier.createAt || ''],
            updateAt: [this.boitier.updatedAt || '']
        });

    }

    save() {
        this.recForm.value.locker = this.locker;
        this.boitierService.save(this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du boitier', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }

}
