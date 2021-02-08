import React, { useState } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './nav-sort.styles';

const NavSort = ({ sortOptions }) => {
  const [sortValue, setSortValue] = useState(sortOptions.labels[1].value);
  const styles = useStyles();
  const { setSorting } = sortOptions;

  const selectOptions = sortOptions.labels.map(({ label, value }) => (
    <MenuItem key={label} value={value}>
      {label}
    </MenuItem>
  ));

  const selectHandler = (e) => {
    const { value } = e.target;
    const result = sortOptions.labels.find((item) => item.value === value);

    if (result) {
      setSortValue(result.value);
      setSorting(result.key, result.type);
    }
  };

  return (
    <div className={styles.sort}>
      <FormControl className={styles.formControl}>
        <Select
          data-cy='user-sorting'
          labelId='checkbox-label'
          id='checkbox'
          value={sortValue}
          onChange={selectHandler}
          defaultValue={0}
        >
          {selectOptions}
        </Select>
      </FormControl>
    </div>
  );
};

NavSort.propTypes = {
  sortOptions: PropTypes.objectOf(PropTypes.object).isRequired,
  labels: PropTypes.arrayOf(PropTypes.array).isRequired,
  setSorting: PropTypes.func.isRequired
};
export default NavSort;
