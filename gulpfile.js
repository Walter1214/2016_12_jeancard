var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gutil = require("gulp-util"),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    runSequence = require('run-sequence'),
    merge = require('merge-stream'),
    childProcess = require('child_process'),
    path = require('path'),
    rimraf = require('rimraf'),
    buffer = require('vinyl-buffer'),
    spritesmith = require('gulp.spritesmith'),
    chalk = require('chalk');
//
var ifs = require('os').networkInterfaces();
var host = '' + Object.keys(ifs).map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0]).filter(x => x)[0].address;
// var host = 'localhost';
var port = 3000;
var URI = `http://${host}:${port}/`;

const DEV_MODE = gutil.env._[ 0 ] === 'd';

// 檢查是否從外部輸入 entry
var entry, defaultEntry, openLink = URI;
if (gutil.env.entry) {
    entry = DEV_MODE ? {
        master: [ './js/master.js' ]
    } : {};
    let arr = gutil.env.entry.split(',');
    while (arr.length) {
        let entryStr = arr.shift();
        if (!defaultEntry) defaultEntry = entryStr;
        entry[entryStr] = ['./js/' + entryStr + '.js'];
	}
}

function logDevelopment() {
    var str = `
    ########  ######## ##     ##
    ##     ## ##       ##     ##
    ##     ## ##       ##     ##
    ##     ## ######   ##     ##
    ##     ## ##        ##   ##
    ##     ## ##         ## ##
    ########  ########    ###
    `;
    console.log(chalk.black.bgYellow(str));
}

function logProduction() {
    var str = `
    ########  ########   #######
    ##     ## ##     ## ##     ##
    ##     ## ##     ## ##     ##
    ########  ########  ##     ##
    ##        ##   ##   ##     ##
    ##        ##    ##  ##     ##
    ##        ##     ##  #######   `;
    console.log(chalk.bgCyan.white.bold(str));
}

gulp.task('rimraf', (cb) => {
    console.log('rimraf');
    rimraf('./dist', cb);
});

// https://github.com/twolfson/gulp.spritesmith
function createSprite(src, name) {
    var spriteData = gulp.src(src)
        .pipe(spritesmith({
            imgName: '' + name + '.png',
            cssName: '_' + name + '.css',
            padding: 4,
            imgOpts: { quality: 100 },
            cssTemplate: 'src/css/base/_handlebarsStr.css.handlebars',
            cssHandlebarsHelpers: {
                half(num) {
                    return (num / 2 | 0) + 'px';
                },
                retinaBGS(spriteSheetWidth, itemWidth) {
                    return (spriteSheetWidth / itemWidth * 100) + '%';
                },
                getVW(itemWidth) {
                    return (itemWidth / 640 * 100) + 'vw';
                },
                autoSizePosition(spriteSheetSize, itemSize, itemOffset) {
                    var s = spriteSheetSize / itemOffset;
                    var w = spriteSheetSize / 640;
                    return (w / s * 100) + 'vw';
                }
            }

        }));
    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(gulp.dest('src/img_src/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('src/css'));
    return merge(imgStream, cssStream);
}


gulp.task('sprite', function() {
    var a = [
        createSprite('src/sprite_src/*', 'sprite'),
        // createSprite( 'src/sprite_src/bg/*', 'sprite_bg' ),
    ]
    return merge.apply(null, a);
});

// 只要是底線開頭的檔案，都不壓 K ，直接搬到 src/img 資料夾下
gulp.task('m', () => {
    console.log('m');
    var IMG_SRC = ['src/img_src/**/*.+(jpg|png|gif|svg|ico)', '!src/img_src/_*'];
    var OTHER_IMG = ['!src/img_src/**/*.(jpg|png|gif|svg|ico)', 'src/img_src/_*'];
    var DIST = 'src/img';
    var imageminPngquant = require('imagemin-pngquant');
    var imageminMozjpeg = require('imagemin-mozjpeg');

    var taskOtherIMG = gulp.src(OTHER_IMG)
        .pipe($.changed(DIST))
        .pipe($.size({
            title: '',
            showFiles: true
        }))
        .pipe(gulp.dest(DIST));

    var taskIMGSRC = gulp.src(IMG_SRC)
        .pipe($.changed(DIST))
        .pipe($.size({
            title: '',
            showFiles: true
        }))
        .pipe($.imagemin([
            // imageminMozjpeg({ quality: 90 }),
            $.imagemin.jpegtran({progressive: true}),
            // imageminPngquant({ quality: 90 })
            $.imagemin.optipng({optimizationLevel: 5}),
            
            
        ]))
        .pipe(gulp.dest(DIST))
        .pipe($.size({
            title: 'dist'
        }));

    return merge(taskOtherIMG, taskIMGSRC);
});

// webpack 2.0 hotreload 有問題，先放著
gulp.task('webpack-dev-server', (cb) => {
    logDevelopment();
    process.env.NODE_ENV = 'development';
    var config = require('./webpack.config');

    // 如果有從外面輸入 entry, 就複寫config.entry, 及在 URI 加入 網頁名稱({entry}.html)
    if (entry) {
        config.entry = entry;
        openLink += 'CH/' + defaultEntry + ".html";
    }

    // config.devtool = 'cheap-module-eval-source-map'; // 這會抓到 mixin 裡的路徑
    // config.devtool = "source-map";   // 要用這個才會對
    // config.devtool = "inline-source-map";   // 要用這個才會對
    // config.watch = true;
    // var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
    for (var a in config.entry) {
        // config.entry[ a ].unshift( "./html/index.jade" );
        // config.entry[ a ].unshift( `webpack-dev-server/client?${URI}`  , 'webpack/hot/only-dev-server' );
        config.entry[a].unshift(`webpack-dev-server/client?${URI}`, 'webpack/hot/dev-server');
        // config.entry[ a ].unshift( "./css/entry.scss" );
    }
    config.devServer.hot = true;
    config.devServer.inline = false;
    config.devServer.publicPath = config.output.publicPath;
    // config.output.publicPath = URI;
    config.devtool = "inline-source-map";

    var server = new WebpackDevServer(webpack(config), config.devServer);
    server.listen(port, host, (err, result) => {
        if (err)
            console.log(err);
        gutil.log("[webpack-dev-server]", URI);
        cb();
    });
});

function copyToWWW() {
    var SRC = ['dist/**/*.*', '!dist/**/*.html'];
    var DEST = 'www/jean/';
    return gulp.src(SRC)
            .pipe($.changed(DEST))
            .pipe($.size({
                title: '',
                showFiles: true
            }))
            .pipe(gulp.dest(DEST));
}

gulp.task('copy-to-www', copyToWWW);

gulp.task('webpack-build', (cb) => {
    logProduction();
    process.env.NODE_ENV = 'production';
    var config = require('./webpack.config');
    
    // 如果有從外面輸入 entry, 就複寫config.entry
    if (entry) {
        config.entry = entry;
    }

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({ colors: true, chunkModules: false }));
        copyToWWW();
        cb();
    });
});


gulp.task('p', () => runSequence('m', 'webpack-build'));
gulp.task('pp', () => {
    runSequence('m', 'webpack-build', () => {
        console.log('pp');
        var fileZillaBAT = path.resolve(__dirname, './___FTP.bat');
        childProcess.exec(fileZillaBAT, (error, stdout, stderr) => {
            return gulp.src('./')
                .pipe($.open({ uri: 'http://www.medialand.tw/?debug=medialand' }));
        });
    });
});

gulp.task('d', ['default'], () => {
    return gulp.src('./')
        .pipe($.open({ uri: openLink +'?debug=medialand' }));
});

gulp.task('watch', () => {
    console.log('watch');
    gulp.watch('src/img_src/**/*', ['m']);
    gulp.watch('src/sprite_src/**/*', ['sprite']);
});


gulp.task('default', () => runSequence('watch', 'webpack-dev-server'));