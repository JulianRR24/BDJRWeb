<div align="center">
# BDJR Web Platform

**BDJR Web** es una plataforma web moderna para la comercialización, demostración y gestión de soluciones de software desarrolladas por **BDJR**. Combina un frontend ligero en **HTML/CSS/JS** con un backend en **PHP** que se integra con **Supabase** (BaaS) y **Mercado Pago Checkout Pro** para pagos.

</div>

---

## Visión General

- **Catálogo de productos** digitales (apps de finanzas, productividad, negocios, etc.).
- **Flujo de compra completo**: carrito persistente, autenticación de usuario, creación de preferencia en Mercado Pago y redirección al pago.
- **Panel tipo dashboard** con navegación lateral, tema oscuro y componentes reutilizables.
- Backend simple en PHP que actúa como **BFF (Backend for Frontend)** para:
  - Autenticación mediante **Supabase Auth**.
  - Consumo y persistencia de datos en tablas de Supabase (productos, órdenes, ítems de órdenes).
  - Integración segura con **Mercado Pago** (SDK oficial `mercadopago/dx-php`).

> Pensado como un proyecto demostrativo y base para soluciones SaaS ligeras.

---

## Módulos Principales

- **Landing / Dashboard (`index.html`)**  
  Vista inicial con resumen, navegación lateral y acceso rápido al catálogo.

- **Catálogo (`catalog.html`)**  
  Listado de productos con tarjetas, precios, CTA de "Agregar al carrito" y acceso al detalle.

- **Detalle de producto (`product.html`)**  
  - Galería de imágenes por producto.
  - Descripción extensa, características y beneficios.
  - Botón para agregar al carrito.

- **Carrito y Checkout (`cart.html`)**  
  - Carrito persistente en `localStorage` mediante `assets/js/cart.js`.
  - Resumen con subtotal y total.
  - Integración con **Mercado Pago Checkout Pro (Wallet Brick)**:
    - Creación de preferencia en `backend/create_preference.php`.
    - Render del brick en el `div#walletBrick_container`.

- **Autenticación y cuenta (`login.html`, `dashboard.html`, `settings.html`)**  
  - Registro e inicio de sesión contra Supabase (`backend/auth.php`).
  - Al iniciar sesión, el menú muestra "Mi Cuenta" y botón de cierre de sesión.

- **Contacto y soporte ligero (`contact.html`, `tickets.html`)**  
  Formularios de contacto / tickets (orientado a demostración de UI).

- **Sección académica (`/basics`)**  
  Páginas básicas HTML (tablas, formularios, multimedia, etc.) usadas como laboratorio académico y parte del portafolio.

---

## Stack Tecnológico

- **Frontend**
  - HTML5 semántico.
  - CSS3 modular (variables, `flex`, `grid`, utilidades reutilizables).
  - JavaScript **ES Modules** (sin frameworks):
    - `assets/js/app.js`: layout, sidebar, tema, actions flotantes.
    - `assets/js/cart.js`: lógica de carrito.
    - `assets/js/products.js`: catálogo estático base.
    - `assets/js/auth.js`: flujo de login/registro utilizando el backend PHP.
    - `assets/js/api.js`: wrapper fetch para consumir el backend.

- **Backend**
  - PHP 7+ (probado con XAMPP en Windows).
  - `backend/config.php`:
    - CORS básico.
    - Configuración de errores.
    - Constantes `SUPABASE_URL` y `SUPABASE_KEY`.
  - `backend/db.php`:
    - Helper `supabase_request` para consumir la REST API de Supabase.
  - `backend/auth.php`:
    - Proxy a **Supabase Auth** (`signup` y `token?grant_type=password`).
  - `backend/products.php`:
    - Lectura de productos desde tabla `bdjr_products` en Supabase.
  - `backend/orders.php`:
    - Registro de órdenes (`bdjr_orders`) e ítems (`bdjr_order_items`) en Supabase.
  - `backend/create_preference.php`:
    - Integración con Mercado Pago usando `mercadopago/dx-php`.

- **Servicios externos**
  - **Supabase**: autenticación y base de datos.
  - **Mercado Pago Checkout Pro**: creación de preferencias y pasarela de pago.

---

## Estructura de Carpetas

```bash
bdjr-web/
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── utilities.css
│   ├── images/
│   │   └── products/        # Imágenes de las soluciones de software
│   └── js/
│       ├── app.js          # Sidebar, tema, acciones flotantes
│       ├── api.js          # Helper fetch para backend PHP
│       ├── auth.js         # Lógica de autenticación en el frontend
│       ├── cart.js         # Lógica de carrito (localStorage)
│       ├── products.js     # Catálogo estático base
│       └── utils.js        # Utilidades varias
├── backend/
│   ├── auth.php            # Proxy de autenticación a Supabase
│   ├── check_sdk.php       # Verificación del SDK de Mercado Pago
│   ├── config.php          # CORS + configuración general
│   ├── create_preference.php # Creación de preferencias en Mercado Pago
│   ├── db.php              # Helper para consumir Supabase
│   ├── orders.php          # Registro de órdenes e ítems
│   ├── ping.php            # Endpoint simple de salud
│   ├── products.php        # Listado de productos desde Supabase
│   └── test_auth.php       # Endpoint de prueba de autenticación
├── basics/                 # Páginas HTML académicas (tipografía, tablas, etc.)
├── vendor/                 # Dependencias de Composer (incluye mercadopago/dx-php)
├── cart.html               # Vista de carrito y pasarela Mercado Pago
├── catalog.html            # Catálogo de productos
├── contact.html            # Página de contacto
├── dashboard.html          # Panel de usuario autenticado
├── index.html              # Landing / dashboard principal
├── login.html              # Login / registro de usuario
├── product.html            # Detalle de producto
├── settings.html           # Ajustes de cuenta
├── tickets.html            # UI de tickets básica
├── composer.json           # Definición de dependencias PHP
├── composer.lock
└── README.md
```

---

## Puesta en Marcha en Local (XAMPP)

- **Requisitos**
  - PHP 7.4+ (por ejemplo con **XAMPP** en Windows).
  - Composer instalado.
  - Cuenta de **Supabase** con proyecto configurado.
  - Cuenta de **Mercado Pago** con credenciales de test o producción.

- **Pasos**

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/usuario/bdjr-web.git
   ```

2. **Mover el proyecto a la carpeta del servidor** (ejemplo XAMPP en Windows):

   ```text
   C:\xampp\htdocs\bdjr-web
   ```

3. **Instalar dependencias PHP** (en la raíz del proyecto):

   ```bash
   composer install
   # o
   composer require mercadopago/dx-php
   ```

4. **Configurar Supabase** en `backend/config.php`:

   - `SUPABASE_URL`: URL del proyecto Supabase.
   - `SUPABASE_KEY`: clave `anon` o de servicio (según el caso de uso).

5. **Configurar Mercado Pago**:

   - En `cart.html` (frontend):

     ```js
     const mp = new MercadoPago('PUBLIC_KEY_AQUI', { locale: 'es-CO' });
     ```

   - En `backend/create_preference.php` (backend):

     ```php
     MercadoPagoConfig::setAccessToken('ACCESS_TOKEN_AQUI');
     ```

   Asegúrate de que la **public key** y el **access token** pertenezcan a la misma cuenta de Mercado Pago.

6. **Levantar el servidor**

   - Inicia Apache en XAMPP.
   - Accede en el navegador a:

     ```text
     http://localhost/bdjr-web/
     ```

---

## Flujo de Autenticación

- El usuario se registra o inicia sesión en `login.html`.
- El frontend llama a `backend/auth.php` usando `apiRequest` (`assets/js/api.js`).
- El backend reenvía la petición a **Supabase Auth**.
- Si el login es correcto:
  - Se guarda `supabase_token` y un objeto `user` en `localStorage`.
  - El menú lateral muestra "Mi Cuenta" y se habilita el flujo de compra autenticado.

---

## Flujo de Carrito y Pago con Mercado Pago

- El usuario navega el catálogo (`catalog.html` / `product.html`) y agrega productos usando `cart.add(...)`.
- El carrito se guarda en `localStorage` y se sincroniza con el FAB del carrito (`app.js`).
- En `cart.html`:
  - Se renderiza la tabla de ítems del carrito.
  - Se calcula el `subtotal` y el `total` (actualmente sin IVA adicional).
  - Se llama a `initMercadoPago()` que:
    - Verifica autenticación.
    - Envía el carrito + datos de usuario a `backend/create_preference.php`.
    - Recibe un `id` de preferencia.
    - Inicializa el **Wallet Brick** de Mercado Pago sobre `#walletBrick_container`.

---

Desarrollado por **BDJR**.
