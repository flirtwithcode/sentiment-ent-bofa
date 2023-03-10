import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientActivityComponent } from './client-activity/client-activity.component';
import { SentimentJourneyComponent } from './sentiment-journey/sentiment-journey.component';

const routes: Routes = [
  {
    path: '',
    component: SentimentJourneyComponent,
  },
  {
    path: 'clientActivity',
    component: ClientActivityComponent,
  },
  {
    path: 'payOnExternalBill',
    component: SentimentJourneyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
