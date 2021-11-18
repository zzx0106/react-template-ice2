import { lazy } from 'ice';

export function lazyPage(dynamicImport: any): any {
  console.log('RUNTIME_TYPE', RUNTIME_TYPE);

  if (RUNTIME_TYPE === 'vite') {
    // 如果是在src/router.ts文件中，vite会自动给lazy方法的数据添加一个true，但其他位置的文件里面不会自动添加，就会报错
    return lazy(dynamicImport, true);
  } else {
    return lazy(dynamicImport);
  }
}
