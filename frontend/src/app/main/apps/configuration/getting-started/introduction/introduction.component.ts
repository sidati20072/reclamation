import {Component, ViewEncapsulation} from '@angular/core';
import { AppconfigService } from 'app/Services/appconfig.service';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

@Component({
    selector   : 'docs-introduction',
    templateUrl: './introduction.component.html',
    styleUrls  : ['./introduction.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DocsGettingStartedIntroductionComponent
{
    public editorConfig = {
        "toolbar": [
            ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
            ["fontName", "fontSize", "color"],
            ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
            ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ]
    }
    public editorContent: string =" ";
    constructor(private _appConfigService : AppconfigService,
        private _snackBar: MatSnackBar){
    }
    ngOnInit() {
        this._appConfigService.getAppConfig()
        .subscribe(
            result => {
                // @ts-ignore
                this.editorContent = result.appCondition as String;
            }
        )
    }

    updateCondition(){
        this._appConfigService.updateCondition(this.editorContent)
        .subscribe(
            result => {
                this._snackBar.openFromComponent(AlertComponent, {
                    duration: 3 * 1000,
                  });
            }
        )
    }
}
