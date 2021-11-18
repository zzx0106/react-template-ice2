declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'postcss-cssnext';
declare module 'postcss-write-svg';
declare module 'postcss-flexbugs-fixes';
declare module 'postcss-viewport-units';
declare module 'cssnano';
