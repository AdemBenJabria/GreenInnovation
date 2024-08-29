import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { DiagnosticService } from '../diagnostic.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private diagnosticService: DiagnosticService) {}

  startDiagnostic() {
    this.diagnosticService.reset(); // Réinitialiser les réponses
  }

  ngOnInit(): void {
    const playButton = document.getElementById('play-button') as HTMLAnchorElement;
    const videoCover = document.getElementById('video-cover');
    const videoContainer = document.getElementById('video-container');
    const iframe = videoContainer?.querySelector('iframe');

    playButton?.addEventListener('click', function(event) {
      event.preventDefault();
      if (iframe && playButton) {
        iframe.src = playButton.href; 
      }
      
      if (videoCover) {
        videoCover.classList.add('hidden');
      }
      if (videoContainer) {
        videoContainer.classList.remove('hidden');
      }
    });
  }
}
