import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {ContactsService} from 'app/main/apps/contacts/contacts.service';
import {ContactsContactFormDialogComponent} from 'app/main/apps/contacts/contact-form/contact-form.component';
import {AlertComponent} from './alert/alert.component';
import {GridApi, GridOptions} from 'ag-grid-community';
import {DataTableService} from '../../../Services/data-table.service';
import {TableType} from '../../../models/Static';
import {UserService} from '../../../Services/user.service';
import {RoleRendererComponent} from '../../../shared/renderer/role-renderer/role-renderer.component';
import {isFirstColumn} from '../../../shared/utils/grid-utils';
import {HeaderButtonsComponent} from '../../../shared/header-buttons/header-buttons.component';
import {FuseConfirmDialogComponent} from '../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {UserModel} from '../../../models/UserModel';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ContactsComponent implements OnInit {
    dialogRef: any;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    rowData;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    // Private
    private _unsubscribeAll: Subject<any>;
    private selectedUser: UserModel = null;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _contactsService: ContactsService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.dataTableService.getTableColumns(TableType.USER_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });
    }

    newContact(): void {
        this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._snackBar.openFromComponent(AlertComponent, {
                    duration: 3 * 1000,
                });
                this._contactsService.addContact(response.getRawValue());


            });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onSelectionChanged($event: any) {
        this.selectedUser = this.gridApi.getSelectedRows()[0];
        // do something
        console.log(this.selectedUser);
    }

    autoSizeAllCols() {
        const allColumnIds = [];
        this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.getColId());
        });
        this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
    }

    private initTableConfig(columns: any) {
        this.gridOptions = <GridOptions>{
            pagination: true,
            paginationPageSize: 50,
            rowModelType: 'clientSide',
            rowSelection: 'single',
            sideBar: {hiddenByDefault: true, defaultToolPanel: '', toolPanels: []},
            suppressRowClickSelection: true,
            defaultColDef: {
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                resizable: true,
                sortable: true,
                headerCheckboxSelection: false,
                checkboxSelection: isFirstColumn

            },
            frameworkComponents: {
                roleRenderer: RoleRendererComponent,
            }
        };
        this.columnDefs = [
            {
                headerName: '',
                suppressAutoSize: true,
                suppressResize: true,
                suppressMovable: true,
                children: [],
                headerGroupComponentFramework: HeaderButtonsComponent,
                headerGroupComponentParams: {
                    /*
            * Icons should be from font-awesome v4.7
            * https://fontawesome.com/v4.7.0/icons/
            * */
                    buttons: [
                        {
                            title: 'Edit',
                            icon: 'add',
                            fn: () => {
                                this.newContact();
                            }
                        },
                        {
                            title: 'Edit',
                            icon: 'edit',
                            fn: () => {
                                this.editContact(this.selectedUser);
                            },
                            disabled: () => {

                                return this.selectedUser == null;
                            }
                        },
                    ]
                },
            }
        ];
        this.columnDefs[0]['children'] = columns;
        this.initTableData();
    }

    private initTableData() {
        this.userService.getAllUsers().subscribe((users: any) => {
            this.gridOptions.rowData = users;
        });
    }

    editContact(contact): void {
        this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                contact: contact,
                action: 'edit'
            }

        });


        this.dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }
            this._snackBar.openFromComponent(AlertComponent, {
                duration: 3 * 1000,
            });
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            switch (actionType) {
                /**
                 * Save
                 */
                case 'save':
                    this._contactsService.updateContact(formData.getRawValue())
                        .pipe(
                            finalize(async () => {
                                this.initTableData();
                            })
                        )
                        .subscribe(value => {

                        });
                    break;
                /**
                 * Delete
                 */
                case 'delete':

                    this.deleteContact(contact);

                    break;
            }

        });
    }

    /**
     * Delete Contact
     */
    deleteContact(contact): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false,

        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._contactsService.deleteContact(contact);
            }
            this.confirmDialogRef = null;
        });

    }


}
