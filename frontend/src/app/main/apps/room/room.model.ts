export class DocumentModel {
    id: number;
    documentType: DocumentType;
    link: string;
    number: string;
    createdAt: Date;
    keyName: String;
    status: DocumentStatus;
    serviceActually: SvcModel;
    serviceOrigin: SvcModel;
    isBlocked;
    permis;
    acte;
    titreFoncier;
    quittance;
    order;
    mouvementDate: Date;



}

export class RoomModel {
    id: number;
    createAt: Date;
    updatedAt: Date;
    number: string;
    note: string;
    isActive: boolean;
}

export class CupboardModel {
    id: number;
    createAt: Date;
    updatedAt: Date;
    number: string;
    note: string;
}

export class LockerModel {
    id: number;
    createAt: Date;
    updatedAt: Date;
    number: string;
    note: string;
}
export class BoitierModel {
    id: number;
    createAt: Date;
    updatedAt: Date;
    number: string;
    note: string;
}

export class SvcModel {
    id: number;
    createAt: Date;
    updatedAt: Date;
    name: string;
    note: string;
}

export enum DocumentType {
    PO = 'PO',
    TF = 'TF'
}

export enum DocumentStatus {
    IN = 'IN',
    OUT = 'OUT'
}
