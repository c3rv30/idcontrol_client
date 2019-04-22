import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AsistentesRoutes } from './asistentes.routing';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AsistentesComponent} from './asistentes.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AsistentesRoutes),
        DemoMaterialModule,
        FlexLayoutModule,
        FormsModule,
        QuillModule,
        ReactiveFormsModule,
        FileUploadModule,
        MatTreeModule,
        MatDatepickerModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    declarations: [AsistentesComponent]
})
export class AsistentesModule {}
