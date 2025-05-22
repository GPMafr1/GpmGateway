import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GpmGatewaySharedModule } from 'app/shared/shared.module';
import { GpmGatewayCoreModule } from 'app/core/core.module';
import { GpmGatewayAppRoutingModule } from './app-routing.module';
import { GpmGatewayHomeModule } from './home/home.module';
import { GpmGatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  imports: [
    BrowserModule,
    GpmGatewaySharedModule,
    GpmGatewayCoreModule,
    GpmGatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GpmGatewayEntityModule,
    GpmGatewayAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent, ClockComponent],
  bootstrap: [MainComponent],
})
export class GpmGatewayAppModule {}
