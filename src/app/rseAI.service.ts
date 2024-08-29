import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiRseService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '';

  constructor(private http: HttpClient) { }

  getResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
