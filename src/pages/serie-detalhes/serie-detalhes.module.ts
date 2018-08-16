import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerieDetalhesPage } from './serie-detalhes';

@NgModule({
  declarations: [
    SerieDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(SerieDetalhesPage),
  ],
})
export class SerieDetalhesPageModule {}
