# DATA VID STUFF

## TODO

* audio for outro (test)
* conditionalize subtitles and details (test)
* remove delay from item details (test)
* Image movement, different shape images

# 
Commands from root directory

## Run in browser
npx remotion studio remotion-video/index.ts DataVids --env-file=./.env.local 

## Run in browser with sample json
npx remotion studio remotion-video/index.ts DataVids --env-file=./.env.local  --props=./src/samples/sample2.json

## Render default 
npx remotion render remotion-video/index.ts DataVids --env-file=./.env.local 

# Render with sample json
npx remotion render remotion-video/index.ts DataVids --env-file=./.env.local --props=./remotion-video/samples/sample2.json

## Lambda

Lambda account setup via tvfoodmaps aws account
Deployed as remotion-render-4-0-4-mem2048mb-disk2048mb-120sec

## Changing Remotion version

Match versions in both projects
run: 
npx remotion lambda functions deploy  --timeout=300  [NOTE: you must copy .env.local to .env --env-file didnt work]
copy function name "e.g" remotion-render-4-0-42-mem2048mb-disk2048mb-120sec
change function name in vidutil.ts
run: 
npx remotion lambda sites create remotion-video/index.ts --site-name=datavids [NOTE: you must copy .env.local to .env --env-file didnt work]

### Republish update 
npx remotion lambda sites create remotion-video/index.ts --site-name=datavids [NOTE: you must copy .env.local to .env --env-file didnt work]


ServeURL: https://remotionlambda-useast1-mxkhjz73v9.s3.us-east-1.amazonaws.com/sites/datavids/index.html

## Command Line Render

npx remotion lambda render https://remotionlambda-useast1-mxkhjz73v9.s3.us-east-1.amazonaws.com/sites/datavids/index.html DataVids


Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Upgrade Remotion**

```console
npm run upgrade
```

## Using server-side rendering

This template uses a [custom Webpack override](https://www.remotion.dev/docs/webpack). If you are using server-side rendering, you need to import the override function from `./src/webpack-override.ts` and pass it to [`bundle()`](https://www.remotion.dev/docs/bundle) (if using SSR) and [`deploySite()`](https://www.remotion.dev/docs/lambda/deploysite) (if using Lambda).

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

Get started with Tailwind by reading the ["Utility first" page](https://tailwindcss.com/docs/utility-first)

