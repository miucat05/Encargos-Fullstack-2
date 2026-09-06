# Encargos-Fullstack-2
Repositorio creado por Catalina Campos y Javier Romero, como método de entregas de nuestra evaluación 1.

# Swag Vynil - Tienda Online & Panel de Administración

Aplicación web e-commerce enfocada en la venta de discos de vinilo, desarrollada con arquitectura cliente, con persistencia en `localStorage` y un diseño adaptativo implementado con Bootstrap 5.

---

## Características Principales

### Tienda Pública (Storefront)
* **Catálogo Dinámico:** Renderizado automático de productos desde fuentes de datos centralizadas.
* **Detalle de Producto:** Carga dinámica de información (`detalle-producto.html`) mapeada mediante parámetros URL (`?id=`).
* **Motor de Recomendaciones:** Sugerencias automáticas de productos relacionados filtrados por categoría.
* **Carrito de Compras:** Gestión persistente de productos añadidos mediante `localStorage`.
* **Formulario de Contacto:** Validaciones en tiempo real para datos de usuario (`js/contacto.js`).

### Panel de Administración (Admin)
* **Dashboard Global:** Métricas y contadores dinámicos de productos publicados y usuarios registrados.
* **Gestión de Productos (CRUD):** Interfaz para listar, crear, editar y eliminar vinilos.
* **Gestión de Usuarios (CRUD):** Mantenedor para administrar cuentas, roles y direcciones.
* **Validaciones de Formularios:** Módulo centralizado (`js/validaciones-admin.js`) para control de campos requeridos y formatos.

---

## Tecnologías Utilizadas

| Tecnología | Descripción |
| :--- | :--- |
| **HTML5** | Estructura semántica de vistas públicas y administrativas |
| **CSS3** | Estilos personalizados (`main.css`, `admin.css`) |
| **Bootstrap 5.3.8** | Framework UI para componentes responsive y layout de grillas |
| **JavaScript (ES6+)** | Lógica de negocio, manipulación del DOM y routing por URL |
| **LocalStorage** | Persistencia de estado local para carrito y catálogos |

---

## Estructura del Proyecto

```text
/
├── css/
│   ├── main.css                  # Estilos generales de la tienda
│   └── admin.css                 # Estilos específicos del panel de administración
├── images/
│   └── logoswag.png              # Logo oficial
├── js/
│   ├── productos-data.js         # Base de datos inicial de productos
│   ├── usuarios-data.js          # Base de datos inicial de usuarios
│   ├── cart.js                   # Lógica del carrito de compras
│   ├── detalle-producto.js       # Captura de ID por URL y renderizado de detalle
│   ├── recomendaciones.js        # Módulo de productos relacionados
│   ├── contacto.js               # Validación del formulario de contacto
│   ├── login.js                  # Control de autenticación y redirección
│   ├── admin-productos.js        # Lógica CRUD de productos
│   ├── admin-usuarios.js         # Lógica CRUD de usuarios
│   └── validaciones-admin.js     # Validaciones para formularios de administración
├── index.html                    # Página principal / Landing
├── productos.html                # Catálogo completo
├── detalle-producto.html         # Vista individual de producto
├── contacto.html                 # Formulario de contacto
├── login.html                    # Inicio de sesión
├── admin-home.html               # Dashboard del administrador
├── admin-productos.html          # Tabla de gestión de productos
├── admin-producto-form.html     # Formulario de alta/edición de producto
├── admin-usuarios.html           # Tabla de gestión de usuarios
└── admin-usuario-form.html      # Formulario de alta/edición de usuario
