import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TriumphHomeComponent } from './triumph-home/triumph-home.component';
import { ManifestResolverService } from './services/manifest-resolver.service';

const routes: Routes = [
  {path: 'triumph', component: TriumphHomeComponent}, //, resolve: {resolvedManifest: ManifestResolverService}
  {path: '', redirectTo: '/triumph', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
