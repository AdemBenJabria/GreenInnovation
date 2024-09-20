import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { ENV } from '../../ENV/environment';
declare const window: any;


@Injectable({
  providedIn: 'root'
})
export class AiRseService {
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  private apiKey = (window as any).__env.geminiApiKey;

  constructor(private http: HttpClient) {
    // Ajout de logs pour vérifier la clé API récupérée
    console.log("Clé API récupérée depuis env.js : ", this.apiKey);
    
    if (!this.apiKey) {
      throw new Error('La clé API Gemini n\'est pas définie.');
    }
  }

  getResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, { headers }).pipe(
      catchError(error => {
        console.error(`Request failed with status ${error.status}: ${error.message}`);
        return throwError(() => error);
      })
    );
  }
}
