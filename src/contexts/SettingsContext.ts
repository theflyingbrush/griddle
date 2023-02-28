import { SettingsObject } from '@types';
import React from 'react'

const defaultSettings: SettingsObject = {
  gridX: 4,
  // gridY: 4,
  width: 600,
  height: 400,
  url: '',
  color: '#ffffff'
};

const SettingsContext = createContext(defaultSettings);

function createContext(defaultObject: SettingsObject) {
  return React.createContext(defaultObject);
}

export {SettingsContext, createContext, defaultSettings};