import { z } from 'zod';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

// c is the context object
app
    .get(
        '/hello', 
        clerkMiddleware(), // middleware to check if user is authenticated
        (c) => {
            const auth = getAuth(c); // get the user object
            if (!auth?.userId) {
                return c.json({
                    error: 'Unauthorized',
                });
            }
            return c.json({
                message: 'Hello world!',
                userId: auth.userId,
            });
    });

export const GET = handle(app);
export const POST = handle(app);