import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {JarwisService} from 'app/Services/jarwis.service';
import {TokenService} from 'app/Services/token.service';
import {Router} from '@angular/router';
import {AuthService} from 'app/Services/auth.service';
import {managerNavigation, navigation} from '../../../../navigation/navigation';
import {FuseNavigationService} from '../../../../../@fuse/components/navigation/navigation.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFailed: Boolean;
    navigation: any;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _formBuilder: FormBuilder,
        private Jarwis: JarwisService,
        private Token: TokenService,
        private authService: AuthService,
        private router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
        this.loginFailed = false;
    }

    onSubmit() {
        this.authService.login(this.loginForm.value).subscribe(
            result => {
                // this.handleResponse(result.headers.get('authorization'));
                this.authService.saveToken(result.headers.get('authorization'));
                this.authService.isAdmin() || this.authService.isClient() ?
                    this.router.navigateByUrl('/apps/contacts') : this.authService.logout();
                // Get default navigation
                this.navigation = this.authService.isAdmin() ? navigation : managerNavigation;
                if (this.authService.isAdmin()) {
                    localStorage.setItem('role', 'ADMIN');
                }else {
                    localStorage.setItem('role', 'USER');
                }
                this._fuseNavigationService.unregister('main');
                // Register the navigation to the service
                this._fuseNavigationService.register('main', this.navigation);

                // Set the main navigation as our current navigation
                this._fuseNavigationService.setCurrentNavigation('main');

                this.loginFailed = false;
            },
            error => {
                this.loginFailed = true;
            }
        );
    }

    handleResponse(data) {
        this.Token.handle(data);

        if (this.Token.admin) {
            // this.Token.setName(data.nom+" "+data.prenom)
            this.router.navigateByUrl('/apps/contacts');
        }


        console.log('admin? ' + this.Token);
        console.log('admin? ' + this.Token.admin);
        console.log('loged? ' + this.Token.loggedIn);

    }

}
