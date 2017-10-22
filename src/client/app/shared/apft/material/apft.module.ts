import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { ApftMaterialComponent } from './apft.component'
import { ApftService } from '../apft.service'
import {
  MatButtonModule, MatButtonToggleModule, MatDatepickerModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule,
  MatProgressSpinnerModule, MatRadioModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule
  ],
  declarations: [ApftMaterialComponent],
  exports: [ApftMaterialComponent]
})
export class ApftModule {
  static forRoot(configuredProvider: any): ModuleWithProviders {
    return {
      ngModule: ApftModule,
      providers: [
        configuredProvider,
        ApftService
      ]
    }
  }
}
