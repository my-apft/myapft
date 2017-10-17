import { EnvConfig } from '../config/app.config';

const BaseConfig: EnvConfig = {
  name: 'MyApft',
  description: 'MyApft',
  endpoints: {
    api: 'http://localhost:8000/api',
    websocketServer: 'ws://localhost:8001'
  },
  firebase: {
    appName: 'myapft',
    config: {
      apiKey: 'AIzaSyDKYYFYKwl19Bl_I0IwLxotrHE5ljh-8i0',
      authDomain: 'myapft-35200.firebaseapp.com',
      databaseURL: 'https://myapft-35200.firebaseio.com',
      projectId: 'myapft-35200',
      storageBucket: '',
      messagingSenderId: '114157788131'
    }
  },
  host: 'http://localhost:8000'
};

export = BaseConfig;