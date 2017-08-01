const chai = require('chai');
const chaiImmutable = require('chai-immutable');
import * as jsdom from 'jsdom';
require('jsdom-global')();

// const { window } = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
// const { document } = window.window;

// global.document = document;
// global.window = window;

// Object.keys(window).forEach((key) => {
//   if (!(key in global)) {
//     global[key] = window[key];
//   }
// });

const win = (new jsdom.JSDOM('<!doctype html><html><body></body></html>')).window;
const doc = win.window;
var global: any = [];

global['document'] = doc;
global['window'] = win;
global['navigator'] = {userAgent: 'node.js'};
global['HTMLElement'] = global['window'].HTMLElement;

chai.use(chaiImmutable);