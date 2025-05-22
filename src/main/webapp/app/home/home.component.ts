import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private clockInterval?: number;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.updateClock();
    this.clockInterval = window.setInterval(() => this.updateClock(), 1000);
  }

  updateClock(): void {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    const hours = document.getElementById('hrs');
    const minutes = document.getElementById('mins');
    const seconds = document.getElementById('secs');
    const ampm = document.getElementById('ampm');

    const hh = document.getElementById('hh') as SVGCircleElement | null;
    const mm = document.getElementById('mm') as SVGCircleElement | null;
    const ss = document.getElementById('ss') as SVGCircleElement | null;

    const dotH = document.querySelector('.h_dot') as HTMLElement;
    const dotM = document.querySelector('.m_dot') as HTMLElement;
    const dotS = document.querySelector('.s_dot') as HTMLElement;

    if (hours) hours.innerText = this.formatTime(h);
    if (minutes) minutes.innerText = this.formatTime(m);
    if (seconds) seconds.innerText = this.formatTime(s);
    if (ampm) ampm.innerText = ''; // No AM/PM for 24-hour format

    if (hh) hh.style.strokeDashoffset = (440 - (440 * h) / 24).toString();
    if (mm) mm.style.strokeDashoffset = (440 - (440 * m) / 60).toString();
    if (ss) ss.style.strokeDashoffset = (440 - (440 * s) / 60).toString();

    if (dotH) dotH.style.transform = `rotate(${h * 15}deg)`;
    if (dotM) dotM.style.transform = `rotate(${m * 6}deg)`;
    if (dotS) dotS.style.transform = `rotate(${s * 6}deg)`;
  }

  formatTime(unit: number): string {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }
}
