export function getRestaurantes(){
    return fetch('http://localhost:9090/api/restaurante')
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
}