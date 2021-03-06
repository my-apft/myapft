import { Sparky } from 'fuse-box'
import { BUILD_CONFIG, isAot, isProdBuild, taskName } from '../../config/build.config'

Sparky.task(taskName(__filename), () => {
  return Sparky.start('clean')
    .then(() => Sparky.start('mk-dist'))
    .then(() => Sparky.start('changelog'))
    .then(() => isAot ? Sparky.start('ngc') : Promise.resolve())
    .then(() => Sparky.start('web'))
    .then(() => Sparky.start('index.copy'))
    .then(() => Sparky.start('assets'))
    .then(() => Sparky.start('build.app'))
    .then(() => Sparky.start('build.server'))
    .then(() => Sparky.start('sass'))
    .then(() => Sparky.start('ngsw'))
    .then(() => isProdBuild || !BUILD_CONFIG.skipFaviconGenerationOnDev ? Sparky.start('favicons') : Promise.resolve())
    .then(() => Sparky.start('index.minify'))
    .then(() => Sparky.start('banner'))
})
