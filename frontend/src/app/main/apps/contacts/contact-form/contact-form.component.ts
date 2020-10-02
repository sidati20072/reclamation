import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatRadioChange} from '@angular/material/radio';


import {Contact} from 'app/main/apps/contacts/contact.model';

@Component({
    selector: 'contacts-contact-form-dialog',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactsContactFormDialogComponent {
    action: string;
    contact: Contact;
    contactForm: FormGroup;
    dialogTitle: string;
    roles: string;
    isPro: boolean;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier utilisateur';
            this.contact = _data.contact;
            if (this.contact.roles.map(function (e) {
                return e.role;
            }) == 'PRO') {
                this.isPro = true;
            } else {
                this.isPro = false;
            }
        } else {
            this.dialogTitle = 'Nouvel utilisateur';
            this.contact = new Contact({});
        }
        this.contactForm = this.createContactForm();
    }

    onChangeRole(mrChange: MatRadioChange) {
        this.roles = mrChange.value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.contact.id],
            username: [this.contact.username],
            nom: [this.contact.nom],
            password: [this.contact.password],
            avatar: [this.contact.avatar],
            prenom: [this.contact.prenom],
            nomResto: [this.contact.nomResto],
            civilite: [this.contact.civilite],
            createAt: [this.contact.createAt],
            email: [this.contact.email],
            tel: [this.contact.tel],
            resetToken: [this.contact.resetToken],
            logo: [this.contact.logo],
            limitEmp: [this.contact.limitEmp],
            active: [this.contact.active],
            etat: [this.contact.etat],
            role: [this.contact.roles] || '',
        });

    }
}
