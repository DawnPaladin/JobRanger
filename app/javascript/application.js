// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import LootScreen from './components/LootScreen';
import store from './components/store';

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
        <LootScreen /*isOpen={isLootScreenVisible} setVisible={setIsLootScreenVisible}*/ />
      </Provider>
    </React.StrictMode>
  );
});
