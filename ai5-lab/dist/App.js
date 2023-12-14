"use strict";
// App.ts
var App = /** @class */ (function () {
    function App() {
        this.currentStyle = 'css1'; // Default style
        this.styles = {
            css1: 'css1.css',
            css2: 'css2.css',
        };
        this.applyStyle();
    }
    App.prototype.applyStyle = function () {
        var styleLink = document.getElementById('styleLink');
        if (styleLink) {
            styleLink.href = this.styles[this.currentStyle];
        }
    };
    App.prototype.toggleStyle = function () {
        this.currentStyle = this.currentStyle === 'css1' ? 'css2' : 'css1';
        this.applyStyle();
    };
    return App;
}());
var app = new App();
// Listen for the style change button and handle it
document.addEventListener('DOMContentLoaded', function () {
    var styleChangeButton = document.getElementById('styleChangeButton');
    styleChangeButton === null || styleChangeButton === void 0 ? void 0 : styleChangeButton.addEventListener('click', function () {
        app.toggleStyle();
    });
});
