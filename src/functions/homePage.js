import { createHomePage } from '../views/homePage.js';
import createGlobe from 'https://cdn.skypack.dev/cobe';

export const initHomePage = () => {
  const root = document.querySelector('main');
  const homePage = createHomePage();
  root.appendChild(homePage);

  createWorldMapGlobe();
};

const createWorldMapGlobe = () => {
  const canvas = document.querySelector('#globe');
  let phi = 0;

  const globe = createGlobe(canvas, {
    devicePixelRatio: 2,
    width: window.innerWidth * 2,
    height: window.innerWidth * 2,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    scale: 1,
    mapSamples: 16000,
    mapBrightness: 1,
    mapBaseBrightness: 0,
    baseColor: [0.5, 0.5, 0.5],
    markerColor: [0, 42, 63],
    glowColor: [0, 0, 0],
    opacity: 1,
    offset: [0, 0],
    markers: [{ location: [37.7595, -122.4367], size: 0.1 }],
    onRender: (state) => {
      // Called on every animation frame.
      // `state` will be an empty object, return updated params.
      state.phi = phi;
      phi += 0.001;
      state.width = window.innerWidth * 2;
      state.height = window.innerWidth * 2;
    },
  });
};
