import {Component, OnInit} from '@angular/core';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DataTableService} from '../../../Services/data-table.service';
import {TableType} from '../../../models/Static';
import {isFirstColumn} from '../../../shared/utils/grid-utils';
import {HeaderButtonsComponent} from '../../../shared/header-buttons/header-buttons.component';
import {RoomService} from './room.service';
import {AddReclamationComponent} from './add-reclamation/add-reclamation.component';
import {AddReclamationDocsComponent} from './add-reclamation-docs/add-reclamation-docs.component';
import {IdRendererComponent} from '../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../shared/renderer/doc-renderer/doc-renderer.component';

@Component({
    selector: 'app-reclamation',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    dialogRef: any;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    selectedRoom: any;
    private role: any;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private roomService: RoomService,
    ) {
    }

    ngOnInit(): void {
        this.role = localStorage.getItem('role');
        this.dataTableService.getTableColumns(TableType.ROOM_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });
    }

    add(): void {
        this.dialogRef = this._matDialog.open(AddReclamationComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                reclamation: this.selectedRoom != null ? this.selectedRoom : {}
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
        this.selectedRoom = this.gridApi.getSelectedRows()[0];
        // do something
    }

    deleteContact() {
        this.roomService.delete(this.selectedRoom.id).subscribe(value => {
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

    onExport() {
        const params = {
            columnSeparator: ';', fileName: 'export_salle_' + new Date().getTime()
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
                    buttons: this.role && this.role === 'ADMIN' ? [
                        {
                            title: 'Ajout',
                            icon: 'add',
                            fn: () => {
                                this.add();
                            }
                        },
                        {
                            title: 'Ajouter un document ',
                            icon: 'description',
                            fn: () => {
                                this.addDocument();
                            },
                            disabled: () => {
                                this.selectedRoom == null;
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
        this.columnDefs[0]['children'] = columns;
        this.initTableData();
    }

    private initTableData() {
        this.roomService.getRooms().subscribe((rooms: any) => {
            this.gridOptions.rowData = rooms;
        });
    }

    private addDocument() {
        this.dialogRef = this._matDialog.open(AddReclamationDocsComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                reclamation: this.selectedRoom
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.initTableData();
        });
    }

}
