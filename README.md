# Obligatorio de Taller de Frontend

*Universidad ORT del Uruguay*

![captura de pantalla de la app](image.jpg)

## Requerimientos
Descripción
La aplicación deberá permitir al usuario registrar los eventos va haciendo el bebé en el día o días anteriores. Con cada ingreso la aplicación deberá actualizar los datos estadísticos y métricas en tiempo real, en la misma pantalla y sin la necesidad de refrescar el navegador. Se deberá prestar atención a los servicios disponibles en la API para poder utilizar los necesarios. 

### Requerimientos Funcionales
- Registrar usuario. 
    - Se solicitará usuario, contraseña, departamento y ciudad de residencia (dentro de cada usuario almacenaremos el id).
    - Al seleccionar un departamento se desplegarán las ciudades que correspondan al departamento seleccionado.
    - En caso exitoso la api retornará la información del usuario y un token. Este token debe guardarse para usarlo en cada llamada a la API. 
    - El usuario quedará logueado luego del registro y accede al dashboard.
- Login en la aplicación.
    - La sesión del usuario se mantendrá válida incluso si se cierra la pestaña o el navegador.
    - Mientras uno de los campos (usuario o contraseña) permanezca vacío, el botón de ingresar deberá estar deshabilitado.
    - El login exitoso guarda en localStorage id de usuario y token.
- Logout
    - El usuario se desloguea de la aplicación permitiendo que un nuevo usuario ingrese al sistema.
- Dashboard
    - Agregar un evento. La aplicación permitirá al usuario registrar un nuevo evento. Este estará asociado al usuario que lo creó.
    - El evento debe tener los siguientes datos:
        - Categoría. Se selecciona por nombre y se almacena el id.
        - Fecha y hora. Se deberá seleccionar de un campo tipo fecha. Se deberá validar que sea menor o igual a los actuales (no puede ser futura). Si no aportamos ese dato, la API usará la fecha y hora actuales. El formato que usaremos será AAAA-MM-DD HH:MM:SS.
        - Detalles. Campo opcional. De escritura libre.
- Listado de eventos. Se listarán todos los eventos registrados por el usuario. 
    - A cada categoría del evento corresponde un ícono que se puede encontrar en la URL de base de imágenes disponible en la documentación, a eso se debe concatenar el nombre de la imagen obtenida del servicio de categorías y la extensión .png
    - Al costado de cada evento se deberá disponer un botón para eliminar los datos de ese evento. 
    - El listado tendrá dos partes.
        - Listado del día: Serán listados los eventos correspondientes a la fecha de hoy.
        - Listado de días anteriores: Se listarán todos los eventos correspondientes a días anteriores.
- Informe de eventos. 
    - Biberones: en un componente aparte, se deberá mostrar el total de biberones ingeridos en el día y el tiempo transcurrido desde el último biberón
    - Pañales: se deberá mostrar el total de pañales cambiados en el día y el tiempo transcurrido desde el último cambio
- Análisis. 
    - Gráfico de cantidades por categoría: se deberán graficar las categorías en las que hay registrados eventos mostrando la cantidad de veces que ocurrió cada uno, no se muestran en la gráfica las categorías que no tengan registros.
    - Gráfico de comidas de la última semana: se deberá mostrar la cantidad de comidas ingeridas cada día en la última semana, los días que no tengan registros se mostrarán igualmente en la gráfica.
    - Tiempo restante para el próximo biberón: Mostrar en un componente el tiempo restante hasta que se deba hacer una nueva ingesta de biberón teniendo en cuenta que el bebé tiene que tomar cada cuatro horas. Si todavía no pasaron cuatro horas, el texto se mostrará en verde, si ya se excedieron se mostrará en rojo. Este componente no se tiene que actualizar con timer, pero si al ingresar a la aplicación y con cada ingreso de biberón nuevo. 

### Requerimientos No Funcionales
- La consulta y persistencia de los datos se realizará mediante una API REST proporcionada por el equipo docente.
- Con cada ingreso la aplicación deberá actualizar los datos estadísticos y métricas en tiempo real, en la misma pantalla y sin la necesidad de refrescar el navegador. 
- Las respuestas con error desde la API deberán ser informadas con notificaciones y no usando “alerts” de JS.
- Utilizar localStorage para guardar los datos de usuario que se necesiten para utilizar la aplicación. Ej.: nombre, token, etc. No guardar la contraseña.
- No compartir usuarios con otros compañeros de clase. 
- Cuidar el aspecto visual de la aplicación. No puede ser en texto plano y blanco y negro.
- Todos los campos para las entradas del usuario deben ser validadas. La API no hace validaciones de este tipo.
- El Dashboard se debe gestionar 100% en la misma interfaz. 
- Se valorarán detalles que aporten al realismo.
- Se usarán las tecnologías React, Redux para el manejo de estado y React router para la navegación entre secciones.
