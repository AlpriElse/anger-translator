import React, { useEffect, useState } from 'react';
import SharableCanvasDrawer from '../components/SharableCanvasDrawer';

import allFontsLoadPromise from '../utils/allFontsLoadPromise';

import '../App.css'

export default {
  title: 'SharableCanvasDrawer',
  component: SharableCanvasDrawer,
};

export const Usage = () => {
  // State to track font loading status
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    allFontsLoadPromise.then(() => {
      // Font is loaded, update the state
      setFontLoaded(true);
    }, () => {
      // Font loading failed, you might want to handle this case
      setFontLoaded(false);
    });
  }, []);

  return fontLoaded ? (
    <SharableCanvasDrawer
      prompt="i don't like work"
      translation="Work? I fuckin' despise that soul-sucking, mind-numbing torture chamber of utter bullshit! It's as if every minute spent in that godforsaken place brings me closer to a slow and painful death. I'd rather have a rusty nail shoved up my ass than set foot in that goddamn office again."
    />
  ) : 'waiting for fonts to load...';
};
