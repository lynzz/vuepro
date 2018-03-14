export const mousewheel = (element, callback) => {
  if (element && element.addEventListener) {
    element.addEventListener("mousewheel", callback);
  }
};
