import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'app-block-status',
    templateUrl: './block-status.component.html',
    styleUrls: ['./block-status.component.scss']
})
export class BlockStatusComponent implements ICellRendererAngularComp {
    public params: any;
    value: any;

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;

    }

    refresh(): boolean {
        return false;
    }

}
