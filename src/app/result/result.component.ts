import { Component } from '@angular/core';
import { DiagnosticService } from '../diagnostic.service'; 

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  resultMessage: string = '';

  constructor(private DiagnosticService: DiagnosticService) { }

  ngOnInit(): void {
    const results = this.DiagnosticService.getResults();
    if (results.a > results.b && results.a > results.c) {
      this.resultMessage = 'Votre diagnostic est A';
    } else if (results.b > results.a && results.b > results.c) {
      this.resultMessage = 'Votre diagnostic est B';
    } else if (results.c > results.a && results.c > results.b) {
      this.resultMessage = 'Votre diagnostic est C';
    }
    else {
      this.resultMessage = 'Vous devez refaire le diagnostic';
    }
  }
}
