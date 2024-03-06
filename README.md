This is the frontend boilerplate for frontend projects built with NextJS and Redux.

## Installation

-   Run `yarn`
-   Change `.env-example` and rename to `.env`
-   Run `yarn dev`

## Creating pages

Create pages inside the `/pages` folder, as per the docs [here](https://nextjs.org/docs/basic-features/pages).

With the file in `/pages` you have created, import the appropriate component from your `/containers` folder.

** Only add the `getInitialProps` method if you need to pre-fetch data for SEO. ** Anything behind a login should not go into this method and instead into component state inside the `useEffect` hook.

Within the component you have created inside `/containers` folder, you will need to wrap it with the `withAuth` provider. Example:

```
export default withAuth(About, true);
```

The second parameter of true or false dictates whether this page or component ** requires ** authentication to view. If it does, and the user is not logged in, it will show the login form.
