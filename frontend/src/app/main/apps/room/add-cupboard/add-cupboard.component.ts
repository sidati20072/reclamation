import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CupboardService} from '../cupboard.service';
import {CupboardModel} from '../room.model';

@Component({
    selector: 'app-add-cupboard',
    templateUrl: './add-cupboard.component.html',
    styleUrls: ['./add-cupboard.component.scss']
})
export class AddCupboardComponent {

    action: string;
    cupboard: CupboardModel = {} as CupboardModel;
    recForm: FormGroup;
    dialogTitle: string;
    room;
    constructor(
        public matDialogRef: MatDialogRef<AddCupboardComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private cupboardService: CupboardService
    ) {
        // Set the defaults
        this.action = _data.action;
        this.cupboard = _data.cupboard;
        this.dialogTitle = 'Armoire';
        this.room = _data.cupboard.room;
        this.buildForm();
    }

    buildForm() {
        this.recForm = this._formBuilder.group({
            id: [this.cupboard.id || null],
            number: [this.cupboard.number || '', Validators.required],
            note: [this.cupboard.note || ''],
            createdAt: [this.cupboard.createAt || ''],
            updateAt: [this.cupboard.updatedAt || '']
        });

    }

    save() {
        this.recForm.value.room = this.room;

        this.cupboardService.save(this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du salle', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }
}
