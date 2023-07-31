import React, { useRef, useEffect } from 'react'
import allFontsLoadedPromise from '../utils/allFontsLoadPromise'

import { SOMEWHAT_BLACK, OFF_WHITE, FORBIDDEN_SOUP } from '../constants/Colors'

const CARD_WIDTH = 370;
const CARD_HEIGHT = 550;
const CARD_CORNER_RADIUS = 10

const IMAGE_WIDTH = 30;

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  ctx.save()
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  ctx.restore();
}

function roundedRect(ctx, logo, x, y, text, backgroundColor, textColor, rotationAngle, fontFamily) {

  ctx.save()
  // Convert the angle to radians
  const radians = (Math.PI / 180) * rotationAngle; // 30 degrees

  // Move the rotation point to the center of the rectangle
  ctx.translate(x + CARD_WIDTH / 2, y + CARD_HEIGHT / 2);
  ctx.rotate(radians);

  // Move the rectangle back to its original position
  x = -CARD_WIDTH / 2;
  y = -CARD_HEIGHT / 2;

  ctx.beginPath();
  ctx.moveTo(x + CARD_CORNER_RADIUS, y);
  ctx.lineTo(x + CARD_WIDTH - CARD_CORNER_RADIUS, y);
  ctx.arcTo(x + CARD_WIDTH, y, x + CARD_WIDTH, y + CARD_CORNER_RADIUS, CARD_CORNER_RADIUS);
  ctx.lineTo(x + CARD_WIDTH, y + CARD_HEIGHT - CARD_CORNER_RADIUS);
  ctx.arcTo(x + CARD_WIDTH, y + CARD_HEIGHT, x + CARD_WIDTH - CARD_CORNER_RADIUS, y + CARD_HEIGHT, CARD_CORNER_RADIUS);
  ctx.lineTo(x + CARD_CORNER_RADIUS, y + CARD_HEIGHT);
  ctx.arcTo(x, y + CARD_HEIGHT, x, y + CARD_HEIGHT - CARD_CORNER_RADIUS, CARD_CORNER_RADIUS);
  ctx.lineTo(x, y + CARD_CORNER_RADIUS);
  ctx.arcTo(x, y, x + CARD_CORNER_RADIUS, y, CARD_CORNER_RADIUS);
  ctx.closePath();
  ctx.fillStyle = backgroundColor;
  ctx.fill();

  ctx.fillStyle = textColor;

  ctx.font = `19px ${fontFamily}`
  wrapText(ctx, text, x + 20, y + 40, CARD_WIDTH - 20, 37);

  ctx.font = `30px "Bangers"`
  ctx.fillText("AngerTranslator.ai", x + IMAGE_WIDTH + 25, y +  CARD_HEIGHT - 20)

  ctx.drawImage(logo, x + 15, y + CARD_HEIGHT - 15 - IMAGE_WIDTH, IMAGE_WIDTH, IMAGE_WIDTH);

  ctx.restore()

}



export default function SharableCanvasDrawer({
  prompt = '',
  translation = ''
}) {

  const canvasRef = useRef(null);

  useEffect(() => {
    function renderCanvas(backgroundImage, image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

      roundedRect(ctx, image, 145, 185, prompt, OFF_WHITE, SOMEWHAT_BLACK, -5, 'Caprasimo')
      roundedRect(ctx, image, 470, 190, translation, FORBIDDEN_SOUP, OFF_WHITE, 5, 'Caprasimo')

      ctx.restore()


    }


    const backgroundImagePromise = new Promise((resolve, reject) => {
      const backgroundImage = new Image()
      backgroundImage.src = 'https://cdn.stability.ai/assets/org-AdwXxxq6zr9Q4d3nbFtZyV9J/00000000-0000-0000-0000-000000000000/070e6314-fe90-884e-2515-3c9fc9b29d4d'
      backgroundImage.onload = () => resolve(backgroundImage)
      backgroundImage.onerror = reject
    })

    const logoImagePromise = new Promise((resolve, reject) => {
      const logoImage = new Image()
      logoImage.src = '/android-chrome-192x192.png'
      logoImage.onload = () => resolve(logoImage)
      logoImage.onerror = reject
    })

    Promise.all([backgroundImagePromise, logoImagePromise, allFontsLoadedPromise]).then(([backgroundImage, logoImage]) => {
      renderCanvas(backgroundImage, logoImage)
    })
  }, [])



  return (
    <div style={{
    }}>
      <canvas ref={canvasRef} width={960} height={896}/>
    </div>
  );
}
