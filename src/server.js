import env from './config/env.js';

const { default: app } = await import('./app.js');
const { default: db } = await import('./config/database.js');

const PORT = env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Product Service is running on port ${PORT}`);
});

let isShuttingDown = false;

const shutdown = (signal) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    console.log(`${signal} received. Starting graceful shutdown...`);

    server.close(async (error) => {
        if (error) {
            console.error('Error closing HTTP server:', error);
            process.exitCode = 1;
        }

        try {
            await db.destroy();
            console.log('Database connection pool closed.');
        } catch (dbError) {
            console.error('Error closing database connection:', dbError);
            process.exitCode = 1;
        }

        console.log('Graceful shutdown completed.');
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));