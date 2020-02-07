import settingsReducer from 'redux/reducers/settings';
import store from 'config/persistStore';

interface Settings {}

class Settings {
  static toggleToolbox = () => {
    store.dispatch(settingsReducer.actions.toggleToolbox());
  };
}

export default Settings;
