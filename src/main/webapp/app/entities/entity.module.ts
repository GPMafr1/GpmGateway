import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'vehicule',
        loadChildren: () => import('./ressourceService/vehicule/vehicule.module').then(m => m.RessourceServiceVehiculeModule),
      },
      {
        path: 'charge-fixe-vehicule',
        loadChildren: () =>
          import('./ressourceService/charge-fixe-vehicule/charge-fixe-vehicule.module').then(
            m => m.RessourceServiceChargeFixeVehiculeModule
          ),
      },
      {
        path: 'taux-consommation-vehicule',
        loadChildren: () =>
          import('./ressourceService/taux-consommation-vehicule/taux-consommation-vehicule.module').then(
            m => m.RessourceServiceTauxConsommationVehiculeModule
          ),
      },
      {
        path: 'agence',
        loadChildren: () => import('./ressourceService/agence/agence.module').then(m => m.RessourceServiceAgenceModule),
      },
      {
        path: 'employe',
        loadChildren: () => import('./ressourceService/employe/employe.module').then(m => m.RessourceServiceEmployeModule),
      },
      {
        path: 'charge-salariale',
        loadChildren: () =>
          import('./ressourceService/charge-salariale/charge-salariale.module').then(m => m.RessourceServiceChargeSalarialeModule),
      },
      {
        path: 'qualification-activite',
        loadChildren: () =>
          import('./ressourceService/qualification-activite/qualification-activite.module').then(
            m => m.RessourceServiceQualificationActiviteModule
          ),
      },
      {
        path: 'frais-mission',
        loadChildren: () =>
          import('./facturationService/frais-mission/frais-mission.module').then(m => m.FacturationServiceFraisMissionModule),
      },
      {
        path: 'ordre-facturation',
        loadChildren: () =>
          import('./facturationService/ordre-facturation/ordre-facturation.module').then(m => m.FacturationServiceOrdreFacturationModule),
      },
      {
        path: 'article-mission',
        loadChildren: () =>
          import('./missionService/article-mission/article-mission.module').then(m => m.MissionServiceArticleMissionModule),
      },
      {
        path: 'activite',
        loadChildren: () => import('./missionService/activite/activite.module').then(m => m.MissionServiceActiviteModule),
      },
      {
        path: 'ordre-travail-client',
        loadChildren: () =>
          import('./missionService/ordre-travail-client/ordre-travail-client.module').then(m => m.MissionServiceOrdreTravailClientModule),
      },
      {
        path: 'work-order',
        loadChildren: () => import('./missionService/work-order/work-order.module').then(m => m.MissionServiceWorkOrderModule),
      },
      {
        path: 'site-mission',
        loadChildren: () => import('./missionService/site-mission/site-mission.module').then(m => m.MissionServiceSiteMissionModule),
      },
      {
        path: 'piece-jointe',
        loadChildren: () => import('./missionService/piece-jointe/piece-jointe.module').then(m => m.MissionServicePieceJointeModule),
      },
      {
        path: 'tache',
        loadChildren: () => import('./missionService/tache/tache.module').then(m => m.MissionServiceTacheModule),
      },
      {
        path: 'sst',
        loadChildren: () => import('./missionService/sst/sst.module').then(m => m.MissionServiceSSTModule),
      },
      {
        path: 'affaire',
        loadChildren: () => import('./affaireService/affaire/affaire.module').then(m => m.AffaireServiceAffaireModule),
      },
      {
        path: 'article',
        loadChildren: () => import('./affaireService/article/article.module').then(m => m.AffaireServiceArticleModule),
      },
      {
        path: 'client',
        loadChildren: () => import('./clientService/client/client.module').then(m => m.ClientServiceClientModule),
      },
      {
        path: 'societe',
        loadChildren: () => import('./clientService/societe/societe.module').then(m => m.ClientServiceSocieteModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('./clientService/contact/contact.module').then(m => m.ClientServiceContactModule),
      },
      {
        path: 'site',
        loadChildren: () => import('./clientService/site/site.module').then(m => m.ClientServiceSiteModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GpmGatewayEntityModule {}
