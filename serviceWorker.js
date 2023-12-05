const cashName = "v1"
const assets = [
  "./", 
  "./index.html",
  "./style.css", 
  "./img/earth.jpg", 
  "./img/music.jpg",
  "./img/africa.png", 
  "./img/alpes.png", 
  "./img/BFM-radio.png", 
  "./img/cherie.png", 
  "./img/CHMP-FM.jpg", 
  "./img/CKOP-FM.jpg", 
  "./img/Musiq 3.png", 
  "./img/nostalgie.png", 
  "./img/nrj.png", 
  "./img/Premiere.png", 
  "./img/logo3.png",
  "./radio.js",
  "./index.js",
  "./web.json",
  "./manifest.json"
]

self.addEventListener('install', (e) => {
  e.waitUntil(
      caches.open(cashName)
      .then((cache)=>{
        cache.addAll(assets);
      })
      .then(self.skipWaiting())
  )
})

self.addEventListener("fetch", (e) =>{
  e.respondWith(
    caches.match(e.request).then((response) =>{
      if(response){
        return response
      }

      let fetchRequest = e.request.clone()

      return fetch(fetchRequest).then((response) =>{
        if(!response || response.status !== 200 || response.type !== 'basic'){
          return response
        }
        
        let responseCache = response.clone()
        caches.open(cashName).then((cache) =>{
          cache.put(e.request, responseCache)
        })
        return response
      })
    })
  )
})

self.addEventListener('activate', (e) =>{
  e.waitUntil(
    caches.keys().then((keys) =>{
      return Promise.all(
        keys.filter((key) => key !== cashName).map((key) => caches.delete(key))
      )
    })
  )
})