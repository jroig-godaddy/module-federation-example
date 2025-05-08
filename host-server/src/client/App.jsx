import React, { Suspense } from 'react';
import './styles/App.css';
import superagent from 'superagent'; 

import { init, loadRemote } from '@module-federation/enhanced/runtime';

init({
  name: '@consuming-app',
  remotes: [
    {
      name: "my_component",
      entry: 'http://localhost:3001/mf-manifest.json'
    },
  ],
  shared: {
    react: {
      singleton: true,
      eager: true,
      requiredVersion: '18.2.0',
    },
    'react-dom': {
      singleton: true,
      eager: true,
      requiredVersion: '18.2.0',
    },
    'superagent': {
      singleton: true,
      eager: true,
      requiredVersion: '*',
    }
  },
});

const RemoteMyComponent = React.lazy(() =>
    loadRemote('my_component/MyComponent').then((module) => ({
      default: module.default, // Ensure the remote component has a default export
    }))
  );

const App = () => {

    const fetchData = async () => {
        try {

          const response = await superagent.get('https://api.weather.gov/points/33.4949,-111.9217');
          console.log('server', response.body);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    fetchData();

    return (
        <div className="app">
            <h1>Basic App</h1>
            <p>... testing... </p>
            <Suspense fallback={<div>Loading remote component...</div>}>
                <RemoteMyComponent />
            </Suspense>
        </div>
    );
};

export default App;