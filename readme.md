# Reserva de parking

Aquí tenemos una utilidad para hacer la reserva de plaza de parking.

No doy el nombre de la plataforma ni ningún otro dato sensible.

Se trata más de un ejercicio para practicar con javascript y node.

Se lanza con node un js que realiza una petición request a un servidor.

Para hacer la petición necesitamos un Access-Token que previamente necesitamos conseguir.

También necesitamos un conjunto de variables de entorno que guardamos en un fichero .env con la url a la que atacamos, ids del parking, el usuario y datos del vehículo que utilizará la plaza.



## Ficheros


### postBooking.js

Lanza la petición de reserva de plaza. Para ello utiliza el método request y los datos del entorno que tenemos que tener en el fichero .env.

### example.env

Este archivo es un ejemplo de la estructura y los datos de entorno que necesitamos tener. Se debe rellenar y guardarse como .env.

### package.json

Fichero de instalación de node. De momento solo declaramos dependencias.

### readme.md

Este mismo archivo de información.



## Requisitos

Necesitamos tener instalado node.

Necesitamos conocer el contenido de todas las variables de entorno.

Para ello, podemos abrir la aplicación de reservas de parking desde un navegador y, con las herramientas para desarrolladores, ir viendo las peticiones fetch que se lanzan. En concreto necesitamos la que realiza la reserva de parking propiamente dicha.



## Instalación y puesta en marcha

Clonar el repositorio y ejecutar **'npm install'**.

Necesitamos crear el fichero .env con la estructura que se muestra en example.env y con todos los datos rellenados.

Una vez creado el fichero .env, para lanzar el script basta con ejecutar **'node postBooking.js'**.

Actualmente, han llevado mucha lógica a la aplicación de reserva y es muy difícil saber qué criterios han aplicado. De hecho, la llamada que realiza la reserva devuelve el mismo resultado (http 202 OK) tanto si la reserva se ha podido efectuar como si no (o puede que una vez efectuada se haga alguna comprobación real de la plaza y si se concedió en una plaza no habilitada, puede que se elimine después la reserva). También tendrían así la posibilidad de detectar peticiones que no pueden venir por la aplicación, con lo que podrían ver con qué usuarios se están realizando y banearles, así que hay que usar esto con especial cuidado.

Actualmente, la manera más sencilla de usar este proceso es en la reserva de las plazas que se liberan cada día, que se hace con una semana de adelanto, a las 8:00 am, horario de Europa Central. Es decir, si hoy es lunes, a las 8h se liberan las plazas del lunes siguiente. El sistema actualmente se queda sin plazas en cuestión de segundos, bien por reservas de usuarios de la aplicación, bien por que se quiten plazas no habilitadas para la reserva. Por tanto, si se programa una tarea que ejecute este script todos los días a las 8h, es muy probable que se consiga reservar esa plaza.

Necesitamos además el dato del token, que es el único dato variable. Ese token, es el Access-Token de la aplicación, que actualmente lo tienen definido con 1 hora de caducidad, por tanto si queremos que esto se lance a las 8:00, necesitamos el token generado como mucho 1 hora antes. El token se puede obtener de las variables de almacenamiento local o de las cookies guardadas en el navegador.

