import 'regenerator-runtime'
import {setCacheNameDetails, skipWaiting, clientsClaim} from 'workbox-core'
import {precacheAndRoute} from 'workbox-precaching'
import {registerRoute} from 'workbox-routing'
import {NetworkFirst, StaleWhileRevalidate} from 'workbox-strategies'
import {CacheableResponsePlugin} from 'workbox-cacheable-response'
import {ExpirationPlugin} from 'workbox-expiration'

skipWaiting()
clientsClaim()
// inside src/service-worker.js 
setCacheNameDetails({prefix:  "faxine-cahce"});
precacheAndRoute(self.__WB_MANIFEST, {
  ignoreUrlParametersMatching: [/.*/],
})


registerRoute(
    ({url}) => url.origin,
    new StaleWhileRevalidate({
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    }),
)

registerRoute(
    ({request}) => request.destination === 'image',
    new NetworkFirst({
      cacheName: 'images',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
)

registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    }),
)

registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new NetworkFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    }),
)
