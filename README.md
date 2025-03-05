# Tienda Online API

Esta es la documentación de la API para la Tienda Online. Aquí encontrarás información sobre los diferentes endpoints disponibles, los controladores correspondientes y ejemplos de JSON para las solicitudes.

## Endpoints

### Autenticación

#### Registro de Usuario

**Endpoint:** `/tiendaOnline/v1/auth/register`

**Método:** `POST`

**JSON de Solicitud:**

{name: "John", surname: "Doe", username: "johndoe", email: "johndoe@example.com", password: "password123", phone: "12345678"}

**Descripción:** Registra un nuevo usuario en el sistema.

#### Inicio de Sesión

**Endpoint:** `/tiendaOnline/v1/auth/login`

**Método:** `POST`

**JSON de Solicitud:**

{username: "johndoe", password: "password123"}

**Descripción:** Inicia sesión en el sistema.

### Usuarios

#### Crear Administrador

**Endpoint:** `/tiendaOnline/v1/user/admin`

**Método:** `POST`

**JSON de Solicitud:**

{name: "Admin", surname: "User", username: "admin", email: "admin@example.com", password: "adminpassword", phone: "12345678"}

**Descripción:** Crea un usuario administrador.

#### Obtener Usuarios

**Endpoint:** `/tiendaOnline/v1/user`

**Método:** `GET`

**Descripción:** Obtiene una lista de todos los usuarios.

### Productos

#### Crear Producto

**Endpoint:** `/tiendaOnline/v1/product`

**Método:** `POST`

**JSON de Solicitud:**

{name: "Producto 1", description: "Descripción del producto 1", price: 100, stock: 50, categoryName: "Categoría 1"}

**Descripción:** Crea un nuevo producto.

#### Obtener Productos

**Endpoint:** `/tiendaOnline/v1/product`

**Método:** `GET`

**Descripción:** Obtiene una lista de todos los productos.

#### Obtener Productos Más Vendidos

**Endpoint:** `/tiendaOnline/v1/product/masvendidos`

**Método:** `GET`

**Descripción:** Obtiene una lista de los productos más vendidos.

### Carrito de Compras

#### Agregar Producto al Carrito

**Endpoint:** `/tiendaOnline/v1/shopcart/add`

**Método:** `POST`

**JSON de Solicitud:**

{username: "johndoe", productName: "Producto 1", quantityProducts: 2}

**Descripción:** Agrega un producto al carrito de compras.

#### Ver Carrito

**Endpoint:** `/tiendaOnline/v1/shopcart`

**Método:** `GET`

**Descripción:** Obtiene el contenido del carrito de compras del usuario.

### Facturación

#### Completar Compra

**Endpoint:** `/tiendaOnline/v1/bill/complete`

**Método:** `POST`

**JSON de Solicitud:**

{username: "johndoe"}

**Descripción:** Completa la compra del carrito de compras del usuario.

