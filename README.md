# React Component Module Federation Example
An example of how Module Federation works with Remote React Components, de-duping dependencies

Example
* The remote component webpack chunks each dependency as a separate file
* Both the host app and the remote use axios
* When the component loads, the browser doesn't need to grab axios, since that dependency requirement is already satisfied by the host

To run... easiest with two terminal windows

* Host:
  * `cd host-server; npm i; npm run start ` 

* Component:
  * `cd remote-component; npm i; npm run serve`


App: http://localhost:3000/
