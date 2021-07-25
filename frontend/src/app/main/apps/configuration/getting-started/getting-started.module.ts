import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseHighlightModule} from '@fuse/components';

import {DocsGettingStartedIntroductionComponent} from 'app/main/apps/configuration/getting-started/introduction/introduction.component';
import {DocsGettingStartedInstallationComponent} from 'app/main/apps/configuration/getting-started/installation/installation.component';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule
} from '@angular/material';
import {PresentationComponent} from './presentation/presentation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AlertComponent} from './alert/alert.component';
import {AngularFileUploaderModule} from "angular-file-uploader";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';

import {MatVideoModule} from 'mat-video';
import {NgxEditorModule} from "ngx-editor";
import {TooltipModule} from "ngx-bootstrap";

const routes = [
    {
        path     : 'politiques',
        component: DocsGettingStartedIntroductionComponent
    },
    {
        path     : 'conf',
        component: DocsGettingStartedInstallationComponent
    }
    ,
    {
        path     : 'presentation',
        component: PresentationComponent
    }
];

@NgModule({
    declarations: [
        DocsGettingStartedIntroductionComponent,
        DocsGettingStartedInstallationComponent,
        PresentationComponent,
        AlertComponent
    ],
    entryComponents: [
        AlertComponent
      ],
    imports     : [
        RouterModule.forChild(routes),
        MatVideoModule,
        MatIconModule,
        AngularFileUploaderModule,
        FuseSharedModule,
        NgxEditorModule,
        FuseHighlightModule,
        MatSnackBarModule,
        MatButtonModule, 
        MatProgressBarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatGridListModule,
        MatSlideToggleModule,
        MatTabsModule,
        FuseSharedModule,
        TooltipModule.forRoot(),
    ]
})
export class GettingStartedModule
{
}
