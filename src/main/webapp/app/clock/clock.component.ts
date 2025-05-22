import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'jhi-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements AfterViewInit, OnDestroy {
  // Déclaration des éléments ViewChild avec le bon type
  @ViewChild('hrs') hrsElement!: ElementRef<SVGCircleElement>;
  @ViewChild('mins') minsElement!: ElementRef<SVGCircleElement>;
  @ViewChild('secs') secsElement!: ElementRef<SVGCircleElement>;

  @ViewChild('hrsText') hrsTextElement!: ElementRef;
  @ViewChild('minsText') minsTextElement!: ElementRef;
  @ViewChild('secsText') secsTextElement!: ElementRef;
  @ViewChild('ampmText') ampmTextElement!: ElementRef;

  private intervalId: any; // Stockage de l'ID de l'intervalle pour nettoyage

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Initialisation des styles de base pour les cercles SVG
    this.initializeCircleStyles();

    // Mise à jour initiale
    this.updateClock();

    // Mise à jour périodique
    this.intervalId = setInterval(() => {
      this.updateClock();
    }, 1000); // Rafraîchir toutes les secondes
  }

  private initializeCircleStyles(): void {
    // Initialiser les styles pour le cercle des heures
    if (this.hrsElement && this.hrsElement.nativeElement) {
      this.renderer.setStyle(this.hrsElement.nativeElement, 'strokeDasharray', '440');
      this.renderer.setStyle(this.hrsElement.nativeElement, 'stroke', '#ff2972');
      this.renderer.setStyle(this.hrsElement.nativeElement, 'strokeLinecap', 'round');
      this.renderer.setStyle(this.hrsElement.nativeElement, 'fill', 'transparent');
    }

    // Initialiser les styles pour le cercle des minutes
    if (this.minsElement && this.minsElement.nativeElement) {
      this.renderer.setStyle(this.minsElement.nativeElement, 'strokeDasharray', '440');
      this.renderer.setStyle(this.minsElement.nativeElement, 'stroke', '#fee800');
      this.renderer.setStyle(this.minsElement.nativeElement, 'strokeLinecap', 'round');
      this.renderer.setStyle(this.minsElement.nativeElement, 'fill', 'transparent');
    }

    // Initialiser les styles pour le cercle des secondes
    if (this.secsElement && this.secsElement.nativeElement) {
      this.renderer.setStyle(this.secsElement.nativeElement, 'strokeDasharray', '440');
      this.renderer.setStyle(this.secsElement.nativeElement, 'stroke', '#04fc43');
      this.renderer.setStyle(this.secsElement.nativeElement, 'strokeLinecap', 'round');
      this.renderer.setStyle(this.secsElement.nativeElement, 'fill', 'transparent');
    }
  }

  private updateClock(): void {
    const now = new Date();
    let hrs = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    // Format de l'heure en 12 heures
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12; // Format 12h
    hrs = hrs ? hrs : 12; // Si l'heure est 0, l'afficher comme 12

    // Calcul des pourcentages pour chaque composant de l'heure
    const hoursPercentage = (hrs + mins / 60) / 12;
    const minutesPercentage = (mins + secs / 60) / 60;
    const secondsPercentage = secs / 60;

    // Calcul du dashoffset pour chaque cercle
    const hoursOffset = 440 - hoursPercentage * 440;
    const minutesOffset = 440 - minutesPercentage * 440;
    const secondsOffset = 440 - secondsPercentage * 440;

    // Mise à jour des dashoffset des cercles
    if (this.hrsElement && this.hrsElement.nativeElement) {
      this.renderer.setStyle(this.hrsElement.nativeElement, 'strokeDashoffset', hoursOffset.toString());
    }

    if (this.minsElement && this.minsElement.nativeElement) {
      this.renderer.setStyle(this.minsElement.nativeElement, 'strokeDashoffset', minutesOffset.toString());
    }

    if (this.secsElement && this.secsElement.nativeElement) {
      this.renderer.setStyle(this.secsElement.nativeElement, 'strokeDashoffset', secondsOffset.toString());
    }

    // Mise à jour des positions des dots
    this.updateDotPosition('.h_dot', hoursPercentage);
    this.updateDotPosition('.m_dot', minutesPercentage);
    this.updateDotPosition('.s_dot', secondsPercentage);

    // Mise à jour du texte des heures, minutes et secondes
    if (this.hrsTextElement && this.hrsTextElement.nativeElement) {
      this.renderer.setProperty(this.hrsTextElement.nativeElement, 'textContent', (hrs < 10 ? '0' : '') + hrs);
    }

    if (this.minsTextElement && this.minsTextElement.nativeElement) {
      this.renderer.setProperty(this.minsTextElement.nativeElement, 'textContent', (mins < 10 ? '0' : '') + mins);
    }

    if (this.secsTextElement && this.secsTextElement.nativeElement) {
      this.renderer.setProperty(this.secsTextElement.nativeElement, 'textContent', (secs < 10 ? '0' : '') + secs);
    }

    if (this.ampmTextElement && this.ampmTextElement.nativeElement) {
      this.renderer.setProperty(this.ampmTextElement.nativeElement, 'textContent', ampm);
    }
  }

  private updateDotPosition(selector: string, percentage: number): void {
    const dotElement = document.querySelector(selector) as HTMLElement;
    if (dotElement) {
      const radius = 70;
      const centerX = 70;
      const centerY = 70;

      // Convertir le pourcentage en radians (0% = haut du cercle, dans le sens horaire)
      const radians = percentage * 2 * Math.PI - Math.PI / 2;

      const x = centerX + radius * Math.cos(radians);
      const y = centerY + radius * Math.sin(radians);

      this.renderer.setStyle(dotElement, 'left', `${x}px`);
      this.renderer.setStyle(dotElement, 'top', `${y}px`);
    }
  }

  ngOnDestroy(): void {
    // Nettoyer l'intervalle lorsque le composant est détruit
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
