import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'app-doc-renderer',
    templateUrl: './doc-renderer.component.html',
    styleUrls: ['./doc-renderer.component.scss']
})
export class DocRendererComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }

}
