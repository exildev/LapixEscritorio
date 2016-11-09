console.log("SW startup");

var conf = {
    namecache: 'appname_v1',
    listcache: [
        '/',
        'css/app.css',
        'js/app.js'
    ]
};

self.addEventListener('install', e => {
    console.log("instalando...");
    e.waitUntil(
        caches.open(conf.namecache).then(cache => {
            return cache.addAll(conf.listcache);
        }).catch(error => {
            console.error('Error al cargar cache', error);
        })
    );
});

self.addEventListener('activate', e => {
    var vs = [conf.namecache];
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map( key => {
                if (vs.indexOf(key) === -1) {
                    console.log('borrando', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', e => {
    console.log("Caught a fetch!");
    e.respondWith(
        caches.match(e.request).then(cache => {
            return cache || fetch(e.request).then( res => {
                caches.open(conf.namecache).then( cache => {
                    cache.put(e.request, res.clone());
                });
                return res;
            });
        })
    );
});
