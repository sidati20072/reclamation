import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ResetPasswordComponent } from 'app/main/pages/authentication/reset-password/reset-password.component';
import {ContactsService} from '../../../apps/contacts/contacts.service';
import {ResetServiceService} from './reset-service.service';
import {HttpClientModule} from '@angular/common/http';

const routes = [
    {
        path     : 'auth/reset/:token',
        component: ResetPasswordComponent
    }
];

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        HttpClientModule,

        FuseSharedModule
    ],
    providers      : [
        ResetServiceService
    ],
})
export class ResetPasswordModule
{
}
