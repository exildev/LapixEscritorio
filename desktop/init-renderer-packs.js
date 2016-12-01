try{
    require('devtron').install();
} catch(e){
    console.log('No se pudo cargar devtron', e);
}

try {
    window.ipc = require('electron').ipcRenderer;
} catch (e) {
    console.log('No se pudo cargar ipcRenderer', e);
}
