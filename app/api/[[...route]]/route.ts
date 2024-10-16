import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import accounts from './accounts';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app
    .route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes; // To generate RPC types, RPC is short for Remote Procedure Call which is a protocol that one program can use to request a service from a program located in another computer in a network without having to understand the network's details.
