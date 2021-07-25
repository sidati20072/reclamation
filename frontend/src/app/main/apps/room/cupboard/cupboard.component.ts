import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FuseConfirmDialogComponent} from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {DataTableService} from '../../../../Services/data-table.service';
import {Router} from '@angular/router';
import {TableType} from '../../../../models/Static';
import {isFirstColumn} from '../../../../shared/utils/grid-utils';
import {IdRendererComponent} from '../../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../../shared/renderer/doc-renderer/doc-renderer.component';
import {HeaderButtonsComponent} from '../../../../shared/header-buttons/header-buttons.component';
import {AddReclamationDocsComponent} from '../add-reclamation-docs/add-reclamation-docs.component';
import {CupboardService} from '../cupboard.service';
import {AddCupboardComponent} from '../add-cupboard/add-cupboard.component';

@Component({
    selector: 'app-cupboard',
    templateUrl: './cupboard.component.html',
    styleUrls: ['./cupboard.component.scss']
})
export class CupboardComponent implements OnInit {

    dialogRef: any;
    searchInput: FormControl;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    selectedCupboard: any;
    @Input()
    roomId;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private cupboardService: CupboardService,
        private route: Router
    ) {
    }

    ngOnInit(): void {
        this.dataTableService.getTableColumns(TableType.ROOM_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onSelectionChanged($event: any) {
        this.selectedCupboard = this.gridApi.getSelectedRows()[0];
        // do something
    }

    deleteContact() {
        /*this.cupboardService.delete(this.selectedCupboard.id).subscribe(value => {
            this._snackBar.open('Reclamation supprimé avec success', '', {
                duration: 3000,
            });
            this.initTableData();
        }, error1 => {
            this._snackBar.open('erreur de suppression ', '', {
                duration: 3000,
            });
        });*/
    }

    onExport() {
        const params = {
            columnSeparator: ';', fileName: 'export_armoire_' + new Date().getTime()
        };
        this.gridApi.exportDataAsCsv(params);
    }

    show() {
        this.route.navigate(['/apps/rooms/' + this.selectedCupboard.id]);
    }

    add(): void {
        const room = {id: this.roomId};
        let cupboard;
        if (this.selectedCupboard) {
            cupboard = this.selectedCupboard;
            cupboard.room = room;
        } else {
            cupboard = {room};
        }
            this.dialogRef = this._matDialog.open(AddCupboardComponent, {
                panelClass: 'contact-form-dialog',
                data: {
                    action: 'new',
                    cupboard: cupboard
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
                            title: 'voir',
                            icon: 'visibility',
                            fn: () => {
                                this.show();
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
        this.cupboardService.getRoomCupboard(this.roomId).subscribe((values: any) => {
            this.gridOptions.rowData = values;
        });
    }

    private addDocument() {
        this.dialogRef = this._matDialog.open(AddReclamationDocsComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                reclamation: this.selectedCupboard
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.initTableData();
        });
    }

}
