import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DiagnosticService } from '../diagnostic.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],  // Importation de RouterModule
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private diagnosticService: DiagnosticService) {}

  startDiagnostic() {
    this.diagnosticService.reset(); // Réinitialiser les réponses
  }

}
