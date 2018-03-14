var getRandom = (max = 999999999999, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export function randomColor({ max = 255, min = 0, opacity = 0.3 } = {}) {
  let first = getRandom(max, min);
  let second = getRandom(max, min);
  let third = getRandom(max, min);

  return {
    rgb: `rgb(${first},${second},${third})`,
    rgba: `rgba(${first},${second},${third}, ${opacity})`
  };
}
