import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {FuseUtils} from '@fuse/utils';

import {Contact} from 'app/main/apps/contacts/contact.model';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ContactsService implements Resolve<any> {
    projects: any[];
    widgets: any[];


    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    contacts: Contact[];
    user: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getContacts(),
                this.getUserData(),
                this.getProjects(),
                this.getWidgets()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getContacts();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getContacts();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any> {
        return new Promise((resolve, reject) => {
                this._httpClient.get(environment.url + 'users/all')
                    .subscribe((response: any) => {
                        this.contacts = response;

                        if (this.filterBy === 'pro') {
                            this.contacts = this.contacts.filter(_contact =>
                                _contact.roles[0].role === 'RESTO'
                            );
                        } else if (this.filterBy === 'client') {
                            this.contacts = this.contacts.filter(_contact =>
                                _contact.roles[0].role === 'CLIENT'
                            );
                        } else {
                            this.contacts = this.contacts.filter(_contact => {
                                if ((_contact.roles.map(function (e) {
                                        return e.role;
                                    }) != 'ADMIN')
                                    && (_contact.roles.map(function (e) {
                                        return e.role;
                                    }) != 'EMPLOYEE')) {

                                    return _contact;
                                }
                            });
                        }

                        if (this.searchText && this.searchText !== '') {
                            this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                        }

                        this.contacts = this.contacts.map(contact => {
                            return new Contact(contact);
                        });


                        this.onContactsChanged.next(this.contacts);
                        resolve(this.contacts);

                    }, reject);
            }
        );
    }

    addContact(contact) {

        console.log('add');
        console.log(contact);
        return new Promise((resolve, reject) => {

            this._httpClient.post(environment.url + 'signup', {...contact})
                .subscribe(response => {
                    console.log(response);

                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise<any> {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
                    .subscribe((response: any) => {
                        this.user = response;
                        this.onUserDataChanged.next(this.user);
                        resolve(this.user);
                    }, reject);
            }
        );
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact) {
        const contactUpt = {
            username: String,
            nom: String,
            prenom: String,
            nomResto: String,
            tel: String,
            email: String,
            civilite: String,
            limitEmp: String,
            active: Boolean,
            etat: Boolean
        };

        contactUpt.tel = contact.tel;
        contactUpt.email = contact.email;
        contactUpt.nom = contact.nom;
        contactUpt.prenom = contact.prenom;
        contactUpt.nomResto = contact.nomResto;
        contactUpt.civilite = contact.civilite;
        contactUpt.username = contact.username;
        contactUpt.limitEmp = contact.limitEmp;
        contactUpt.active = contact.active;
        contactUpt.etat = contact.etat;

        return this._httpClient.patch(environment.url + 'users/' + contact.id, contactUpt);
    }

    /**
     * Deselect contacts
     */
    deselectContacts(): void {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void {
        const contactIndex = this.contacts.indexOf(contact);
        this.contacts.splice(contactIndex, 1);
        this.onContactsChanged.next(this.contacts);
    }

    /**
     * Delete selected contacts
     */

    /**
     * Get projects
     *
     * @returns {Promise<any>}
     */
    getProjects(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-projects')
                .subscribe((response: any) => {
                    this.projects = response;
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-widgets')
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }
}
