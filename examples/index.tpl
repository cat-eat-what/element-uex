<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1473762766_7074292.css">
    <link rel="stylesheet" href="//shadow.elemecdn.com/npm/highlight.js@9.3.0/styles/color-brewer.css">
    <script src="https://cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js"></script>
    <script src="https://cdn.bootcss.com/codemirror/5.33.0/codemirror.min.js"></script>
    <script src="https://cdn.bootcss.com/js-beautify/1.7.5/beautify-html.min.js"></script>
    <script src="https://cdn.bootcss.com/js-beautify/1.7.5/beautify.js"></script>
    <script src="https://cdn.bootcss.com/js-beautify/1.7.5/beautify-css.js"></script>
    <title>element-uex</title>
  </head>
  <body>
    <script>
      if (!window.Promise) {
        document.write('<script src="//cdn.jsdelivr.net/npm/es6-promise@4.1.1/dist/es6-promise.min.js"><\/script><script>ES6Promise.polyfill()<\/script>')
      }
    </script>
    <div id="app"></div>
    <% if (process.env.NODE_ENV === 'production') { %>
      <script src="//shadow.elemecdn.com/npm/vue@2.5.21/dist/vue.runtime.min.js"></script>
      <script src="//shadow.elemecdn.com/npm/vue-router@3.0.1/dist/vue-router.min.js"></script>
      <script src="//shadow.elemecdn.com/app/element/highlight.pack.b1f71b31-3c07-11e9-ba1a-55bba1877129.js"></script>
    <% } %>
  </body>
  <% if (process.env.NODE_ENV === 'production') { %><script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-84335471-1', 'auto');
    ga('send', 'pageview');

    window.addEventListener('hashchange', function () {
      ga('set', 'page', window.location.href);
      ga('send', 'pageview');
    });
  </script><% } %>
</html>
