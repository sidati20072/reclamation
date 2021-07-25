import {Component, Inject} from '@angular/core';
import {LockerModel} from '../../room/room.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CupboardService} from '../../room/cupboard.service';
import {LockerService} from '../../room/locker.service';

@Component({
    selector: 'app-add-locker',
    templateUrl: './add-locker.component.html',
    styleUrls: ['./add-locker.component.scss']
})
export class AddLockerComponent {

    action: string;
    locker: LockerModel = {} as LockerModel;
    recForm: FormGroup;
    dialogTitle: string;
    cupboard;

    constructor(
        public matDialogRef: MatDialogRef<AddLockerComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private lockerService: LockerService
    ) {
        // Set the defaults
        this.action = _data.action;
        this.locker = _data.locker;
        this.dialogTitle = 'Casier';
        this.cupboard = _data.locker.cupboard;
        this.buildForm();
    }

    buildForm() {
        this.recForm = this._formBuilder.group({
            id: [this.locker.id || null],
            number: [this.locker.number || '', Validators.required],
            note: [this.locker.note || ''],
            createdAt: [this.locker.createAt || ''],
            updateAt: [this.locker.updatedAt || '']
        });

    }

    save() {
        this.recForm.value.cupboard = this.cupboard;
        this.lockerService.save(this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du casier', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }

}
