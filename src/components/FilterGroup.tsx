import * as React from 'react';

export interface FilterGroupProps {
  items: string[];
  selectedItem: string;
  onItemSelect: (selectedItem: string) => void;
}

const FilterGroup: React.SFC<FilterGroupProps> = ({
  items,
  selectedItem,
  onItemSelect
}) => {
  return (
    <div className="btn-group" role="group">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          id="override-bootstrap"
          className={
            item === selectedItem ? 'btn filter-active ' : 'btn btn-dark'
          }
          onClick={() => onItemSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterGroup;
