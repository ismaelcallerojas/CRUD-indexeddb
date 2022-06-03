// https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/success_event
// https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/db
const dbConnection = window.indexedDB.open('ventas', 2);
let db;
//on success = El successevent se dispara cuando un IDBRequesttiene éxito.
dbConnection.onsuccess = () => {
    db = dbConnection.result;
    console.log("Base de datos abierta", db);
}
// El upgradeneededevento se activa cuando se intentó abrir una base de datos 
// con un número de versión superior a su versión actual.
dbConnection.onupgradeneeded = (e) => {
    db = e.target.result;//elemento que nos devuelve
    console.log("Crear objetos de DB", db);
    const coleccionObjetos = db.createObjectStore('articulo', {
        keyPath: 'clave'
    });
}
// El errorevento se activa IDBTransactioncuando una solicitud devuelve un error 
// y el evento aparece en el objeto de la transacción.
dbConnection.onerror = (error) =>{
    console.log(error);
}

//Insertar
const insertar=(informacion)=>{
    //lectura de tablas
    var transaccion=db.transaction("articulo","readwrite");
    const objeto= transaccion.objectStore('articulo');
    //insertar en el objeto
    const cargaInfo=objeto.add(informacion);
    console.log("cargar info",cargaInfo);
}

//Eliminar
//Actualizar
const actualizar=(informacion)=>{
    //lectura de tablas
    var transaccion=db.transaction("articulo","readwrite");
    const objeto= transaccion.objectStore('articulo');
    //
    const cargaInfo=objeto.put(informacion);
}

//devolver
const devolver = ()=>{
    db = dbConnection.result;
    //lectura de tablas
    var transaccion=db.transaction("articulo","readonly");
    const objeto= transaccion.objectStore('articulo');
    console.log(objeto)
    //iterar los elementos de articulos
    const cursor=objeto.openCursor();
    cursor.onsuccess=(e)=>{
        const c=e.target.result;
        if (c) {
            console.log(c.value);
        } else {
            console.log("No existe datos");
        }
    }
}

// https://developer.mozilla.org/es/docs/Web/API/IDBObjectStore/add
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put