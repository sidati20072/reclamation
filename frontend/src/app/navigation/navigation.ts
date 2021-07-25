import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: '',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'rooms',
                title: 'Gérer vos documents',
                type: 'item',
                icon: 'account_box',
                url: '/apps/rooms'
            },
            {
                id: 'contacts',
                title: 'Utilisateurs',
                type: 'item',
                icon: 'account_box',
                url: '/apps/utilisateur'
            },
            {
                id: 'svc',
                title: 'Service',
                type: 'item',
                icon: 'account_box',
                url: '/apps/service'
            },
            {
                id: 'document',
                title: 'Document',
                type: 'item',
                icon: 'folder',
                url: '/apps/documents'
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
