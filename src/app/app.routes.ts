import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'questionnaire', component: QuestionnaireComponent },
    { path: 'result', component: ResultComponent },
    { path: '', redirectTo: '/questionnaire', pathMatch: 'full' },
];
