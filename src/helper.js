import { Notify } from 'notiflix';

export default showError = message => {
  Notify.failure(`${message}`, {
    timeout: 1500,
    position: 'center-top',
    distance: '100px',
  });
};
