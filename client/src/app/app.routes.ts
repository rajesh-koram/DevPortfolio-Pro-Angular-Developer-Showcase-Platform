import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
		title: 'DevPortfolio Pro | Angular Developer Showcase Platform',
	},
	{
		path: '**',
		redirectTo: '',
	},
];
