---
name: best-practices
description: 'Buenas prácticas de desarrollo frontend y backend. Usar cuando: revisando código HTML/CSS/JS, diseñando APIs REST, implementando seguridad, accesibilidad, rendimiento, manejo de errores, validación de entradas, organización de código. Use for: code review, checklist de calidad, refactoring, nuevas features, seguridad OWASP, responsive design, SEO, accesibilidad WCAG.'
argument-hint: 'frontend | backend | seguridad | accesibilidad | rendimiento | api'
---

# Buenas Prácticas Frontend & Backend

## Cuándo Usar Esta Skill
- Revisar o generar código HTML, CSS o JavaScript
- Diseñar o implementar APIs REST
- Aplicar criterios de seguridad (OWASP Top 10)
- Optimizar rendimiento web
- Garantizar accesibilidad (WCAG 2.1 AA)
- Revisar manejo de errores y logging
- Organizar arquitectura de código

---

## Frontend

### HTML — Semántica y Accesibilidad
- Usar etiquetas semánticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Todo `<img>` debe tener atributo `alt` descriptivo (o `alt=""` si es decorativa).
- Jerarquía de encabezados correcta: un solo `<h1>` por página, sin saltar niveles.
- Formularios: etiquetar cada campo con `<label for="id">` o `aria-label`.
- Agregar `lang` al `<html>`: `<html lang="es">`.
- Incluir `<meta name="description">` y `<meta name="viewport">`.
- Usar `rel="noopener noreferrer"` en links externos con `target="_blank"`.

### CSS — Arquitectura y Rendimiento
- Nombrar clases con BEM: `.bloque__elemento--modificador`.
- Usar variables CSS (`--color-primario`, `--font-size-base`) para consistencia.
- Mobile-first: escribir estilos base para móvil y escalar con `min-width`.
- Evitar `!important`; resolver especificidad con buena estructura.
- Preferir `gap` y Grid/Flexbox sobre márgenes hackeados.
- No usar `@import` en CSS de producción (bloquea rendering); usar `<link>` o bundler.
- Minimizar y comprimir CSS en producción.

### JavaScript — Patrones y Seguridad
- Usar `const`/`let`; nunca `var`.
- Preferir `async/await` sobre callbacks anidados.
- Nunca usar `innerHTML` con datos del usuario sin sanitizar → XSS.
  ```js
  // MAL
  element.innerHTML = userInput;
  // BIEN
  element.textContent = userInput;
  ```
- Validar y sanitizar toda entrada del usuario en cliente Y servidor.
- Usar delegación de eventos para listas dinámicas.
- Manejar errores en `async` con `try/catch`; nunca silenciar errores.
- Evitar globales; usar módulos ES (`import/export`) o IIFE.
- No exponer tokens, API keys ni secretos en código cliente.

### Rendimiento Web
- Optimizar imágenes: usar formato WebP, atributos `width`/`height`, lazy loading (`loading="lazy"`).
- Cargar scripts no críticos con `defer` o `async`.
- Implementar Critical CSS (inline) y diferir el resto.
- Minificar HTML, CSS y JS en producción.
- Usar caché de recursos estáticos (cabeceras `Cache-Control`).
- Apuntar a LCP < 2.5s, CLS < 0.1, FID/INP < 200ms (Core Web Vitals).

### Accesibilidad (WCAG 2.1 AA)
- Contraste de color mínimo 4.5:1 para texto normal, 3:1 para texto grande.
- Toda funcionalidad debe ser operable con teclado (Tab, Enter, Escape, flechas).
- Usar roles ARIA solo cuando HTML nativo no sea suficiente.
- Focus visible en todos los elementos interactivos (no eliminar outline sin reemplazarlo).
- Añadir `aria-live` para contenido dinámico (alertas, modales).
- Probar con VoiceOver / NVDA además de herramientas automáticas.

### SEO
- URL amigables y descriptivas; evitar parámetros sin sentido.
- `<title>` único por página (50-60 chars) y `<meta description>` (150-160 chars).
- Implementar Open Graph (`og:title`, `og:description`, `og:image`).
- Archivo `sitemap.xml` y `robots.txt` actualizados.
- Datos estructurados JSON-LD cuando aplique.

---

## Backend

### API REST — Diseño
- Recursos en plural y sustantivos: `/api/v1/users`, `/api/v1/products/{id}`.
- Verbos HTTP correctos: GET (leer), POST (crear), PUT/PATCH (actualizar), DELETE (eliminar).
- Versionar la API desde el inicio: `/api/v1/`.
- Respuestas consistentes con estructura fija:
  ```json
  { "data": {}, "error": null, "meta": {} }
  ```
- Usar códigos HTTP semánticos: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error.
- Implementar paginación (`?page=1&limit=20`) para listas grandes.

### Seguridad (OWASP Top 10)
- **Validar SIEMPRE** entradas en servidor, nunca confiar solo en cliente.
- **SQL/NoSQL Injection**: usar consultas parametrizadas o ORMs; NUNCA concatenar strings.
  ```js
  // MAL
  db.query(`SELECT * FROM users WHERE id = ${userId}`);
  // BIEN
  db.query('SELECT * FROM users WHERE id = ?', [userId]);
  ```
- **Autenticación**: usar bcrypt (≥12 rounds) para contraseñas; JWT con expiración corta + refresh token.
- **HTTPS**: forzar TLS; redirigir HTTP → HTTPS; HSTS header.
- **CORS**: configurar explícitamente; no usar `*` en producción con credenciales.
- **Rate limiting**: limitar peticiones por IP/usuario para prevenir fuerza bruta.
- **Headers de seguridad**: `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
- **Secretos**: variables de entorno (`.env`); nunca hardcodear en código.

### Manejo de Errores
- Nunca exponer stack traces ni detalles internos al cliente en producción.
- Errores operativos (validación, 404) vs errores de programación (crash): tratar diferente.
- Estructura de error estándar:
  ```json
  { "error": { "code": "VALIDATION_ERROR", "message": "El campo email es requerido", "field": "email" } }
  ```
- Implementar logging estructurado (JSON) con nivel: `debug`, `info`, `warn`, `error`.
- Registrar: timestamp, nivel, mensaje, userId (si aplica), requestId, stack (solo en logs, no en respuesta).

### Base de Datos
- Usar consultas parametrizadas siempre.
- Índices en columnas usadas en `WHERE`, `JOIN` y `ORDER BY`.
- Transacciones para operaciones que deben ser atómicas.
- No usar `SELECT *`; seleccionar campos explícitos.
- Connection pooling configurado correctamente.
- Backups automáticos con retención definida.

### Organización del Código
- Separación de responsabilidades: rutas → controladores → servicios → repositorios.
- Una función, una responsabilidad (SRP).
- Funciones puras donde sea posible (sin efectos secundarios).
- No duplicar lógica (DRY); abstraer solo cuando hay 3+ repeticiones.
- Nombres descriptivos; evitar abreviaciones crípticas.
- Tests unitarios para lógica de negocio crítica.

---

## Checklist de Revisión de Código

### Frontend
- [ ] HTML semántico y sin errores de validación
- [ ] Imágenes con `alt`, optimizadas y con `loading="lazy"`
- [ ] No hay `innerHTML` con datos no sanitizados
- [ ] Contraste WCAG AA cumplido
- [ ] Responsive en móvil, tablet y escritorio
- [ ] Scripts con `defer`/`async` cuando aplique
- [ ] No hay secretos o API keys expuestas

### Backend
- [ ] Todas las entradas validadas en servidor
- [ ] Consultas parametrizadas (sin concatenación de strings)
- [ ] Códigos HTTP correctos en todas las respuestas
- [ ] Errores no exponen información interna
- [ ] Autenticación y autorización verificadas
- [ ] Rate limiting implementado en endpoints sensibles
- [ ] Variables sensibles en variables de entorno
