import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { Mail } from 'app/main/apps/mail/mail.model';
import { MailService } from 'app/main/apps/mail/mail.service';

import { saveAs } from 'file-saver';
import { MailComposeDialogComponent } from '../dialogs/compose/compose.component';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';


@Component({
    selector     : 'mail-details',
    templateUrl  : './mail-details.component.html',
    styleUrls    : ['./mail-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailDetailsComponent implements OnInit, OnDestroy
{
    mail: any=null;
    mailResponse: Mail[];
    labels: any[];
    showDetails: boolean[];
    dialogRef: any;
    showRep:boolean[];
    currentId;
    clientEmail;

    // Private
    private _unsubscribeAll: Subject<any>;
    time: Date;
    msgTime: string;

    /**
     * Constructor
     *
     * @param {MailService} _mailService
     */
    constructor(
        public _matDialog: MatDialog,
        private _mailService: MailService,
    )
    {
        // Set the defaults
        this.showDetails=[];

        this.showRep=[]
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.currentId = localStorage.getItem('idCurrent')
         // Subscribe to update the current mail
         this._mailService.onCurrentMailChanged
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe(currentMail => {
             this.mail = currentMail;    
            });

        for(let i=1; i<25;i++){
            this.showRep.push(false)
            this.showDetails.push(false)
        }
        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

        if(this.mail){
            this.time = new Date(this.mail.createAt);
            this.msgTime = this.time.getDate() + ' ' + monthNames[this.time.getMonth()]
        }
        
        

        // Subscribe to update on label change
        this._mailService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
            });
    }

    download(url){
        var FileSaver = require('file-saver');
        FileSaver.saveAs(url, "image.jpg");
    }

    /**
     * Compose dialog
     */
    composeDialog(): void
    {
        this.dialogRef = this._matDialog.open(MailComposeDialogComponent, {
            panelClass: 'mail-compose-dialog',
            data: { to: this.mail.user.email , subject: this.mail.subject , id: this.mail.id }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                
        
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                //const medias: any = response[2]

                var medias : Array<any> = [];

                for (let i = 0; i < response[2].length; i++) {
                        medias.push(response[2][i]); 
                    
                }
                
                
                const ticketId:string = this.mail.id;
                const userId:string = this.mail.user.id;
                const content:string = formData.getRawValue().message;

                


                const mailReply: FormData = new FormData();
                mailReply.append('ticketId', ticketId);
                mailReply.append('content', content);
                mailReply.append('userId', localStorage.getItem('idCurrent'));
                 for (let i = 0; i < medias.length; i++) {
                    mailReply.append('medias', medias[i]);
                }
                switch ( actionType )
                {
                    /**
                     * Send
                     */
                    case 'send':
                        
                        this._mailService.replyMail(mailReply)
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete Mail');
                        break;
                }
            });
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.mail.toggleStar();

        this._mailService.updateMail(this.mail);
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.mail.toggleImportant();

        this._mailService.updateMail(this.mail);
    }
}
