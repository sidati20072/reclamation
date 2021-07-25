import {Component, Inject} from '@angular/core';
import {SvcModel} from '../../room/room.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SvcService} from '../svc.service';

@Component({
    selector: 'app-add-svc',
    templateUrl: './add-svc.component.html',
    styleUrls: ['./add-svc.component.scss']
})
export class AddSvcComponent {
    action: string;
    svc: SvcModel = {} as SvcModel;
    recForm: FormGroup;
    dialogTitle: string;
    cupboard;

    constructor(
        public matDialogRef: MatDialogRef<AddSvcComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any, private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder, private svcService: SvcService
    ) {
        // Set the defaults
        this.action = _data.action;
        this.svc = _data.svc;
        this.dialogTitle = 'Services';
        this.buildForm();
    }

    buildForm() {
        this.recForm = this._formBuilder.group({
            id: [this.svc.id || null],
            name: [this.svc.name || '', Validators.required],
            note: [this.svc.note || ''],
            createdAt: [this.svc.createAt || ''],
            updateAt: [this.svc.updatedAt || '']
        });

    }

    save() {
        this.svcService.save(this.recForm.value).subscribe(value => {
            this.matDialogRef.close();
        }, error1 => {
            this._snackBar.open('Une erreur est survenue lors de la création du service', '', {
                duration: 1000,
            });
            console.log(error1);
        });
    }
}
