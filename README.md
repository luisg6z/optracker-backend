
# Op Tracker

OpTracker es una aplicación destinada a la trazabilidad de las operaciones quirúrgicas, con el fin de reducir la incertidumbre del proceso para los familiares y para llevar el control de una operación de parte de un enfermero




## Instalación

### Instalar OpTracker con npm

Para la instalación, la CLI de Nestjs es recomendada para el uso del proyecto, use el siguiente comando en bash:


```bash
  npm i -g @nestjs/cli
```

> **Nota:**
> para más información, consulte la documentación de Nestjs, disponible en: https://docs.nestjs.com

Luego, se debe clonar el repositorio e instalar las dependencias:

```bash
  git clone https://github.com/luisg6z/optracker-backend
  cd optracker-backend
  npm i
```
## Variables de entorno

Para correr el proyecto es necesario tener las variables de entorno necesarias, en el directorio raíz se encuentra una plantilla de archivo `.env`


## Usando el proyecto

Una vez configuradas las variables de entorno, se debe inicializar la base de datos, para ello, se debe ejecutar el siguiente script:

```bash
  npx prisma migrate dev
```
> **Nota:**
> para más información, consulte la documentación de prisma, disponible en: https://www.prisma.io/docs

Para correr la aplicación en modo de desarrollo, se debe utilizar el siguiente script:

```bash
  npm run start:dev
```


## Documentación de la API

Por defecto, la aplicación estará en el `localhost:3000`, la aplicación posee una documentación de cada endpoint en la ruta `/docs`


## Autores

- [@luisg6z](https://github.com/luisg6z)
- [@jaraycode](https://github.com/jaraycode)
- [@Sarce18](https://github.com/Sarce18)


