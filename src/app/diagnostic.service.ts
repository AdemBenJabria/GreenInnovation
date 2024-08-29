import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticService {
  private answers: { a: number; b: number; c: number } = { a: 0, b: 0, c: 0 };

  recordAnswer(answer: 'a' | 'b' | 'c') {
    this.answers[answer]++;
    console.log(answer);
  }

  getResults() {
    return this.answers;
  }

  reset() {
    console.log("RESET!");
    this.answers = { a: 0, b: 0, c: 0 };
  }
}
