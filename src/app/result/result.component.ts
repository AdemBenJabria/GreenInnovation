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
    const value2 = results.get(1);
    const value5 = results.get(4);
    const value6 = results.get(5);

    if ((value2 === 'B' || value2 === 'C') && (value5 === 'B' || value5 === 'C') && value6 === 'B') {
      console.log('Feuille 3');
    }

    if ((value5 === 'A' || value5 === 'B') && value6 === 'B' && value2 === 'A') {
      console.log('Feuille 2');
    }

    if (value6 === 'A') {
      console.log('Feuille 1');
    }
    else {
      console.log('autre');
    }
  }

    /*results.forEach((value,key) => {
      if(key === 0){
        if(value === 'B' || value === 'C'){
          console.log('Feuille 1');
        }
      }
      if(key === 4){
        if(value)
      }
      
    })
  }*/

    /*const results = this.DiagnosticService.getResults();
    results.forEach((value,key) => {
      switch(key){
        case 1:
          if(value === 'B' || value === 'C'){
            console.log('Feuille 1');
          }
          break;
        case 4:
          if(value === 'B' || value === 'C'){
            console.log('Feuille 1');
          }
          break;
      }
    })
  }*/

  /*ngOnInit(): void {
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
  }*/
}
