import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

const routes: Routes = [
    {
        path        : 'app',
        loadChildren: './getting-started/getting-started.module#GettingStartedModule'
    }
];

@NgModule({
    declarations: [
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatIconModule,

        FuseSharedModule
    ]
})
export class DocumentationModule
{
}
