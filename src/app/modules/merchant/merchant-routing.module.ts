import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantComponent } from './merchant.component';
import { MerchantListComponent } from './pages/merchant-list/merchant-list.component';
import { MerchantFormComponent } from './pages/merchant-form/merchant-form.component';
import { ViewMerchantComponent } from './pages/view-merchant/view-merchant.component';

const routes: Routes = [
  {
    path: '',
    component: MerchantComponent,
    children: [
      {
        path: 'add',
        component: MerchantComponent,
        data: {
          type: 'add'
        }

      },
      {
        path: 'list',
        component: MerchantListComponent

      },
      {
        path: 'favorites',
        component: MerchantListComponent

      },
      {
        path: '',
        component: MerchantListComponent

      },
      {
        path: 'edit/:id',
        component: MerchantFormComponent,
        data: {
          type:'edit'
        }

      },
      {
        path: 'details/:id',
        component: ViewMerchantComponent

      },
      { path: '', redirectTo: '/merchant/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchanRoutingtModule { }
