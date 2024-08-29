import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import du CommonModule
import { Router } from '@angular/router';
import { DiagnosticService } from '../diagnostic.service';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule],  // Importation de CommonModule ici
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {
  questions = [
    {
      question: 'Êtes-vous motivé(e) à mettre en place la RSE ?',
      options: ['assets/img/a1.png', 'assets/img/a2.png', 'assets/img/a3.png'],
    },
    {
      question: 'Avez-vous le soutien du management ?',
      options: ['assets/img/b1.png', 'assets/img/b2.png', 'assets/img/b3.png'],
    },
    {
      question: 'Rencontrez-vous de la résistance au changement ?',
      options: ['assets/img/c1.png', 'assets/img/c2.png', 'assets/img/c3.png'],
    },
    {
      question: 'Vos Équipes sont-elles sensibilisées à la RSE ?',
      options: ['assets/img/d1.png', 'assets/img/d2.png', 'assets/img/d3.png'],
    },
    {
      question: 'Avez-vous le budget pour les initiatives RSE ?',
      options: ['assets/img/e1.png', 'assets/img/e2.png', 'assets/img/e3.png'],
    },
    {
      question: 'Où en êtes-vous dans la mise en place des actions RSE au sein de votre entreprise ?',
      options: ['assets/img/f1.png', 'assets/img/f2.png', 'assets/img/f3.png'],
    },
  ];

  currentQuestionIndex = 0;

  constructor(private diagnosticService: DiagnosticService, private router: Router) { }

  selectAnswer(answer: 'a' | 'b' | 'c') {
    this.diagnosticService.recordAnswer(answer);
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.router.navigate(['/result']);
    }
  }
}
