declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ym: any
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const metrikaId = config.public.metrikaId as string
  if (!metrikaId) return

  function initMetrika() {
    if (typeof window === 'undefined' || window.ym) return

    ;(function (m: Window, e: Document, t: string, r: string, i: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mw = m as any
      mw[i] = mw[i] || function () { (mw[i].a = mw[i].a || []).push(arguments) }
      mw[i].l = +new Date()
      const k = e.createElement(t) as HTMLScriptElement
      const a = e.getElementsByTagName(t)[0]!
      k.async = true
      k.src = r
      a.parentNode!.insertBefore(k, a)
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

    window.ym(metrikaId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
  }

  if (localStorage.getItem('cookie_consent') === 'true') {
    initMetrika()
  }

  return {
    provide: { initMetrika },
  }
})
