const hexToRGB = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const generateCategory = (hex) => {
  const RGB = hexToRGB(hex);

  const { r, g, b } = RGB;

  if (r > 200 && g > 200 && b > 200) {
    return "white";
  } else if (r > b && g > b && r > 200 && g > 100 && g < 200 && b < 100) {
    return "yellow";
  } else if (r > g && r > b && r > 150 && g < 120) {
    return "red";
  } else if (g > b && g > r && g > 150 && b < 150) {
    return "green";
  } else if (b > r && b > g && b > 150) {
    return "blue";
  } else if (r < 90 && g < 90 && b < 90) {
    return "black";
  } else {
    return "none";
  }
};
