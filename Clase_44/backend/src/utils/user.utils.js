/**
 * Recibe la fecha de la última conexión del usuario y devuelve true si han pasado más de 48 horas
 * @param {*} lastConnectionDate Date
 * @returns boolean
 */
export const hasBeenMoreThanXTime = (lastConnectionDate) => {
    const dateNow = new Date();
    const diff = dateNow - lastConnectionDate;
    const hours48toMs = 48 * 60 * 60 * 1000; // 48 horas en milisegundos

    //return diff > hours48toMs; // Si la diferencia es mayor a 48 horas, retorna true
    
    //para testear un minuto
    const minToMs = 1 * 60 * 1000; // 1 minuto en milisegundos
    return diff > minToMs; // Si la diferencia es mayor a 1 minuto, retorna true

    
}