import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: '',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'reclamations',
                title: 'Reclamations',
                type: 'item',
                icon: 'account_box',
                url: '/apps/reclamations'
            },
            {
                id: 'contrats',
                title: 'Contrat',
                type: 'item',
                icon: 'account_box',
                url: '/apps/contrats'
            },
            {
                id: 'contacts',
                title: 'Utilisateurs',
                type: 'item',
                icon: 'account_box',
                url: '/apps/utilisateur'
            },


        ]
    }
];

export const managerNavigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: '',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'reclamation',
                title: 'reclamation',
                type: 'item',
                icon: 'account_box',
                url: '/apps/reclamation'
            },
        ]
    }
];
