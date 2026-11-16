# WOLF1K Services — API

Express 5 + TypeScript + MySQL. Ver el [README principal](../README.md) para endpoints,
variables de entorno y base de datos.

```bash
cp .env.example .env
npm install
npm run db:init    # crea las tablas
npm run dev        # desarrollo (requiere MySQL)
npm run dev:mock   # desarrollo sin MySQL (datos en memoria)
npm run build && npm start   # producción
npm test           # tests
```
