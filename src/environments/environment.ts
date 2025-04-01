import packageJson from '../../package.json';

export const environment = {

    production: false,
    API_URL: 'http://127.0.0.1:8000/api/',  // Ruta de desarrollo
    database: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      name: 'alparque',
      user: 'root',
      password: '123456789',
      url: 'mysql://root:123456789@127.0.0.1:3306/alparque'
    }
  };
  