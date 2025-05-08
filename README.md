# Remote React Component Module Federation Example
An example of Module Federation, Remote React Components, and handling depenencies...

## Why?
The nice thing about [Module Federation](https://module-federation.io/) is that it can somewhat automatically de-dupe dependencies.
* The remote component webpack is configured to chunk each dependency as a separate file
* Both the host app and the remote use axios
* When the component loads, the browser doesn't need to grab axios, since that requirement is already satisfied by the host

## Show Me
To run... easiest with two terminal windows

* Host
  * `cd host-server; npm i; npm run buildl npm run start`
* Component
  * `cd remote-component; npm i; npm run serve`
    
App: http://localhost:3000/

## How?
Webpack. Declare your dependencies

* [Host](https://github.com/jonroig/react-component-module-federation-example/blob/main/host-server/webpack.config.js#L39)
* [Remote Component](https://github.com/jonroig/react-component-module-federation-example/blob/main/remote-component/webpack.config.js#L65)

## Additional Reading
* [Module-Federation.io](https://module-federation.io/guide/start/index.html)
  
