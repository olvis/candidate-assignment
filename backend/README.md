# Backend Application for the Assigment requested by Malwarebytes

**Author**: Olvis Camacho

Application is fully functional on the webpage:
```
https://thirsty-spence-49338d.netlify.app/
```

# Configuration
In order to boot the application you need to provide some environment variables for MongoDb and S3.
```
PORT=3001
MONGO_URI=xxx
S3_BUCKET_NAME=xx
S3_USER_KEY=xxx
S3_USER_SECRET=xxx
```
Rename `config.sample.env` to `.env`, the variables will be loaded by the **dotenv** package.

## Available Scripts

In the project directory, you can run:

### `npm build`
Clean, run the linter and then build the app for production to the `dist` folder.

### `npm clean`
Clean the `dist` folder

### `npm clean:all`
Clean the `dist` and `node_modules` folders

### `npm lint`
Run the TypeScript linter

### `npm serve:dev`
Serve the app in development mode using nodemon

# TODO
- Add tests
