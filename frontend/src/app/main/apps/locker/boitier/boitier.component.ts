import {Component, Input, OnInit} from '@angular/core';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DataTableService} from '../../../../Services/data-table.service';
import {TableType} from '../../../../models/Static';
import {isFirstColumn} from '../../../../shared/utils/grid-utils';
import {IdRendererComponent} from '../../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../../shared/renderer/doc-renderer/doc-renderer.component';
import {HeaderButtonsComponent} from '../../../../shared/header-buttons/header-buttons.component';
import {AddBoitierComponent} from '../add-boitier/add-boitier.component';
import {BoitierService} from '../../room/boitier.service';

@Component({
    selector: 'app-boitier',
    templateUrl: './boitier.component.html',
    styleUrls: ['./boitier.component.scss']
})
export class BoitierComponent implements OnInit {

    dialogRef: any;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    selectedBoitier: any;
    @Input()
    lockerId;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private boitierService: BoitierService,
    ) {
    }

    ngOnInit(): void {
        this.dataTableService.getTableColumns(TableType.BOITIER_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });

    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onSelectionChanged($event: any) {
        this.selectedBoitier = this.gridApi.getSelectedRows()[0];
        // do something
    }


    onExport() {
        const params = {
            columnSeparator: ';'
        };
        this.gridApi.exportDataAsCsv(params);
    }


    add(): void {
        const locker = {id: this.lockerId};
        let boitier;
        if (this.selectedBoitier) {
            boitier = this.selectedBoitier;
            boitier.locker = locker;
        } else {
            boitier = {locker};
        }
        this.dialogRef = this._matDialog.open(AddBoitierComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                boitier: boitier
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.initTableData();
        });
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
        this.boitierService.getAll(this.lockerId).subscribe((values: any) => {
            this.gridOptions.rowData = values;
        });
    }


}
