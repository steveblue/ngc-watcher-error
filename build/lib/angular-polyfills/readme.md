<p align="center">
  <a href="https://github.com/lucascono/angular-polyfills">
    <img height="250" width="250" src="https://raw.githubusercontent.com/lucascono/angular-polyfills/master/angular.png">
  </a>
</p>

# Polyfills for [Angular](https://angular.io/)

> All polyfills [suggested](https://angular.io/docs/ts/latest/guide/browser-support.html) by the Angular team

## Package includes:

| Polyfill                                                                            | License               | File                                                                                                      |
|-------------------------------------------------------------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------|
| [Blob](https://github.com/eligrey/Blob.js)                                          | MIT                   | [dist/blob.js](https://github.com/lucascono/angular-polyfills/blob/master/dist/blob.js)                   |
| [classList](https://github.com/eligrey/classList.js)                                | Public domain         | [dist/classlist.js](https://github.com/lucascono/angular-polyfills/blob/master/dist/classlist.js)         |
| [FormData](https://github.com/francois2metz/html5-formdata)                         | MIT                   | [dist/formdata.js](https://github.com/lucascono/angular-polyfills/blob/master/dist/formdata.js)           |
| [Intl](https://github.com/andyearnshaw/Intl.js)                                     | MIT / Unicode license | [dist/intl.js](https://github.com/lucascono/angular-polyfills/blob/master/dist/intl.js)                   |
| [ES6](https://github.com/zloirock/core-js)                                          | MIT                   | [dist/shim.js](https://github.com/lucascono/angular-polyfills/blob/master/dist/shim.js)                   |
| [Typed Array](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js) | MIT                   | [dist/typedarray.js](https://github.com/lucascono/angular-polyfills/blob/master/dist/typedarray.js)       |
| [Web Animations](https://github.com/web-animations/web-animations-js)               | Apache                | [dist/webanimations.js](https://github.com/lucascono/angular-polyfills/blob/master/dist/webanimations.js) |

In addition, a version concatenated with all polyfills is available in [dist/all.js](https://github.com/lucascono/angular-polyfills/blob/master/dist/all.js)

## Install

```
npm install --save angular-polyfills
```

## Why?

Some of these polyfills are not published in [NPM](https://www.npmjs.com/), making it difficult to install and use them. Issues have even been opened in the original repositories requesting that they be published, but their authors have ignored it. And for those who have been published, this is a simple and faster option to get them all.

## FAQs

### Have the polyfills code been modified?

Absolutely not. They have been extracted from their original repositories and only minified with [google-closure-compiler](https://github.com/google/closure-compiler-npm) (charset: utf-8 / optimization level: simple / rewrite_polyfills: false).

### Why are there random line feeds in compiled scripts?

The Closure Compiler intentionally adds line breaks every 500 characters or so. Firewalls and proxies sometimes corrupt or ignore large JavaScript files with very long lines. Adding line breaks every 500 characters prevents this problem. Removing the line breaks has no effect on a script's semantics. The impact on code size is small, and the Compiler optimizes line break placement so that the code size penalty is even smaller when files are gzipped.
