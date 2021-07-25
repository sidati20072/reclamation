import { Component, OnInit } from '@angular/core';
import { AppconfigService } from 'app/Services/appconfig.service';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

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
                this.editorContent = result.appPresentation as String;
            }
        )
    }

    updatePresentation(){
        this._appConfigService.updatePresentation(this.editorContent)
        .subscribe(
            result => {
                this._snackBar.openFromComponent(AlertComponent, {
                    duration: 3 * 1000,
                  });
            }
        )
    }
}
