# MyMarket Marketplace.
## Tecnologías usadas:
    - ReactJS 18.3
    - React Redux 9.1
    - SASS
    - React Bootstrap
## Librerias misc. usadas:
    - Axios 1.7
    - React Router DOM 6.26
    - React Slick
    - React Toastify
### Pasos a seguir para levantar en Local:

1. npm install
2. npm run dev

## TODO:

    - Documentar generalmente code
    - Buscar producto

## TODO Pero no creo llegar:

    - Ver mis compras
    - Sistema comprar
    - Frontend buscar producto

### Detalles de páginas

- Login:
  - Si esta loggeado no permite ingresar Validacion por campos vacíos, combinación inválida, no puede acceder si estás loggeado
- Register:
  - Si está loggeado no permite ingresar Validacion por campos vacíos, dni no puede arrancar con cero ni ser mayor a 8 digitos, contraseñas no coinciden, no puede acceder si estás loggeado
- ForgotPassword: - Si está loggeado no permite ingresar Validacion por campos vacíos, P1 Email, valida si existe el email en la db. P2 nueva contraseña, no puede acceder si estás loggeado
- MyProducts: - Si no está loggeado no puede aparecer. Mapeo de todos mis productos, botón para editar, borrar o ir a la página del producto, paginación
- MyPurchases:
  - TODO..
- EditUserPage:
  - Página con tres tabs, la primera permite editar información básica del usuario, nombre, apellido, mail, etc.. La segunda permite cambiar la contraseña, y la tercera varias opciones. Por el momento un único botón "Eliminar Cuenta"
- HomePage:
  - Productos mostrados aleatoriamente, 2 secciones, botones para ir a todas los productos y detalles de los productos mostrados
- ProductPage:
  - Visualizacion en detalle del producto, incluye categorias, precio, stock, descripcion, imágenes. Posibilidad de comprar/agregar carrito . Si es mi producto no puedo comprar ni agregar
- BuyPage:
  - TODO..
- MyCart:
  - Si no está loggeado no puede acceder. Productos seleccionados, manejo de cantidad de productos, suma de totales, posibilidad de borrar items de mi carrito
- ProductNotExists: - Cuando el producto no existe (No encuentra producto) Redirige acá
- UploadProduct:
  - Si no está loggeado no puede acceder. Validacion por campos Vacios, permite agregar categorías e imágenes
- EditProduct:
  - Trae los datos por default editables del producto, validacion por campos vacios
- AllProducts:
  - Permite visualizar todos los productos, paginación, ordernar por diferentes casos (Nombre, descripción..).
