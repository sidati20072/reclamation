import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-id-renderer',
    templateUrl: './id-renderer.component.html',
    styleUrls: ['./id-renderer.component.scss']
})
export class IdRendererComponent implements ICellRendererAngularComp {
    public params: any;

    constructor(private router: Router) {
    }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }

    onDetails() {
        this.router.navigate([document.location.pathname + '/' + this.params.data.id]);
    }

}
