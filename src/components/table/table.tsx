import * as React from 'react';
import * as moment from 'moment';
import { Package } from 'src/models/package.model';
import { TableState } from './tableState';

interface TableProps {
  packages: Package[];
  handleSort(path: string): void;
  renderSortIcon(colmn: { title: string; path: string }): any;
}

export class Table extends React.Component<TableProps, TableState> {
  columns: Array<{ path: string; title: string; content?(p: Package): any }> = [
    { path: 'barcodeId', title: 'Barcode-Id' },
    { path: 'handoverTo', title: 'Name' },
    {
      path: 'receivedDate',
      title: 'Received Date',
      content: (p: Package) => {
        return p.receivedDate
          ? moment(p.receivedDate).format('YYYY[/]MM/DD HH[:]mm A')
          : null;
      }
    },
    {
      path: 'handoverDate',
      title: 'handover Date',
      content: (p: Package) => {
        return p.handoverDate
          ? moment(p.handoverDate).format('YYYY[/]MM/DD HH[:]mm A')
          : null;
      }
    }
  ];

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            {this.columns.map((colmn) => (
              <th
                key={colmn.path}
                className="clickable"
                onClick={() => this.props.handleSort(colmn.path)}
              >
                {colmn.title}
                {this.props.renderSortIcon(colmn)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {this.props.packages.map((p) => (
            <tr key={p.barcodeId}>
              {this.columns.map((colmn) => (
                <td key={colmn.path + p.barcodeId}>
                  {colmn.content ? colmn.content(p) : p[colmn.path]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
