import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector     : 'mail-compose',
    templateUrl  : './compose.component.html',
    styleUrls    : ['./compose.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MailComposeDialogComponent
{
    showExtraToFields: boolean;
    composeForm: FormGroup;
    selectedFiles: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailComposeDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<MailComposeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;
        this.selectedFiles = []
    }
    attachFiles(event){
        for (let i = 0; i < event.target.files.length; i++) {
            this.selectedFiles.push(event.target.files[i]);
          }
    }
    deleteFile(i){
        this.selectedFiles.splice(i, 1)
    }
    convertSize(size){
        let i = Math.floor(Math.log(size) / Math.log(1024)),
        sizes = ['B', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
    
        return (size / Math.pow(1024, i)).toFixed(1)  + ' ' + sizes[i];
      }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create compose form
     *
     * @returns {FormGroup}
     */
    createComposeForm(): FormGroup
    {
        return new FormGroup({
            from   : new FormControl({
                value   : 'johndoe@creapond.com',
                disabled: true
            }),
            to     : new FormControl({
                value   : this._data.to,
                disabled: true
            }),
            cc     : new FormControl(),
            bcc    : new FormControl(''),
            subject: new FormControl({
                value   : this._data.subject,
                disabled: true
            }),
            message: new FormControl('')
        });
    }

    /**
     * Toggle extra to fields
     */
    toggleExtraToFields(): void
    {
        this.showExtraToFields = !this.showExtraToFields;
    }
}
