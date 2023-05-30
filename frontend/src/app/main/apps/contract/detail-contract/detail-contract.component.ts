import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContractService} from '../contract.service';
import {ContractModel} from '../contract.model';
import {DocumentModel} from '../../reclamation/reclamation.model';


@Component({
    selector: 'app-detail-contract',
    templateUrl: './detail-contract.component.html',
    styleUrls: ['./detail-contract.component.scss']
})
export class DetailContractComponent implements OnInit {
    id;
    reclamation: ContractModel;
    public selectedDoc: any;

    constructor(private route: ActivatedRoute, private contractService: ContractService) {
    }


    ngOnInit() {

        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getReclamation();
        });
    }

    voir(doc: DocumentModel) {
        this.contractService.getDocument(doc.id).subscribe((value: any) => {
            this.selectedDoc = 'data:application/pdf;base64,' + value.docSrc;
            console.log(this.selectedDoc);
        }, error1 => {
            console.log(error1);
        });
    }

    showErrorMsg() {

    }

    pdfRendered() {

    }

    showLoadingMsg() {

    }

    delete(doc: DocumentModel) {
        this.contractService.deleteDocument(doc.id).subscribe(value => {
            this.getReclamation();
        });
    }

    isAdmin() {
        const role = localStorage.getItem('role');
        return role && role === 'ADMIN';
    }

    private getReclamation() {
        this.contractService.getcontract(this.id).subscribe((value: any) => {
            this.reclamation = value;
        });
    }
}
