import { Component, OnInit, ViewChild } from '@angular/core';
//import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-moments-grid',
  templateUrl: './moments-grid.component.html',
  styleUrls: ['./moments-grid.component.css'],
})
export class MomentsGridComponent implements OnInit {
  public rowData$: any;

  colDefs: ColDef[] = [
    { field: 'make', headerCheckboxSelection: true, checkboxSelection: true },
    { field: 'model' },
    { field: 'price', minWidth: 150 },
  ];

  public defaultColDef: ColDef = {};
  gridApi: any;

  constructor() {}
  customActions = function (params) {
    console.log(params, 'parmas');
    return (
      '<div><span style="border-radius: 50% !important;width: 36px;padding: 6px;background: #ffbb00;color: white;text-align: center;font: 9px Arial, sans-serif;">' +
      +(params.rowIndex + 1) +
      '</span><span style="padding-left:10px;top:100px;">' +
      params.value +
      '</span></div>'
    );
  };
  columnDefs = [
    {
      headerName: 'Moments that matter',
      field: 'moments',
      cellClass: 'circle',
      width: 750,
      cellRenderer: this.customActions,
    },
  ];

  ngOnInit() {
    this.rowData$ = [
      {
        moments: 'Client selects bill pay page​',
      },
      {
        moments:
          'Recurring Payment – Client enters payment information and submits​',
      },
      {
        moments: 'Client calls contact center to stop payment​',
      },
      {
        moments:
          'Client calls contact center after notification that their payment was not successful​',
      },
    ];
    // this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  onCellClicked(event: CellClickedEvent) {
    console.log(event);
  }

  //@ViewChild(AgGridAngular) agGrid!: AgGridAngular

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
}
