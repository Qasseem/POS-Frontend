import { Component, OnInit } from '@angular/core';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  HTTPMethods,
  SearchInputTypes,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { APIURL } from 'src/app/services/api';

@Component({
  selector: 'app-all-merchant',
  templateUrl: './all-merchant.component.html',
  styleUrls: ['./all-merchant.component.css'],
})
export class AllMerchantComponent implements OnInit {
  public url = APIURL;

  completeData(row: any): any {
    throw new Error('Method not implemented.');
  }
  navToServiceSetting(row: any): any {
    throw new Error('Method not implemented.');
  }
  customerInfo(row: any): any {
    const dolphinId = row.dolphinId || 0;
    const id = row.id;
    const URL = `/home/customers/info/${id}/${dolphinId}`;
    return URL;
  }
  public columns: ColumnsInterface[] = [
    {
      field: 'dolphinId',
      header: 'table.dolphinId',
      width: '130px',
    },

    {
      field: [
        { label: 'nameEn', custom: 'navigator' },
        { label: 'nameAr', custom: 'icon' },
      ],
      header: 'table.customerName',
      customCell: 'multiLabel',
      action: (row) => this.customerInfo(row),
      width: '220px',
    },
    {
      field: 'branchName',
      header: 'table.branch',
      width: '110px',
    },
    {
      field: 'statusNameEn',
      header: 'table.statusNameEn',
      width: '110px',
    },
    {
      field: 'salesManNameEn',
      header: 'table.salesMan',
      width: '110px',
    },
    {
      field: 'tagsNamesEn',
      header: 'customers.tags',
      width: '90px',
      customCell: 'tags',
    },
  ];

  public actions: ActionsInterface[] = [
    {
      name: 'customers.solutionsSettings',
      icon: 'fas fa-briefcase',
      permission: 'viewcustomerpayments',
      call: (row: any) => this.navToServiceSetting(row),
    },
    {
      name: 'customers.complete',
      icon: 'fas fa-user-edit',
      permission: 'completedata',
      call: (row: any) => this.completeData(row),
      customPermission: (row: any) => row.statusId === 1 || row.statusId === 2,
    },
  ];

  filters: SearchInterface[] = [
    {
      type: SearchInputTypes.text,
      field: 'MerchantNameEN',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'MerchantNameAR',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'UserName',
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'Category',
      isFixed: true,
      url: this.url.Merchant.GetAllMerchantCategories,
      method: HTTPMethods.postReqWithUrlHeader,
      params: '0',
      propValueName: 'code',
    },
    {
      type: SearchInputTypes.date,
      field: 'createDate',
      isFixed: false,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
