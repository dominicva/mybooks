export const regularToKebabCase = str => str.toLowerCase().replaceAll(' ', '-');

export const camelToKebabCase = str =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const camelToRegularCase = str =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, str => str.toUpperCase());
