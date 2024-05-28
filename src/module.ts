import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

const CONFIG_KEY = 'clarity'

// Module options TypeScript interface definition
export interface ModuleOptions {
  id: string | undefined
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-clarity-module',
    configKey: CONFIG_KEY,
  },
  // Default configuration options of the Nuxt module
  defaults: {
    id: undefined,
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)
    _nuxt.options.runtimeConfig.public[CONFIG_KEY] = defu<ModuleOptions, ModuleOptions[]>(
      _nuxt.options.runtimeConfig.public[CONFIG_KEY] || {}, {
        id: _options.id,
      },
    )

    _nuxt.hook('nitro:config', (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(resolver.resolve('runtime/plugin'))
    })
  },
})
