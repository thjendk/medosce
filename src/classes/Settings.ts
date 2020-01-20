import { store } from 'index';
import settingsReducer from 'redux/reducers/settings';

interface Settings {}

class Settings {
  static toggleToolbox = () => {
    store.dispatch(settingsReducer.actions.toggleToolbox());
  };
}

export default Settings;
