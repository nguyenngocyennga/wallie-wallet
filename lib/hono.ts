import { hc } from 'hono/client';

import { AppType } from '@/app/api/[[...route]]/route';

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

// This file is a client-side hook that uses the hono/client package to create a client for the API. The client is created using the hc function, which takes the AppType type from the route file and the URL of the API as arguments. The URL is read from the NEXT_PUBLIC_APP_URL environment variable. The client is then exported for use in other parts of the application.