import {Component, OnInit} from '@angular/core';
import {GridApi, GridOptions} from 'ag-grid-community';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DataTableService} from '../../../../Services/data-table.service';
import {DocumentService} from '../../room/document.service';
import {TableType} from '../../../../models/Static';
import {isFirstColumn} from '../../../../shared/utils/grid-utils';
import {DocRendererComponent} from '../../../../shared/renderer/doc-renderer/doc-renderer.component';
import {BlockStatusComponent} from '../../../../shared/renderer/block-status/block-status.component';
import {HeaderButtonsComponent} from '../../../../shared/header-buttons/header-buttons.component';
import {ShowDocumentComponent} from '../../locker/show-document/show-document.component';

@Component({
  selector: 'app-show-list-document',
  templateUrl: './show-document-list.component.html',
  styleUrls: ['./show-document-list.component.scss']
})
export class ShowDocumentListComponent implements OnInit {


  dialogRef: any;
  columnDefs;
  gridOptions: GridOptions;
  gridApi: GridApi;
  gridColumnApi;
  selectedDocument: any;


  constructor(
      private _matDialog: MatDialog,
      private _snackBar: MatSnackBar,
      private dataTableService: DataTableService,
      private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.dataTableService.getTableColumns(TableType.DOCUMENT_LIST_VIEW).subscribe(columns => {
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

  onExport() {
    const params = {
      columnSeparator: ';', fileName: 'export_document_listo_' + new Date().getTime()
    };
    this.gridApi.exportDataAsCsv(params);
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
              title: 'voir',
              icon: 'visibility',
              fn: () => {
                this.show();
              },
              disabled: () => {
                return this.selectedDocument == null || this.selectedDocument.isBlocked;
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
    this.documentService.getAll().subscribe((values: any) => {
      this.gridOptions.rowData = values;
    });
  }

}
