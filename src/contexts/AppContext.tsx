import React from 'react';

export type ApplicationConfig = {
  name: string;
  title: () => JSX.Element;
}

const appConfig: ApplicationConfig = {
  name: "GRID",
  title: ()  => {
    return (
      <span>GR<br>ID</br></span>
    )
  }
}

function createContext(appConfig: ApplicationConfig) {
  return React.createContext(appConfig);
}

const AppContext = createContext(appConfig);

export { AppContext, appConfig };