import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiRseService } from '../rseAI.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-rse-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass], 
  templateUrl: './rse-ai.component.html',
  styleUrls: ['./rse-ai.component.scss']
})
export class RseAIComponent {
  loading = false;
  userInput: string = '';
  chatMessages: any[] = [];
  presetQuestions: string[] = [
    'Comment améliorer notre impact environnemental?',
    'Quels sont les meilleurs pratiques pour le développement durable?',
    'Comment intégrer la RSE dans notre stratégie d’entreprise?'
  ];

  constructor(private aiRseService: AiRseService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.chatMessages.push({ role: 'user', content: this.userInput });
      
      this.userInput = ''; // Clear input after sending the message
      this.loading = true; // Start the loading animation
  
      this.aiRseService.getResponse(this.chatMessages[this.chatMessages.length - 1].content).subscribe(
        response => {
          console.log(response); // Vérifiez la structure de la réponse pour déboguer
  
          if (response && response.candidates && response.candidates[0] &&
              response.candidates[0].content && response.candidates[0].content.parts &&
              response.candidates[0].content.parts[0] && response.candidates[0].content.parts[0].text) {
              
            let assistantMessage = response.candidates[0].content.parts[0].text;
            assistantMessage = this.convertToAscii(assistantMessage);
            this.chatMessages.push({ role: 'assistant', content: assistantMessage });
          } else {
            console.error('Unexpected response structure:', response);
            this.chatMessages.push({ role: 'assistant', content: 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.' });
          }
  
          this.loading = false; // Stop the loading animation after receiving the response
        },
        error => {
          console.error('Error fetching AI response:', error);
          this.chatMessages.push({ role: 'assistant', content: 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.' });
          this.loading = false; // Stop the loading animation even if there's an error
        }
      );
    }
  }
  
  
  convertToAscii(text: string): string {
    return text
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>') // Remplace ## par <h2>
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')  // Remplace # par <h1>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Remplace les double astérisques par du texte en gras
      .replace(/\* (.*?)\n/g, '<li>$1</li>\n') // Remplace les puces par des éléments de liste
      .replace(/\n/g, '<br>'); // Conserve les retours à la ligne avec des <br>
  }
  
  
  sendPresetQuestion(question: string) {
    this.userInput = question;
    this.sendMessage();
  }
}
