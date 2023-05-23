import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FuseConfirmDialogComponent} from '../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {DataTableService} from '../../../Services/data-table.service';
import {TableType} from '../../../models/Static';
import {isFirstColumn} from '../../../shared/utils/grid-utils';
import {HeaderButtonsComponent} from '../../../shared/header-buttons/header-buttons.component';
import {ContractService} from './contract.service';
import {Router} from '@angular/router';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';
import {AddContractComponent} from './add-contract/add-contract.component';
import {AddContractDocsComponent} from './add-contract-docs/add-contract-docs.component';

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
    dialogRef: any;
    searchInput: FormControl;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    selectedContract: any;
    private role: any;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private contractService: ContractService,
        private route: Router
    ) {
    }

    ngOnInit(): void {
        this.dataTableService.getTableColumns(TableType.CONTRACT_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });
    }

    newContact(): void {
        this.dialogRef = this._matDialog.open(AddContractComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                contract: this.selectedContract != null ? this.selectedContract : {}
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
        this.selectedContract = this.gridApi.getSelectedRows()[0];
        // do something
        console.log(this.selectedContract);
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
                flex: 1,
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
                    buttons: [
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
                                this.selectedContract == null;
                            }
                        },
                        {
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
                    ],
                },
            }
        ];
        this.columnDefs[0]['children'] = this.getColumns(columns);
        this.initTableData();
    }

    deleteContact() {
        this.contractService.delete(this.selectedContract.id).subscribe(value => {
            this._snackBar.open('Contract supprimé avec success', '', {
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
        this.contractService.getContract().subscribe((reclamations: any) => {
            this.gridOptions.rowData = reclamations;
        });
    }

    private addDocument() {
        this.dialogRef = this._matDialog.open(AddContractDocsComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                contract: this.selectedContract
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
}
