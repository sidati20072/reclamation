import {NgModule} from '@angular/core';
import 'hammerjs';
import {RoleRendererComponent} from './renderer/role-renderer/role-renderer.component';
import {CommonModule} from '@angular/common';
import { HeaderButtonsComponent } from './header-buttons/header-buttons.component';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule, MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule, MatSlideToggleModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {FuseSidebarModule} from '../../@fuse/components';
import { IdRendererComponent } from './renderer/id-renderer/id-renderer.component';
import { DocRendererComponent } from './renderer/doc-renderer/doc-renderer.component';
import { BlockStatusComponent } from './renderer/block-status/block-status.component';
import {ShowDocumentComponent} from '../main/apps/locker/show-document/show-document.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
    declarations: [
        RoleRendererComponent,
        HeaderButtonsComponent,
        IdRendererComponent,
        DocRendererComponent,
        BlockStatusComponent,
        ShowDocumentComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatTableModule,
        TranslateModule,
        MatPaginatorModule,
        FuseSharedModule,
        FuseSidebarModule,
        MatPaginatorModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        PdfViewerModule,

    ],
    exports: [
        RoleRendererComponent,
        HeaderButtonsComponent,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatTableModule,
        TranslateModule,
        MatPaginatorModule,
        FuseSharedModule,
        FuseSidebarModule,
        MatPaginatorModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        IdRendererComponent,
        DocRendererComponent,
        PdfViewerModule,

    ],
    entryComponents: [
        RoleRendererComponent,
        HeaderButtonsComponent,
        IdRendererComponent,
        DocRendererComponent,
        ShowDocumentComponent
    ]
})
export class SharedModule {
}
