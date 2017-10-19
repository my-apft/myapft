import { Sparky, FuseBox } from 'fuse-box'
import { taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () => {
  const fuse = FuseBox.init({
    homeDir: './functions',
    output: `functions/$name.js`,
    target: 'server',
    cache: false,
    sourceMaps: false,
    globals: {
      'addMessage': 'addMessage'
    }
  });
  fuse.bundle('index').instructions(' [src/index.ts]')
  fuse.run()
})



// Sparky.task('build.server', () => {
//   if (isSpaOnly) return Promise.resolve();

//   const fuse = FuseBox.init(serverOptions as any);
//   const serverBundle = fuse.bundle('server').instructions(serverBundleInstructions);

//   if (!isBuildServer && !argv['build-only']) {
//     const reloadDelay = 3000;
//     serverBundle.watch('src/**').completed(proc => {
//       proc.start();
//       setTimeout(() => {
//         if (!active) {
//           init({
//             reloadDelay,
//             port: BUILD_CONFIG.browserSyncPort,
//             proxy: `${BUILD_CONFIG.host}:${BUILD_CONFIG.port}`
//           });
//         }
//       }, reloadDelay)
//     });
//   }

//   return fuse.run();
// });