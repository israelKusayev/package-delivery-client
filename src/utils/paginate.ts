import * as _ from 'lodash';
import { Package } from './../models/package.model';

export function paginate(
  items: Package[],
  pageNumber: number,
  pageSize: number
) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
