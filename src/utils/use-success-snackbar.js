import { useDispatch } from 'react-redux';
import { showDialog } from '../redux/dialog-window/dialog-window.actions';

const useSuccessSnackbar = () => {
  const dispatch = useDispatch();

  const openSuccessSnackbar = (
    onClickHandler,
    onCancelHandler,
    dialogContent,
    dialogTitle,
    showCancelButton = true
  ) => {
    dispatch(
      showDialog({
        isOpen: true,
        dialogTitle,
        onCancelHandler,
        dialogContent,
        showCancelButton,
        onClickHandler
      })
    );
  };

  return { openSuccessSnackbar };
};

export default useSuccessSnackbar;
