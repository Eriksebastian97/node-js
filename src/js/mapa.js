(function () {
  //esto es un ifi una funcion que se llama asi misma
  //tiene las caracterisca es que dejamos las variable este scope y no se utilizaran en otros archivos

  //utilizar Provider y Geocoder
  //las librearias de leaflet se agregan mediante la L

  const geocodeService = L.esri.Geocoding.geocodeService();

  const lat = document.querySelector("#lat").value || 38.8806526;
  const lng = document.querySelector("#lng").value || 1.4045704;
  const mapa = L.map("mapa").setView([lat, lng], 12);
  let marker;

  //el div con la id de mapa tiene una altura de 0 no se muestra pero con css se deberia mostrar
  //Esta parte de atribuciones es necesaria si no , no funciona leaflet
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  //El pin
  //l es con tiene toda la informacion de leaftlet
  //draggable es el pin para mover
  //autoPan es para centrar el mapa cuando lo movamos
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(mapa);

  //detecta el moviento del pin

  marker.on("moveend", function (event) {
    marker = event.target;

    //retorna la posicion
    const posicion = marker.getLatLng();

    //   console.log(posicion)
    //centramos esa cordenada

    mapa.panTo(new L.latLng(posicion.lat, posicion.lng));
    //Obtener informacion de la calle al obtener el PIN

    geocodeService.reverse().latlng(posicion, 13).run(function (error, resultado) {
        console.log(resultado);

        marker.bindPopup(resultado.address.LongLabel)

        //llenar los campos de crear.pug creados

        //seleccion de parrafo y muestra la calle y lo renderiza

        //todo esto se va a guardar en la base de datos

        //Ya cuando estemos trabajando en la vista de la propiedad de las personas que le pueda interesar esta
        //propiedad, estaremos mostrando el mapa.
        //es por esto que requerimos estos valores

        document.querySelector(".calle").textContent =resultado?.address.Address ??  ""
        
        //nombre de la calle
        document.querySelector("#calle").value =resultado?.address.Address ??  ""

        document.querySelector("#lat").value =resultado?.latlng?.lat ??  ""

        document.querySelector("#lng").value =resultado?.latlng.lng ??  ""
      });
  });

})();
