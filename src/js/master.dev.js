// function requirePUG(name) {

// if (process.env.NODE_ENV !== 'production') {
// require(`!!raw-loader!../html/CH/${name}.pug`);
// require( '!!raw-loader!../html/CH/include/master/header.pug' );
if (module.hot) {
    window.addEventListener("message", event => {
        if (typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
            console.log("Reloading style sheets...");
            document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
                const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
                link.href = nextStyleHref;
            });
        }
    });
}
// }

// }

// module.exports = requirePUG;