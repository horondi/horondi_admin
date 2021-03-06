import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilters,
  setFilter,
  setSort
} from '../../redux/categories/categories.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import { config } from '../../configs';

const useCategoryFilters = () => {
  const dispatch = useDispatch();
  const { filterLabels } = config;
  const filters = useSelector(({ Categories }) => Categories.filters);
  const allCategories = useSelector(({ Categories }) => Categories.categories);
  const { buttonTitles } = config;
  const { CATEGORY_TITLE } = buttonTitles;

  const setSorting = (key, type = 'asc') => {
    dispatch(setCurrentPage(0));
    dispatch(
      setSort({
        [key]: type === 'desc' ? 1 : -1
      })
    );
  };

  const setSearchFilter = (searchString) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        search: searchString
      })
    );
  };

  const setStatusFilter = (_id) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        _id
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };
  return {
    sortOptions: {
      labels: filterLabels.categories.sortLabels,
      setSorting
    },
    filterOptions: {
      filters,
      allCategories,
      buttonTitle: CATEGORY_TITLE,
      setStatusFilter
    },
    searchOptions: {
      filters,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useCategoryFilters;
