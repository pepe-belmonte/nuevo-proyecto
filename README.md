# LoginTest de Pepe Belmonte para el Grupo xxxxx

Este proyecto ha sido generado con  [Angular CLI](https://github.com/angular/angular-cli) version 19.

Como framework de CSS se ha utilizado [Tailwind 4](https://tailwindcss.com/) para ahorrar tiempo en la definición de estilos, lo que hace que los ficheros SCSS sean más reducidos y sólo tengan los estilos definidos para cada uno de los componentes.

En el aspecto de seguridad se simula el Token desde el back, codificándolo en Base64. En este Token van los datos del usuario logueado, de forma similar a como se haría con JWT.

Para el desarrollo se ha seguido una estructura Clean Code, separando las capas de los componentes de vista del resto de la estructura de negocio.

```
app 
  | - Componente\Presentación 
  |              | - Componentes no compartidos
  |              | - Vista
  |
  | - Shared
  |   | - apis (Servicios)
  | - Components (componentes compartido)
  | - Guard (AuthGuard para el control de acceso al Router)
  | - Interceptors (interceptores de llamadas de la api - no se utiliza en el proyecto)
  | - Interfaces (definición de los DTO de entrada)
  | - Models (definición de los interfaces de salida)
  | - Servicios comunes (utilidades de control de errores, servicio de autenticación, etc.)

assets (iconos, imágenes estáticas, etc.)
environment (ficheros de configuración de la aplicación)

```



## Arranque en servidor local

Ejecuta `ng serve` para el servidor de desarrollo. Navega a la url `http://localhost:4200/`.

Para arrancar el servidor de API basta con copiar el contenido de la carpeta api-server a un servidor que soporte PHP y MySQL/MariaDB. El servidor tiene su propio fichero README.md

## Generar paquete distribuible

Ejecuta `ng build production` para construir el proyecto. Se generará el distribuible en la carpeta `dist/`.

Ejecuta `ng build development` para construir el proyecto. Se generará el distribuible en la carpeta `dist/`.

Si vas a alojarlo en el servidor dentro de una carpeta deberás hacerlo con `ng build --base-href=/carpeta `

## Fichero de configuración

En la carpeta environment hay dos ficheros de configuración para indicar el servidor de api.
```
export const environment = {
  production: true,
  apiUrl: 'https://www.pepebelmonte.es/api',
  apiUrlStarWars: 'https://swapi.dev/api/'
  //apiUrl: 'http://localhost/api'
};
```

## Prueba de la aplicación

Actualmente el proyecto se encuentra alojado en mi servidor personal [pepebelmonte.es/test-xxxx](http://www.pepebelmonte.es/test-orenes) y es completamente funcional.

## Porciones de código de interes

### Llamadas a API's
Se ha utilizado la api de [StarWars](https://swapi.dev/) para demostrar llamadas a una API, se puede ver la llamada en el fichero home-view.component.ts, en la función getStarships.

Se ha utilizado la api propia, alojada en [servidor personal](https://pepebelmonte.es/api), el servicio está creado con PHP para login y registro. Se puede ver en login-view.component.ts en las funciones getLoginUser y setRegisterUser (peticiones get y post).

### Uso de Signals
Se han utilizado los Signals de Angular de dos formas:

- Como signal básico booleano en home-view.component.ts
```
// declaración
isLoading = signal(false);

// asignación
this.isLoading.set(true);

// uso en el html
  @if (isLoading()) {
  ...
  <span>Conectando...</span>
  }@else {
  ...
  }
```

- Como signal de input/output en card.component.ts
```
// declaración
starship = input<StarshipDTO>();
image = input<string>();
clickImage = output<string>();

// output
  const img = this.image()??'';
  this.clickImage.emit(img);

// uso en el html
  <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{starship()?.name}}</h5>
      <p class="mb-3 font-normal text-gray-700 ">{{starship()?.manufacturer}}</p>
      <p class="mb-3 font-sm text-gray-700">Pasajeros: {{starship()?.passengers}}</p>
  </div>
```

### Carga en diferido, tanto en compontentes como en el html
Se ha incluido la carga de componentes en diferido con @defer.
```
    @defer () { 
      @for (starship of starships; track $index) {
      <app-card
        [starship]="starship"
        (clickImage)="onImageSelected($event)"
        image="seed/picsum"
        ></app-card>
      } 
    }@placeholder {
      ...
    }
```

Y la carga de imágenes con el atributo HTML loading
```
  <img 
    class="rounded-t-lg aspect-video" 
    loading="lazy" alt="imagen"
    [src]="'https://picsum.photos/' + image() + '/640/300'" alt="imágen de picsum.photos" />
```

### Test unitarios
Se han creado los test unitarios completos del componente home-view.component.ts en home-view.component.spec.ts, cubriendo la cobertura del 100% del mismo.

Se muestran ejemplos de de espías sobre llamadas API con datos mockeados, eventos, llama a API correcta y llamada a API con error

En el fichero spec.ts se incluyen comentarios para mayor detalle.

## Otros test
En mi servidor [pepebelmonte.es/test](http://www.pepebelmonte.es/test) hay otras antiguas pruebas de concepto realizadas para varias empresas, principalmente en HTML, CSS y Javascript.

