module.exports = (app, options) => {

    const isDevelopmentMode = process.env.NODE_ENV === 'development';

    if(!isDevelopmentMode){
        // if it is a production mode we need to take files from the build folder

        const compression = require("compression");

        const publicPath = options.publicPath || '/';
        const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

        app(compression()); //to compress all of the responsees in production mode

        //This is the most important middleware as it serves the request coming to
        //server and servers the corresponding static files, if a file is not found
        //it simply calls next to the next middleware in line
        app.use(publicPath, express.static(outputPath)); 

        //since file is not found by the static middleware we serve index.html
        //as a fallback;
        app.get('*', (req, res) =>
        res.sendFile(path.resolve(outputPath, 'index.html')),);
    }
    else{
        //Need to configure webpack for this
        const webpack = require('webpack');
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');
        const webpack_dev_config = require('../../internals/webpack.dev.babel');

        //Since we are using our own express server so we need to setup
        //middlewares for our use

        //initialize a webpack_dev_compiler to be used as a middleware
        const webpack_dev_compiler = webpack(webpack_dev_config);

        //after registering as a middleware the webpack then execute to
        //convert files, etc.
        app.use(webpackDevMiddleware(webpack_dev_compiler, {
            stats: 'errors-only',
            publicPath: webpack_dev_config.output.publicPath,
        }));

        //Using webpackHotMiddleware to refresh the client on changes in server
        //It is using the webpack HMR API for this purpose
        app.use(webpackHotMiddleware(webpack_dev_compiler));

        //In case if the webpack unable to handle the request then the next()
        //fallback to our custom get
        app.get('*', (req, res) => {
            //sending status 404 of not found
            res.sendStatus(404);
        });
    }
}