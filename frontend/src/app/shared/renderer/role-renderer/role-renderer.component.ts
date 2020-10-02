import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'app-role-renderer',
    templateUrl: './role-renderer.component.html',
    styleUrls: ['./role-renderer.component.scss']
})
export class RoleRendererComponent implements ICellRendererAngularComp {
    public params: any;
    public roles: any[];
    public value: string;

    agInit(params: any): void {
        this.params = params;
        this.roles = this.params.value;

        this.value = this.roles && this.roles.length > 0 ? this.roles[0].role : '';
    }

    refresh(): boolean {
        return false;
    }

}
