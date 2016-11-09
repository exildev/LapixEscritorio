var $ = function(name, context){
    context = (context?context:document);
    name = (name?name:'DOMContentLoaded');
    return new Promise(function(resolve, reject){
        try{
            context.addEventListener(name, function(evn){
                resolve(evn);
            }, false);
        }catch(err){
            reject(err);
        }
    });

};

$('click').then(function(e){
    console.log('ok', e);
});

// ready.then( function(e) {
//     console.log('ok', e);
// });


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js',{
//         scope: '/'
//     }).then(function(registration) {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }).catch(function(err) {
//         console.log('ServiceWorker registration failed: ', err);
//     });
// }
