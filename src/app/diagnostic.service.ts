import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticService {
  //private answers: { a: number; b: number; c: number } = { a: 0, b: 0, c: 0 };
  private response : Map<number,string> = new Map([
    [0, 'Z'],
    [1, 'Z'],
    [2, 'Z'],
    [3, 'Z'],
    [4, 'Z'],
    [5, 'Z'],
  ]);

  public getResponse(){
    return this.response
  }

  public updateResponse(key: number, value: 'A' | 'B' | 'C') {
    if(this.response.has(key)){
      this.response.set(key,value);
      console.log(this.response);

    }
    else {
      console.error('La réponse ${key} nest pas valide');
    }
  }

  getResults() {
    return this.response;
  }

  reset() {
    console.log("RESET!");
    this.response = new Map<number, string>([ 
      [0, 'Z'],
      [1, 'Z'],
      [2, 'Z'],
      [3, 'Z'],
      [4, 'Z'],
      [5, 'Z']
  ]);
}
}
