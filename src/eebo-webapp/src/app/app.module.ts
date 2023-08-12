import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

//primeng
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RodadaComponent } from './components/rodada/rodada.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SorteioComponent } from './components/sorteio/sorteio.component';

@NgModule({
  declarations: [AppComponent, RodadaComponent, SorteioComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,

    //primeng
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    MessagesModule,
    ConfirmDialogModule,
    InputTextareaModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
