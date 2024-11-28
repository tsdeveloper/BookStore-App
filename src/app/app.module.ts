import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LivrosComponent } from './livros/livros.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AutoresComponent } from './autores/autores.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
// registerlocaledata
registerLocaleData(ptBr);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    DashboardModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },

    /* if you don't provide the currency symbol in the pipe,
        this is going to be the default symbol (R$) ... */
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
