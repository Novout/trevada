import { useGlobal } from '@/store/global'
import { Callback } from '@/utils'
import * as PIXI from 'pixi.js'

export const useLoader = () => {
  const global = useGlobal()

  const load = (
    textures: Array<Array<string>>,
    setup: Callback,
    path = 'assets'
  ) => {
    const shared = PIXI.Loader.shared

    if (!global.pixi.loaded) {
      shared.baseUrl = path

      textures.forEach((texture: Array<string>) => {
        if (texture[1].includes('base64'))
          shared.add(`base64-${texture[0]}`, texture[1])
        else shared.add(texture[0], texture[1])
      })

      global.pixi.loaded = true
    }

    /*
    shared.onLoad.add((self) => {
      load(self);
    });

    shared.onComplete.add(() => {
      complete();
    });
    */

    shared.load(setup)
  }

  return [load]
}
