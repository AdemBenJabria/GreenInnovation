import { Component } from '@angular/core';
import { DiagnosticService } from '../diagnostic.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  showContactForm: boolean = false; 
  emailSent: boolean = false;
  errorSendingEmail: boolean = false;
  contactForm: FormGroup;
  showPlanDownload: boolean = false; 
  selectedPlan: string = ''; // Assigner une valeur par défaut


  constructor(private fb: FormBuilder, private http: HttpClient, private DiagnosticService: DiagnosticService) {
    // Initialisation du formulaire de contact
    this.contactForm = this.fb.group({
      phone: ['', Validators.pattern('^\\+?[1-9]\\d{1,14}$')],
      email: ['', Validators.email],
    }, { validator: this.atLeastOneContactValidator });
  }

  ngOnInit(): void {

    const results = this.DiagnosticService.getResults();
    const value2 = results.get(1);
    const value5 = results.get(4);
    const value6 = results.get(5);

    if ((value2 === 'B' || value2 === 'C') && (value5 === 'B' || value5 === 'C') && value6 === 'B') {
      this.selectedPlan = 'plan3'; 
      this.showPlanDownload = true;
    } else if ((value5 === 'A' || value5 === 'B') && value6 === 'B' && value2 === 'A') {
      this.selectedPlan = 'plan2'; 
      this.showPlanDownload = true;
    } else if (value6 === 'A') {
      this.selectedPlan = 'plan1'; 
      this.showPlanDownload = true;
    } else {
      console.log('autre');
      this.showContactForm = true;
    }
  }

  // Validateur personnalisé pour s'assurer qu'au moins un champ de contact est rempli
  atLeastOneContactValidator(form: FormGroup): { [key: string]: boolean } | null {
    const phone = form.get('phone')?.value;
    const email = form.get('email')?.value;
    return phone || email ? null : { 'atLeastOneRequired': true };
  }

  onSubmitContactForm() {
    if (this.contactForm.valid) {
      const email = this.contactForm.get('email')?.value;
      const phone = this.contactForm.get('phone')?.value;

      const results = this.DiagnosticService.getResults();
      const result0 = results.get(0);
      const result1 = results.get(1);
      const result2 = results.get(2);
      const result3 = results.get(3);
      const result4 = results.get(4);
      const result5 = results.get(5);

      // Construire l'objet sous le format requis
      const body = {
        to: "emma.brdj@gmail.com",
        subject: "[Hayaterra] Nouveau mail d'un client",
        message: `Contact du client : ${email} , ${phone}\n
                  Résultats du questionnaire : \n
                  - Résultat 0 : ${result0}\n
                  - Résultat 1 : ${result1}\n
                  - Résultat 2 : ${result2}\n
                  - Résultat 3 : ${result3}\n
                  - Résultat 4 : ${result4}\n
                  - Résultat 5 : ${result5}`
      };

      console.log("Email data to send:", body);

      this.http.post('http://localhost:8080/api/email/send', body, { responseType: 'text' })
        .subscribe({
          next: response => {
            console.log('Contact information sent successfully:', response);
            this.emailSent = true; // Marque l'e-mail comme envoyé
            this.errorSendingEmail = false; // Réinitialise l'indicateur d'erreur
          },
          error: error => {
            console.error('Error sending contact information:', error);
            this.emailSent = false; // Réinitialise l'indicateur de succès
            this.errorSendingEmail = true; // Marque l'erreur d'envoi
          }
        });
    } else {
      alert('Veuillez remplir au moins une information de contact.');
    }
  }

  downloadPlan(plan: string) {
    if (plan) { 
      window.open(plan, '_blank'); 
    }
  }
}
