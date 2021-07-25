import {Component, Input, OnInit} from '@angular/core';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DataTableService} from '../../../../Services/data-table.service';
import {TableType} from '../../../../models/Static';
import {isFirstColumn} from '../../../../shared/utils/grid-utils';
import {DocRendererComponent} from '../../../../shared/renderer/doc-renderer/doc-renderer.component';
import {HeaderButtonsComponent} from '../../../../shared/header-buttons/header-buttons.component';
import {AddReclamationDocsComponent} from '../../room/add-reclamation-docs/add-reclamation-docs.component';
import {DocumentService} from '../../room/document.service';
import {ShowDocumentComponent} from '../show-document/show-document.component';
import {MoveDocumentComponent} from '../move-document/move-document.component';
import {BlockStatusComponent} from '../../../../shared/renderer/block-status/block-status.component';
import {DocumentModel} from '../../room/room.model';
import {FicheComponent} from '../fiche/fiche.component';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

    dialogRef: any;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    selectedDocument: DocumentModel;
    @Input()
    boitierId;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private documentService: DocumentService) {}

    ngOnInit(): void {
        this.dataTableService.getTableColumns(TableType.DOCUMENT_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onSelectionChanged($event: any) {
        this.selectedDocument = this.gridApi.getSelectedRows()[0];
        // do something
    }

    move() {
        this.dialogRef = this._matDialog.open(MoveDocumentComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                doc: this.selectedDocument
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.initTableData();
        });
    }

    show() {
        this.dialogRef = this._matDialog.open(ShowDocumentComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                doc: this.selectedDocument
            }
        });
    }

    add(): void {
        const boitier = {id: this.boitierId};
        let doc;
        if (this.selectedDocument) {
            doc = this.selectedDocument;
            doc.boitier = boitier;
        } else {
            doc = {boitier};
        }
        this.dialogRef = this._matDialog.open(AddReclamationDocsComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                doc: doc
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
                docRenderer: DocRendererComponent,
                blockStatusRenderer: BlockStatusComponent,
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
                            title: 'Transfert',
                            icon: 'import_export',
                            fn: () => {
                                this.move();
                            }
                        },
                        {
                            title: 'Print',
                            icon: 'print',
                            fn: () => {
                                this.print();
                            },
                            disabled: () => {
                                return this.selectedDocument == null || this.selectedDocument.mouvementDate == null;
                            }
                        },
                        {
                            title: 'Bloquer',
                            icon: 'block',
                            fn: () => {
                                this.block(true);
                            },
                            disabled: () => {
                                return this.selectedDocument == null || this.selectedDocument.isBlocked;
                            }
                        },
                        {
                            title: 'Débloquer',
                            icon: 'check_circle_outline',
                            fn: () => {
                                this.block(false);
                            },
                            disabled: () => {
                                return this.selectedDocument == null || !this.selectedDocument.isBlocked;
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
        this.documentService.getBoitierDocs(this.boitierId).subscribe((values: any) => {
            this.gridOptions.rowData = values;
        });
    }

    private print() {
        const type = this.selectedDocument.serviceActually.id === this.selectedDocument.serviceOrigin.id ? 'sortie' : 'entrée';
        this.dialogRef = this._matDialog.open(FicheComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new',
                data: {
                    type: type,
                    doc: this.selectedDocument
                }
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.initTableData();
        });
    }

    private block(etat) {
        this.selectedDocument.isBlocked = etat;
        this.documentService.update(this.selectedDocument).subscribe(value => {
            this.initTableData();
        });
    }
}
