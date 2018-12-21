import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';


const appRoutes: Routes = [
   { path: '', component: AboutComponent},
   { path: 'about', component: AboutComponent },
   { path: 'projects', component: ProjectsComponent},
   { path: 'add', component: CreateComponent},
   { path: 'contact', component: ContactComponent},
// ruta 404
   { path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
