import type { NitroAppPlugin } from 'nitropack'
import type { ModuleOptions } from '../module'
import { useRuntimeConfig } from '#imports'

const plugin: NitroAppPlugin = (nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    const options = useRuntimeConfig().public['clarity'] as Required<ModuleOptions>
    const id = process.env.MICROSOFT_CLARITY_ID || options.id
    if (!id) return
    const script = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${id}");`
    html.head.push(`<script type="text/javascript">${script}</script>`)
  })
}

export default plugin
