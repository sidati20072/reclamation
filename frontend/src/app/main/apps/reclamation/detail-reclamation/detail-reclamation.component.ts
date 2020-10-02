import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReclamationService} from '../reclamation.service';
import {DocumentModel, ReclamationModel} from '../reclamation.model';


@Component({
    selector: 'app-detail-reclamation',
    templateUrl: './detail-reclamation.component.html',
    styleUrls: ['./detail-reclamation.component.scss']
})
export class DetailReclamationComponent implements OnInit {
    id;
    reclamation: ReclamationModel;
    private selectedDoc: any;

    constructor(private route: ActivatedRoute, private reclamationService: ReclamationService) {
    }


    ngOnInit() {

        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getReclamation();
        });
    }

    private getReclamation() {
        this.reclamationService.getReclamation(this.id).subscribe((value: any) => {
            this.reclamation = value;
        });
    }

    voir(doc: DocumentModel) {
        this.reclamationService.getDocument(doc.id).subscribe((value: any) => {
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
        this.reclamationService.deleteDocument(doc.id).subscribe(value => {
            this.getReclamation();
        });
    }
}
