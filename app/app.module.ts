import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { Chart1Component } from './chart1.component';
import { Chart2Component } from './chart2.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './grid/grid.component';
import { OpportunitiesComponent } from './grid/opportunities.component';
import { HeaderComponent } from './header/header.component';
import { Chart3Component } from './chart3.component';
import { Chart4Component } from './chart4.component';
import { FooterComponent } from './footer/footer.component';
import { ChartHeaderComponent } from './chart-header.component';
import { MomentsGridComponent } from './grid/moments-grid/moments-grid.component';
import { AppRoutingModule } from './app-routing.module';
import { SentimentJourneyComponent } from './sentiment-journey/sentiment-journey.component';
import { ClientActivityComponent } from './client-activity/client-activity.component';

@NgModule({
  imports: [
    ChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    PDFExportModule,
    AgGridModule.withComponents([GridComponent]),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    Chart4Component,
    GridComponent,
    OpportunitiesComponent,
    MomentsGridComponent,
    HeaderComponent,
    FooterComponent,
    ChartHeaderComponent,
    SentimentJourneyComponent,
    ClientActivityComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
