import {DocumentModel} from '../reclamation/reclamation.model';

export class ContractModel {
    id: number;
    nom: string;
    address: string;
    date: string;
    payment: string;
    loyer: string;
    paymentDuration: string;
    lastPayment: string;
    documents: DocumentModel[];
    raisonSociale: string;


}

