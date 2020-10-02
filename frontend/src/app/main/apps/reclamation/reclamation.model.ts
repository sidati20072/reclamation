export class DocumentModel {
    id: number;
    type: DocumentType;
    link: string;
    createdAt: Date;
    keyName: String;

}

export class ReclamationModel {
    id: number;
    lot: string;
    etat: string;
    documents: DocumentModel[];
}

export enum DocumentType {
    AVIS = 'AVIS',
    COMMANDE = 'COMMANDE',
    DEMANDE = 'DEMANDE',
    FICHE = 'FICHE',
    AUTRE = 'AUTRE',
}
