export const resize = (frame, image) => {
  if (image.width <= frame.WIDTH && image.height <= frame.HEIGHT) {
    return image;
  }

  const shrink = Math.max(ratio(image.width, frame.WIDTH), ratio(image.height, frame.HEIGHT));

  return {width: image.width / shrink, height: image.height / shrink};
};

const ratio = (a, b) => {
  return a / b;
};
