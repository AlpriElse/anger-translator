import FontFaceObserver from 'fontfaceobserver';
const bangersFont = new FontFaceObserver('Bangers');
const caprisimoFont = new FontFaceObserver('Caprasimo');
const openSansFont = new FontFaceObserver('Open Sans');
const allFontsLoadPromise = Promise.all([bangersFont, caprisimoFont, openSansFont].map(font => font.load()))

export default allFontsLoadPromise
