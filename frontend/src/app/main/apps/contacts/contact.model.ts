import { FuseUtils } from '@fuse/utils';

export class Contact
{
    id: string;
    username: string;
    password: string;
    nom: string;
    prenom: string;
    nomResto: string;
    civilite: string;
    tel: string;
    email: string;
    createAt: string;
    resetToken: string;
    logo: string;
    avatar: string;
    limitEmp:any;
    nomCenter:any;
    roles:any;
    active: boolean;
    etat: boolean;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.nom = contact.nom || '';
            this.username = contact.username || '';
            this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';
            this.prenom = contact.prenom || '';
            this.nomResto = contact.nomResto || '';
            this.civilite = contact.civilite || '';
            this.nomCenter = contact.nomCenter || '';
            this.tel = contact.tel || '';
            this.email = contact.email || '';
            this.createAt = contact.createAt || '';
            this.resetToken = contact.resetToken || '';
            this.logo = contact.logo;
            this.limitEmp = contact.limitEmp;
            this.roles= contact.roles || '';
            this.etat = contact.etat || 'b';
        }
    }
}
