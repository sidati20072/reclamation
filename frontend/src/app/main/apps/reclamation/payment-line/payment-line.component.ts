import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GridApi, GridOptions} from 'ag-grid-community';
import {DataTableService} from '../../../../Services/data-table.service';
import {ReclamationService} from '../reclamation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TableType} from '../../../../models/Static';
import {isFirstColumn} from '../../../../shared/utils/grid-utils';
import {IdRendererComponent} from '../../../../shared/renderer/id-renderer/id-renderer.component';
import {DocRendererComponent} from '../../../../shared/renderer/doc-renderer/doc-renderer.component';
import {HeaderButtonsComponent} from '../../../../shared/header-buttons/header-buttons.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-payment-line',
    templateUrl: './payment-line.component.html',
    styleUrls: ['./payment-line.component.scss']
})
export class PaymentLineComponent implements OnInit {

    dialogRef: any;
    searchInput: FormControl;
    columnDefs;
    gridOptions: GridOptions;
    gridApi: GridApi;
    gridColumnApi;
    selectedPaymentLine: any;
    reclamationId;
    reclamation;
    private role: any;
   totalPaid: number = 0;

    constructor(
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private dataTableService: DataTableService,
        private reclamationService: ReclamationService,
        private route: Router,
        private activateRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.activateRoute.params.subscribe(params => {
            this.reclamationId = +params['id'];
        });
        this.role = localStorage.getItem('role');
        this.dataTableService.getTableColumns(TableType.PAYMENT_LINE_VIEW).subscribe(columns => {
            this.initTableConfig(columns);
        });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onSelectionChanged($event: any) {
        this.selectedPaymentLine = this.gridApi.getSelectedRows()[0];
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
                },
            }
        ];
        this.columnDefs[0]['children'] = columns;
        this.initTableData();
    }

    deleteContact() {
        this.reclamationService.deletePaymentLine(this.selectedPaymentLine.id).subscribe(value => {
            this._snackBar.open('Account line supprimé avec success', '', {
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
        this.reclamationService.getPaymentLineByReclamation(this.reclamationId).subscribe((reclamations: any) => {
            this.gridOptions.rowData = reclamations;
            this.reclamation = reclamations ? reclamations[0].reclamation : {};
            this.totalPaid = reclamations.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
        });
    }

    onExport() {
        const params = {
            columnSeparator: ';'
        };
        this.gridApi.exportDataAsCsv(params);
    }

}
