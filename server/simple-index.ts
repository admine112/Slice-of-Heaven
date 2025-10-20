import express from 'express';
import { registerRoutes } from './simple-routes';
import { setupVite, serveStatic } from './vite';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: any, res: any, _next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
  });

  // Vite or static
  if (app.get('env') === 'development') {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({ port, host: '0.0.0.0' }, () => {
    console.log(`\n🍕 Slice of Heaven server running on port ${port}`);
    console.log(`\n📝 Admin credentials:`);
    console.log(`   Username: admin`);
    console.log(`   Password: admin123\n`);
  });
})();
