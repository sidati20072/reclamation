import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {MatRadioModule} from '@angular/material/radio';
import 'hammerjs';
import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {MatVideoModule} from 'mat-video';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {JarwisService} from './Services/jarwis.service';
import {AuthGuardService} from './Services/auth-guard.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from './main/apps/contacts/alert/alert.component';
import {UserService} from './Services/user.service';
import {AuthService} from './Services/auth.service';
import {ResetServiceService} from './main/pages/authentication/reset-password/reset-service.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FakeDbService} from './fake-db/fake-db.service';

import { PdfViewerModule } from 'ng2-pdf-viewer';

library.add(fas, far, fab);

const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule',
        // canActivate: [AuthGuardService]
    },
    {
        path: 'ui',
        loadChildren: './main/ui/ui.module#UIModule'
    },
    {
        path: '**',
        redirectTo: 'apps/dashboards/analytics'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
    ],
    imports: [
        MatRadioModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatVideoModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FontAwesomeModule,
        TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,
        // Material
        MatButtonModule,
        MatIconModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        // App modules
        LayoutModule,
        MatSnackBarModule,
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        PdfViewerModule,
    ],
    providers: [
        ResetServiceService,
        AuthService,
        JarwisService,
        UserService,
    ],
    bootstrap: [
        AppComponent
    ],
    exports: [FontAwesomeModule],
    entryComponents: [
        AlertComponent
    ]
})
export class AppModule {
}
