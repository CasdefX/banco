import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'product',
    loadComponent: () => import('./product/product.component'),
    children: [
        {
            path: 'list',
            title: 'List of products',
            loadComponent: () => import('./product/pages/product-list/product-list.component').then(c => c.ProductListComponent),
            data: { animation: 'openClosePage' }
        },
        {
            path: 'new',
            title: 'New Product',
            loadComponent: () => import('./product/pages/new-product/new-product.component'),
            data: { animation: 'statusPage' }

        },
        {
            path: 'edit/:id',
            title: 'Edit products',
            loadComponent: () => import('./product/pages/edit-product/edit-product.component'),
            data: { animation: 'togglePage' }
        },
        {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
        }]

},
{
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
}];
