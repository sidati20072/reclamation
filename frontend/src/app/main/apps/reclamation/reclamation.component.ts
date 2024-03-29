import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FuseConfirmDialogComponent} from '../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {DataTableService} from '../../../Services/data-table.service';
import {TableType} from '../../../models/Static';
import {isFirstColumn} from '../../../shared/utils/grid-utils';
import {HeaderButtonsComponent} from '../../../shared/header-buttons/header-buttons.component';
import {ReclamationService} from './reclamation.service';
import {Router} from '@angular/router';
import {AddReclamationComponent} from './add-reclamation/add-reclamation.component';
import {AddReclamationDocsComponent} from './add-reclamation-docs/add-reclamation-docs.component';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';
import {AddPaymentLineComponent} from './add-payment-line/add-payment-line.component';

@Component({
    selector: 'app-reclamation',
    templateUrl: './reclamation.component.html',
    styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
    dialogRef: any;
    searchInput: FormControl;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    selectedReclamation: any;
    private role: any;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private reclamationService: ReclamationService,
        private route: Router
    ) {
    }

    ngOnInit(): void {
        this.role = localStorage.getItem('role');
        this.dataTableService.getTableColumns(TableType.RECLAMATION_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });
    }

    newContact(): void {
        this.dialogRef = this._matDialog.open(AddReclamationComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                reclamation: this.selectedReclamation != null ? this.selectedReclamation : {}
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.initTableData();
        });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onSelectionChanged($event: any) {
        this.selectedReclamation = this.gridApi.getSelectedRows()[0];
        // do something
        console.log(this.selectedReclamation);
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
                idRenderer: IdRendererComponent,
                docRenderer: DocRendererComponent,
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
                    buttons: this.role && this.role === 'ADMIN' ? [
                        {
                            title: 'Ajout',
                            icon: 'add',
                            fn: () => {
                                this.newContact();
                            }
                        },
                        {
                            title: 'Ajouter un document ',
                            icon: 'description',
                            fn: () => {
                                this.addDocument();
                            },
                            disabled: () => {
                                this.selectedReclamation == null;
                            }
                        },
                        {
                            title: 'Payment',
                            icon: 'credit_card',
                            fn: () => {
                                this.paymentLine();
                            },
                            disabled: () => {
                                this.selectedReclamation == null;
                            }
                        },
                        {
                            title: 'List Payments',
                            icon: 'list',
                            fn: () => {
                                this.route.navigate(['/apps/reclamations/account/' + this.selectedReclamation.id]);
                            },
                            disabled: () => {
                                this.selectedReclamation == null;
                            }
                        }, {
                            title: 'delete',
                            icon: 'delete',
                            fn: () => {
                                this.deleteContact();
                            }
                        },
                        {
                            title: 'Export',
                            icon: 'import_export',
                            fn: () => {
                                this.onExport();
                            }
                        },
                    ] : []
                },
            }
        ];
        this.columnDefs[0]['children'] = this.getColumns(columns);
        this.initTableData();
    }

    deleteContact() {
        this.reclamationService.delete(this.selectedReclamation.id).subscribe(value => {
            this._snackBar.open('Reclamation supprimé avec success', '', {
                duration: 3000,
            });
            this.initTableData();
        }, error1 => {
            this._snackBar.open('erreur de suppression ', '', {
                duration: 3000,
            });
        });
    }

    private initTableData() {
        this.reclamationService.getReclamations().subscribe((reclamations: any) => {
            this.gridOptions.rowData = reclamations;
        });
    }

    private addDocument() {
        this.dialogRef = this._matDialog.open(AddReclamationDocsComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                reclamation: this.selectedReclamation
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.initTableData();
        });
    }

    onExport() {
        const params = {
            columnSeparator: ';'
        };
        this.gridApi.exportDataAsCsv(params);
    }

    getColumns(columns: any[]) {
        return columns.map(value => {
            if (value.field === 'lot') {
                value.headerName = 'Num dossier';
                value.header = 'Num dossier';
                return value;
            } else if (value.field === 'total') {
                value.headerName = 'Montant';
                value.header = 'Montant';
                return value;
            } else if (value.field === 'ncin') {
                value.headerName = 'Address';
                value.header = 'Address';
                return value;
            } else {
                return value;
            }
        });
    }

    private paymentLine() {
        this.dialogRef = this._matDialog.open(AddPaymentLineComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                id: this.selectedReclamation.id
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.initTableData();
        });
    }
}
