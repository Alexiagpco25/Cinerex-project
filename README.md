# Proyecto Cinerex

Cinerex es una plataforma para la gestión y compra de boletos en cines, con una vista pública para usuarios y un panel privado para administradores.

## Descripción general

- **Vista pública (usuario):** Muestra la cartelera de películas, permite seleccionar funciones y comprar boletos sin necesidad de iniciar sesión.
- **Vista admin:** Acceso restringido mediante login, permite administrar salas, películas y funciones.
- **Base de datos:** PostgreSQL levantada con Docker Compose.
- **Autenticación:** Usuarios no necesitan login para ver la cartelera y comprar, administradores sí.

## Tecnologías

- Backend: NestJS (Puerto 3000)  
- Frontend: Next.js (Puerto 3001)  
- Base de datos: PostgreSQL (docker-compose)  
- Autenticación: JWT + cookies HTTP-only  
- Styling: TailwindCSS

## Requisitos previos

- Node.js (v16+)  
- Docker y Docker Compose  
- npm

## Instalación y ejecución

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/Alexiagpco25/Cinerex-project.git
   cd Cinerex-project
   
2. Levanta la base de datos:
   ```bash
   docker-compose up -d
   
3. Inicia backend:
   ```bash
   cd backend-cinerex
   npm install
   npm run start:dev
   
4. Inicia frontend:
    ```bash
    cd ../frontend-cinerex
    npm install
    npm run dev
    
## URLS principales
- Usuario público: http://localhost:3001 (cartelera y compra de boletos)
- Admin: http://localhost:3001/login (login de administrador y panel privado)

## Notas 

- La autenticación usa JWT almacenados en cookies HTTP-only para mayor seguridad
- Las rutas /admin/* están protegidas y requieren autenticación
- La base de datos debe estar corriendo con Docker antes de iniciar el backend
