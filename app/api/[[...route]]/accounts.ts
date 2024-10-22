import { Hono } from 'hono';
import { accounts, insertAccountSchema } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { db } from '@/db/drizzle';
import { and, eq, inArray } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { createId } from "@paralleldrive/cuid2";
import { z } from 'zod';

const app = new Hono()
    .get(
        "/", 
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                // throw new HTTPException(401, {
                //     res: c.json({ error: "Unauthorized" }, 401),
                // });
                return c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db
                .select({
                    id: accounts.id,
                    name: accounts.name,
                })
                .from(accounts)
                .where(eq(accounts.userId, auth.userId));

            return c.json({ data });
        }
    )
    .get(
        "/:id",
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        clerkMiddleware(),
        async (c) => {
            // get the auth object from the request
            const auth = getAuth(c);
            // get the id from the request
            const { id } = c.req.valid("param");

            if (!id) {
                return c.json({ error: "Missing id"}, 400);
            }

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized"}, 401 );
            }

            // [data] is destructured from the array returned by .returning() for first item in the array or data: data[0]
            const [data] = await db
                // select the id and name columns from the accounts table
                .select({
                    id: accounts.id,
                    name: accounts.name,
                })
                .from(accounts)
                // where the userId is the same as the auth userId and the id is the same as the request id
                .where(
                    and(
                        eq(accounts.userId, auth.userId),
                        eq(accounts.id, id)
                    ),
                );
            
            if (!data) {
                return c.json({ error: "Not found" }, 404);
            }

            return c.json({ data });
        }
    )
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", insertAccountSchema.pick({
            name: true,
        })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json"); // validated by zValidator

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            // [data] is destructured from the array returned by .returning() for first item in the array or data: data[0]
            const [data] = await db.insert(accounts).values({
                id: createId(), // generate a new id type string
                userId: auth.userId,
                ...values, // name
            }).returning(); // return all columns

            return c.json({ data }); 

        }
    )
    .post(
        "/bulk-delete",
        clerkMiddleware(),
        zValidator(
            "json",
            z.object({ // custom zod schema to validate the request body
                ids: z.array(z.string()), // array of string ids
            }),
        ),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db
                .delete(accounts)
                .where(
                    and(
                        eq(accounts.userId, auth.userId),
                        inArray(accounts.id, values.ids)
                    )
                )
                .returning({
                    id: accounts.id, // return the id of the deleted accounts
                });
            
            return c.json({ data }); 
        }
    )
    .patch(
        "/:id",
        clerkMiddleware(),
        // validate the request parameters (id)
        zValidator(
            "param",
            z.object({
                id: z.string().optional(),
            }),
        ),
        // validate the request body
        zValidator(
            "json",
            insertAccountSchema.pick({
                name: true,
            })
        ),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid("param");
            const values = c.req.valid("json");

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const [data] = await db
                .update(accounts)
                .set(values)
                .where(
                    and(
                        eq(accounts.userId, auth.userId),
                        eq(accounts.id, id)
                    )
                )
                .returning();

            if (!data) {
                return c.json({ error: "Not found" }, 404);
            }

            return c.json({ data });
        },
    )
    .delete(
        "/:id",
        clerkMiddleware(),
        // validate the request parameters (id)
        zValidator(
            "param",
            z.object({
                id: z.string().optional(),
            }),
        ),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid("param");

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const [data] = await db
                .delete(accounts)
                .where(
                    and(
                        eq(accounts.userId, auth.userId),
                        eq(accounts.id, id)
                    )
                )
                .returning({
                    id: accounts.id,
                });

            if (!data) {
                return c.json({ error: "Not found" }, 404);
            }

            return c.json({ data });
        },
    );

export default app;
