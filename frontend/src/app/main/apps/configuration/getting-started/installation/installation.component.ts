import {Component} from '@angular/core';
import {AppconfigService} from 'app/Services/appconfig.service';
import {MatSnackBar} from '@angular/material';
import {AlertComponent} from '../alert/alert.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'docs-installation',
    templateUrl: './installation.component.html',
    styleUrls: ['./installation.component.scss']
})
export class DocsGettingStartedInstallationComponent {
    media: any;
    file: any;
    appConfig: any;
    video: boolean = false;
    color = 'primary';
    mode = 'determinate';
    value = 50;
    bufferValue = 75;
    selected: boolean = false;
    submit: boolean = false;
    fileName;
    uploaded: boolean = false;
    mediaUrl: string = '';
    form: FormGroup;
    empNumber;
    colorSlide = 'accent';
    checked: boolean;
    disabled = false;
    offlineMessage: string;
    breakpoint: number;
    isClosed: boolean;

    constructor(private _appConfigService: AppconfigService,
                private _snackBar: MatSnackBar,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
        this._appConfigService.getAppConfigsMedia().subscribe(
            result => {
                // @ts-ignore
                this.media = result;
                this.mediaUrl = this.media.link;

                if ((this.media.keyName.substring(this.media.keyName.length - 3) === 'jpeg')
                    || (this.media.keyName.substring(this.media.keyName.length - 3) === 'jpg')
                    || (this.media.keyName.substring(this.media.keyName.length - 3) === 'png')
                    || (this.media.keyName.substring(this.media.keyName.length - 3) === 'gif')) {
                    this.video = false;
                } else if ((this.media.keyName.substring(this.media.keyName.length - 3) === 'avi')
                    || (this.media.keyName.substring(this.media.keyName.length - 3) === 'flv')
                    || (this.media.keyName.substring(this.media.keyName.length - 3) === 'wmv')
                    || (this.media.keyName.substring(this.media.keyName.length - 3) === 'mov')
                    || (this.media.keyName.substring(this.media.keyName.length - 3) === 'mp4')
                    || (this.media.keyName.substring(this.media.keyName.length - 3) === 'mpe4')) {
                    this.video = true;
                }
            }
        );

        this._appConfigService.getAppConfig().subscribe(
            (result: any) => {
                // @ts-ignore
                if (result.limitEmp === null) {
                    this.empNumber = 0;
                } else {
                    this.empNumber = result.limitEmp;
                }
                this.offlineMessage = result.offlineMessage;

                this.checked = result.offline;
                this.isClosed = result.closed;
            }
        );
    }

    selectedFile(file) {
        this.selected = true;
        this.uploaded = false;
        this.fileName = file.target.files[0].name;
        this.file = file.target.files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file.target.files[0]);
        reader.onload = (_event) => {
        };
    }

    // tslint:disable-next-line: typedef
    updateMedia() {
        this.submit = true;
        this._appConfigService.updateMedia(this.file).subscribe(
            result => {
                this.uploaded = true;
                this.submit = false;
                this.selected = false;

                // @ts-ignore
                this.mediaUrl = result.media.link;
                this._snackBar.openFromComponent(AlertComponent, {
                    duration: 3 * 1000,
                });
            }
        );
    }

    updateEmp() {
        this._appConfigService.updateEmpN(this.empNumber).subscribe(
            result => {
                this._snackBar.openFromComponent(AlertComponent, {
                    duration: 3 * 1000,
                });
            }
        );
    }

    updateOffline() {
        this._appConfigService.updateOffline(this.checked, this.offlineMessage, this.isClosed).subscribe(
            result => {
                this._snackBar.openFromComponent(AlertComponent, {
                    duration: 3 * 1000,
                });
            }
        );

    }

    onChangeToggle(event) {
        this.checked = event.checked;
    }

  onClosed(event) {
        this.isClosed = event.checked;
    }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
    }
}
