import {Component, OnInit} from '@angular/core';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DataTableService} from '../../../../Services/data-table.service';
import {TableType} from '../../../../models/Static';
import {isFirstColumn} from '../../../../shared/utils/grid-utils';
import {IdRendererComponent} from '../../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../../shared/renderer/doc-renderer/doc-renderer.component';
import {HeaderButtonsComponent} from '../../../../shared/header-buttons/header-buttons.component';
import {AddSvcComponent} from '../add-svc/add-svc.component';
import {SvcService} from '../svc.service';

@Component({
    selector: 'app-svc',
    templateUrl: './svc.component.html',
    styleUrls: ['./svc.component.scss']
})
export class SvcComponent implements OnInit {

    dialogRef: any;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    selectedSvc: any;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private svcService: SvcService,
    ) {
    }

    ngOnInit(): void {
        this.dataTableService.getTableColumns(TableType.SVC_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });
    }

    add(): void {
        this.dialogRef = this._matDialog.open(AddSvcComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                svc: this.selectedSvc != null ? this.selectedSvc : {}
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
        this.selectedSvc = this.gridApi.getSelectedRows()[0];
        // do something
    }

    deleteContact() {
        this.svcService.delete(this.selectedSvc.id).subscribe(value => {
            this._snackBar.open('Service supprimé avec success', '', {
                duration: 3000,
            });
            this.initTableData();
        }, error1 => {
            this._snackBar.open('erreur de suppression ', '', {
                duration: 3000,
            });
        });
    }

    onExport() {
        const params = {
            columnSeparator: ';', fileName: 'export_services_' + new Date().getTime()
        };
        this.gridApi.exportDataAsCsv(params);
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
                flex: 1,
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
                    buttons: [
                        {
                            title: 'Ajout',
                            icon: 'add',
                            fn: () => {
                                this.add();
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
                    ]
                },
            }
        ];
        this.columnDefs[0]['children'] = columns;
        this.initTableData();
    }

    private initTableData() {
        this.svcService.getAll().subscribe((svc: any) => {
            this.gridOptions.rowData = svc;
        });
    }
}
