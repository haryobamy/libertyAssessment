interface Prediction {
  bbox: [number, number, number, number]; // [x, y, width, height]
  class: string;
}

export const drawRect = (
  detections: Prediction[],
  ctx: CanvasRenderingContext2D
) => {
  // Loop through each prediction
  detections.forEach((prediction: Prediction) => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction.bbox;
    const text = prediction.class;

    // Set styling
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = '#' + color;
    ctx.font = '24px Arial';

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = '#' + color;
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
