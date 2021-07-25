import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {RoomModel} from '../room.model';
import {RoomService} from '../room.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-add-reclamation',
    templateUrl: './add-reclamation.component.html',
    styleUrls: ['./add-reclamation.component.scss']
})
export class AddReclamationComponent {

    action: string;
    room: RoomModel = {} as RoomModel;
    recForm: FormGroup;
    dialogTitle: string;
    roles: string;
    isPro: boolean;

    constructor(
        public matDialogRef: MatDialogRef<AddReclamationComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private roomService: RoomService, private datePipe: DatePipe
    ) {
        // Set the defaults
        this.action = _data.action;
        this.room = _data.reclamation;
        this.dialogTitle = 'Reclamation';
        this.buildForm();
    }

    buildForm() {
        this.recForm = this._formBuilder.group({
            id: [this.room.id || null],
            number: [this.room.number || '', Validators.required],
            note: [this.room.note || ''],
            isActive: [this.room.isActive || true, Validators.required],
            createdAt: [this.room.createAt || ''],
            updateAt: [this.room.updatedAt || '']
        });

    }

    save() {
        this.roomService.save(this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du salle', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }
}
