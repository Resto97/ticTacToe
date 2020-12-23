import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { CellComponent } from './components/cell/cell.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { TableConfig } from './services/table-config';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CellComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: TableConfig,
      useValue: new TableConfig(4, 5, 4),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
