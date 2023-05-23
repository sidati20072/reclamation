import {DocumentModel} from '../reclamation/reclamation.model';

export class ContractModel {
    id: number;
    nom: string;
    note: string;
    documents: DocumentModel[];
}

