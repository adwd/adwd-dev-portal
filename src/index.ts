/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

type Env = {
  site: Fetcher;
  blog: Fetcher;
};

const fetch: ExportedHandlerFetchHandler<Env> = async (request, environment) => {
  const url = new URL(request.url);
  // switch (url.pathname) {
  //   case '/login':
  //     return await environment.login.fetch(request);

  //   case '/getuser': {
  //     // Check that the "Authorization" header is sent when authenticated.
  //     const authCheck = await environment.auth.fetch(request.clone());
  //     if (authCheck.status != 200) {
  //       return authCheck;
  //     }
  //     // If the auth check passes, send the request to the /admin endpoint
  //     return await environment.getuser.fetch(request);
  //   }
  // }

  if (url.host.includes('blog')) {
    return await environment.blog.fetch(request);
  } else if (url.host === 'adwd.dev') {
    return await environment.site.fetch(request);
  } else {
    // return new Response('Not Found.', { status: 404 });
    return await environment.site.fetch(request);
  }
};

export default {
  fetch,
};
