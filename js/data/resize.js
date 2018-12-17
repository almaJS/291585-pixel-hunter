export const resize = (frame, image) => {
  if (image.width <= frame.width && image.height <= frame.height) {
    return image;
  }

  const shrink = maxNumber(ratio(image.width, frame.width), ratio(image.height, frame.height));

  return {width: image.width / shrink, height: image.height / shrink};
};

const ratio = (a, b) => {
  return a / b;
};

const maxNumber = (a, b) => {
  return a > b ? a : b;
};
