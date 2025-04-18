import createGlobe from 'https://cdn.skypack.dev/cobe';

export function createWorldMapGlobe(lat = 0, long = 0) {
  const canvas = document.querySelector('#globe');

  let autoRotate = true;
  let marker = [];
  let canvasWidth = canvas.parentElement.offsetWidth;
  canvas.width = canvasWidth;
  canvas.height = canvasWidth;

  const focusRef = [
    Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
  let currentPhi = focusRef[0];
  let currentTheta = focusRef[1];
  const doublePi = Math.PI * 2;

  const globe = createGlobe(canvas, {
    width: canvasWidth,
    height: canvasWidth,
    phi: currentPhi,
    theta: currentTheta,
    dark: 1,
    diffuse: 1.2,
    scale: 1,
    mapSamples: 20000,
    mapBrightness: 4,
    mapBaseBrightness: 0,
    baseColor: [0.5, 0.5, 0.5],
    markerColor: [30 / 255, 144 / 255, 255 / 255],
    glowColor: [17 / 255, 17 / 255, 17 / 255],
    opacity: 0.9,
    offset: [0, 0],
    markers: [],
    onRender: (state) => {
      state.theta = currentTheta;
      state.phi = currentPhi;
      state.markers = marker;

      if (autoRotate) {
        currentPhi += 0.001;
      } else {
        // Adjust focus angles dynamically
        const [focusPhi, focusTheta] = focusRef;
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

        // Control the rotation speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08;
        } else {
          currentPhi -= distNegative * 0.08;
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
      }

      canvasWidth = canvas.parentElement.offsetWidth;
      state.width = canvasWidth;
      state.height = canvasWidth;
      canvas.width = canvasWidth;
      canvas.height = canvasWidth;
    },
  });

  // Helper function to update focus dynamically
  const updateFocus = (newLat, newLong) => {
    if (newLat && newLong) {
      focusRef[0] = Math.PI - ((newLong * Math.PI) / 180 - Math.PI / 2);
      focusRef[1] = (newLat * Math.PI) / 180;
      autoRotate = false;
    } else {
      autoRotate = true;
    }
  };

  // Add dynamic markers
  const updateMarker = (lat, long) => {
    if (lat && long) {
      marker = [{ location: [lat, long], size: 0.1 }];
    } else {
      marker = [];
    }
  };

  return {
    updateFocus,
    updateMarker,
  };
}
