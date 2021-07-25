import {Component, OnInit} from '@angular/core';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DataTableService} from '../../../Services/data-table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TableType} from '../../../models/Static';
import {isFirstColumn} from '../../../shared/utils/grid-utils';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';
import {HeaderButtonsComponent} from '../../../shared/header-buttons/header-buttons.component';
import {LockerService} from '../room/locker.service';
import {AddLockerComponent} from './add-locker/add-locker.component';

@Component({
    selector: 'app-locker',
    templateUrl: './locker.component.html',
    styleUrls: ['./locker.component.scss']
})
export class LockerComponent implements OnInit {

    dialogRef: any;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    selectedLocker: any;
    currentCupboardId;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private lockerService: LockerService,
        private route: Router,
        private activateRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activateRoute.params.subscribe(value => {
            this.currentCupboardId = value.id;
            this.dataTableService.getTableColumns(TableType.LOCKER_VIEW).subscribe(columns => {
                this.initTableConfig(columns);
            });
        });

    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onSelectionChanged($event: any) {
        this.selectedLocker = this.gridApi.getSelectedRows()[0];
        // do something
    }


    onExport() {
        const params = {
            columnSeparator: ';', fileName: 'export_locker_' + new Date().getTime()
        };
        this.gridApi.exportDataAsCsv(params);
    }


    add(): void {
        const cupboard = {id: this.currentCupboardId};
        let locker;
        if (this.selectedLocker) {
            locker = this.selectedLocker;
            locker.cupboard = cupboard;
        } else {
            locker = {cupboard};
        }
        this.dialogRef = this._matDialog.open(AddLockerComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                locker: locker
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
        this.lockerService.getCupboardLocker(this.currentCupboardId).subscribe((values: any) => {
            this.gridOptions.rowData = values;
        });
    }


}
