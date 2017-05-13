/**
  * @license Angular Material v2.0.0-beta.5
  * Copyright (c) 2017 Google, Inc. https://material.angular.io/
  * License: MIT
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('rxjs/Subject'), require('rxjs/add/operator/debounceTime'), require('@angular/common'), require('rxjs/Observable'), require('rxjs/Subscription'), require('rxjs/add/observable/fromEvent'), require('rxjs/add/observable/merge'), require('rxjs/add/operator/auditTime'), require('rxjs/add/operator/first'), require('rxjs/add/observable/of'), require('@angular/forms'), require('@angular/animations'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/switchMap')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', 'rxjs/Subject', 'rxjs/add/operator/debounceTime', '@angular/common', 'rxjs/Observable', 'rxjs/Subscription', 'rxjs/add/observable/fromEvent', 'rxjs/add/observable/merge', 'rxjs/add/operator/auditTime', 'rxjs/add/operator/first', 'rxjs/add/observable/of', '@angular/forms', '@angular/animations', 'rxjs/add/operator/filter', 'rxjs/add/operator/switchMap'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.material = global.ng.material.material || {}),global.ng.core,global.ng.platformBrowser,global.Rx,global.Rx.Observable.prototype,global.ng.common,global.Rx,global.Rx,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable,global.ng.forms,global.ng.animations));
}(this, (function (exports,_angular_core,_angular_platformBrowser,rxjs_Subject,rxjs_add_operator_debounceTime,_angular_common,rxjs_Observable,rxjs_Subscription,rxjs_add_observable_fromEvent,rxjs_add_observable_merge,rxjs_add_operator_auditTime,rxjs_add_operator_first,rxjs_add_observable_of,_angular_forms,_angular_animations) { 'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
  * @license Angular Material v2.0.0-beta.5
  * Copyright (c) 2017 Google, Inc. https://material.angular.io/
  * License: MIT
  */
/**
 * Wrapper around Error that sets the error message.
 * \@docs-private
 */
var MdError = (function (_super) {
    __extends(MdError, _super);
    /**
     * @param {?} value
     */
    function MdError(value) {
        var _this = _super.call(this) || this;
        _this.message = value;
        return _this;
    }
    return MdError;
}(Error));
var MATERIAL_COMPATIBILITY_MODE = new _angular_core.InjectionToken('md-compatibility-mode');
/**
 * Injection token that configures whether the Material sanity checks are enabled.
 */
var MATERIAL_SANITY_CHECKS = new _angular_core.InjectionToken('md-sanity-checks');
/**
 * Exception thrown if the consumer has used an invalid Material prefix on a component.
 * \@docs-private
 */
var MdCompatibilityInvalidPrefixError = (function (_super) {
    __extends(MdCompatibilityInvalidPrefixError, _super);
    /**
     * @param {?} prefix
     * @param {?} nodeName
     */
    function MdCompatibilityInvalidPrefixError(prefix, nodeName) {
        return _super.call(this, "The \"" + prefix + "-\" prefix cannot be used in ng-material v1 compatibility mode. " +
            ("It was used on an \"" + nodeName.toLowerCase() + "\" element.")) || this;
    }
    return MdCompatibilityInvalidPrefixError;
}(MdError));
/**
 * Selector that matches all elements that may have style collisions with AngularJS Material.
 */
var MAT_ELEMENTS_SELECTOR = "\n  [mat-button],\n  [mat-card-subtitle],\n  [mat-card-title],\n  [mat-dialog-actions],\n  [mat-dialog-close],\n  [mat-dialog-content],\n  [mat-dialog-title],\n  [mat-fab],\n  [mat-icon-button],\n  [mat-menu-trigger-for],\n  [mat-mini-fab],\n  [mat-raised-button],\n  [mat-tab-label],\n  [mat-tab-link],\n  [mat-tab-nav-bar],\n  [matTooltip],\n  mat-autocomplete,\n  mat-button-toggle,\n  mat-button-toggle-group,\n  mat-button-toggle,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-actions,\n  mat-dialog-container,\n  mat-dialog-content,\n  mat-divider,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-pseudo-checkbox,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-sidenav-container,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-tab-group,\n  mat-toolbar,\n  mat-error";
/**
 * Selector that matches all elements that may have style collisions with AngularJS Material.
 */
var MD_ELEMENTS_SELECTOR = "\n  [md-button],\n  [md-card-subtitle],\n  [md-card-title],\n  [md-dialog-actions],\n  [md-dialog-close],\n  [md-dialog-content],\n  [md-dialog-title],\n  [md-fab],\n  [md-icon-button],\n  [md-menu-trigger-for],\n  [md-mini-fab],\n  [md-raised-button],\n  [md-tab-label],\n  [md-tab-link],\n  [md-tab-nav-bar],\n  [mdTooltip],\n  md-autocomplete,\n  md-button-toggle,\n  md-button-toggle-group,\n  md-button-toggle,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-actions,\n  md-dialog-container,\n  md-dialog-content,\n  md-divider,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-pseudo-checkbox,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-sidenav-container,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-tab-group,\n  md-toolbar,\n  md-error";
/**
 * Directive that enforces that the `mat-` prefix cannot be used.
 */
var MatPrefixRejector = (function () {
    /**
     * @param {?} isCompatibilityMode
     * @param {?} elementRef
     */
    function MatPrefixRejector(isCompatibilityMode, elementRef) {
        if (!isCompatibilityMode) {
            throw new MdCompatibilityInvalidPrefixError('mat', elementRef.nativeElement.nodeName);
        }
    }
    return MatPrefixRejector;
}());
MatPrefixRejector.decorators = [
    { type: _angular_core.Directive, args: [{ selector: MAT_ELEMENTS_SELECTOR },] },
];
/**
 * @nocollapse
 */
MatPrefixRejector.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
    { type: _angular_core.ElementRef, },
]; };
/**
 * Directive that enforces that the `md-` prefix cannot be used.
 */
var MdPrefixRejector = (function () {
    /**
     * @param {?} isCompatibilityMode
     * @param {?} elementRef
     */
    function MdPrefixRejector(isCompatibilityMode, elementRef) {
        if (isCompatibilityMode) {
            throw new MdCompatibilityInvalidPrefixError('md', elementRef.nativeElement.nodeName);
        }
    }
    return MdPrefixRejector;
}());
MdPrefixRejector.decorators = [
    { type: _angular_core.Directive, args: [{ selector: MD_ELEMENTS_SELECTOR },] },
];
/**
 * @nocollapse
 */
MdPrefixRejector.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
    { type: _angular_core.ElementRef, },
]; };
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
var CompatibilityModule = (function () {
    /**
     * @param {?} _document
     * @param {?} _sanityChecksEnabled
     */
    function CompatibilityModule(_document, _sanityChecksEnabled) {
        this._document = _document;
        /**
         * Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
         */
        this._hasDoneGlobalChecks = false;
        if (_sanityChecksEnabled && !this._hasDoneGlobalChecks && _document && _angular_core.isDevMode()) {
            // Delay running the check to allow more time for the user's styles to load.
            this._checkDoctype();
            this._checkTheme();
            this._hasDoneGlobalChecks = true;
        }
    }
    /**
     * @return {?}
     */
    CompatibilityModule.prototype._checkDoctype = function () {
        if (!this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    };
    /**
     * @return {?}
     */
    CompatibilityModule.prototype._checkTheme = function () {
        if (typeof getComputedStyle === 'function') {
            var /** @type {?} */ testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            if (getComputedStyle(testElement).display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    };
    return CompatibilityModule;
}());
CompatibilityModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                declarations: [MatPrefixRejector, MdPrefixRejector],
                exports: [MatPrefixRejector, MdPrefixRejector],
                providers: [{
                        provide: MATERIAL_SANITY_CHECKS, useValue: true,
                    }],
            },] },
];
/**
 * @nocollapse
 */
CompatibilityModule.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [_angular_platformBrowser.DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [MATERIAL_SANITY_CHECKS,] },] },
]; };
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
var NoConflictStyleCompatibilityMode = (function () {
    function NoConflictStyleCompatibilityMode() {
    }
    return NoConflictStyleCompatibilityMode;
}());
NoConflictStyleCompatibilityMode.decorators = [
    { type: _angular_core.NgModule, args: [{
                providers: [{
                        provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                    }],
            },] },
];
/**
 * @nocollapse
 */
NoConflictStyleCompatibilityMode.ctorParameters = function () { return []; };
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, compatibility mode, etc.
 *
 * This module should be imported to each top-level component module (e.g., MdTabsModule).
 */
var MdCommonModule = (function () {
    function MdCommonModule() {
    }
    return MdCommonModule;
}());
MdCommonModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [CompatibilityModule],
            },] },
];
/**
 * @nocollapse
 */
MdCommonModule.ctorParameters = function () { return []; };
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
var MdLine = (function () {
    function MdLine() {
    }
    return MdLine;
}());
MdLine.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[md-line], [mat-line]',
                host: {
                    '[class.mat-line]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdLine.ctorParameters = function () { return []; };
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
var MdLineSetter = (function () {
    /**
     * @param {?} _lines
     * @param {?} _renderer
     * @param {?} _element
     */
    function MdLineSetter(_lines, _renderer, _element) {
        var _this = this;
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    MdLineSetter.prototype._setLineClass = function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mat-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mat-multi-line", true);
        }
    };
    /**
     * @return {?}
     */
    MdLineSetter.prototype._resetClasses = function () {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    };
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    MdLineSetter.prototype._setClass = function (className, isAdd) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    };
    return MdLineSetter;
}());
var MdLineModule = (function () {
    function MdLineModule() {
    }
    return MdLineModule;
}());
MdLineModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [MdCommonModule],
                exports: [MdLine, MdCommonModule],
                declarations: [MdLine],
            },] },
];
/**
 * @nocollapse
 */
MdLineModule.ctorParameters = function () { return []; };
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
var Dir = (function () {
    function Dir() {
        /**
         * Layout direction of the element.
         */
        this._dir = 'ltr';
        /**
         * Event emitted when the direction changes.
         */
        this.dirChange = new _angular_core.EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        /**
         * \@docs-private
         * @return {?}
         */
        get: function () {
            return this._dir;
        },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            var /** @type {?} */ old = this._dir;
            this._dir = v;
            if (old != this._dir) {
                this.dirChange.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /**
         * Current layout direction of the element.
         * @return {?}
         */
        get: function () { return this.dir; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.dir = v; },
        enumerable: true,
        configurable: true
    });
    return Dir;
}());
Dir.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[dir]',
                // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
                exportAs: '$implicit'
            },] },
];
/**
 * @nocollapse
 */
Dir.ctorParameters = function () { return []; };
Dir.propDecorators = {
    '_dir': [{ type: _angular_core.Input, args: ['dir',] },],
    'dirChange': [{ type: _angular_core.Output },],
    'dir': [{ type: _angular_core.HostBinding, args: ['attr.dir',] },],
};
var RtlModule = (function () {
    function RtlModule() {
    }
    return RtlModule;
}());
RtlModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                exports: [Dir],
                declarations: [Dir]
            },] },
];
/**
 * @nocollapse
 */
RtlModule.ctorParameters = function () { return []; };
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * \@docs-private
 */
var MdMutationObserverFactory = (function () {
    function MdMutationObserverFactory() {
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    MdMutationObserverFactory.prototype.create = function (callback) {
        return new MutationObserver(callback);
    };
    return MdMutationObserverFactory;
}());
MdMutationObserverFactory.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
MdMutationObserverFactory.ctorParameters = function () { return []; };
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var ObserveContent = (function () {
    /**
     * @param {?} _mutationObserverFactory
     * @param {?} _elementRef
     */
    function ObserveContent(_mutationObserverFactory, _elementRef) {
        this._mutationObserverFactory = _mutationObserverFactory;
        this._elementRef = _elementRef;
        /**
         * Event emitted for each change in the element's content.
         */
        this.event = new _angular_core.EventEmitter();
        /**
         * Used for debouncing the emitted values to the observeContent event.
         */
        this._debouncer = new rxjs_Subject.Subject();
    }
    /**
     * @return {?}
     */
    ObserveContent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.debounce > 0) {
            this._debouncer
                .debounceTime(this.debounce)
                .subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        else {
            this._debouncer.subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        this._observer = this._mutationObserverFactory.create(function (mutations) {
            _this._debouncer.next(mutations);
        });
        this._observer.observe(this._elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true
        });
    };
    /**
     * @return {?}
     */
    ObserveContent.prototype.ngOnDestroy = function () {
        if (this._observer) {
            this._observer.disconnect();
            this._debouncer.complete();
            this._debouncer = this._observer = null;
        }
    };
    return ObserveContent;
}());
ObserveContent.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[cdkObserveContent]'
            },] },
];
/**
 * @nocollapse
 */
ObserveContent.ctorParameters = function () { return [
    { type: MdMutationObserverFactory, },
    { type: _angular_core.ElementRef, },
]; };
ObserveContent.propDecorators = {
    'event': [{ type: _angular_core.Output, args: ['cdkObserveContent',] },],
    'debounce': [{ type: _angular_core.Input },],
};
var ObserveContentModule = (function () {
    function ObserveContentModule() {
    }
    return ObserveContentModule;
}());
ObserveContentModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                exports: [ObserveContent],
                declarations: [ObserveContent],
                providers: [MdMutationObserverFactory]
            },] },
];
/**
 * @nocollapse
 */
ObserveContentModule.ctorParameters = function () { return []; };
// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var PAGE_UP = 33;
var PAGE_DOWN = 34;
var HOME = 36;
var END = 35;
var ENTER = 13;
var SPACE = 32;
var TAB = 9;
var ESCAPE = 27;
var BACKSPACE = 8;
var DELETE = 46;
/**
 * Coerces a data-bound value (typically a string) to a boolean.
 * @param {?} value
 * @return {?}
 */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}
var RippleState = {};
RippleState.FADING_IN = 0;
RippleState.VISIBLE = 1;
RippleState.FADING_OUT = 2;
RippleState.HIDDEN = 3;
RippleState[RippleState.FADING_IN] = "FADING_IN";
RippleState[RippleState.VISIBLE] = "VISIBLE";
RippleState[RippleState.FADING_OUT] = "FADING_OUT";
RippleState[RippleState.HIDDEN] = "HIDDEN";
/**
 * Reference to a previously launched ripple element.
 */
var RippleRef = (function () {
    /**
     * @param {?} _renderer
     * @param {?} element
     * @param {?} config
     */
    function RippleRef(_renderer, element, config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /**
         * Current state of the ripple reference.
         */
        this.state = RippleState.HIDDEN;
    }
    /**
     * Fades out the ripple element.
     * @return {?}
     */
    RippleRef.prototype.fadeOut = function () {
        this._renderer.fadeOutRipple(this);
    };
    return RippleRef;
}());
/**
 * Fade-in duration for the ripples. Can be modified with the speedFactor option.
 */
var RIPPLE_FADE_IN_DURATION = 450;
/**
 * Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor.
 */
var RIPPLE_FADE_OUT_DURATION = 400;
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
var RippleRenderer = (function () {
    /**
     * @param {?} elementRef
     * @param {?} _ngZone
     * @param {?} _ruler
     * @param {?} platform
     */
    function RippleRenderer(elementRef, _ngZone, _ruler, platform) {
        this._ngZone = _ngZone;
        this._ruler = _ruler;
        /**
         * Whether the mouse is currently down or not.
         */
        this._isMousedown = false;
        /**
         * Events to be registered on the trigger element.
         */
        this._triggerEvents = new Map();
        /**
         * Set of currently active ripple references.
         */
        this._activeRipples = new Set();
        /**
         * Ripple config for all ripples created by events.
         */
        this.rippleConfig = {};
        /**
         * Whether mouse ripples should be created or not.
         */
        this.rippleDisabled = false;
        // Only do anything if we're on the browser.
        if (platform.isBrowser) {
            this._containerElement = elementRef.nativeElement;
            // Specify events which need to be registered on the trigger.
            this._triggerEvents.set('mousedown', this.onMousedown.bind(this));
            this._triggerEvents.set('mouseup', this.onMouseup.bind(this));
            this._triggerEvents.set('mouseleave', this.onMouseLeave.bind(this));
            // By default use the host element as trigger element.
            this.setTriggerElement(this._containerElement);
        }
    }
    /**
     * Fades in a ripple at the given coordinates.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    RippleRenderer.prototype.fadeInRipple = function (pageX, pageY, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var /** @type {?} */ containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            pageX = containerRect.left + containerRect.width / 2;
            pageY = containerRect.top + containerRect.height / 2;
        }
        else {
            // Subtract scroll values from the coordinates because calculations below
            // are always relative to the viewport rectangle.
            var /** @type {?} */ scrollPosition = this._ruler.getViewportScrollPosition();
            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
        }
        var /** @type {?} */ radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
        var /** @type {?} */ duration = RIPPLE_FADE_IN_DURATION * (1 / (config.speedFactor || 1));
        var /** @type {?} */ offsetX = pageX - containerRect.left;
        var /** @type {?} */ offsetY = pageY - containerRect.top;
        var /** @type {?} */ ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = offsetX - radius + "px";
        ripple.style.top = offsetY - radius + "px";
        ripple.style.height = radius * 2 + "px";
        ripple.style.width = radius * 2 + "px";
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color;
        ripple.style.transitionDuration = duration + "ms";
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        // Exposed reference to the ripple that will be returned.
        var /** @type {?} */ rippleRef = new RippleRef(this, ripple, config);
        rippleRef.state = RippleState.FADING_IN;
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.add(rippleRef);
        // Wait for the ripple element to be completely faded in.
        // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
        this.runTimeoutOutsideZone(function () {
            rippleRef.state = RippleState.VISIBLE;
            if (!config.persistent && !_this._isMousedown) {
                rippleRef.fadeOut();
            }
        }, duration);
        return rippleRef;
    };
    /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    RippleRenderer.prototype.fadeOutRipple = function (rippleRef) {
        // For ripples that are not active anymore, don't re-un the fade-out animation.
        if (!this._activeRipples.delete(rippleRef)) {
            return;
        }
        var /** @type {?} */ rippleEl = rippleRef.element;
        rippleEl.style.transitionDuration = RIPPLE_FADE_OUT_DURATION + "ms";
        rippleEl.style.opacity = '0';
        rippleRef.state = RippleState.FADING_OUT;
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(function () {
            rippleRef.state = RippleState.HIDDEN;
            rippleEl.parentNode.removeChild(rippleEl);
        }, RIPPLE_FADE_OUT_DURATION);
    };
    /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    RippleRenderer.prototype.fadeOutAll = function () {
        this._activeRipples.forEach(function (ripple) { return ripple.fadeOut(); });
    };
    /**
     * Sets the trigger element and registers the mouse events.
     * @param {?} element
     * @return {?}
     */
    RippleRenderer.prototype.setTriggerElement = function (element) {
        var _this = this;
        // Remove all previously register event listeners from the trigger element.
        if (this._triggerElement) {
            this._triggerEvents.forEach(function (fn, type) { return _this._triggerElement.removeEventListener(type, fn); });
        }
        if (element) {
            // If the element is not null, register all event listeners on the trigger element.
            this._ngZone.runOutsideAngular(function () {
                _this._triggerEvents.forEach(function (fn, type) { return element.addEventListener(type, fn); });
            });
        }
        this._triggerElement = element;
    };
    /**
     * Listener being called on mousedown event.
     * @param {?} event
     * @return {?}
     */
    RippleRenderer.prototype.onMousedown = function (event) {
        if (!this.rippleDisabled) {
            this._isMousedown = true;
            this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
        }
    };
    /**
     * Listener being called on mouseup event.
     * @return {?}
     */
    RippleRenderer.prototype.onMouseup = function () {
        this._isMousedown = false;
        // Fade-out all ripples that are completely visible and not persistent.
        this._activeRipples.forEach(function (ripple) {
            if (!ripple.config.persistent && ripple.state === RippleState.VISIBLE) {
                ripple.fadeOut();
            }
        });
    };
    /**
     * Listener being called on mouseleave event.
     * @return {?}
     */
    RippleRenderer.prototype.onMouseLeave = function () {
        if (this._isMousedown) {
            this.onMouseup();
        }
    };
    /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    RippleRenderer.prototype.runTimeoutOutsideZone = function (fn, delay) {
        if (delay === void 0) { delay = 0; }
        this._ngZone.runOutsideAngular(function () { return setTimeout(fn, delay); });
    };
    return RippleRenderer;
}());
/**
 * @param {?} element
 * @return {?}
 */
function enforceStyleRecalculation(element) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 * @param {?} x
 * @param {?} y
 * @param {?} rect
 * @return {?}
 */
function distanceToFurthestCorner(x, y, rect) {
    var /** @type {?} */ distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    var /** @type {?} */ distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}
// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
var hasV8BreakIterator = typeof (window) !== 'undefined' ?
    (window.Intl && ((window.Intl)).v8BreakIterator) :
    (typeof (Intl) !== 'undefined' && ((Intl)).v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * \@docs-private
 */
var Platform = (function () {
    function Platform() {
        this.isBrowser = typeof document === 'object' && !!document;
        /**
         * Layout Engines
         */
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
        this.BLINK = this.isBrowser && !!(window.chrome || hasV8BreakIterator) && !!CSS && !this.EDGE && !this.TRIDENT;
        // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
        // ensure that Webkit runs standalone and is not used as another engine's base.
        this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /**
         * Browsers and Platform Types
         */
        this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // It's difficult to detect the plain Gecko engine, because most of the browsers identify
        // them self as Gecko-like browsers and modify the userAgent's according to that.
        // Since we only cover one explicit Firefox case, we can simply check for Firefox
        // instead of having an unstable check for Gecko.
        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        // Trident on mobile adds the android platform to the userAgent to trick detections.
        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
    }
    return Platform;
}());
Platform.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
Platform.ctorParameters = function () { return []; };
var supportedInputTypes;
/**
 * @return {?} The input types supported by this browser.
 */
function getSupportedInputTypes() {
    if (!supportedInputTypes) {
        var /** @type {?} */ featureTestInput_1 = document.createElement('input');
        supportedInputTypes = new Set([
            // `color` must come first. Chrome 56 shows a warning if we change the type to `color` after
            // first changing it to something else:
            // The specified value "" does not conform to the required format.
            // The format is "#rrggbb" where rr, gg, bb are two-digit hexadecimal numbers.
            'color',
            'button',
            'checkbox',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
        ].filter(function (value) {
            featureTestInput_1.setAttribute('type', value);
            return featureTestInput_1.type === value;
        }));
    }
    return supportedInputTypes;
}
var PlatformModule = (function () {
    function PlatformModule() {
    }
    return PlatformModule;
}());
PlatformModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                providers: [Platform]
            },] },
];
/**
 * @nocollapse
 */
PlatformModule.ctorParameters = function () { return []; };
/**
 * Time in ms to throttle the scrolling events by default.
 */
var DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
var ScrollDispatcher = (function () {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    function ScrollDispatcher(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * Subject for notifying that a registered scrollable reference element has been scrolled.
         */
        this._scrolled = new rxjs_Subject.Subject();
        /**
         * Keeps track of the global `scroll` and `resize` subscriptions.
         */
        this._globalSubscription = null;
        /**
         * Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards.
         */
        this._scrolledCount = 0;
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollableReferences = new Map();
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    ScrollDispatcher.prototype.register = function (scrollable) {
        var _this = this;
        var /** @type {?} */ scrollSubscription = scrollable.elementScrolled().subscribe(function () { return _this._notify(); });
        this.scrollableReferences.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    ScrollDispatcher.prototype.deregister = function (scrollable) {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    };
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @param {?=} callback
     * @return {?}
     */
    ScrollDispatcher.prototype.scrolled = function (auditTimeInMs, callback) {
        var _this = this;
        if (auditTimeInMs === void 0) { auditTimeInMs = DEFAULT_SCROLL_TIME; }
        // Scroll events can only happen on the browser, so do nothing if we're not on the browser.
        if (!this._platform.isBrowser) {
            return rxjs_Subscription.Subscription.EMPTY;
        }
        // In the case of a 0ms delay, use an observable without auditTime
        // since it does add a perceptible delay in processing overhead.
        var /** @type {?} */ observable = auditTimeInMs > 0 ?
            this._scrolled.asObservable().auditTime(auditTimeInMs) :
            this._scrolled.asObservable();
        this._scrolledCount++;
        if (!this._globalSubscription) {
            this._globalSubscription = this._ngZone.runOutsideAngular(function () {
                return rxjs_Observable.Observable.merge(rxjs_Observable.Observable.fromEvent(window.document, 'scroll'), rxjs_Observable.Observable.fromEvent(window, 'resize')).subscribe(function () { return _this._notify(); });
            });
        }
        // Note that we need to do the subscribing from here, in order to be able to remove
        // the global event listeners once there are no more subscriptions.
        var /** @type {?} */ subscription = observable.subscribe(callback);
        subscription.add(function () {
            _this._scrolledCount--;
            if (_this._globalSubscription && !_this.scrollableReferences.size && !_this._scrolledCount) {
                _this._globalSubscription.unsubscribe();
                _this._globalSubscription = null;
            }
        });
        return subscription;
    };
    /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.getScrollContainers = function (elementRef) {
        var _this = this;
        var /** @type {?} */ scrollingContainers = [];
        this.scrollableReferences.forEach(function (subscription, scrollable) {
            if (_this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    };
    /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.scrollableContainsElement = function (scrollable, elementRef) {
        var /** @type {?} */ element = elementRef.nativeElement;
        var /** @type {?} */ scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    };
    /**
     * Sends a notification that a scroll event has been fired.
     * @return {?}
     */
    ScrollDispatcher.prototype._notify = function () {
        this._scrolled.next();
    };
    return ScrollDispatcher;
}());
ScrollDispatcher.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ScrollDispatcher.ctorParameters = function () { return [
    { type: _angular_core.NgZone, },
    { type: Platform, },
]; };
/**
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}
var SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), ScrollDispatcher], _angular_core.NgZone, Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};
/**
 * Simple utility for getting the bounds of the browser viewport.
 * \@docs-private
 */
var ViewportRuler = (function () {
    /**
     * @param {?} scrollDispatcher
     */
    function ViewportRuler(scrollDispatcher) {
        var _this = this;
        // Subscribe to scroll and resize events and update the document rectangle on changes.
        scrollDispatcher.scrolled(null, function () { return _this._cacheViewportGeometry(); });
    }
    /**
     * Gets a ClientRect for the viewport's bounds.
     * @param {?=} documentRect
     * @return {?}
     */
    ViewportRuler.prototype.getViewportRect = function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().
        var /** @type {?} */ scrollPosition = this.getViewportScrollPosition(documentRect);
        var /** @type {?} */ height = window.innerHeight;
        var /** @type {?} */ width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param {?=} documentRect
     * @return {?}
     */
    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        // The top-left-corner of the viewport is determined by the scroll position of the document
        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
        // `document.documentElement` works consistently, where the `top` and `left` values will
        // equal negative the scroll position.
        var /** @type {?} */ top = -documentRect.top || document.body.scrollTop || window.scrollY || 0;
        var /** @type {?} */ left = -documentRect.left || document.body.scrollLeft || window.scrollX || 0;
        return { top: top, left: left };
    };
    /**
     * Caches the latest client rectangle of the document element.
     * @return {?}
     */
    ViewportRuler.prototype._cacheViewportGeometry = function () {
        this._documentRect = document.documentElement.getBoundingClientRect();
    };
    return ViewportRuler;
}());
ViewportRuler.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ViewportRuler.ctorParameters = function () { return [
    { type: ScrollDispatcher, },
]; };
/**
 * @param {?} parentRuler
 * @param {?} scrollDispatcher
 * @return {?}
 */
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, scrollDispatcher) {
    return parentRuler || new ViewportRuler(scrollDispatcher);
}
var VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), ViewportRuler], ScrollDispatcher],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};
/**
 * Injection token that can be used to specify the global ripple options.
 */
var MD_RIPPLE_GLOBAL_OPTIONS = new _angular_core.InjectionToken('md-ripple-global-options');
var MdRipple = (function () {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} ruler
     * @param {?} platform
     * @param {?} globalOptions
     */
    function MdRipple(elementRef, ngZone, ruler, platform, globalOptions) {
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler, platform);
        this._globalOptions = globalOptions ? globalOptions : {};
        this._updateRippleRenderer();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MdRipple.prototype.ngOnChanges = function (changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._updateRippleRenderer();
    };
    /**
     * @return {?}
     */
    MdRipple.prototype.ngOnDestroy = function () {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    };
    /**
     * Launches a manual ripple at the specified position.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    MdRipple.prototype.launch = function (pageX, pageY, config) {
        if (config === void 0) { config = this.rippleConfig; }
        return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    };
    /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    MdRipple.prototype.fadeOutAll = function () {
        this._rippleRenderer.fadeOutAll();
    };
    Object.defineProperty(MdRipple.prototype, "rippleConfig", {
        /**
         * Ripple configuration from the directive's input values.
         * @return {?}
         */
        get: function () {
            return {
                centered: this.centered,
                speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
                radius: this.radius,
                color: this.color
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the ripple renderer with the latest ripple configuration.
     * @return {?}
     */
    MdRipple.prototype._updateRippleRenderer = function () {
        this._rippleRenderer.rippleDisabled = this._globalOptions.disabled || this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    };
    return MdRipple;
}());
MdRipple.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[md-ripple], [mat-ripple], [mdRipple], [matRipple]',
                exportAs: 'mdRipple',
                host: {
                    'class': 'mat-ripple',
                    '[class.mat-ripple-unbounded]': 'unbounded'
                }
            },] },
];
/**
 * @nocollapse
 */
MdRipple.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: _angular_core.NgZone, },
    { type: ViewportRuler, },
    { type: Platform, },
    { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [MD_RIPPLE_GLOBAL_OPTIONS,] },] },
]; };
MdRipple.propDecorators = {
    'trigger': [{ type: _angular_core.Input, args: ['mdRippleTrigger',] },],
    'centered': [{ type: _angular_core.Input, args: ['mdRippleCentered',] },],
    'disabled': [{ type: _angular_core.Input, args: ['mdRippleDisabled',] },],
    'radius': [{ type: _angular_core.Input, args: ['mdRippleRadius',] },],
    'speedFactor': [{ type: _angular_core.Input, args: ['mdRippleSpeedFactor',] },],
    'color': [{ type: _angular_core.Input, args: ['mdRippleColor',] },],
    'unbounded': [{ type: _angular_core.Input, args: ['mdRippleUnbounded',] },],
};
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
var Scrollable = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _scroll
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    function Scrollable(_elementRef, _scroll, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementScrolled = new rxjs_Subject.Subject();
    }
    /**
     * @return {?}
     */
    Scrollable.prototype.ngOnInit = function () {
        var _this = this;
        this._scrollListener = this._ngZone.runOutsideAngular(function () {
            return _this._renderer.listen(_this.getElementRef().nativeElement, 'scroll', function (event) {
                _this._elementScrolled.next(event);
            });
        });
        this._scroll.register(this);
    };
    /**
     * @return {?}
     */
    Scrollable.prototype.ngOnDestroy = function () {
        this._scroll.deregister(this);
        if (this._scrollListener) {
            this._scrollListener();
            this._scrollListener = null;
        }
    };
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    Scrollable.prototype.elementScrolled = function () {
        return this._elementScrolled.asObservable();
    };
    /**
     * @return {?}
     */
    Scrollable.prototype.getElementRef = function () {
        return this._elementRef;
    };
    return Scrollable;
}());
Scrollable.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[cdk-scrollable], [cdkScrollable]'
            },] },
];
/**
 * @nocollapse
 */
Scrollable.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: ScrollDispatcher, },
    { type: _angular_core.NgZone, },
    { type: _angular_core.Renderer2, },
]; };
var ScrollDispatchModule = (function () {
    function ScrollDispatchModule() {
    }
    return ScrollDispatchModule;
}());
ScrollDispatchModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [PlatformModule],
                exports: [Scrollable],
                declarations: [Scrollable],
                providers: [SCROLL_DISPATCHER_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
ScrollDispatchModule.ctorParameters = function () { return []; };
var MdRippleModule = (function () {
    function MdRippleModule() {
    }
    return MdRippleModule;
}());
MdRippleModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [MdCommonModule, PlatformModule, ScrollDispatchModule],
                exports: [MdRipple, MdCommonModule],
                declarations: [MdRipple],
                providers: [VIEWPORT_RULER_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
MdRippleModule.ctorParameters = function () { return []; };
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * \@docs-private
 */
var MdPseudoCheckbox = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    function MdPseudoCheckbox(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Display state of the checkbox.
         */
        this.state = 'unchecked';
        /**
         * Whether the checkbox is disabled.
         */
        this.disabled = false;
        this.color = 'accent';
    }
    Object.defineProperty(MdPseudoCheckbox.prototype, "color", {
        /**
         * Color of the checkbox.
         * @return {?}
         */
        get: function () { return this._color; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value) {
                var /** @type {?} */ nativeElement = this._elementRef.nativeElement;
                this._renderer.removeClass(nativeElement, "mat-" + this.color);
                this._renderer.addClass(nativeElement, "mat-" + value);
                this._color = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return MdPseudoCheckbox;
}());
MdPseudoCheckbox.decorators = [
    { type: _angular_core.Component, args: [{ encapsulation: _angular_core.ViewEncapsulation.None,
                selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
                styles: [".mat-pseudo-checkbox{width:20px;height:20px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:9px;left:2px;width:16px;opacity:1}.mat-pseudo-checkbox-checked::after{top:5px;left:3px;width:12px;height:5px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1} /*# sourceMappingURL=pseudo-checkbox.css.map */ "],
                template: '',
                host: {
                    '[class.mat-pseudo-checkbox]': 'true',
                    '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                    '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
                    '[class.mat-pseudo-checkbox-disabled]': 'disabled',
                },
            },] },
];
/**
 * @nocollapse
 */
MdPseudoCheckbox.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: _angular_core.Renderer2, },
]; };
MdPseudoCheckbox.propDecorators = {
    'state': [{ type: _angular_core.Input },],
    'disabled': [{ type: _angular_core.Input },],
    'color': [{ type: _angular_core.Input },],
};
var MdSelectionModule = (function () {
    function MdSelectionModule() {
    }
    return MdSelectionModule;
}());
MdSelectionModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                exports: [MdPseudoCheckbox],
                declarations: [MdPseudoCheckbox]
            },] },
];
/**
 * @nocollapse
 */
MdSelectionModule.ctorParameters = function () { return []; };
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
/**
 * Event object emitted by MdOption when selected or deselected.
 */
var MdOptionSelectionChange = (function () {
    /**
     * @param {?} source
     * @param {?=} isUserInput
     */
    function MdOptionSelectionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return MdOptionSelectionChange;
}());
/**
 * Single option inside of a `<md-select>` element.
 */
var MdOption = (function () {
    /**
     * @param {?} _element
     * @param {?} _isCompatibilityMode
     */
    function MdOption(_element, _isCompatibilityMode) {
        this._element = _element;
        this._isCompatibilityMode = _isCompatibilityMode;
        this._selected = false;
        this._active = false;
        /**
         * Whether the option is disabled.
         */
        this._disabled = false;
        this._id = "md-option-" + _uniqueIdCounter++;
        /**
         * Whether the wrapping component is in multiple selection mode.
         */
        this.multiple = false;
        /**
         * Event emitted when the option is selected or deselected.
         */
        this.onSelectionChange = new _angular_core.EventEmitter();
    }
    Object.defineProperty(MdOption.prototype, "id", {
        /**
         * The unique ID of the option.
         * @return {?}
         */
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "selected", {
        /**
         * Whether or not the option is currently selected.
         * @return {?}
         */
        get: function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "disabled", {
        /**
         * Whether the option is disabled.
         * @return {?}
         */
        get: function () { return this._disabled; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         * @return {?}
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         * @return {?}
         */
        get: function () {
            // TODO(kara): Add input property alternative for node envs.
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects the option.
     * @return {?}
     */
    MdOption.prototype.select = function () {
        this._selected = true;
        this._emitSelectionChangeEvent();
    };
    /**
     * Deselects the option.
     * @return {?}
     */
    MdOption.prototype.deselect = function () {
        this._selected = false;
        this._emitSelectionChangeEvent();
    };
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    MdOption.prototype.focus = function () {
        this._getHostElement().focus();
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    MdOption.prototype.setActiveStyles = function () {
        this._active = true;
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    MdOption.prototype.setInactiveStyles = function () {
        this._active = false;
    };
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    MdOption.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    MdOption.prototype._selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    };
    /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    MdOption.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /**
     * Fetches the host DOM element.
     * @return {?}
     */
    MdOption.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    MdOption.prototype._emitSelectionChangeEvent = function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new MdOptionSelectionChange(this, isUserInput));
    };
    return MdOption;
}());
MdOption.decorators = [
    { type: _angular_core.Component, args: [{ selector: 'md-option, mat-option',
                host: {
                    'role': 'option',
                    '[attr.tabindex]': '_getTabIndex()',
                    '[class.mat-selected]': 'selected',
                    '[class.mat-option-multiple]': 'multiple',
                    '[class.mat-active]': 'active',
                    '[id]': 'id',
                    '[attr.aria-selected]': 'selected.toString()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[class.mat-option-disabled]': 'disabled',
                    '(click)': '_selectViaInteraction()',
                    '(keydown)': '_handleKeydown($event)',
                    '[class.mat-option]': 'true',
                },
                template: "<span [ngSwitch]=\"_isCompatibilityMode\" *ngIf=\"multiple\"> <mat-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchCase=\"true\" [state]=\"selected ? 'checked' : ''\" color=\"primary\"></mat-pseudo-checkbox> <md-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchDefault [state]=\"selected ? 'checked' : ''\" color=\"primary\"></md-pseudo-checkbox> </span> <ng-content></ng-content> <div class=\"mat-option-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\"> </div> ",
                encapsulation: _angular_core.ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
MdOption.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
]; };
MdOption.propDecorators = {
    'value': [{ type: _angular_core.Input },],
    'disabled': [{ type: _angular_core.Input },],
    'onSelectionChange': [{ type: _angular_core.Output },],
};
var MdOptionModule = (function () {
    function MdOptionModule() {
    }
    return MdOptionModule;
}());
MdOptionModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [MdRippleModule, _angular_common.CommonModule, MdSelectionModule],
                exports: [MdOption],
                declarations: [MdOption]
            },] },
];
/**
 * @nocollapse
 */
MdOptionModule.ctorParameters = function () { return []; };
/**
 * Exception thrown when attempting to attach a null portal to a host.
 * \@docs-private
 */
var NullPortalError = (function (_super) {
    __extends(NullPortalError, _super);
    function NullPortalError() {
        return _super.call(this, 'Must provide a portal to attach') || this;
    }
    return NullPortalError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * \@docs-private
 */
var PortalAlreadyAttachedError = (function (_super) {
    __extends(PortalAlreadyAttachedError, _super);
    function PortalAlreadyAttachedError() {
        return _super.call(this, 'Host already has a portal attached') || this;
    }
    return PortalAlreadyAttachedError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * \@docs-private
 */
var PortalHostAlreadyDisposedError = (function (_super) {
    __extends(PortalHostAlreadyDisposedError, _super);
    function PortalHostAlreadyDisposedError() {
        return _super.call(this, 'This PortalHost has already been disposed') || this;
    }
    return PortalHostAlreadyDisposedError;
}(MdError));
/**
 * Exception thrown when attempting to attach an unknown portal type.
 * \@docs-private
 */
var UnknownPortalTypeError = (function (_super) {
    __extends(UnknownPortalTypeError, _super);
    function UnknownPortalTypeError() {
        return _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.') || this;
    }
    return UnknownPortalTypeError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to a null host.
 * \@docs-private
 */
var NullPortalHostError = (function (_super) {
    __extends(NullPortalHostError, _super);
    function NullPortalHostError() {
        return _super.call(this, 'Attempting to attach a portal to a null PortalHost') || this;
    }
    return NullPortalHostError;
}(MdError));
/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * \@docs-private
 */
var NoPortalAttachedError = (function (_super) {
    __extends(NoPortalAttachedError, _super);
    function NoPortalAttachedError() {
        return _super.call(this, 'Attempting to detach a portal that is not attached to a host') || this;
    }
    return NoPortalAttachedError;
}(MdError));
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 * @abstract
 */
var Portal = (function () {
    function Portal() {
    }
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @return {?}
     */
    Portal.prototype.attach = function (host) {
        if (host == null) {
            throw new NullPortalHostError();
        }
        if (host.hasAttached()) {
            throw new PortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return (host.attach(this));
    };
    /**
     * Detach this portal from its host
     * @return {?}
     */
    Portal.prototype.detach = function () {
        var /** @type {?} */ host = this._attachedHost;
        if (host == null) {
            throw new NoPortalAttachedError();
        }
        this._attachedHost = null;
        return host.detach();
    };
    Object.defineProperty(Portal.prototype, "isAttached", {
        /**
         * Whether this portal is attached to a host.
         * @return {?}
         */
        get: function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?} host
     * @return {?}
     */
    Portal.prototype.setAttachedHost = function (host) {
        this._attachedHost = host;
    };
    return Portal;
}());
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
var ComponentPortal = (function (_super) {
    __extends(ComponentPortal, _super);
    /**
     * @param {?} component
     * @param {?=} viewContainerRef
     * @param {?=} injector
     */
    function ComponentPortal(component, viewContainerRef, injector) {
        if (viewContainerRef === void 0) { viewContainerRef = null; }
        if (injector === void 0) { injector = null; }
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.viewContainerRef = viewContainerRef;
        _this.injector = injector;
        return _this;
    }
    return ComponentPortal;
}(Portal));
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var TemplatePortal = (function (_super) {
    __extends(TemplatePortal, _super);
    /**
     * @param {?} template
     * @param {?} viewContainerRef
     */
    function TemplatePortal(template, viewContainerRef) {
        var _this = _super.call(this) || this;
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        _this.locals = new Map();
        _this.templateRef = template;
        _this.viewContainerRef = viewContainerRef;
        return _this;
    }
    Object.defineProperty(TemplatePortal.prototype, "origin", {
        /**
         * @return {?}
         */
        get: function () {
            return this.templateRef.elementRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} host
     * @param {?=} locals
     * @return {?}
     */
    TemplatePortal.prototype.attach = function (host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return _super.prototype.attach.call(this, host);
    };
    /**
     * @return {?}
     */
    TemplatePortal.prototype.detach = function () {
        this.locals = new Map();
        return _super.prototype.detach.call(this);
    };
    return TemplatePortal;
}(Portal));
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
var BasePortalHost = (function () {
    function BasePortalHost() {
        /**
         * Whether this host has already been permanently disposed.
         */
        this._isDisposed = false;
    }
    /**
     * Whether this host has an attached portal.
     * @return {?}
     */
    BasePortalHost.prototype.hasAttached = function () {
        return !!this._attachedPortal;
    };
    /**
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attach = function (portal) {
        if (!portal) {
            throw new NullPortalError();
        }
        if (this.hasAttached()) {
            throw new PortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throw new PortalHostAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throw new UnknownPortalTypeError();
    };
    /**
     * @abstract
     * @template T
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attachComponentPortal = function (portal) { };
    /**
     * @abstract
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attachTemplatePortal = function (portal) { };
    /**
     * @return {?}
     */
    BasePortalHost.prototype.detach = function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    };
    /**
     * @return {?}
     */
    BasePortalHost.prototype.dispose = function () {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    BasePortalHost.prototype.setDisposeFn = function (fn) {
        this._disposeFn = fn;
    };
    /**
     * @return {?}
     */
    BasePortalHost.prototype._invokeDisposeFn = function () {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    return BasePortalHost;
}());
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <ng-template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </ng-template>
 */
var TemplatePortalDirective = (function (_super) {
    __extends(TemplatePortalDirective, _super);
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    function TemplatePortalDirective(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    return TemplatePortalDirective;
}(TemplatePortal));
TemplatePortalDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[cdk-portal], [cdkPortal], [portal]',
                exportAs: 'cdkPortal',
            },] },
];
/**
 * @nocollapse
 */
TemplatePortalDirective.ctorParameters = function () { return [
    { type: _angular_core.TemplateRef, },
    { type: _angular_core.ViewContainerRef, },
]; };
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
var PortalHostDirective = (function (_super) {
    __extends(PortalHostDirective, _super);
    /**
     * @param {?} _componentFactoryResolver
     * @param {?} _viewContainerRef
     */
    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._viewContainerRef = _viewContainerRef;
        return _this;
    }
    Object.defineProperty(PortalHostDirective.prototype, "_deprecatedPortal", {
        /**
         * @deprecated
         * @return {?}
         */
        get: function () { return this.portal; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.portal = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalHostDirective.prototype, "portal", {
        /**
         * Portal associated with the Portal host.
         * @return {?}
         */
        get: function () {
            return this._portal;
        },
        /**
         * @param {?} portal
         * @return {?}
         */
        set: function (portal) {
            if (this.hasAttached()) {
                _super.prototype.detach.call(this);
            }
            if (portal) {
                _super.prototype.attach.call(this, portal);
            }
            this._portal = portal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PortalHostDirective.prototype.ngOnDestroy = function () {
        _super.prototype.dispose.call(this);
        this._portal = null;
    };
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @template T
     * @param {?} portal Portal to be attached to the portal host.
     * @return {?}
     */
    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        var /** @type {?} */ viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var /** @type {?} */ ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        _super.prototype.setDisposeFn.call(this, function () { return ref.destroy(); });
        this._portal = portal;
        return ref;
    };
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        _super.prototype.setDisposeFn.call(this, function () { return _this._viewContainerRef.clear(); });
        this._portal = portal;
        // TODO(jelbourn): return locals from view
        return new Map();
    };
    return PortalHostDirective;
}(BasePortalHost));
PortalHostDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[cdkPortalHost], [portalHost]',
                inputs: ['portal: cdkPortalHost']
            },] },
];
/**
 * @nocollapse
 */
PortalHostDirective.ctorParameters = function () { return [
    { type: _angular_core.ComponentFactoryResolver, },
    { type: _angular_core.ViewContainerRef, },
]; };
PortalHostDirective.propDecorators = {
    '_deprecatedPortal': [{ type: _angular_core.Input, args: ['portalHost',] },],
};
var PortalModule = (function () {
    function PortalModule() {
    }
    return PortalModule;
}());
PortalModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                exports: [TemplatePortalDirective, PortalHostDirective],
                declarations: [TemplatePortalDirective, PortalHostDirective],
            },] },
];
/**
 * @nocollapse
 */
PortalModule.ctorParameters = function () { return []; };
/**
 * Scroll strategy that doesn't do anything.
 */
var NoopScrollStrategy = (function () {
    function NoopScrollStrategy() {
    }
    /**
     * @return {?}
     */
    NoopScrollStrategy.prototype.enable = function () { };
    /**
     * @return {?}
     */
    NoopScrollStrategy.prototype.disable = function () { };
    /**
     * @return {?}
     */
    NoopScrollStrategy.prototype.attach = function () { };
    return NoopScrollStrategy;
}());
/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
var OverlayState = (function () {
    function OverlayState() {
        /**
         * Strategy to be used when handling scroll events while the overlay is open.
         */
        this.scrollStrategy = new NoopScrollStrategy();
        /**
         * Whether the overlay has a backdrop.
         */
        this.hasBackdrop = false;
        /**
         * Custom class to add to the backdrop
         */
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /**
         * The direction of the text in the overlay panel.
         */
        this.direction = 'ltr';
        // TODO(jelbourn): configuration still to add
        // - focus trap
        // - disable pointer events
        // - z-index
    }
    return OverlayState;
}());
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var DomPortalHost = (function (_super) {
    __extends(DomPortalHost, _super);
    /**
     * @param {?} _hostDomElement
     * @param {?} _componentFactoryResolver
     * @param {?} _appRef
     * @param {?} _defaultInjector
     */
    function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        var _this = _super.call(this) || this;
        _this._hostDomElement = _hostDomElement;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._appRef = _appRef;
        _this._defaultInjector = _defaultInjector;
        return _this;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @return {?}
     */
    DomPortalHost.prototype.attachComponentPortal = function (portal) {
        var _this = this;
        var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var /** @type {?} */ componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(function () { return componentRef.destroy(); });
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(function () {
                _this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    };
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        var /** @type {?} */ viewContainer = portal.viewContainerRef;
        var /** @type {?} */ viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.detectChanges();
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
        // To move the view to the specified host element. We just re-append the existing root nodes.
        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
        this.setDisposeFn((function () {
            var /** @type {?} */ index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    };
    /**
     * Clears out a portal from the DOM.
     * @return {?}
     */
    DomPortalHost.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    };
    /**
     * Gets the root HTMLElement for an instantiated component.
     * @param {?} componentRef
     * @return {?}
     */
    DomPortalHost.prototype._getComponentRootNode = function (componentRef) {
        return (((componentRef.hostView)).rootNodes[0]);
    };
    return DomPortalHost;
}(BasePortalHost));
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var OverlayRef = (function () {
    /**
     * @param {?} _portalHost
     * @param {?} _pane
     * @param {?} _state
     * @param {?} _ngZone
     */
    function OverlayRef(_portalHost, _pane, _state, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._ngZone = _ngZone;
        this._backdropElement = null;
        this._backdropClick = new rxjs_Subject.Subject();
        this._attachments = new rxjs_Subject.Subject();
        this._detachments = new rxjs_Subject.Subject();
        this._state.scrollStrategy.attach(this);
    }
    Object.defineProperty(OverlayRef.prototype, "overlayElement", {
        /**
         * The overlay's HTML element
         * @return {?}
         */
        get: function () {
            return this._pane;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param {?} portal Portal instance to which to attach the overlay.
     * @return {?} The portal attachment result.
     */
    OverlayRef.prototype.attach = function (portal) {
        var /** @type {?} */ attachResult = this._portalHost.attach(portal);
        // Update the pane element with the given state configuration.
        this._updateStackingOrder();
        this.updateSize();
        this.updateDirection();
        this.updatePosition();
        this._attachments.next();
        this._state.scrollStrategy.enable();
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        return attachResult;
    };
    /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    OverlayRef.prototype.detach = function () {
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        this._state.scrollStrategy.disable();
        this._detachments.next();
        return this._portalHost.detach();
    };
    /**
     * Cleans up the overlay from the DOM.
     * @return {?}
     */
    OverlayRef.prototype.dispose = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.dispose();
        }
        this.detachBackdrop();
        this._portalHost.dispose();
        this._state.scrollStrategy.disable();
        this._detachments.next();
        this._detachments.complete();
        this._attachments.complete();
    };
    /**
     * Checks whether the overlay has been attached.
     * @return {?}
     */
    OverlayRef.prototype.hasAttached = function () {
        return this._portalHost.hasAttached();
    };
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     * @return {?}
     */
    OverlayRef.prototype.backdropClick = function () {
        return this._backdropClick.asObservable();
    };
    /**
     * Returns an observable that emits when the overlay has been attached.
     * @return {?}
     */
    OverlayRef.prototype.attachments = function () {
        return this._attachments.asObservable();
    };
    /**
     * Returns an observable that emits when the overlay has been detached.
     * @return {?}
     */
    OverlayRef.prototype.detachments = function () {
        return this._detachments.asObservable();
    };
    /**
     * Gets the current state config of the overlay.
     * @return {?}
     */
    OverlayRef.prototype.getState = function () {
        return this._state;
    };
    /**
     * Updates the position of the overlay based on the position strategy.
     * @return {?}
     */
    OverlayRef.prototype.updatePosition = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    };
    /**
     * Updates the text direction of the overlay panel.
     * @return {?}
     */
    OverlayRef.prototype.updateDirection = function () {
        this._pane.setAttribute('dir', this._state.direction);
    };
    /**
     * Updates the size of the overlay based on the overlay config.
     * @return {?}
     */
    OverlayRef.prototype.updateSize = function () {
        if (this._state.width || this._state.width === 0) {
            this._pane.style.width = formatCssUnit(this._state.width);
        }
        if (this._state.height || this._state.height === 0) {
            this._pane.style.height = formatCssUnit(this._state.height);
        }
        if (this._state.minWidth || this._state.minWidth === 0) {
            this._pane.style.minWidth = formatCssUnit(this._state.minWidth);
        }
        if (this._state.minHeight || this._state.minHeight === 0) {
            this._pane.style.minHeight = formatCssUnit(this._state.minHeight);
        }
    };
    /**
     * Toggles the pointer events for the overlay pane element.
     * @param {?} enablePointer
     * @return {?}
     */
    OverlayRef.prototype._togglePointerEvents = function (enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    };
    /**
     * Attaches a backdrop for this overlay.
     * @return {?}
     */
    OverlayRef.prototype._attachBackdrop = function () {
        var _this = this;
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', function () { return _this._backdropClick.next(null); });
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(function () {
            if (_this._backdropElement) {
                _this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
            }
        });
    };
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     * @return {?}
     */
    OverlayRef.prototype._updateStackingOrder = function () {
        if (this._pane.nextSibling) {
            this._pane.parentNode.appendChild(this._pane);
        }
    };
    /**
     * Detaches the backdrop (if any) associated with the overlay.
     * @return {?}
     */
    OverlayRef.prototype.detachBackdrop = function () {
        var _this = this;
        var /** @type {?} */ backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            var /** @type {?} */ finishDetach_1 = function () {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', finishDetach_1);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(function () {
                setTimeout(finishDetach_1, 500);
            });
        }
    };
    return OverlayRef;
}());
/**
 * @param {?} value
 * @return {?}
 */
function formatCssUnit(value) {
    return typeof value === 'string' ? (value) : value + "px";
}
/** Horizontal dimension of a connection point on the perimeter of the origin or overlay element. */
/**
 * The points of the origin element and the overlay element to connect.
 */
var ConnectionPositionPair = (function () {
    /**
     * @param {?} origin
     * @param {?} overlay
     */
    function ConnectionPositionPair(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
    return ConnectionPositionPair;
}());
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 */
var ScrollableViewProperties = (function () {
    function ScrollableViewProperties() {
    }
    return ScrollableViewProperties;
}());
/**
 * The change event emitted by the strategy when a fallback position is used.
 */
var ConnectedOverlayPositionChange = (function () {
    /**
     * @param {?} connectionPair
     * @param {?} scrollableViewProperties
     */
    function ConnectedOverlayPositionChange(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
    return ConnectedOverlayPositionChange;
}());
/**
 * @nocollapse
 */
ConnectedOverlayPositionChange.ctorParameters = function () { return [
    { type: ConnectionPositionPair, },
    { type: ScrollableViewProperties, decorators: [{ type: _angular_core.Optional },] },
]; };
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
var ConnectedPositionStrategy = (function () {
    /**
     * @param {?} _connectedTo
     * @param {?} _originPos
     * @param {?} _overlayPos
     * @param {?} _viewportRuler
     */
    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
        this._connectedTo = _connectedTo;
        this._originPos = _originPos;
        this._overlayPos = _overlayPos;
        this._viewportRuler = _viewportRuler;
        this._dir = 'ltr';
        /**
         * The offset in pixels for the overlay connection point on the x-axis
         */
        this._offsetX = 0;
        /**
         * The offset in pixels for the overlay connection point on the y-axis
         */
        this._offsetY = 0;
        /**
         * The Scrollable containers used to check scrollable view properties on position change.
         */
        this.scrollables = [];
        /**
         * Ordered list of preferred positions, from most to least desirable.
         */
        this._preferredPositions = [];
        this._onPositionChange = new rxjs_Subject.Subject();
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(_originPos, _overlayPos);
    }
    Object.defineProperty(ConnectedPositionStrategy.prototype, "_isRtl", {
        /**
         * Whether the we're dealing with an RTL context
         * @return {?}
         */
        get: function () {
            return this._dir === 'rtl';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "onPositionChange", {
        /**
         * Emits an event when the connection point changes.
         * @return {?}
         */
        get: function () {
            return this._onPositionChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
        /**
         * Ordered list of preferred positions, from most to least desirable.
         * @return {?}
         */
        get: function () {
            return this._preferredPositions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To be used to for any cleanup after the element gets destroyed.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.dispose = function () { };
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS styles.
     * @return {?} Resolves when the styles have been applied.
     */
    ConnectedPositionStrategy.prototype.apply = function (element) {
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        var /** @type {?} */ originRect = this._origin.getBoundingClientRect();
        var /** @type {?} */ overlayRect = element.getBoundingClientRect();
        // We use the viewport rect to determine whether a position would go off-screen.
        var /** @type {?} */ viewportRect = this._viewportRuler.getViewportRect();
        // Fallback point if none of the fallbacks fit into the viewport.
        var /** @type {?} */ fallbackPoint = null;
        var /** @type {?} */ fallbackPosition = null;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (var _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            // Get the (x, y) point of connection on the origin, and then use that to get the
            // (top, left) coordinate for the overlay at `pos`.
            var /** @type {?} */ originPoint = this._getOriginConnectionPoint(originRect, pos);
            var /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(element, overlayRect, overlayPoint, pos);
                // Save the last connected position in case the position needs to be re-calculated.
                this._lastConnectedPosition = pos;
                // Notify that the position has been changed along with its change properties.
                var /** @type {?} */ scrollableViewProperties = this.getScrollableViewProperties(element);
                var /** @type {?} */ positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
                this._onPositionChange.next(positionChange);
                return Promise.resolve(null);
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
                fallbackPosition = pos;
            }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, overlayRect, fallbackPoint, fallbackPosition);
        return Promise.resolve(null);
    };
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.recalculateLastPosition = function () {
        var /** @type {?} */ originRect = this._origin.getBoundingClientRect();
        var /** @type {?} */ overlayRect = this._pane.getBoundingClientRect();
        var /** @type {?} */ viewportRect = this._viewportRuler.getViewportRect();
        var /** @type {?} */ lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        var /** @type {?} */ originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        var /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, lastPosition);
        this._setElementPosition(this._pane, overlayRect, overlayPoint, lastPosition);
    };
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withScrollableContainers = function (scrollables) {
        this.scrollables = scrollables;
    };
    /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withFallbackPosition = function (originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    };
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withDirection = function (dir) {
        this._dir = dir;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withOffsetX = function (offset) {
        this._offsetX = offset;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withOffsetY = function (offset) {
        this._offsetY = offset;
        return this;
    };
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getStartX = function (rect) {
        return this._isRtl ? rect.right : rect.left;
    };
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getEndX = function (rect) {
        return this._isRtl ? rect.left : rect.right;
    };
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = function (originRect, pos) {
        var /** @type {?} */ originStartX = this._getStartX(originRect);
        var /** @type {?} */ originEndX = this._getEndX(originRect);
        var /** @type {?} */ x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        var /** @type {?} */ y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x: x, y: y };
    };
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     * @param {?} originPoint
     * @param {?} overlayRect
     * @param {?} viewportRect
     * @param {?} pos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getOverlayPoint = function (originPoint, overlayRect, viewportRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
        // relative to the origin point.
        var /** @type {?} */ overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl ? 0 : -overlayRect.width;
        }
        var /** @type {?} */ overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        // The (x, y) coordinates of the overlay.
        var /** @type {?} */ x = originPoint.x + overlayStartX + this._offsetX;
        var /** @type {?} */ y = originPoint.y + overlayStartY + this._offsetY;
        // How much the overlay would overflow at this position, on each side.
        var /** @type {?} */ leftOverflow = 0 - x;
        var /** @type {?} */ rightOverflow = (x + overlayRect.width) - viewportRect.width;
        var /** @type {?} */ topOverflow = 0 - y;
        var /** @type {?} */ bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        // Visible parts of the element on each axis.
        var /** @type {?} */ visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        var /** @type {?} */ visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        // The area of the element that's within the viewport.
        var /** @type {?} */ visibleArea = visibleWidth * visibleHeight;
        var /** @type {?} */ fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x: x, y: y, fitsInViewport: fitsInViewport, visibleArea: visibleArea };
    };
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.getScrollableViewProperties = function (overlay) {
        var _this = this;
        var /** @type {?} */ originBounds = this._getElementBounds(this._origin);
        var /** @type {?} */ overlayBounds = this._getElementBounds(overlay);
        var /** @type {?} */ scrollContainerBounds = this.scrollables.map(function (scrollable) {
            return _this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    };
    /**
     * Whether the element is completely out of the view of any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.isElementOutsideView = function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            var /** @type {?} */ outsideAbove = elementBounds.bottom < containerBounds.top;
            var /** @type {?} */ outsideBelow = elementBounds.top > containerBounds.bottom;
            var /** @type {?} */ outsideLeft = elementBounds.right < containerBounds.left;
            var /** @type {?} */ outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    };
    /**
     * Whether the element is clipped by any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.isElementClipped = function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            var /** @type {?} */ clippedAbove = elementBounds.top < containerBounds.top;
            var /** @type {?} */ clippedBelow = elementBounds.bottom > containerBounds.bottom;
            var /** @type {?} */ clippedLeft = elementBounds.left < containerBounds.left;
            var /** @type {?} */ clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    };
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._setElementPosition = function (element, overlayRect, overlayPoint, pos) {
        var /** @type {?} */ viewport = this._viewportRuler.getViewportRect();
        // We want to set either `top` or `bottom` based on whether the overlay wants to appear above
        // or below the origin and the direction in which the element will expand.
        var /** @type {?} */ verticalStyleProperty = pos.overlayY === 'bottom' ? 'bottom' : 'top';
        // When using `bottom`, we adjust the y position such that it is the distance
        // from the bottom of the viewport rather than the top.
        var /** @type {?} */ y = verticalStyleProperty === 'top' ?
            overlayPoint.y :
            viewport.height - (overlayPoint.y + overlayRect.height);
        // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
        // or "after" the origin, which determines the direction in which the element will expand.
        // For the horizontal axis, the meaning of "before" and "after" change based on whether the
        // page is in RTL or LTR.
        var /** @type {?} */ horizontalStyleProperty;
        if (this._dir === 'rtl') {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'right' : 'left';
        }
        // When we're setting `right`, we adjust the x position such that it is the distance
        // from the right edge of the viewport rather than the left edge.
        var /** @type {?} */ x = horizontalStyleProperty === 'left' ?
            overlayPoint.x :
            viewport.width - (overlayPoint.x + overlayRect.width);
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        ['top', 'bottom', 'left', 'right'].forEach(function (p) { return element.style[p] = null; });
        element.style[verticalStyleProperty] = y + "px";
        element.style[horizontalStyleProperty] = x + "px";
    };
    /**
     * Returns the bounding positions of the provided element with respect to the viewport.
     * @param {?} element
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getElementBounds = function (element) {
        var /** @type {?} */ boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    };
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._subtractOverflows = function (length) {
        var overflows = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            overflows[_i - 1] = arguments[_i];
        }
        return overflows.reduce(function (currentValue, currentOverflow) {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    };
    return ConnectedPositionStrategy;
}());
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
var GlobalPositionStrategy = (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
    }
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param {?} value New top offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.top = function (value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    };
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New left offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.left = function (value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    };
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?} value New bottom offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.bottom = function (value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    };
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New right offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.right = function (value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    };
    /**
     * Sets the overlay width and clears any previously set width.
     * @param {?} value New width for the overlay
     * @return {?}
     */
    GlobalPositionStrategy.prototype.width = function (value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    };
    /**
     * Sets the overlay height and clears any previously set height.
     * @param {?} value New height for the overlay
     * @return {?}
     */
    GlobalPositionStrategy.prototype.height = function (value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    };
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
        if (offset === void 0) { offset = ''; }
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    };
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
        if (offset === void 0) { offset = ''; }
        this.top(offset);
        this._alignItems = 'center';
        return this;
    };
    /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS.
     * @return {?} Resolved when the styles have been applied.
     */
    GlobalPositionStrategy.prototype.apply = function (element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        var /** @type {?} */ styles = element.style;
        var /** @type {?} */ parentStyles = ((element.parentNode)).style;
        styles.position = this._cssPosition;
        styles.marginTop = this._topOffset;
        styles.marginLeft = this._leftOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        styles.width = this._width;
        styles.height = this._height;
        parentStyles.justifyContent = this._justifyContent;
        parentStyles.alignItems = this._alignItems;
        return Promise.resolve(null);
    };
    /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.dispose = function () {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    };
    return GlobalPositionStrategy;
}());
/**
 * Builder for overlay position strategy.
 */
var OverlayPositionBuilder = (function () {
    /**
     * @param {?} _viewportRuler
     */
    function OverlayPositionBuilder(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /**
     * Creates a global position strategy.
     * @return {?}
     */
    OverlayPositionBuilder.prototype.global = function () {
        return new GlobalPositionStrategy();
    };
    /**
     * Creates a relative position strategy.
     * @param {?} elementRef
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    };
    return OverlayPositionBuilder;
}());
OverlayPositionBuilder.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
OverlayPositionBuilder.ctorParameters = function () { return [
    { type: ViewportRuler, },
]; };
/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
var OverlayContainer = (function () {
    function OverlayContainer() {
    }
    Object.defineProperty(OverlayContainer.prototype, "themeClass", {
        /**
         * Base theme to be applied to all overlay-based components.
         * @return {?}
         */
        get: function () { return this._themeClass; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._containerElement) {
                this._containerElement.classList.remove(this._themeClass);
                if (value) {
                    this._containerElement.classList.add(value);
                }
            }
            this._themeClass = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    OverlayContainer.prototype.getContainerElement = function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    OverlayContainer.prototype._createContainer = function () {
        var /** @type {?} */ container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        if (this._themeClass) {
            container.classList.add(this._themeClass);
        }
        document.body.appendChild(container);
        this._containerElement = container;
    };
    return OverlayContainer;
}());
OverlayContainer.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
OverlayContainer.ctorParameters = function () { return []; };
/**
 * @param {?} parentContainer
 * @return {?}
 */
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer) {
    return parentContainer || new OverlayContainer();
}
var OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), OverlayContainer]],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};
/**
 * Next overlay unique ID.
 */
var nextUniqueId = 0;
/**
 * The default state for newly created overlays.
 */
var defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
var Overlay = (function () {
    /**
     * @param {?} _overlayContainer
     * @param {?} _componentFactoryResolver
     * @param {?} _positionBuilder
     * @param {?} _appRef
     * @param {?} _injector
     * @param {?} _ngZone
     */
    function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
    }
    /**
     * Creates an overlay.
     * @param {?=} state State to apply to the overlay.
     * @return {?} Reference to the created overlay.
     */
    Overlay.prototype.create = function (state$$1) {
        if (state$$1 === void 0) { state$$1 = defaultState; }
        return this._createOverlayRef(this._createPaneElement(), state$$1);
    };
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @return {?}
     */
    Overlay.prototype.position = function () {
        return this._positionBuilder;
    };
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @return {?} Newly-created pane element
     */
    Overlay.prototype._createPaneElement = function () {
        var /** @type {?} */ pane = document.createElement('div');
        pane.id = "cdk-overlay-" + nextUniqueId++;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    };
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    Overlay.prototype._createPortalHost = function (pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef, this._injector);
    };
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @param {?} state
     * @return {?}
     */
    Overlay.prototype._createOverlayRef = function (pane, state$$1) {
        return new OverlayRef(this._createPortalHost(pane), pane, state$$1, this._ngZone);
    };
    return Overlay;
}());
Overlay.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
Overlay.ctorParameters = function () { return [
    { type: OverlayContainer, },
    { type: _angular_core.ComponentFactoryResolver, },
    { type: OverlayPositionBuilder, },
    { type: _angular_core.ApplicationRef, },
    { type: _angular_core.Injector, },
    { type: _angular_core.NgZone, },
]; };
/**
 * Providers for Overlay and its related injectables.
 */
var OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    VIEWPORT_RULER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
];
/**
 * Strategy that will update the element position as the user is scrolling.
 */
var RepositionScrollStrategy = (function () {
    /**
     * @param {?} _scrollDispatcher
     * @param {?=} _scrollThrottle
     */
    function RepositionScrollStrategy(_scrollDispatcher, _scrollThrottle) {
        if (_scrollThrottle === void 0) { _scrollThrottle = 0; }
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollThrottle = _scrollThrottle;
        this._scrollSubscription = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    RepositionScrollStrategy.prototype.attach = function (overlayRef) {
        this._overlayRef = overlayRef;
    };
    /**
     * @return {?}
     */
    RepositionScrollStrategy.prototype.enable = function () {
        var _this = this;
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(this._scrollThrottle, function () {
                _this._overlayRef.updatePosition();
            });
        }
    };
    /**
     * @return {?}
     */
    RepositionScrollStrategy.prototype.disable = function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return RepositionScrollStrategy;
}());
/**
 * Default set of positions for the overlay. Follows the behavior of a dropdown.
 */
var defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
var OverlayOrigin = (function () {
    /**
     * @param {?} elementRef
     */
    function OverlayOrigin(elementRef) {
        this.elementRef = elementRef;
    }
    return OverlayOrigin;
}());
OverlayOrigin.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
                exportAs: 'cdkOverlayOrigin',
            },] },
];
/**
 * @nocollapse
 */
OverlayOrigin.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
var ConnectedOverlayDirective = (function () {
    /**
     * @param {?} _overlay
     * @param {?} _renderer
     * @param {?} _scrollDispatcher
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} _dir
     */
    function ConnectedOverlayDirective(_overlay, _renderer, _scrollDispatcher, templateRef, viewContainerRef, _dir) {
        this._overlay = _overlay;
        this._renderer = _renderer;
        this._scrollDispatcher = _scrollDispatcher;
        this._dir = _dir;
        this._hasBackdrop = false;
        this._offsetX = 0;
        this._offsetY = 0;
        /**
         * Strategy to be used when handling scroll events while the overlay is open.
         */
        this.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
        /**
         * Whether the overlay is open.
         */
        this.open = false;
        /**
         * Event emitted when the backdrop is clicked.
         */
        this.backdropClick = new _angular_core.EventEmitter();
        /**
         * Event emitted when the position has changed.
         */
        this.positionChange = new _angular_core.EventEmitter();
        /**
         * Event emitted when the overlay has been attached.
         */
        this.attach = new _angular_core.EventEmitter();
        /**
         * Event emitted when the overlay has been detached.
         */
        this.detach = new _angular_core.EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetX", {
        /**
         * The offset in pixels for the overlay connection point on the x-axis
         * @return {?}
         */
        get: function () {
            return this._offsetX;
        },
        /**
         * @param {?} offsetX
         * @return {?}
         */
        set: function (offsetX) {
            this._offsetX = offsetX;
            if (this._position) {
                this._position.withOffsetX(offsetX);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetY", {
        /**
         * The offset in pixels for the overlay connection point on the y-axis
         * @return {?}
         */
        get: function () {
            return this._offsetY;
        },
        /**
         * @param {?} offsetY
         * @return {?}
         */
        set: function (offsetY) {
            this._offsetY = offsetY;
            if (this._position) {
                this._position.withOffsetY(offsetY);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "hasBackdrop", {
        /**
         * Whether or not the overlay should attach a backdrop.
         * @return {?}
         */
        get: function () {
            return this._hasBackdrop;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._hasBackdrop = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
        /**
         * The associated overlay reference.
         * @return {?}
         */
        get: function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "dir", {
        /**
         * The element's layout direction.
         * @return {?}
         */
        get: function () {
            return this._dir ? this._dir.value : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ConnectedOverlayDirective.prototype.ngOnChanges = function (changes) {
        if (changes['open']) {
            this.open ? this._attachOverlay() : this._detachOverlay();
        }
    };
    /**
     * Creates an overlay
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._createOverlay = function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    };
    /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._buildConfig = function () {
        var /** @type {?} */ overlayConfig = new OverlayState();
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        overlayConfig.hasBackdrop = this.hasBackdrop;
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        this._position = (this._createPositionStrategy());
        overlayConfig.positionStrategy = this._position;
        overlayConfig.scrollStrategy = this.scrollStrategy;
        return overlayConfig;
    };
    /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._createPositionStrategy = function () {
        var /** @type {?} */ pos = this.positions[0];
        var /** @type {?} */ originPoint = { originX: pos.originX, originY: pos.originY };
        var /** @type {?} */ overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        var /** @type {?} */ strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    };
    /**
     * @param {?} strategy
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._handlePositionChanges = function (strategy) {
        var _this = this;
        for (var /** @type {?} */ i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(function (pos) { return _this.positionChange.emit(pos); });
    };
    /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._attachOverlay = function () {
        var _this = this;
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._position.withDirection(this.dir);
        this._overlayRef.getState().direction = this.dir;
        this._initEscapeListener();
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
                _this.backdropClick.emit();
            });
        }
    };
    /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._detachOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
            this._backdropSubscription = null;
        }
        if (this._escapeListener) {
            this._escapeListener();
        }
    };
    /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
        if (this._escapeListener) {
            this._escapeListener();
        }
    };
    /**
     * Sets the event listener that closes the overlay when pressing Escape.
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._initEscapeListener = function () {
        var _this = this;
        this._escapeListener = this._renderer.listen('document', 'keydown', function (event) {
            if (event.keyCode === ESCAPE) {
                _this._detachOverlay();
            }
        });
    };
    return ConnectedOverlayDirective;
}());
ConnectedOverlayDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
                exportAs: 'cdkConnectedOverlay'
            },] },
];
/**
 * @nocollapse
 */
ConnectedOverlayDirective.ctorParameters = function () { return [
    { type: Overlay, },
    { type: _angular_core.Renderer2, },
    { type: ScrollDispatcher, },
    { type: _angular_core.TemplateRef, },
    { type: _angular_core.ViewContainerRef, },
    { type: Dir, decorators: [{ type: _angular_core.Optional },] },
]; };
ConnectedOverlayDirective.propDecorators = {
    'origin': [{ type: _angular_core.Input },],
    'positions': [{ type: _angular_core.Input },],
    'offsetX': [{ type: _angular_core.Input },],
    'offsetY': [{ type: _angular_core.Input },],
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'minWidth': [{ type: _angular_core.Input },],
    'minHeight': [{ type: _angular_core.Input },],
    'backdropClass': [{ type: _angular_core.Input },],
    'scrollStrategy': [{ type: _angular_core.Input },],
    'open': [{ type: _angular_core.Input },],
    'hasBackdrop': [{ type: _angular_core.Input },],
    'backdropClick': [{ type: _angular_core.Output },],
    'positionChange': [{ type: _angular_core.Output },],
    'attach': [{ type: _angular_core.Output },],
    'detach': [{ type: _angular_core.Output },],
};
var OverlayModule = (function () {
    function OverlayModule() {
    }
    return OverlayModule;
}());
OverlayModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [PortalModule, ScrollDispatchModule],
                exports: [ConnectedOverlayDirective, OverlayOrigin, ScrollDispatchModule],
                declarations: [ConnectedOverlayDirective, OverlayOrigin],
                providers: [OVERLAY_PROVIDERS],
            },] },
];
/**
 * @nocollapse
 */
OverlayModule.ctorParameters = function () { return []; };
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
var InteractivityChecker = (function () {
    /**
     * @param {?} _platform
     */
    function InteractivityChecker(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is disabled.
     */
    InteractivityChecker.prototype.isDisabled = function (element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    };
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @param {?} element
     * @return {?} Whether the element is visible.
     */
    InteractivityChecker.prototype.isVisible = function (element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    };
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is tabbable.
     */
    InteractivityChecker.prototype.isTabbable = function (element) {
        var /** @type {?} */ frameElement = (getWindow(element).frameElement);
        if (frameElement) {
            var /** @type {?} */ frameType = frameElement && frameElement.nodeName.toLowerCase();
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Webkit and Blink consider anything inside of an <object> element as non-tabbable.
            if ((this._platform.BLINK || this._platform.WEBKIT) && frameType === 'object') {
                return false;
            }
            // Webkit and Blink disable tabbing to an element inside of an invisible frame.
            if ((this._platform.BLINK || this._platform.WEBKIT) && !this.isVisible(frameElement)) {
                return false;
            }
        }
        var /** @type {?} */ nodeName = element.nodeName.toLowerCase();
        var /** @type {?} */ tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe') {
            // The frames may be tabbable depending on content, but it's not possibly to reliably
            // investigate the content of the frames.
            return false;
        }
        if (nodeName === 'audio') {
            if (!element.hasAttribute('controls')) {
                // By default an <audio> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK) {
                // In Blink <audio controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'video') {
            if (!element.hasAttribute('controls') && this._platform.TRIDENT) {
                // In Trident a <video> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK || this._platform.FIREFOX) {
                // In Chrome and Firefox <video controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'object' && (this._platform.BLINK || this._platform.WEBKIT)) {
            // In all Blink and WebKit based browsers <object> elements are never tabbable.
            return false;
        }
        // In iOS the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        return element.tabIndex >= 0;
    };
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is focusable.
     */
    InteractivityChecker.prototype.isFocusable = function (element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    };
    return InteractivityChecker;
}());
InteractivityChecker.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
InteractivityChecker.ctorParameters = function () { return [
    { type: Platform, },
]; };
/**
 * Checks whether the specified element has any geometry / rectangles.
 * @param {?} element
 * @return {?}
 */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
/**
 * Gets whether an element's
 * @param {?} element
 * @return {?}
 */
function isNativeFormElement(element) {
    var /** @type {?} */ nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/**
 * Gets whether an element is an <input type="hidden">.
 * @param {?} element
 * @return {?}
 */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/**
 * Gets whether an element is an anchor that has an href attribute.
 * @param {?} element
 * @return {?}
 */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/**
 * Gets whether an element is an input element.
 * @param {?} element
 * @return {?}
 */
function isInputElement(element) {
    return element.nodeName.toLowerCase() == 'input';
}
/**
 * Gets whether an element is an anchor element.
 * @param {?} element
 * @return {?}
 */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/**
 * Gets whether an element has a valid tabindex.
 * @param {?} element
 * @return {?}
 */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    var /** @type {?} */ tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 * @param {?} element
 * @return {?}
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
    var /** @type {?} */ tabIndex = parseInt(element.getAttribute('tabindex'), 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/**
 * Checks whether the specified element is potentially tabbable on iOS
 * @param {?} element
 * @return {?}
 */
function isPotentiallyTabbableIOS(element) {
    var /** @type {?} */ nodeName = element.nodeName.toLowerCase();
    var /** @type {?} */ inputType = nodeName === 'input' && ((element)).type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 * @param {?} element
 * @return {?}
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/**
 * Gets the parent window of a DOM node with regards of being inside of an iframe.
 * @param {?} node
 * @return {?}
 */
function getWindow(node) {
    return node.ownerDocument.defaultView || window;
}
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * NOTE: This class currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
var FocusTrap = (function () {
    /**
     * @param {?} _element
     * @param {?} _checker
     * @param {?} _ngZone
     * @param {?=} deferAnchors
     */
    function FocusTrap(_element, _checker, _ngZone, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        this._element = _element;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    Object.defineProperty(FocusTrap.prototype, "enabled", {
        /**
         * Whether the focus trap is active.
         * @return {?}
         */
        get: function () { return this._enabled; },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._enabled = val;
            if (this._startAnchor && this._endAnchor) {
                this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    FocusTrap.prototype.destroy = function () {
        if (this._startAnchor && this._startAnchor.parentNode) {
            this._startAnchor.parentNode.removeChild(this._startAnchor);
        }
        if (this._endAnchor && this._endAnchor.parentNode) {
            this._endAnchor.parentNode.removeChild(this._endAnchor);
        }
        this._startAnchor = this._endAnchor = null;
    };
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?}
     */
    FocusTrap.prototype.attachAnchors = function () {
        var _this = this;
        if (!this._startAnchor) {
            this._startAnchor = this._createAnchor();
        }
        if (!this._endAnchor) {
            this._endAnchor = this._createAnchor();
        }
        this._ngZone.runOutsideAngular(function () {
            _this._startAnchor.addEventListener('focus', function () { return _this.focusLastTabbableElement(); });
            _this._endAnchor.addEventListener('focus', function () { return _this.focusFirstTabbableElement(); });
            _this._element.parentNode.insertBefore(_this._startAnchor, _this._element);
            _this._element.parentNode.insertBefore(_this._endAnchor, _this._element.nextSibling);
        });
    };
    /**
     * Waits for microtask queue to empty, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusFirstTabbableElementWhenReady = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () { return _this.focusFirstTabbableElement(); });
    };
    /**
     * Waits for microtask queue to empty, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusLastTabbableElementWhenReady = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () { return _this.focusLastTabbableElement(); });
    };
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusFirstTabbableElement = function () {
        var /** @type {?} */ redirectToElement = (this._element.querySelector('[cdk-focus-start]')) ||
            this._getFirstTabbableElement(this._element);
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusLastTabbableElement = function () {
        var /** @type {?} */ focusTargets = this._element.querySelectorAll('[cdk-focus-end]');
        var /** @type {?} */ redirectToElement = null;
        if (focusTargets.length) {
            redirectToElement = (focusTargets[focusTargets.length - 1]);
        }
        else {
            redirectToElement = this._getLastTabbableElement(this._element);
        }
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    FocusTrap.prototype._getFirstTabbableElement = function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        var /** @type {?} */ children = root.children || root.childNodes;
        for (var /** @type {?} */ i = 0; i < children.length; i++) {
            var /** @type {?} */ tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getFirstTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    FocusTrap.prototype._getLastTabbableElement = function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        var /** @type {?} */ children = root.children || root.childNodes;
        for (var /** @type {?} */ i = children.length - 1; i >= 0; i--) {
            var /** @type {?} */ tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getLastTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /**
     * Creates an anchor element.
     * @return {?}
     */
    FocusTrap.prototype._createAnchor = function () {
        var /** @type {?} */ anchor = document.createElement('div');
        anchor.tabIndex = this._enabled ? 0 : -1;
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        return anchor;
    };
    return FocusTrap;
}());
/**
 * Factory that allows easy instantiation of focus traps.
 */
var FocusTrapFactory = (function () {
    /**
     * @param {?} _checker
     * @param {?} _ngZone
     */
    function FocusTrapFactory(_checker, _ngZone) {
        this._checker = _checker;
        this._ngZone = _ngZone;
    }
    /**
     * @param {?} element
     * @param {?=} deferAnchors
     * @return {?}
     */
    FocusTrapFactory.prototype.create = function (element, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        return new FocusTrap(element, this._checker, this._ngZone, deferAnchors);
    };
    return FocusTrapFactory;
}());
FocusTrapFactory.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
FocusTrapFactory.ctorParameters = function () { return [
    { type: InteractivityChecker, },
    { type: _angular_core.NgZone, },
]; };
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
var FocusTrapDeprecatedDirective = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    function FocusTrapDeprecatedDirective(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(FocusTrapDeprecatedDirective.prototype, "disabled", {
        /**
         * Whether the focus trap is active.
         * @return {?}
         */
        get: function () { return !this.focusTrap.enabled; },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this.focusTrap.enabled = !coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FocusTrapDeprecatedDirective.prototype.ngOnDestroy = function () {
        this.focusTrap.destroy();
    };
    /**
     * @return {?}
     */
    FocusTrapDeprecatedDirective.prototype.ngAfterContentInit = function () {
        this.focusTrap.attachAnchors();
    };
    return FocusTrapDeprecatedDirective;
}());
FocusTrapDeprecatedDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'cdk-focus-trap',
            },] },
];
/**
 * @nocollapse
 */
FocusTrapDeprecatedDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: FocusTrapFactory, },
]; };
FocusTrapDeprecatedDirective.propDecorators = {
    'disabled': [{ type: _angular_core.Input },],
};
/**
 * Directive for trapping focus within a region.
 */
var FocusTrapDirective = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    function FocusTrapDirective(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(FocusTrapDirective.prototype, "enabled", {
        /**
         * Whether the focus trap is active.
         * @return {?}
         */
        get: function () { return this.focusTrap.enabled; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this.focusTrap.enabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngOnDestroy = function () {
        this.focusTrap.destroy();
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngAfterContentInit = function () {
        this.focusTrap.attachAnchors();
    };
    return FocusTrapDirective;
}());
FocusTrapDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[cdkTrapFocus]',
                exportAs: 'cdkTrapFocus',
            },] },
];
/**
 * @nocollapse
 */
FocusTrapDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: FocusTrapFactory, },
]; };
FocusTrapDirective.propDecorators = {
    'enabled': [{ type: _angular_core.Input, args: ['cdkTrapFocus',] },],
};
var LIVE_ANNOUNCER_ELEMENT_TOKEN = new _angular_core.InjectionToken('liveAnnouncerElement');
var LiveAnnouncer = (function () {
    /**
     * @param {?} elementToken
     * @param {?} platform
     */
    function LiveAnnouncer(elementToken, platform) {
        // Only do anything if we're on the browser platform.
        if (platform.isBrowser) {
            // We inject the live element as `any` because the constructor signature cannot reference
            // browser globals (HTMLElement) on non-browser environments, since having a class decorator
            // causes TypeScript to preserve the constructor signature types.
            this._liveElement = elementToken || this._createLiveElement();
        }
    }
    /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    LiveAnnouncer.prototype.announce = function (message, politeness) {
        var _this = this;
        if (politeness === void 0) { politeness = 'polite'; }
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(function () { return _this._liveElement.textContent = message; }, 100);
    };
    /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    LiveAnnouncer.prototype._removeLiveElement = function () {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    };
    /**
     * @return {?}
     */
    LiveAnnouncer.prototype._createLiveElement = function () {
        var /** @type {?} */ liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    };
    return LiveAnnouncer;
}());
LiveAnnouncer.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
LiveAnnouncer.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] },] },
    { type: Platform, },
]; };
/**
 * @param {?} parentDispatcher
 * @param {?} liveElement
 * @param {?} platform
 * @return {?}
 */
function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement, platform) {
    return parentDispatcher || new LiveAnnouncer(liveElement, platform);
}
var LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new _angular_core.Optional(), new _angular_core.SkipSelf(), LiveAnnouncer],
        [new _angular_core.Optional(), new _angular_core.Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        Platform,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
var A11yModule = (function () {
    function A11yModule() {
    }
    return A11yModule;
}());
A11yModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [_angular_common.CommonModule, PlatformModule],
                declarations: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                exports: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
            },] },
];
/**
 * @nocollapse
 */
A11yModule.ctorParameters = function () { return []; };
/**
 * The FullscreenOverlayContainer is the alternative to OverlayContainer
 * that supports correct displaying of overlay elements in Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 * It should be provided in the root component that way:
 * providers: [
 *   {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
 * ],
 */
var FullscreenOverlayContainer = (function (_super) {
    __extends(FullscreenOverlayContainer, _super);
    function FullscreenOverlayContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._createContainer = function () {
        var _this = this;
        _super.prototype._createContainer.call(this);
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(function () { return _this._adjustParentForFullscreenChange(); });
    };
    /**
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._adjustParentForFullscreenChange = function () {
        if (!this._containerElement) {
            return;
        }
        var /** @type {?} */ fullscreenElement = this.getFullscreenElement();
        var /** @type {?} */ parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._addFullscreenChangeListener = function (fn) {
        if (document.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', fn);
        }
        else if (document.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', fn);
        }
        else if (((document)).mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', fn);
        }
        else if (((document)).msFullscreenEnabled) {
            document.addEventListener('MSFullscreenChange', fn);
        }
    };
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    FullscreenOverlayContainer.prototype.getFullscreenElement = function () {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            ((document)).mozFullScreenElement ||
            ((document)).msFullscreenElement ||
            null;
    };
    return FullscreenOverlayContainer;
}(OverlayContainer));
FullscreenOverlayContainer.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
FullscreenOverlayContainer.ctorParameters = function () { return []; };
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
var CloseScrollStrategy = (function () {
    /**
     * @param {?} _scrollDispatcher
     */
    function CloseScrollStrategy(_scrollDispatcher) {
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollSubscription = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    CloseScrollStrategy.prototype.attach = function (overlayRef) {
        this._overlayRef = overlayRef;
    };
    /**
     * @return {?}
     */
    CloseScrollStrategy.prototype.enable = function () {
        var _this = this;
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(null, function () {
                if (_this._overlayRef.hasAttached()) {
                    _this._overlayRef.detach();
                }
                _this.disable();
            });
        }
    };
    /**
     * @return {?}
     */
    CloseScrollStrategy.prototype.disable = function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return CloseScrollStrategy;
}());
var GestureConfig = (function (_super) {
    __extends(GestureConfig, _super);
    function GestureConfig() {
        var _this = _super.call(this) || this;
        _this._hammer = typeof window !== 'undefined' ? ((window)).Hammer : null;
        /* List of new event names to add to the gesture support list */
        _this.events = _this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!_this._hammer && _angular_core.isDevMode()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
        return _this;
    }
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    GestureConfig.prototype.buildHammer = function (element) {
        var /** @type {?} */ mc = new this._hammer(element);
        // Default Hammer Recognizers.
        var /** @type {?} */ pan = new this._hammer.Pan();
        var /** @type {?} */ swipe = new this._hammer.Swipe();
        var /** @type {?} */ press = new this._hammer.Press();
        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
        // Otherwise the previous `recognizeWith` will be dropped.
        // TODO: Confirm threshold numbers with Material Design UX Team
        var /** @type {?} */ slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        var /** @type {?} */ longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return (mc);
    };
    /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    GestureConfig.prototype._createRecognizer = function (base, options) {
        var inheritances = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            inheritances[_i - 2] = arguments[_i];
        }
        var /** @type {?} */ recognizer = new ((base.constructor))(options);
        inheritances.push(base);
        inheritances.forEach(function (item) { return recognizer.recognizeWith(item); });
        return recognizer;
    };
    return GestureConfig;
}(_angular_platformBrowser.HammerGestureConfig));
GestureConfig.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
GestureConfig.ctorParameters = function () { return []; };
/**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 */
var SelectionModel = (function () {
    /**
     * @param {?=} _isMulti
     * @param {?=} initiallySelectedValues
     * @param {?=} _emitChanges
     */
    function SelectionModel(_isMulti, initiallySelectedValues, _emitChanges) {
        if (_isMulti === void 0) { _isMulti = false; }
        if (_emitChanges === void 0) { _emitChanges = true; }
        var _this = this;
        this._isMulti = _isMulti;
        this._emitChanges = _emitChanges;
        /**
         * Currently-selected values.
         */
        this._selection = new Set();
        /**
         * Keeps track of the deselected options that haven't been emitted by the change event.
         */
        this._deselectedToEmit = [];
        /**
         * Keeps track of the selected option that haven't been emitted by the change event.
         */
        this._selectedToEmit = [];
        /**
         * Event emitted when the value has changed.
         */
        this.onChange = this._emitChanges ? new rxjs_Subject.Subject() : null;
        if (initiallySelectedValues) {
            if (_isMulti) {
                initiallySelectedValues.forEach(function (value) { return _this._markSelected(value); });
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    Object.defineProperty(SelectionModel.prototype, "selected", {
        /**
         * Selected value(s).
         * @return {?}
         */
        get: function () {
            if (!this._selected) {
                this._selected = Array.from(this._selection.values());
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.select = function (value) {
        this._markSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Deselects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.deselect = function (value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.toggle = function (value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    };
    /**
     * Clears all of the selected values.
     * @return {?}
     */
    SelectionModel.prototype.clear = function () {
        this._unmarkAll();
        this._emitChangeEvent();
    };
    /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.isSelected = function (value) {
        return this._selection.has(value);
    };
    /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    SelectionModel.prototype.isEmpty = function () {
        return this._selection.size === 0;
    };
    /**
     * Determines whether the model has a value.
     * @return {?}
     */
    SelectionModel.prototype.hasValue = function () {
        return !this.isEmpty();
    };
    /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    SelectionModel.prototype.sort = function (predicate) {
        if (this._isMulti && this.selected) {
            this._selected.sort(predicate);
        }
    };
    /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    SelectionModel.prototype._emitChangeEvent = function () {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            var /** @type {?} */ eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
        this._selected = null;
    };
    /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype._markSelected = function (value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    };
    /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype._unmarkSelected = function (value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    };
    /**
     * Clears out the selected values.
     * @return {?}
     */
    SelectionModel.prototype._unmarkAll = function () {
        var _this = this;
        if (!this.isEmpty()) {
            this._selection.forEach(function (value) { return _this._unmarkSelected(value); });
        }
    };
    return SelectionModel;
}());
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 */
var SelectionChange = (function () {
    /**
     * @param {?=} added
     * @param {?=} removed
     */
    function SelectionChange(added, removed) {
        this.added = added;
        this.removed = removed;
    }
    return SelectionChange;
}());
/**
 * Screenreaders will often fire fake mousedown events when a focusable element
 * is activated using the keyboard. We can typically distinguish between these faked
 * mousedown events and real mousedown events using the "buttons" property. While
 * real mousedowns will indicate the mouse button that was pressed (e.g. "1" for
 * the left mouse button), faked mousedowns will usually set the property value to 0.
 * @param {?} event
 * @return {?}
 */
function isFakeMousedownFromScreenReader(event) {
    return event.buttons === 0;
}
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
var UniqueSelectionDispatcher = (function () {
    function UniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    UniqueSelectionDispatcher.prototype.notify = function (id, name) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, name);
        }
    };
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    UniqueSelectionDispatcher.prototype.listen = function (listener) {
        this._listeners.push(listener);
    };
    return UniqueSelectionDispatcher;
}());
UniqueSelectionDispatcher.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
UniqueSelectionDispatcher.ctorParameters = function () { return []; };
/**
 * @param {?} parentDispatcher
 * @return {?}
 */
function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
var UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};
// This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
var TOUCH_BUFFER_MS = 650;
/**
 * Monitors mouse and keyboard events to determine the cause of focus events.
 */
var FocusOriginMonitor = (function () {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    function FocusOriginMonitor(_ngZone, _platform) {
        var _this = this;
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * The focus origin that the next focus event is a result of.
         */
        this._origin = null;
        /**
         * Whether the window has just been focused.
         */
        this._windowFocused = false;
        /**
         * Weak map of elements being monitored to their info.
         */
        this._elementInfo = new WeakMap();
        this._ngZone.runOutsideAngular(function () { return _this._registerDocumentEvents(); });
    }
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param {?} element The element to monitor
     * @param {?} renderer The renderer to use to apply CSS classes to the element.
     * @param {?} checkChildren Whether to count the element as focused when its children are focused.
     * @return {?} An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    FocusOriginMonitor.prototype.monitor = function (element, renderer, checkChildren) {
        var _this = this;
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return rxjs_Observable.Observable.of();
        }
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            var /** @type {?} */ info_1 = this._elementInfo.get(element);
            info_1.checkChildren = checkChildren;
            return info_1.subject.asObservable();
        }
        // Create monitored element info.
        var /** @type {?} */ info = {
            unlisten: null,
            checkChildren: checkChildren,
            renderer: renderer,
            subject: new rxjs_Subject.Subject()
        };
        this._elementInfo.set(element, info);
        // Start listening. We need to listen in capture phase since focus events don't bubble.
        var /** @type {?} */ focusListener = function (event) { return _this._onFocus(event, element); };
        var /** @type {?} */ blurListener = function (event) { return _this._onBlur(event, element); };
        this._ngZone.runOutsideAngular(function () {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        });
        // Create an unlisten function for later.
        info.unlisten = function () {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        };
        return info.subject.asObservable();
    };
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    FocusOriginMonitor.prototype.stopMonitoring = function (element) {
        var /** @type {?} */ elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            elementInfo.unlisten();
            elementInfo.subject.complete();
            this._setClasses(element, null);
            this._elementInfo.delete(element);
        }
    };
    /**
     * Focuses the element via the specified focus origin.
     * @param {?} element The element to focus.
     * @param {?} renderer The renderer to use to invoke the focus method on the element.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    FocusOriginMonitor.prototype.focusVia = function (element, renderer, origin) {
        this._setOriginForCurrentEventQueue(origin);
        element.focus();
    };
    /**
     * Register necessary event listeners on the document and window.
     * @return {?}
     */
    FocusOriginMonitor.prototype._registerDocumentEvents = function () {
        var _this = this;
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return;
        }
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        // On keydown record the origin and clear any touch event that may be in progress.
        document.addEventListener('keydown', function () {
            _this._lastTouchTarget = null;
            _this._setOriginForCurrentEventQueue('keyboard');
        }, true);
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        document.addEventListener('mousedown', function () {
            if (!_this._lastTouchTarget) {
                _this._setOriginForCurrentEventQueue('mouse');
            }
        }, true);
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        document.addEventListener('touchstart', function (event) {
            if (_this._touchTimeout != null) {
                clearTimeout(_this._touchTimeout);
            }
            _this._lastTouchTarget = event.target;
            _this._touchTimeout = setTimeout(function () { return _this._lastTouchTarget = null; }, TOUCH_BUFFER_MS);
        }, true);
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        window.addEventListener('focus', function () {
            _this._windowFocused = true;
            setTimeout(function () { return _this._windowFocused = false; }, 0);
        });
    };
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param {?} element The element to update the classes on.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    FocusOriginMonitor.prototype._setClasses = function (element, origin) {
        var /** @type {?} */ renderer = this._elementInfo.get(element).renderer;
        var /** @type {?} */ toggleClass = function (className, shouldSet) {
            shouldSet ? renderer.addClass(element, className) : renderer.removeClass(element, className);
        };
        toggleClass('cdk-focused', !!origin);
        toggleClass('cdk-touch-focused', origin === 'touch');
        toggleClass('cdk-keyboard-focused', origin === 'keyboard');
        toggleClass('cdk-mouse-focused', origin === 'mouse');
        toggleClass('cdk-program-focused', origin === 'program');
    };
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param {?} origin The origin to set.
     * @return {?}
     */
    FocusOriginMonitor.prototype._setOriginForCurrentEventQueue = function (origin) {
        var _this = this;
        this._origin = origin;
        setTimeout(function () { return _this._origin = null; }, 0);
    };
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param {?} event The focus event to check.
     * @return {?} Whether the event was caused by a touch.
     */
    FocusOriginMonitor.prototype._wasCausedByTouch = function (event) {
        // Note(mmalerba): This implementation is not quite perfect, there is a small edge case.
        // Consider the following dom structure:
        //
        // <div #parent tabindex="0" cdkFocusClasses>
        //   <div #child (click)="#parent.focus()"></div>
        // </div>
        //
        // If the user touches the #child element and the #parent is programmatically focused as a
        // result, this code will still consider it to have been caused by the touch event and will
        // apply the cdk-touch-focused class rather than the cdk-program-focused class. This is a
        // relatively small edge-case that can be worked around by using
        // focusVia(parentEl, renderer,  'program') to focus the parent element.
        //
        // If we decide that we absolutely must handle this case correctly, we can do so by listening
        // for the first focus event after the touchstart, and then the first blur event after that
        // focus event. When that blur event fires we know that whatever follows is not a result of the
        // touchstart.
        var /** @type {?} */ focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    };
    /**
     * Handles focus events on a registered element.
     * @param {?} event The focus event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    FocusOriginMonitor.prototype._onFocus = function (event, element) {
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // If we are not counting child-element-focus as focused, make sure that the event target is the
        // monitored element itself.
        if (!this._elementInfo.get(element).checkChildren && element !== event.target) {
            return;
        }
        // If we couldn't detect a cause for the focus event, it's due to one of three reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        if (!this._origin) {
            if (this._windowFocused && this._lastFocusOrigin) {
                this._origin = this._lastFocusOrigin;
            }
            else if (this._wasCausedByTouch(event)) {
                this._origin = 'touch';
            }
            else {
                this._origin = 'program';
            }
        }
        this._setClasses(element, this._origin);
        this._elementInfo.get(element).subject.next(this._origin);
        this._lastFocusOrigin = this._origin;
        this._origin = null;
    };
    /**
     * Handles blur events on a registered element.
     * @param {?} event The blur event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    FocusOriginMonitor.prototype._onBlur = function (event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        if (this._elementInfo.get(element).checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget)) {
            return;
        }
        this._setClasses(element, null);
        this._elementInfo.get(element).subject.next(null);
    };
    return FocusOriginMonitor;
}());
FocusOriginMonitor.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
FocusOriginMonitor.ctorParameters = function () { return [
    { type: _angular_core.NgZone, },
    { type: Platform, },
]; };
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
var CdkMonitorFocus = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _focusOriginMonitor
     * @param {?} renderer
     */
    function CdkMonitorFocus(_elementRef, _focusOriginMonitor, renderer) {
        var _this = this;
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this.cdkFocusChange = new _angular_core.EventEmitter();
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(function (origin) { return _this.cdkFocusChange.emit(origin); });
    }
    /**
     * @return {?}
     */
    CdkMonitorFocus.prototype.ngOnDestroy = function () {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    return CdkMonitorFocus;
}());
CdkMonitorFocus.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]',
            },] },
];
/**
 * @nocollapse
 */
CdkMonitorFocus.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: FocusOriginMonitor, },
    { type: _angular_core.Renderer2, },
]; };
CdkMonitorFocus.propDecorators = {
    'cdkFocusChange': [{ type: _angular_core.Output },],
};
/**
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new FocusOriginMonitor(ngZone, platform);
}
var FOCUS_ORIGIN_MONITOR_PROVIDER = {
    // If there is already a FocusOriginMonitor available, use that. Otherwise, provide a new one.
    provide: FocusOriginMonitor,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), FocusOriginMonitor], _angular_core.NgZone, Platform],
    useFactory: FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY
};
/**
 * Applies a CSS transform to an element, including browser-prefixed properties.
 * @param {?} element
 * @param {?} transformValue
 * @return {?}
 */
function applyCssTransform(element, transformValue) {
    // It's important to trim the result, because the browser will ignore the set operation
    // if the string contains only whitespace.
    var /** @type {?} */ value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}
var StyleModule = (function () {
    function StyleModule() {
    }
    return StyleModule;
}());
StyleModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [PlatformModule],
                declarations: [CdkMonitorFocus],
                exports: [CdkMonitorFocus],
                providers: [FOCUS_ORIGIN_MONITOR_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
StyleModule.ctorParameters = function () { return []; };
/**
 * \@docs-private
 */
var AnimationCurves = (function () {
    function AnimationCurves() {
    }
    return AnimationCurves;
}());
AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
/**
 * \@docs-private
 */
var AnimationDurations = (function () {
    function AnimationDurations() {
    }
    return AnimationDurations;
}());
AnimationDurations.COMPLEX = '375ms';
AnimationDurations.ENTERING = '225ms';
AnimationDurations.EXITING = '195ms';
/**
 * Coerces a data-bound value (typically a string) to a number.
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return isNaN(parseFloat(/** @type {?} */ (value))) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 */
var DateAdapter = (function () {
    function DateAdapter() {
    }
    /**
     * Gets the year component of the given date.
     * @abstract
     * @param {?} date The date to extract the year from.
     * @return {?} The year component.
     */
    DateAdapter.prototype.getYear = function (date) { };
    /**
     * Gets the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the month from.
     * @return {?} The month component (0-indexed, 0 = January).
     */
    DateAdapter.prototype.getMonth = function (date) { };
    /**
     * Gets the date of the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the date of the month from.
     * @return {?} The month component (1-indexed, 1 = first of month).
     */
    DateAdapter.prototype.getDate = function (date) { };
    /**
     * Gets the day of the week component of the given date.
     * @abstract
     * @param {?} date The date to extract the day of the week from.
     * @return {?} The month component (0-indexed, 0 = Sunday).
     */
    DateAdapter.prototype.getDayOfWeek = function (date) { };
    /**
     * Gets a list of names for the months.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @return {?} An ordered list of all month names, starting with January.
     */
    DateAdapter.prototype.getMonthNames = function (style$$1) { };
    /**
     * Gets a list of names for the dates of the month.
     * @abstract
     * @return {?} An ordered list of all date of the month names, starting with '1'.
     */
    DateAdapter.prototype.getDateNames = function () { };
    /**
     * Gets a list of names for the days of the week.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @return {?} An ordered list of all weekday names, starting with Sunday.
     */
    DateAdapter.prototype.getDayOfWeekNames = function (style$$1) { };
    /**
     * Gets the name for the year of the given date.
     * @abstract
     * @param {?} date The date to get the year name for.
     * @return {?} The name of the given year (e.g. '2017').
     */
    DateAdapter.prototype.getYearName = function (date) { };
    /**
     * Gets the first day of the week.
     * @abstract
     * @return {?} The first day of the week (0-indexed, 0 = Sunday).
     */
    DateAdapter.prototype.getFirstDayOfWeek = function () { };
    /**
     * Gets the number of days in the month of the given date.
     * @abstract
     * @param {?} date The date whose month should be checked.
     * @return {?} The number of days in the month of the given date.
     */
    DateAdapter.prototype.getNumDaysInMonth = function (date) { };
    /**
     * Clones the given date.
     * @abstract
     * @param {?} date The date to clone
     * @return {?} A new date equal to the given date.
     */
    DateAdapter.prototype.clone = function (date) { };
    /**
     * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
     * month and date.
     * @abstract
     * @param {?} year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param {?} month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param {?} date The date of month of the date. Must be an integer 1 - length of the given month.
     * @return {?} The new date, or null if invalid.
     */
    DateAdapter.prototype.createDate = function (year, month, date) { };
    /**
     * Gets today's date.
     * @abstract
     * @return {?} Today's date.
     */
    DateAdapter.prototype.today = function () { };
    /**
     * Parses a date from a value.
     * @abstract
     * @param {?} value The value to parse.
     * @param {?} parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @return {?} The parsed date, or null if date could not be parsed.
     */
    DateAdapter.prototype.parse = function (value, parseFormat) { };
    /**
     * Formats a date as a string.
     * @abstract
     * @param {?} date The value to parse.
     * @param {?} displayFormat The format to use to display the date as a string.
     * @return {?} The parsed date, or null if date could not be parsed.
     */
    DateAdapter.prototype.format = function (date, displayFormat) { };
    /**
     * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
     * calendar for each year and then finding the closest date in the new month. For example when
     * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add years to.
     * @param {?} years The number of years to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of years added.
     */
    DateAdapter.prototype.addCalendarYears = function (date, years) { };
    /**
     * Adds the given number of months to the date. Months are counted as if flipping a page on the
     * calendar for each month and then finding the closest date in the new month. For example when
     * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add months to.
     * @param {?} months The number of months to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of months added.
     */
    DateAdapter.prototype.addCalendarMonths = function (date, months) { };
    /**
     * Adds the given number of days to the date. Days are counted as if moving one cell on the
     * calendar for each day.
     * @abstract
     * @param {?} date The date to add days to.
     * @param {?} days The number of days to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of days added.
     */
    DateAdapter.prototype.addCalendarDays = function (date, days) { };
    /**
     * Gets the RFC 3339 compatible date string (https://tools.ietf.org/html/rfc3339)  for the given
     * date.
     * @abstract
     * @param {?} date The date to get the ISO date string for.
     * @return {?} The ISO date string date string.
     */
    DateAdapter.prototype.getISODateString = function (date) { };
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    DateAdapter.prototype.setLocale = function (locale) {
        this.locale = locale;
    };
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    DateAdapter.prototype.compareDate = function (first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    };
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     *     Null dates are considered equal to other null dates.
     * @return {?}
     */
    DateAdapter.prototype.sameDate = function (first, second) {
        return first && second ? !this.compareDate(first, second) : first == second;
    };
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    DateAdapter.prototype.clampDate = function (date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateAdapter;
}());
/**
 * Whether the browser supports the Intl API.
 */
var SUPPORTS_INTL_API = typeof Intl != 'undefined';
/**
 * The default month names to use if Intl API is not available.
 */
var DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
/**
 * The default date names to use if Intl API is not available.
 */
var DEFAULT_DATE_NAMES = range(31, function (i) { return String(i + 1); });
/**
 * The default day of the week names to use if Intl API is not available.
 */
var DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    return Array.apply(null, Array(length)).map(function (v, i) { return valueFunction(i); });
}
/**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
var NativeDateAdapter = (function (_super) {
    __extends(NativeDateAdapter, _super);
    function NativeDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getYear = function (date) {
        return date.getFullYear();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getMonth = function (date) {
        return date.getMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getDate = function (date) {
        return date.getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getDayOfWeek = function (date) {
        return date.getDay();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateAdapter.prototype.getMonthNames = function (style$$1) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_1 = new Intl.DateTimeFormat(this.locale, { month: style$$1 });
            return range(12, function (i) { return _this._stripDirectionalityCharacters(dtf_1.format(new Date(2017, i, 1))); });
        }
        return DEFAULT_MONTH_NAMES[style$$1];
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.getDateNames = function () {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_2 = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
            return range(31, function (i) { return _this._stripDirectionalityCharacters(dtf_2.format(new Date(2017, 0, i + 1))); });
        }
        return DEFAULT_DATE_NAMES;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateAdapter.prototype.getDayOfWeekNames = function (style$$1) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_3 = new Intl.DateTimeFormat(this.locale, { weekday: style$$1 });
            return range(7, function (i) { return _this._stripDirectionalityCharacters(dtf_3.format(new Date(2017, 0, i + 1))); });
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style$$1];
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getYearName = function (date) {
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return String(this.getYear(date));
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.getFirstDayOfWeek = function () {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getNumDaysInMonth = function (date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.clone = function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.createDate = function (year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11 || date < 1) {
            return null;
        }
        var /** @type {?} */ result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to
        // overflow.
        if (result.getMonth() != month) {
            return null;
        }
        return result;
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.today = function () {
        return new Date();
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    NativeDateAdapter.prototype.parse = function (value, parseFormat) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        var /** @type {?} */ timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    NativeDateAdapter.prototype.format = function (date, displayFormat) {
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarYears = function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarMonths = function (date, months) {
        var /** @type {?} */ newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarDays = function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getISODateString = function (date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    };
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype._createDateWithOverflow = function (year, month, date) {
        var /** @type {?} */ result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    NativeDateAdapter.prototype._2digit = function (n) {
        return ('00' + n).slice(-2);
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    NativeDateAdapter.prototype._stripDirectionalityCharacters = function (s) {
        return s.replace(/[\u200e\u200f]/g, '');
    };
    return NativeDateAdapter;
}(DateAdapter));
var MD_DATE_FORMATS = new _angular_core.InjectionToken('md-date-formats');
var MD_NATIVE_DATE_FORMATS = {
    parse: {
        dateInput: null,
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
var NativeDateModule = (function () {
    function NativeDateModule() {
    }
    return NativeDateModule;
}());
NativeDateModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
            },] },
];
/**
 * @nocollapse
 */
NativeDateModule.ctorParameters = function () { return []; };
var MdNativeDateModule = (function () {
    function MdNativeDateModule() {
    }
    return MdNativeDateModule;
}());
MdNativeDateModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [NativeDateModule],
                providers: [{ provide: MD_DATE_FORMATS, useValue: MD_NATIVE_DATE_FORMATS }],
            },] },
];
/**
 * @nocollapse
 */
MdNativeDateModule.ctorParameters = function () { return []; };
var MdCoreModule = (function () {
    function MdCoreModule() {
    }
    return MdCoreModule;
}());
MdCoreModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    MdLineModule,
                    RtlModule,
                    MdRippleModule,
                    ObserveContentModule,
                    PortalModule,
                    OverlayModule,
                    A11yModule,
                    MdOptionModule,
                    MdSelectionModule,
                ],
                exports: [
                    MdLineModule,
                    RtlModule,
                    MdRippleModule,
                    ObserveContentModule,
                    PortalModule,
                    OverlayModule,
                    A11yModule,
                    MdOptionModule,
                    MdSelectionModule,
                ],
            },] },
];
/**
 * @nocollapse
 */
MdCoreModule.ctorParameters = function () { return []; };
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
var ListKeyManager = (function () {
    /**
     * @param {?} _items
     */
    function ListKeyManager(_items) {
        this._items = _items;
        this._activeItemIndex = null;
        this._tabOut = new rxjs_Subject.Subject();
        this._wrap = false;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @return {?} The ListKeyManager that the method was called on.
     */
    ListKeyManager.prototype.withWrap = function () {
        this._wrap = true;
        return this;
    };
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param {?} index The index of the item to be set as active.
     * @return {?}
     */
    ListKeyManager.prototype.setActiveItem = function (index) {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    };
    /**
     * Sets the active item depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    ListKeyManager.prototype.onKeydown = function (event) {
        switch (event.keyCode) {
            case DOWN_ARROW:
                this.setNextItemActive();
                break;
            case UP_ARROW:
                this.setPreviousItemActive();
                break;
            case HOME:
                this.setFirstItemActive();
                break;
            case END:
                this.setLastItemActive();
                break;
            case TAB:
                // Note that we shouldn't prevent the default action on tab.
                this._tabOut.next(null);
                return;
            default:
                return;
        }
        event.preventDefault();
    };
    Object.defineProperty(ListKeyManager.prototype, "activeItemIndex", {
        /**
         * Returns the index of the currently active item.
         * @return {?}
         */
        get: function () {
            return this._activeItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListKeyManager.prototype, "activeItem", {
        /**
         * Returns the currently active item.
         * @return {?}
         */
        get: function () {
            return this._activeItem;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the active item to the first enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setFirstItemActive = function () {
        this._setActiveItemByIndex(0, 1);
    };
    /**
     * Sets the active item to the last enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setLastItemActive = function () {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    };
    /**
     * Sets the active item to the next enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setNextItemActive = function () {
        this._activeItemIndex === null ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    };
    /**
     * Sets the active item to a previous enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setPreviousItemActive = function () {
        this._activeItemIndex === null && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    };
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param {?} index The new activeItemIndex.
     * @return {?}
     */
    ListKeyManager.prototype.updateActiveItemIndex = function (index) {
        this._activeItemIndex = index;
    };
    Object.defineProperty(ListKeyManager.prototype, "tabOut", {
        /**
         * Observable that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         * @return {?}
         */
        get: function () {
            return this._tabOut.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @param {?} delta
     * @param {?=} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveItemByDelta = function (delta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        this._wrap ? this._setActiveInWrapMode(delta, items)
            : this._setActiveInDefaultMode(delta, items);
    };
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveInWrapMode = function (delta, items) {
        // when active item would leave menu, wrap to beginning or end
        this._activeItemIndex =
            (this._activeItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an enabled one is reached
        if (items[this._activeItemIndex].disabled) {
            this._setActiveInWrapMode(delta, items);
        }
        else {
            this.setActiveItem(this._activeItemIndex);
        }
    };
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveInDefaultMode = function (delta, items) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta, items);
    };
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @param {?} index
     * @param {?} fallbackDelta
     * @param {?=} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveItemByIndex = function (index, fallbackDelta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        if (!items[index]) {
            return;
        }
        while (items[index].disabled) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    };
    return ListKeyManager;
}());
var ActiveDescendantKeyManager = (function (_super) {
    __extends(ActiveDescendantKeyManager, _super);
    function ActiveDescendantKeyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     * @param {?} index
     * @return {?}
     */
    ActiveDescendantKeyManager.prototype.setActiveItem = function (index) {
        var _this = this;
        Promise.resolve().then(function () {
            if (_this.activeItem) {
                _this.activeItem.setInactiveStyles();
            }
            _super.prototype.setActiveItem.call(_this, index);
            if (_this.activeItem) {
                _this.activeItem.setActiveStyles();
            }
        });
    };
    return ActiveDescendantKeyManager;
}(ListKeyManager));
/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueAutocompleteIdCounter = 0;
var MdAutocomplete = (function () {
    /**
     * @param {?} _changeDetectorRef
     */
    function MdAutocomplete(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Whether the autocomplete panel displays above or below its trigger.
         */
        this.positionY = 'below';
        /**
         * Whether the autocomplete panel should be visible, depending on option length.
         */
        this.showPanel = false;
        /**
         * Unique ID to be used by autocomplete trigger's "aria-owns" property.
         */
        this.id = "md-autocomplete-" + _uniqueAutocompleteIdCounter++;
    }
    /**
     * @return {?}
     */
    MdAutocomplete.prototype.ngAfterContentInit = function () {
        this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap();
    };
    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display
     * options below the fold, as they are not actually being focused when active.
     * @param {?} scrollTop
     * @return {?}
     */
    MdAutocomplete.prototype._setScrollTop = function (scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    };
    /**
     * Panel should hide itself when the option list is empty.
     * @return {?}
     */
    MdAutocomplete.prototype._setVisibility = function () {
        var _this = this;
        Promise.resolve().then(function () {
            _this.showPanel = !!_this.options.length;
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * Sets a class on the panel based on its position (used to set y-offset).
     * @return {?}
     */
    MdAutocomplete.prototype._getClassList = function () {
        return {
            'mat-autocomplete-panel-below': this.positionY === 'below',
            'mat-autocomplete-panel-above': this.positionY === 'above',
            'mat-autocomplete-visible': this.showPanel,
            'mat-autocomplete-hidden': !this.showPanel
        };
    };
    return MdAutocomplete;
}());
MdAutocomplete.decorators = [
    { type: _angular_core.Component, args: [{ selector: 'md-autocomplete, mat-autocomplete',
                template: "<ng-template> <div class=\"mat-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"_getClassList()\" #panel> <ng-content></ng-content> </div> </ng-template> ",
                styles: [".mat-autocomplete-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative}.mat-autocomplete-panel.mat-autocomplete-panel-below{top:6px}.mat-autocomplete-panel.mat-autocomplete-panel-above{top:-24px}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden} /*# sourceMappingURL=autocomplete.css.map */ "],
                encapsulation: _angular_core.ViewEncapsulation.None,
                exportAs: 'mdAutocomplete',
                host: {
                    '[class.mat-autocomplete]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdAutocomplete.ctorParameters = function () { return [
    { type: _angular_core.ChangeDetectorRef, },
]; };
MdAutocomplete.propDecorators = {
    'template': [{ type: _angular_core.ViewChild, args: [_angular_core.TemplateRef,] },],
    'panel': [{ type: _angular_core.ViewChild, args: ['panel',] },],
    'options': [{ type: _angular_core.ContentChildren, args: [MdOption,] },],
    'displayWith': [{ type: _angular_core.Input },],
};
/**
 * \@docs-private
 */
var MdInputContainerPlaceholderConflictError = (function (_super) {
    __extends(MdInputContainerPlaceholderConflictError, _super);
    function MdInputContainerPlaceholderConflictError() {
        return _super.call(this, 'Placeholder attribute and child element were both specified.') || this;
    }
    return MdInputContainerPlaceholderConflictError;
}(MdError));
/**
 * \@docs-private
 */
var MdInputContainerUnsupportedTypeError = (function (_super) {
    __extends(MdInputContainerUnsupportedTypeError, _super);
    /**
     * @param {?} type
     */
    function MdInputContainerUnsupportedTypeError(type) {
        return _super.call(this, "Input type \"" + type + "\" isn't supported by md-input-container.") || this;
    }
    return MdInputContainerUnsupportedTypeError;
}(MdError));
/**
 * \@docs-private
 */
var MdInputContainerDuplicatedHintError = (function (_super) {
    __extends(MdInputContainerDuplicatedHintError, _super);
    /**
     * @param {?} align
     */
    function MdInputContainerDuplicatedHintError(align) {
        return _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.") || this;
    }
    return MdInputContainerDuplicatedHintError;
}(MdError));
/**
 * \@docs-private
 */
var MdInputContainerMissingMdInputError = (function (_super) {
    __extends(MdInputContainerMissingMdInputError, _super);
    function MdInputContainerMissingMdInputError() {
        return _super.call(this, 'md-input-container must contain an mdInput directive. Did you forget to add mdInput ' +
            'to the native input or textarea element?') || this;
    }
    return MdInputContainerMissingMdInputError;
}(MdError));
// Invalid input type. Using one of these will throw an MdInputContainerUnsupportedTypeError.
var MD_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
var nextUniqueId$1 = 0;
/**
 * The placeholder directive. The content can declare this to implement more
 * complex placeholders.
 */
var MdPlaceholder = (function () {
    function MdPlaceholder() {
    }
    return MdPlaceholder;
}());
MdPlaceholder.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'md-placeholder, mat-placeholder'
            },] },
];
/**
 * @nocollapse
 */
MdPlaceholder.ctorParameters = function () { return []; };
/**
 * Hint text to be shown underneath the input.
 */
var MdHint = (function () {
    function MdHint() {
        // Whether to align the hint label at the start or end of the line.
        this.align = 'start';
        // Unique ID for the hint. Used for the aria-describedby on the input.
        this.id = "md-input-hint-" + nextUniqueId$1++;
    }
    return MdHint;
}());
MdHint.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'md-hint, mat-hint',
                host: {
                    '[class.mat-hint]': 'true',
                    '[class.mat-right]': 'align == "end"',
                    '[attr.id]': 'id',
                }
            },] },
];
/**
 * @nocollapse
 */
MdHint.ctorParameters = function () { return []; };
MdHint.propDecorators = {
    'align': [{ type: _angular_core.Input },],
    'id': [{ type: _angular_core.Input },],
};
/**
 * Single error message to be shown underneath the input.
 */
var MdErrorDirective = (function () {
    function MdErrorDirective() {
    }
    return MdErrorDirective;
}());
MdErrorDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'md-error, mat-error',
                host: {
                    '[class.mat-input-error]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdErrorDirective.ctorParameters = function () { return []; };
/**
 * Prefix to be placed the the front of the input.
 */
var MdPrefix = (function () {
    function MdPrefix() {
    }
    return MdPrefix;
}());
MdPrefix.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[mdPrefix], [matPrefix], [md-prefix]'
            },] },
];
/**
 * @nocollapse
 */
MdPrefix.ctorParameters = function () { return []; };
/**
 * Suffix to be placed at the end of the input.
 */
var MdSuffix = (function () {
    function MdSuffix() {
    }
    return MdSuffix;
}());
MdSuffix.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[mdSuffix], [matSuffix], [md-suffix]'
            },] },
];
/**
 * @nocollapse
 */
MdSuffix.ctorParameters = function () { return []; };
/**
 * Marker for the input element that `MdInputContainer` is wrapping.
 */
var MdInputDirective = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _ngControl
     */
    function MdInputDirective(_elementRef, _renderer, _ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngControl = _ngControl;
        /**
         * Variables used as cache for getters and setters.
         */
        this._type = 'text';
        this._placeholder = '';
        this._disabled = false;
        this._required = false;
        /**
         * Whether the element is focused or not.
         */
        this.focused = false;
        /**
         * Emits an event when the placeholder changes so that the `md-input-container` can re-validate.
         */
        this._placeholderChange = new _angular_core.EventEmitter();
        this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(function (t) { return getSupportedInputTypes().has(t); });
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    Object.defineProperty(MdInputDirective.prototype, "disabled", {
        /**
         * Whether the element is disabled.
         * @return {?}
         */
        get: function () {
            return this._ngControl ? this._ngControl.disabled : this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "id", {
        /**
         * Unique id of the element.
         * @return {?}
         */
        get: function () { return this._id; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._id = value || this._uid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "placeholder", {
        /**
         * Placeholder attribute of the element.
         * @return {?}
         */
        get: function () { return this._placeholder; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._placeholder !== value) {
                this._placeholder = value;
                this._placeholderChange.emit(this._placeholder);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "required", {
        /**
         * Whether the element is required.
         * @return {?}
         */
        get: function () { return this._required; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "type", {
        /**
         * Input type of the element.
         * @return {?}
         */
        get: function () { return this._type; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._type = value || 'text';
            this._validateType();
            // When using Angular inputs, developers are no longer able to set the properties on the native
            // input element. To ensure that bindings for `type` work, we need to sync the setter
            // with the native property. Textarea elements don't support the type property or attribute.
            if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
                this._renderer.setProperty(this._elementRef.nativeElement, 'type', this._type);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "value", {
        /**
         * The input element's value.
         * @return {?}
         */
        get: function () { return this._elementRef.nativeElement.value; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._elementRef.nativeElement.value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "empty", {
        /**
         * @return {?}
         */
        get: function () {
            return !this._isNeverEmpty() &&
                (this.value == null || this.value === '') &&
                // Check if the input contains bad input. If so, we know that it only appears empty because
                // the value failed to parse. From the user's perspective it is not empty.
                // TODO(mmalerba): Add e2e test for bad input case.
                !this._isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputDirective.prototype, "_uid", {
        /**
         * @return {?}
         */
        get: function () { return this._cachedUid = this._cachedUid || "md-input-" + nextUniqueId$1++; },
        enumerable: true,
        configurable: true
    });
    /**
     * Focuses the input element.
     * @return {?}
     */
    MdInputDirective.prototype.focus = function () { this._elementRef.nativeElement.focus(); };
    /**
     * @return {?}
     */
    MdInputDirective.prototype._onFocus = function () { this.focused = true; };
    /**
     * @return {?}
     */
    MdInputDirective.prototype._onBlur = function () { this.focused = false; };
    /**
     * @return {?}
     */
    MdInputDirective.prototype._onInput = function () {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    };
    /**
     * Make sure the input is a supported type.
     * @return {?}
     */
    MdInputDirective.prototype._validateType = function () {
        if (MD_INPUT_INVALID_TYPES.indexOf(this._type) !== -1) {
            throw new MdInputContainerUnsupportedTypeError(this._type);
        }
    };
    /**
     * @return {?}
     */
    MdInputDirective.prototype._isNeverEmpty = function () { return this._neverEmptyInputTypes.indexOf(this._type) !== -1; };
    /**
     * @return {?}
     */
    MdInputDirective.prototype._isBadInput = function () {
        return ((this._elementRef.nativeElement)).validity.badInput;
    };
    /**
     * Determines if the component host is a textarea. If not recognizable it returns false.
     * @return {?}
     */
    MdInputDirective.prototype._isTextarea = function () {
        var /** @type {?} */ nativeElement = this._elementRef.nativeElement;
        return nativeElement ? nativeElement.nodeName.toLowerCase() === 'textarea' : false;
    };
    return MdInputDirective;
}());
MdInputDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: "input[mdInput], textarea[mdInput], input[matInput], textarea[matInput]",
                host: {
                    '[class.mat-input-element]': 'true',
                    // Native input properties that are overwritten by Angular inputs need to be synced with
                    // the native input element. Otherwise property bindings for those don't work.
                    '[id]': 'id',
                    '[placeholder]': 'placeholder',
                    '[disabled]': 'disabled',
                    '[required]': 'required',
                    '[attr.aria-describedby]': 'ariaDescribedby || null',
                    '(blur)': '_onBlur()',
                    '(focus)': '_onFocus()',
                    '(input)': '_onInput()',
                }
            },] },
];
/**
 * @nocollapse
 */
MdInputDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: _angular_core.Renderer2, },
    { type: _angular_forms.NgControl, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self },] },
]; };
MdInputDirective.propDecorators = {
    'disabled': [{ type: _angular_core.Input },],
    'id': [{ type: _angular_core.Input },],
    'placeholder': [{ type: _angular_core.Input },],
    'required': [{ type: _angular_core.Input },],
    'type': [{ type: _angular_core.Input },],
    '_placeholderChange': [{ type: _angular_core.Output },],
};
/**
 * Container for text inputs that applies Material Design styling and behavior.
 */
var MdInputContainer = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     * @param {?} _parentForm
     * @param {?} _parentFormGroup
     */
    function MdInputContainer(_elementRef, _changeDetectorRef, _parentForm, _parentFormGroup) {
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        /**
         * Alignment of the input container's content.
         */
        this.align = 'start';
        /**
         * Color of the input divider, based on the theme.
         */
        this.color = 'primary';
        /**
         * State of the md-hint and md-error animations.
         */
        this._subscriptAnimationState = '';
        this._hintLabel = '';
        // Unique id for the hint label.
        this._hintLabelId = "md-input-hint-" + nextUniqueId$1++;
        this._floatPlaceholder = 'auto';
    }
    Object.defineProperty(MdInputContainer.prototype, "dividerColor", {
        /**
         * @deprecated Use color instead.
         * @return {?}
         */
        get: function () { return this.color; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this.color = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputContainer.prototype, "hideRequiredMarker", {
        /**
         * Whether we should hide the required marker.
         * @return {?}
         */
        get: function () { return this._hideRequiredMarker; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._hideRequiredMarker = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputContainer.prototype, "_shouldAlwaysFloat", {
        /**
         * Whether the floating label should always float or not.
         * @return {?}
         */
        get: function () { return this._floatPlaceholder === 'always'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputContainer.prototype, "_canPlaceholderFloat", {
        /**
         * Whether the placeholder can float or not.
         * @return {?}
         */
        get: function () { return this._floatPlaceholder !== 'never'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputContainer.prototype, "hintLabel", {
        /**
         * Text for the input hint.
         * @return {?}
         */
        get: function () { return this._hintLabel; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._hintLabel = value;
            this._processHints();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdInputContainer.prototype, "floatPlaceholder", {
        /**
         * Whether the placeholder should always float, never float or float as the user types.
         * @return {?}
         */
        get: function () { return this._floatPlaceholder; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._floatPlaceholder = value || 'auto';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MdInputContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this._mdInputChild) {
            throw new MdInputContainerMissingMdInputError();
        }
        this._processHints();
        this._validatePlaceholders();
        // Re-validate when things change.
        this._hintChildren.changes.subscribe(function () { return _this._processHints(); });
        this._mdInputChild._placeholderChange.subscribe(function () { return _this._validatePlaceholders(); });
    };
    /**
     * @return {?}
     */
    MdInputContainer.prototype.ngAfterViewInit = function () {
        // Avoid animations on load.
        this._subscriptAnimationState = 'enter';
        this._changeDetectorRef.detectChanges();
    };
    /**
     * Determines whether a class from the NgControl should be forwarded to the host element.
     * @param {?} prop
     * @return {?}
     */
    MdInputContainer.prototype._shouldForward = function (prop) {
        var /** @type {?} */ control = this._mdInputChild ? this._mdInputChild._ngControl : null;
        return control && ((control))[prop];
    };
    /**
     * Whether the input has a placeholder.
     * @return {?}
     */
    MdInputContainer.prototype._hasPlaceholder = function () { return !!(this._mdInputChild.placeholder || this._placeholderChild); };
    /**
     * Focuses the underlying input.
     * @return {?}
     */
    MdInputContainer.prototype._focusInput = function () { this._mdInputChild.focus(); };
    /**
     * Whether the input container is in an error state.
     * @return {?}
     */
    MdInputContainer.prototype._isErrorState = function () {
        var /** @type {?} */ control = this._mdInputChild._ngControl;
        var /** @type {?} */ isInvalid = control && control.invalid;
        var /** @type {?} */ isTouched = control && control.touched;
        var /** @type {?} */ isSubmitted = (this._parentFormGroup && this._parentFormGroup.submitted) ||
            (this._parentForm && this._parentForm.submitted);
        return !!(isInvalid && (isTouched || isSubmitted));
    };
    /**
     * Determines whether to display hints or errors.
     * @return {?}
     */
    MdInputContainer.prototype._getDisplayedMessages = function () {
        return (this._errorChildren.length > 0 && this._isErrorState()) ? 'error' : 'hint';
    };
    /**
     * Ensure that there is only one placeholder (either `input` attribute or child element with the
     * `md-placeholder` attribute.
     * @return {?}
     */
    MdInputContainer.prototype._validatePlaceholders = function () {
        if (this._mdInputChild.placeholder && this._placeholderChild) {
            throw new MdInputContainerPlaceholderConflictError();
        }
    };
    /**
     * Does any extra processing that is required when handling the hints.
     * @return {?}
     */
    MdInputContainer.prototype._processHints = function () {
        this._validateHints();
        this._syncAriaDescribedby();
    };
    /**
     * Ensure that there is a maximum of one of each `<md-hint>` alignment specified, with the
     * attribute being considered as `align="start"`.
     * @return {?}
     */
    MdInputContainer.prototype._validateHints = function () {
        var _this = this;
        if (this._hintChildren) {
            var /** @type {?} */ startHint_1 = null;
            var /** @type {?} */ endHint_1 = null;
            this._hintChildren.forEach(function (hint) {
                if (hint.align == 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw new MdInputContainerDuplicatedHintError('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint_1) {
                        throw new MdInputContainerDuplicatedHintError('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    /**
     * Sets the child input's `aria-describedby` to a space-separated list of the ids
     * of the currently-specified hints, as well as a generated id for the hint label.
     * @return {?}
     */
    MdInputContainer.prototype._syncAriaDescribedby = function () {
        var /** @type {?} */ ids = [];
        var /** @type {?} */ startHint = this._hintChildren ?
            this._hintChildren.find(function (hint) { return hint.align === 'start'; }) : null;
        var /** @type {?} */ endHint = this._hintChildren ?
            this._hintChildren.find(function (hint) { return hint.align === 'end'; }) : null;
        if (startHint) {
            ids.push(startHint.id);
        }
        else if (this._hintLabel) {
            ids.push(this._hintLabelId);
        }
        if (endHint) {
            ids.push(endHint.id);
        }
        this._mdInputChild.ariaDescribedby = ids.join(' ');
    };
    return MdInputContainer;
}());
MdInputContainer.decorators = [
    { type: _angular_core.Component, args: [{ selector: 'md-input-container, mat-input-container',
                template: "<div class=\"mat-input-wrapper\"> <div class=\"mat-input-table\"> <div class=\"mat-input-prefix\" *ngIf=\"_prefixChildren.length\"> <!-- TODO(andrewseguin): remove [md-prefix] --> <ng-content select=\"[mdPrefix], [matPrefix], [md-prefix]\"></ng-content> </div> <div class=\"mat-input-infix\" [class.mat-end]=\"align == 'end'\"> <ng-content selector=\"input, textarea\"></ng-content> <span class=\"mat-input-placeholder-wrapper\"> <label class=\"mat-input-placeholder\" [attr.for]=\"_mdInputChild.id\" [class.mat-empty]=\"_mdInputChild.empty && !_shouldAlwaysFloat\" [class.mat-float]=\"_canPlaceholderFloat\" [class.mat-accent]=\"color == 'accent'\" [class.mat-warn]=\"color == 'warn'\" *ngIf=\"_hasPlaceholder()\"> <ng-content select=\"md-placeholder, mat-placeholder\"></ng-content> {{_mdInputChild.placeholder}} <span class=\"mat-placeholder-required\" *ngIf=\"!hideRequiredMarker && _mdInputChild.required\">*</span> </label> </span> </div> <div class=\"mat-input-suffix\" *ngIf=\"_suffixChildren.length\"> <!-- TODO(andrewseguin): remove [md-suffix] --> <ng-content select=\"[mdSuffix], [matSuffix], [md-suffix]\"></ng-content> </div> </div> <div class=\"mat-input-underline\" #underline [class.mat-disabled]=\"_mdInputChild.disabled\"> <span class=\"mat-input-ripple\" [class.mat-accent]=\"color == 'accent'\" [class.mat-warn]=\"color == 'warn'\"></span> </div> <div class=\"mat-input-subscript-wrapper\" [ngSwitch]=\"_getDisplayedMessages()\"> <div *ngSwitchCase=\"'error'\" [@transitionMessages]=\"_subscriptAnimationState\"> <ng-content select=\"md-error, mat-error\"></ng-content> </div> <div class=\"mat-input-hint-wrapper\" *ngSwitchCase=\"'hint'\" [@transitionMessages]=\"_subscriptAnimationState\"> <div *ngIf=\"hintLabel\" [id]=\"_hintLabelId\" class=\"mat-hint\">{{hintLabel}}</div> <ng-content select=\"md-hint:not([align='end']), mat-hint:not([align='end'])\"></ng-content> <div class=\"mat-input-hint-spacer\"></div> <ng-content select=\"md-hint[align='end'], mat-hint[align='end']\"></ng-content> </div> </div> </div> ",
                styles: [".mat-input-container{display:inline-block;position:relative;font-family:Roboto,\"Helvetica Neue\",sans-serif;line-height:normal;text-align:left}[dir=rtl] .mat-input-container{text-align:right}.mat-input-container .mat-datepicker-toggle,.mat-input-container .mat-icon{width:1em;height:1em;font-size:100%;vertical-align:top}.mat-input-wrapper{margin:1em 0;padding-bottom:6px}.mat-input-table{display:inline-table;flex-flow:column;vertical-align:bottom;width:100%}.mat-input-table>*{display:table-cell}.mat-input-infix{position:relative}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;width:100%;vertical-align:bottom}.mat-end .mat-input-element{text-align:right}[dir=rtl] .mat-end .mat-input-element{text-align:left}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element:-webkit-autofill+.mat-input-placeholder-wrapper .mat-float{display:block;transform:translate3d(0,-1.35em,0) scale(.75);width:133.33333%;transition:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}.mat-input-placeholder{position:absolute;left:0;top:0;font-size:100%;pointer-events:none;z-index:1;padding-top:1em;width:100%;display:none;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:translate3d(0,0,0);transform-origin:bottom left;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1)}.mat-input-placeholder.mat-empty{display:block;cursor:text}.mat-focused .mat-input-placeholder.mat-float,.mat-input-placeholder.mat-float:not(.mat-empty){display:block;transform:translate3d(0,-1.35em,0) scale(.75);width:133.33333%}[dir=rtl] .mat-input-placeholder{transform-origin:bottom right;left:auto;right:0}.mat-input-placeholder:not(.mat-empty){transition:none}.mat-input-placeholder-wrapper{position:absolute;left:0;top:-1em;width:100%;padding-top:1em;overflow:hidden;pointer-events:none;transform:translate3d(0,0,0)}.mat-input-placeholder-wrapper::after{content:'';display:inline-table}.mat-input-underline{position:absolute;height:1px;width:100%;margin-top:4px;border-top-width:1px;border-top-style:solid}.mat-input-underline.mat-disabled{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-top:0;background-position:0}.mat-input-underline .mat-input-ripple{position:absolute;height:2px;z-index:1;top:-1px;width:100%;transform-origin:top;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-focused .mat-input-underline .mat-input-ripple{opacity:1}.mat-input-subscript-wrapper{position:absolute;font-size:75%;top:100%;width:100%;margin-top:-1.2em;line-height:1.2em;overflow:hidden}.mat-input-hint-wrapper{display:flex}.mat-input-hint-spacer{flex:1 0 10px}.mat-input-error{display:block}.mat-input-prefix,.mat-input-suffix{width:.1px;white-space:nowrap} /*# sourceMappingURL=input-container.css.map */ "],
                animations: [
                    _angular_animations.trigger('transitionMessages', [
                        _angular_animations.state('enter', _angular_animations.style({ opacity: 1, transform: 'translateY(0%)' })),
                        _angular_animations.transition('void => enter', [
                            _angular_animations.style({ opacity: 0, transform: 'translateY(-100%)' }),
                            _angular_animations.animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)')
                        ])
                    ])
                ],
                host: {
                    // Remove align attribute to prevent it from interfering with layout.
                    '[attr.align]': 'null',
                    '[class.mat-input-container]': 'true',
                    '[class.mat-input-invalid]': '_isErrorState()',
                    '[class.mat-focused]': '_mdInputChild.focused',
                    '[class.ng-untouched]': '_shouldForward("untouched")',
                    '[class.ng-touched]': '_shouldForward("touched")',
                    '[class.ng-pristine]': '_shouldForward("pristine")',
                    '[class.ng-dirty]': '_shouldForward("dirty")',
                    '[class.ng-valid]': '_shouldForward("valid")',
                    '[class.ng-invalid]': '_shouldForward("invalid")',
                    '[class.ng-pending]': '_shouldForward("pending")',
                    '(click)': '_focusInput()',
                },
                encapsulation: _angular_core.ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdInputContainer.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: _angular_core.ChangeDetectorRef, },
    { type: _angular_forms.NgForm, decorators: [{ type: _angular_core.Optional },] },
    { type: _angular_forms.FormGroupDirective, decorators: [{ type: _angular_core.Optional },] },
]; };
MdInputContainer.propDecorators = {
    'align': [{ type: _angular_core.Input },],
    'color': [{ type: _angular_core.Input },],
    'dividerColor': [{ type: _angular_core.Input },],
    'hideRequiredMarker': [{ type: _angular_core.Input },],
    'hintLabel': [{ type: _angular_core.Input },],
    'floatPlaceholder': [{ type: _angular_core.Input },],
    'underlineRef': [{ type: _angular_core.ViewChild, args: ['underline',] },],
    '_mdInputChild': [{ type: _angular_core.ContentChild, args: [MdInputDirective,] },],
    '_placeholderChild': [{ type: _angular_core.ContentChild, args: [MdPlaceholder,] },],
    '_errorChildren': [{ type: _angular_core.ContentChildren, args: [MdErrorDirective,] },],
    '_hintChildren': [{ type: _angular_core.ContentChildren, args: [MdHint,] },],
    '_prefixChildren': [{ type: _angular_core.ContentChildren, args: [MdPrefix,] },],
    '_suffixChildren': [{ type: _angular_core.ContentChildren, args: [MdSuffix,] },],
};
/**
 * The height of each autocomplete option.
 */
var AUTOCOMPLETE_OPTION_HEIGHT = 48;
/**
 * The total height of the autocomplete panel.
 */
var AUTOCOMPLETE_PANEL_HEIGHT = 256;
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 */
var MD_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MdAutocompleteTrigger; }),
    multi: true
};
var MdAutocompleteTrigger = (function () {
    /**
     * @param {?} _element
     * @param {?} _overlay
     * @param {?} _viewContainerRef
     * @param {?} _changeDetectorRef
     * @param {?} _scrollDispatcher
     * @param {?} _dir
     * @param {?} _zone
     * @param {?} _inputContainer
     * @param {?} _document
     */
    function MdAutocompleteTrigger(_element, _overlay, _viewContainerRef, _changeDetectorRef, _scrollDispatcher, _dir, _zone, _inputContainer, _document) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._dir = _dir;
        this._zone = _zone;
        this._inputContainer = _inputContainer;
        this._document = _document;
        this._panelOpen = false;
        /**
         * Whether or not the placeholder state is being overridden.
         */
        this._manuallyFloatingPlaceholder = false;
        /**
         * View -> model callback called when value changes
         */
        this._onChange = function (value) { };
        /**
         * View -> model callback called when autocomplete has been touched
         */
        this._onTouched = function () { };
    }
    Object.defineProperty(MdAutocompleteTrigger.prototype, "_matAutocomplete", {
        /**
         * Property with mat- prefix for no-conflict mode.
         * @return {?}
         */
        get: function () {
            return this.autocomplete;
        },
        /**
         * @param {?} autocomplete
         * @return {?}
         */
        set: function (autocomplete) {
            this.autocomplete = autocomplete;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MdAutocompleteTrigger.prototype.ngOnDestroy = function () {
        if (this._panelPositionSubscription) {
            this._panelPositionSubscription.unsubscribe();
        }
        this._destroyPanel();
    };
    Object.defineProperty(MdAutocompleteTrigger.prototype, "panelOpen", {
        /**
         * @return {?}
         */
        get: function () {
            return this._panelOpen && this.autocomplete.showPanel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens the autocomplete suggestion panel.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype.openPanel = function () {
        if (!this._overlayRef) {
            this._createOverlay();
        }
        else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.getState().width = this._getHostWidth();
            this._overlayRef.updateSize();
        }
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._subscribeToClosingActions();
        }
        this.autocomplete._setVisibility();
        this._floatPlaceholder();
        this._panelOpen = true;
    };
    /**
     * Closes the autocomplete suggestion panel.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype.closePanel = function () {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this._panelOpen = false;
        this._resetPlaceholder();
        // We need to trigger change detection manually, because
        // `fromEvent` doesn't seem to do it at the proper time.
        // This ensures that the placeholder is reset when the
        // user clicks outside.
        this._changeDetectorRef.detectChanges();
    };
    Object.defineProperty(MdAutocompleteTrigger.prototype, "panelClosingActions", {
        /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected, on blur, and when TAB is pressed.
         * @return {?}
         */
        get: function () {
            return rxjs_Observable.Observable.merge(this.optionSelections, this.autocomplete._keyManager.tabOut, this._outsideClickStream);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAutocompleteTrigger.prototype, "optionSelections", {
        /**
         * Stream of autocomplete option selections.
         * @return {?}
         */
        get: function () {
            return rxjs_Observable.Observable.merge.apply(rxjs_Observable.Observable, this.autocomplete.options.map(function (option) { return option.onSelectionChange; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAutocompleteTrigger.prototype, "activeOption", {
        /**
         * The currently active option, coerced to MdOption type.
         * @return {?}
         */
        get: function () {
            if (this.autocomplete._keyManager) {
                return (this.autocomplete._keyManager.activeItem);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAutocompleteTrigger.prototype, "_outsideClickStream", {
        /**
         * Stream of clicks outside of the autocomplete panel.
         * @return {?}
         */
        get: function () {
            var _this = this;
            if (this._document) {
                return rxjs_Observable.Observable.fromEvent(this._document, 'click').filter(function (event) {
                    var /** @type {?} */ clickTarget = (event.target);
                    return _this._panelOpen &&
                        !(_this._inputContainer ? _this._inputContainer._elementRef : _this._element).nativeElement.contains(clickTarget) &&
                        !_this._overlayRef.overlayElement.contains(clickTarget);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the autocomplete's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype.writeValue = function (value) {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._setTriggerValue(value); });
    };
    /**
     * Saves a callback function to be invoked when the autocomplete's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the autocomplete is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._handleKeydown = function (event) {
        var _this = this;
        if (this.activeOption && event.keyCode === ENTER) {
            this.activeOption._selectViaInteraction();
            event.preventDefault();
        }
        else {
            var /** @type {?} */ prevActiveItem_1 = this.autocomplete._keyManager.activeItem;
            var /** @type {?} */ isArrowKey_1 = event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW;
            this.autocomplete._keyManager.onKeydown(event);
            if (isArrowKey_1) {
                this.openPanel();
            }
            Promise.resolve().then(function () {
                if (isArrowKey_1 || _this.autocomplete._keyManager.activeItem !== prevActiveItem_1) {
                    _this._scrollToOption();
                }
            });
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._handleInput = function (event) {
        // We need to ensure that the input is focused, because IE will fire the `input`
        // event on focus/blur/load if the input has a placeholder. See:
        // https://connect.microsoft.com/IE/feedback/details/885747/
        if (document.activeElement === event.target) {
            this._onChange(((event.target)).value);
            this.openPanel();
        }
    };
    /**
     * In "auto" mode, the placeholder will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the placeholder until the panel can be closed.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._floatPlaceholder = function () {
        if (this._inputContainer && this._inputContainer.floatPlaceholder === 'auto') {
            this._inputContainer.floatPlaceholder = 'always';
            this._manuallyFloatingPlaceholder = true;
        }
    };
    /**
     * If the placeholder has been manually elevated, return it to its normal state.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._resetPlaceholder = function () {
        if (this._manuallyFloatingPlaceholder) {
            this._inputContainer.floatPlaceholder = 'auto';
            this._manuallyFloatingPlaceholder = false;
        }
    };
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. The new scrollTop will be that offset - the panel height + the option
     * height, so the active option will be just visible at the bottom of the panel.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._scrollToOption = function () {
        var /** @type {?} */ optionOffset = this.autocomplete._keyManager.activeItemIndex * AUTOCOMPLETE_OPTION_HEIGHT;
        var /** @type {?} */ newScrollTop = Math.max(0, optionOffset - AUTOCOMPLETE_PANEL_HEIGHT + AUTOCOMPLETE_OPTION_HEIGHT);
        this.autocomplete._setScrollTop(newScrollTop);
    };
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._subscribeToClosingActions = function () {
        var _this = this;
        // When the zone is stable initially, and when the option list changes...
        rxjs_Observable.Observable.merge(this._zone.onStable.first(), this.autocomplete.options.changes)
            .switchMap(function () {
            _this._resetPanel();
            return _this.panelClosingActions;
        })
            .first()
            .subscribe(function (event) { return _this._setValueAndClose(event); });
    };
    /**
     * Destroys the autocomplete suggestion panel.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._destroyPanel = function () {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._setTriggerValue = function (value) {
        var /** @type {?} */ toDisplay = this.autocomplete.displayWith ? this.autocomplete.displayWith(value) : value;
        this._element.nativeElement.value = toDisplay || '';
    };
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     * @param {?} event
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._setValueAndClose = function (event) {
        if (event && event.source) {
            this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source.value);
            this._onChange(event.source.value);
        }
        this.closePanel();
    };
    /**
     * Clear any previous selected option and emit a selection change event for this option
     * @param {?} skip
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._clearPreviousSelectedOption = function (skip) {
        this.autocomplete.options.forEach(function (option) {
            if (option != skip && option.selected) {
                option.deselect();
            }
        });
    };
    /**
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._createOverlay = function () {
        this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef);
        this._overlayRef = this._overlay.create(this._getOverlayConfig());
    };
    /**
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._getOverlayConfig = function () {
        var /** @type {?} */ overlayState = new OverlayState();
        overlayState.positionStrategy = this._getOverlayPosition();
        overlayState.width = this._getHostWidth();
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        overlayState.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
        return overlayState;
    };
    /**
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._getOverlayPosition = function () {
        this._positionStrategy = this._overlay.position().connectedTo(this._element, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
        this._subscribeToPositionChanges(this._positionStrategy);
        return this._positionStrategy;
    };
    /**
     * This method subscribes to position changes in the autocomplete panel, so the panel's
     * y-offset can be adjusted to match the new position.
     * @param {?} strategy
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._subscribeToPositionChanges = function (strategy) {
        var _this = this;
        this._panelPositionSubscription = strategy.onPositionChange.subscribe(function (change) {
            _this.autocomplete.positionY = change.connectionPair.originY === 'top' ? 'above' : 'below';
        });
    };
    /**
     * Returns the width of the input element, so the panel width can match it.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._getHostWidth = function () {
        return this._element.nativeElement.getBoundingClientRect().width;
    };
    /**
     * Reset active item to null so arrow events will activate the correct options.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._resetActiveItem = function () {
        this.autocomplete._keyManager.setActiveItem(null);
    };
    /**
     * Resets the active item and re-calculates alignment of the panel in case its size
     * has changed due to fewer or greater number of options.
     * @return {?}
     */
    MdAutocompleteTrigger.prototype._resetPanel = function () {
        this._resetActiveItem();
        this._positionStrategy.recalculateLastPosition();
        this.autocomplete._setVisibility();
    };
    return MdAutocompleteTrigger;
}());
MdAutocompleteTrigger.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'input[mdAutocomplete], input[matAutocomplete]',
                host: {
                    'role': 'combobox',
                    'autocomplete': 'off',
                    'aria-autocomplete': 'list',
                    'aria-multiline': 'false',
                    '[attr.aria-activedescendant]': 'activeOption?.id',
                    '[attr.aria-expanded]': 'panelOpen.toString()',
                    '[attr.aria-owns]': 'autocomplete?.id',
                    '(focus)': 'openPanel()',
                    '(input)': '_handleInput($event)',
                    '(blur)': '_onTouched()',
                    '(keydown)': '_handleKeydown($event)',
                },
                providers: [MD_AUTOCOMPLETE_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
MdAutocompleteTrigger.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: Overlay, },
    { type: _angular_core.ViewContainerRef, },
    { type: _angular_core.ChangeDetectorRef, },
    { type: ScrollDispatcher, },
    { type: Dir, decorators: [{ type: _angular_core.Optional },] },
    { type: _angular_core.NgZone, },
    { type: MdInputContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
    { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [_angular_platformBrowser.DOCUMENT,] },] },
]; };
MdAutocompleteTrigger.propDecorators = {
    'autocomplete': [{ type: _angular_core.Input, args: ['mdAutocomplete',] },],
    '_matAutocomplete': [{ type: _angular_core.Input, args: ['matAutocomplete',] },],
};
var MdAutocompleteModule = (function () {
    function MdAutocompleteModule() {
    }
    return MdAutocompleteModule;
}());
MdAutocompleteModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [MdOptionModule, OverlayModule, MdCommonModule, _angular_common.CommonModule],
                exports: [MdAutocomplete, MdOptionModule, MdAutocompleteTrigger, MdCommonModule],
                declarations: [MdAutocomplete, MdAutocompleteTrigger],
            },] },
];
/**
 * @nocollapse
 */
MdAutocompleteModule.ctorParameters = function () { return []; };
/**
 * Directive to automatically resize a textarea to fit its content.
 */
var MdTextareaAutosize = (function () {
    /**
     * @param {?} _elementRef
     */
    function MdTextareaAutosize(_elementRef) {
        this._elementRef = _elementRef;
    }
    Object.defineProperty(MdTextareaAutosize.prototype, "minRows", {
        /**
         * @deprecated Use mdAutosizeMinRows
         * @return {?}
         */
        get: function () { return this._minRows; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._minRows = value;
            this._setMinHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTextareaAutosize.prototype, "maxRows", {
        /**
         * @deprecated Use mdAutosizeMaxRows
         * @return {?}
         */
        get: function () { return this._maxRows; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._maxRows = value;
            this._setMaxHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTextareaAutosize.prototype, "mdAutosizeMinRows", {
        /**
         * Minimum number of rows for this textarea.
         * @return {?}
         */
        get: function () { return this.minRows; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this.minRows = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTextareaAutosize.prototype, "mdAutosizeMaxRows", {
        /**
         * Maximum number of rows for this textarea.
         * @return {?}
         */
        get: function () { return this.maxRows; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this.maxRows = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the minimum height of the textarea as determined by minRows.
     * @return {?}
     */
    MdTextareaAutosize.prototype._setMinHeight = function () {
        var /** @type {?} */ minHeight = this.minRows && this._cachedLineHeight ?
            this.minRows * this._cachedLineHeight + "px" : null;
        if (minHeight) {
            this._setTextareaStyle('minHeight', minHeight);
        }
    };
    /**
     * Sets the maximum height of the textarea as determined by maxRows.
     * @return {?}
     */
    MdTextareaAutosize.prototype._setMaxHeight = function () {
        var /** @type {?} */ maxHeight = this.maxRows && this._cachedLineHeight ?
            this.maxRows * this._cachedLineHeight + "px" : null;
        if (maxHeight) {
            this._setTextareaStyle('maxHeight', maxHeight);
        }
    };
    /**
     * @return {?}
     */
    MdTextareaAutosize.prototype.ngAfterViewInit = function () {
        this._cacheTextareaLineHeight();
        this.resizeToFitContent();
    };
    /**
     * Sets a style property on the textarea element.
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    MdTextareaAutosize.prototype._setTextareaStyle = function (property, value) {
        var /** @type {?} */ textarea = (this._elementRef.nativeElement);
        textarea.style[property] = value;
    };
    /**
     * Cache the height of a single-row textarea.
     *
     * We need to know how large a single "row" of a textarea is in order to apply minRows and
     * maxRows. For the initial version, we will assume that the height of a single line in the
     * textarea does not ever change.
     * @return {?}
     */
    MdTextareaAutosize.prototype._cacheTextareaLineHeight = function () {
        var /** @type {?} */ textarea = (this._elementRef.nativeElement);
        // Use a clone element because we have to override some styles.
        var /** @type {?} */ textareaClone = (textarea.cloneNode(false));
        textareaClone.rows = 1;
        // Use `position: absolute` so that this doesn't cause a browser layout and use
        // `visibility: hidden` so that nothing is rendered. Clear any other styles that
        // would affect the height.
        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '0';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        textarea.parentNode.appendChild(textareaClone);
        this._cachedLineHeight = textareaClone.clientHeight;
        textarea.parentNode.removeChild(textareaClone);
        // Min and max heights have to be re-calculated if the cached line height changes
        this._setMinHeight();
        this._setMaxHeight();
    };
    /**
     * Resize the textarea to fit its content.
     * @return {?}
     */
    MdTextareaAutosize.prototype.resizeToFitContent = function () {
        var /** @type {?} */ textarea = (this._elementRef.nativeElement);
        // Reset the textarea height to auto in order to shrink back to its default size.
        textarea.style.height = 'auto';
        // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
        textarea.style.height = textarea.scrollHeight + "px";
    };
    return MdTextareaAutosize;
}());
MdTextareaAutosize.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'textarea[md-autosize], textarea[mdTextareaAutosize],' +
                    'textarea[mat-autosize], textarea[matTextareaAutosize]',
                exportAs: 'mdTextareaAutosize',
                host: {
                    '(input)': 'resizeToFitContent()',
                },
            },] },
];
/**
 * @nocollapse
 */
MdTextareaAutosize.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
MdTextareaAutosize.propDecorators = {
    'minRows': [{ type: _angular_core.Input },],
    'maxRows': [{ type: _angular_core.Input },],
    'mdAutosizeMinRows': [{ type: _angular_core.Input },],
    'mdAutosizeMaxRows': [{ type: _angular_core.Input },],
};
var MdInputModule = (function () {
    function MdInputModule() {
    }
    return MdInputModule;
}());
MdInputModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                declarations: [
                    MdErrorDirective,
                    MdHint,
                    MdInputContainer,
                    MdInputDirective,
                    MdPlaceholder,
                    MdPrefix,
                    MdSuffix,
                    MdTextareaAutosize,
                ],
                imports: [
                    _angular_common.CommonModule,
                    _angular_forms.FormsModule,
                    PlatformModule,
                ],
                exports: [
                    MdErrorDirective,
                    MdHint,
                    MdInputContainer,
                    MdInputDirective,
                    MdPlaceholder,
                    MdPrefix,
                    MdSuffix,
                    MdTextareaAutosize,
                ],
            },] },
];
/**
 * @nocollapse
 */
MdInputModule.ctorParameters = function () { return []; };
/**
 * Mixin to augment a directive with a `disabled` property.
 * @template T
 * @param {?} base
 * @return {?}
 */
function mixinDisabled(base) {
    return (function (_super) {
        __extends(class_1, _super);
        /**
         * @param {...?} args
         */
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._disabled = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disabled", {
            /**
             * @return {?}
             */
            get: function () { return this._disabled; },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) { this._disabled = coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}
/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
var MIN_AUTO_TICK_SEPARATION = 30;
/**
 * The thumb gap size for a disabled slider.
 */
var DISABLED_THUMB_GAP = 7;
/**
 * The thumb gap size for a non-active slider at its minimum value.
 */
var MIN_VALUE_NONACTIVE_THUMB_GAP = 7;
/**
 * The thumb gap size for an active slider at its minimum value.
 */
var MIN_VALUE_ACTIVE_THUMB_GAP = 10;
/**
 * Provider Expression that allows md-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 */
var MD_SLIDER_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MdSlider; }),
    multi: true
};
/**
 * A simple change event emitted by the MdSlider component.
 */
var MdSliderChange = (function () {
    function MdSliderChange() {
    }
    return MdSliderChange;
}());
var MdSliderBase = (function () {
    function MdSliderBase() {
    }
    return MdSliderBase;
}());
var _MdSliderMixinBase = mixinDisabled(MdSliderBase);
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
var MdSlider = (function (_super) {
    __extends(MdSlider, _super);
    /**
     * @param {?} renderer
     * @param {?} _elementRef
     * @param {?} _focusOriginMonitor
     * @param {?} _dir
     */
    function MdSlider(renderer, _elementRef, _focusOriginMonitor, _dir) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusOriginMonitor = _focusOriginMonitor;
        _this._dir = _dir;
        _this._invert = false;
        _this._max = 100;
        _this._min = 0;
        _this._step = 1;
        _this._thumbLabel = false;
        _this._tickInterval = 0;
        _this._value = null;
        _this._vertical = false;
        _this.color = 'accent';
        /**
         * Event emitted when the slider value has changed.
         */
        _this.change = new _angular_core.EventEmitter();
        /**
         * Event emitted when the slider thumb moves.
         */
        _this.input = new _angular_core.EventEmitter();
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        _this.onTouched = function () { };
        _this._percent = 0;
        /**
         * Whether or not the thumb is sliding.
         * Used to determine if there should be a transition for the thumb and fill track.
         */
        _this._isSliding = false;
        /**
         * Whether or not the slider is active (clicked or sliding).
         * Used to shrink and grow the thumb as according to the Material Design spec.
         */
        _this._isActive = false;
        /**
         * The size of a tick interval as a percentage of the size of the track.
         */
        _this._tickIntervalPercent = 0;
        /**
         * A renderer to handle updating the slider's thumb and fill track.
         */
        _this._renderer = null;
        /**
         * The dimensions of the slider.
         */
        _this._sliderDimensions = null;
        _this._controlValueAccessorChangeFn = function () { };
        /**
         * The last value for which a change event was emitted.
         */
        _this._lastChangeValue = null;
        /**
         * The last value for which an input event was emitted.
         */
        _this._lastInputValue = null;
        _this._focusOriginMonitor.monitor(_this._elementRef.nativeElement, renderer, true)
            .subscribe(function (origin) { return _this._isActive = !!origin && origin !== 'keyboard'; });
        _this._renderer = new SliderRenderer(_this._elementRef);
        return _this;
    }
    Object.defineProperty(MdSlider.prototype, "invert", {
        /**
         * Whether the slider is inverted.
         * @return {?}
         */
        get: function () { return this._invert; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._invert = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "max", {
        /**
         * The maximum value that the slider can have.
         * @return {?}
         */
        get: function () {
            return this._max;
        },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            this._max = coerceNumberProperty(v, this._max);
            this._percent = this._calculatePercentage(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "min", {
        /**
         * The minimum value that the slider can have.
         * @return {?}
         */
        get: function () {
            return this._min;
        },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            this._min = coerceNumberProperty(v, this._min);
            // If the value wasn't explicitly set by the user, set it to the min.
            if (this._value === null) {
                this.value = this._min;
            }
            this._percent = this._calculatePercentage(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "step", {
        /**
         * The values at which the thumb will snap.
         * @return {?}
         */
        get: function () { return this._step; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            this._step = coerceNumberProperty(v, this._step);
            if (this._step % 1 !== 0) {
                this._roundLabelTo = this._step.toString().split('.').pop().length;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "thumbLabel", {
        /**
         * Whether or not to show the thumb label.
         * @return {?}
         */
        get: function () { return this._thumbLabel; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._thumbLabel = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_thumbLabelDeprecated", {
        /**
         * @deprecated
         * @return {?}
         */
        get: function () { return this._thumbLabel; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._thumbLabel = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "tickInterval", {
        /**
         * How often to show ticks. Relative to the step so that a tick always appears on a step.
         * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
         * @return {?}
         */
        get: function () { return this._tickInterval; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value === 'auto') {
                this._tickInterval = 'auto';
            }
            else if (typeof value === 'number' || typeof value === 'string') {
                this._tickInterval = coerceNumberProperty(value, /** @type {?} */ (this._tickInterval));
            }
            else {
                this._tickInterval = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_tickIntervalDeprecated", {
        /**
         * @deprecated
         * @return {?}
         */
        get: function () { return this.tickInterval; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.tickInterval = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "value", {
        /**
         * Value of the slider.
         * @return {?}
         */
        get: function () {
            // If the value needs to be read and it is still uninitialized, initialize it to the min.
            if (this._value === null) {
                this.value = this._min;
            }
            return this._value;
        },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            this._value = coerceNumberProperty(v, this._value);
            this._percent = this._calculatePercentage(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "vertical", {
        /**
         * Whether the slider is vertical.
         * @return {?}
         */
        get: function () { return this._vertical; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._vertical = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "displayValue", {
        /**
         * The value to be used for display purposes.
         * @return {?}
         */
        get: function () {
            // Note that this could be improved further by rounding something like 0.999 to 1 or
            // 0.899 to 0.9, however it is very performance sensitive, because it gets called on
            // every change detection cycle.
            if (this._roundLabelTo && this.value % 1 !== 0) {
                return this.value.toFixed(this._roundLabelTo);
            }
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "percent", {
        /**
         * The percentage of the slider that coincides with the value.
         * @return {?}
         */
        get: function () { return this._clamp(this._percent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_invertAxis", {
        /**
         * Whether the axis of the slider is inverted.
         * (i.e. whether moving the thumb in the positive x or y direction decreases the slider's value).
         * @return {?}
         */
        get: function () {
            // Standard non-inverted mode for a vertical slider should be dragging the thumb from bottom to
            // top. However from a y-axis standpoint this is inverted.
            return this.vertical ? !this.invert : this.invert;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_isMinValue", {
        /**
         * Whether the slider is at its minimum value.
         * @return {?}
         */
        get: function () {
            return this.percent === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_thumbGap", {
        /**
         * The amount of space to leave between the slider thumb and the track fill & track background
         * elements.
         * @return {?}
         */
        get: function () {
            if (this.disabled) {
                return DISABLED_THUMB_GAP;
            }
            if (this._isMinValue && !this.thumbLabel) {
                return this._isActive ? MIN_VALUE_ACTIVE_THUMB_GAP : MIN_VALUE_NONACTIVE_THUMB_GAP;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_trackBackgroundStyles", {
        /**
         * CSS styles for the track background element.
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            var /** @type {?} */ sign = this._invertMouseCoords ? '-' : '';
            return {
                'transform': "translate" + axis + "(" + sign + this._thumbGap + "px) scale" + axis + "(" + (1 - this.percent) + ")"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_trackFillStyles", {
        /**
         * CSS styles for the track fill element.
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            var /** @type {?} */ sign = this._invertMouseCoords ? '' : '-';
            return {
                'transform': "translate" + axis + "(" + sign + this._thumbGap + "px) scale" + axis + "(" + this.percent + ")"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_ticksContainerStyles", {
        /**
         * CSS styles for the ticks container element.
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            // For a horizontal slider in RTL languages we push the ticks container off the left edge
            // instead of the right edge to avoid causing a horizontal scrollbar to appear.
            var /** @type {?} */ sign = !this.vertical && this._direction == 'rtl' ? '' : '-';
            var /** @type {?} */ offset = this._tickIntervalPercent / 2 * 100;
            return {
                'transform': "translate" + axis + "(" + sign + offset + "%)"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_ticksStyles", {
        /**
         * CSS styles for the ticks element.
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ tickSize = this._tickIntervalPercent * 100;
            var /** @type {?} */ backgroundSize = this.vertical ? "2px " + tickSize + "%" : tickSize + "% 2px";
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            // Depending on the direction we pushed the ticks container, push the ticks the opposite
            // direction to re-center them but clip off the end edge. In RTL languages we need to flip the
            // ticks 180 degrees so we're really cutting off the end edge abd not the start.
            var /** @type {?} */ sign = !this.vertical && this._direction == 'rtl' ? '-' : '';
            var /** @type {?} */ rotate = !this.vertical && this._direction == 'rtl' ? ' rotate(180deg)' : '';
            var /** @type {?} */ styles = {
                'backgroundSize': backgroundSize,
                // Without translateZ ticks sometimes jitter as the slider moves on Chrome & Firefox.
                'transform': "translateZ(0) translate" + axis + "(" + sign + tickSize / 2 + "%)" + rotate
            };
            if (this._isMinValue && this._thumbGap) {
                var /** @type {?} */ side = this.vertical ?
                    (this._invertAxis ? 'Bottom' : 'Top') :
                    (this._invertAxis ? 'Right' : 'Left');
                styles["padding" + side] = this._thumbGap + "px";
            }
            return styles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_thumbContainerStyles", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
            // For a horizontal slider in RTL languages we push the thumb container off the left edge
            // instead of the right edge to avoid causing a horizontal scrollbar to appear.
            var /** @type {?} */ invertOffset = (this._direction == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
            var /** @type {?} */ offset = (invertOffset ? this.percent : 1 - this.percent) * 100;
            return {
                'transform': "translate" + axis + "(-" + offset + "%)"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_invertMouseCoords", {
        /**
         * Whether mouse events should be converted to a slider position by calculating their distance
         * from the right or bottom edge of the slider as opposed to the top or left.
         * @return {?}
         */
        get: function () {
            return (this._direction == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "_direction", {
        /**
         * The language direction for this slider element.
         * @return {?}
         */
        get: function () {
            return (this._dir && this._dir.value == 'rtl') ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MdSlider.prototype.ngOnDestroy = function () {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    MdSlider.prototype._onMouseenter = function () {
        if (this.disabled) {
            return;
        }
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this._updateTickIntervalPercent();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdSlider.prototype._onClick = function (event) {
        if (this.disabled) {
            return;
        }
        this._isSliding = false;
        this._renderer.addFocus();
        this._updateValueFromPosition({ x: event.clientX, y: event.clientY });
        /* Emits a change and input event if the value changed. */
        this._emitInputEvent();
        this._emitValueIfChanged();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdSlider.prototype._onSlide = function (event) {
        if (this.disabled) {
            return;
        }
        // Prevent the slide from selecting anything else.
        event.preventDefault();
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
        // Native range elements always emit `input` events when the value changed while sliding.
        this._emitInputEvent();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdSlider.prototype._onSlideStart = function (event) {
        if (this.disabled) {
            return;
        }
        // Simulate mouseenter in case this is a mobile device.
        this._onMouseenter();
        event.preventDefault();
        this._isSliding = true;
        this._renderer.addFocus();
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
    };
    /**
     * @return {?}
     */
    MdSlider.prototype._onSlideEnd = function () {
        this._isSliding = false;
        this._emitValueIfChanged();
    };
    /**
     * @return {?}
     */
    MdSlider.prototype._onFocus = function () {
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this._updateTickIntervalPercent();
    };
    /**
     * @return {?}
     */
    MdSlider.prototype._onBlur = function () {
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdSlider.prototype._onKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case PAGE_UP:
                this._increment(10);
                break;
            case PAGE_DOWN:
                this._increment(-10);
                break;
            case END:
                this.value = this.max;
                break;
            case HOME:
                this.value = this.min;
                break;
            case LEFT_ARROW:
                // NOTE: For a sighted user it would make more sense that when they press an arrow key on an
                // inverted slider the thumb moves in that direction. However for a blind user, nothing
                // about the slider indicates that it is inverted. They will expect left to be decrement,
                // regardless of how it appears on the screen. For speakers ofRTL languages, they probably
                // expect left to mean increment. Therefore we flip the meaning of the side arrow keys for
                // RTL. For inverted sliders we prefer a good a11y experience to having it "look right" for
                // sighted users, therefore we do not swap the meaning.
                this._increment(this._direction == 'rtl' ? 1 : -1);
                break;
            case UP_ARROW:
                this._increment(1);
                break;
            case RIGHT_ARROW:
                // See comment on LEFT_ARROW about the conditions under which we flip the meaning.
                this._increment(this._direction == 'rtl' ? -1 : 1);
                break;
            case DOWN_ARROW:
                this._increment(-1);
                break;
            default:
                // Return if the key is not one that we explicitly handle to avoid calling preventDefault on
                // it.
                return;
        }
        this._isSliding = true;
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    MdSlider.prototype._onKeyup = function () {
        this._isSliding = false;
    };
    /**
     * Increments the slider by the given number of steps (negative number decrements).
     * @param {?} numSteps
     * @return {?}
     */
    MdSlider.prototype._increment = function (numSteps) {
        this.value = this._clamp(this.value + this.step * numSteps, this.min, this.max);
        this._emitInputEvent();
        this._emitValueIfChanged();
    };
    /**
     * Calculate the new value from the new physical location. The value will always be snapped.
     * @param {?} pos
     * @return {?}
     */
    MdSlider.prototype._updateValueFromPosition = function (pos) {
        if (!this._sliderDimensions) {
            return;
        }
        var /** @type {?} */ offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
        var /** @type {?} */ size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
        var /** @type {?} */ posComponent = this.vertical ? pos.y : pos.x;
        // The exact value is calculated from the event and used to find the closest snap value.
        var /** @type {?} */ percent = this._clamp((posComponent - offset) / size);
        if (this._invertMouseCoords) {
            percent = 1 - percent;
        }
        var /** @type {?} */ exactValue = this._calculateValue(percent);
        // This calculation finds the closest step by finding the closest whole number divisible by the
        // step relative to the min.
        var /** @type {?} */ closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
        // The value needs to snap to the min and max.
        this.value = this._clamp(closestValue, this.min, this.max);
    };
    /**
     * Emits a change event if the current value is different from the last emitted value.
     * @return {?}
     */
    MdSlider.prototype._emitValueIfChanged = function () {
        if (this.value != this._lastChangeValue) {
            var /** @type {?} */ event = this._createChangeEvent();
            this._lastChangeValue = this.value;
            this._controlValueAccessorChangeFn(this.value);
            this.change.emit(event);
        }
    };
    /**
     * Emits an input event when the current value is different from the last emitted value.
     * @return {?}
     */
    MdSlider.prototype._emitInputEvent = function () {
        if (this.value != this._lastInputValue) {
            var /** @type {?} */ event = this._createChangeEvent();
            this._lastInputValue = this.value;
            this.input.emit(event);
        }
    };
    /**
     * Updates the amount of space between ticks as a percentage of the width of the slider.
     * @return {?}
     */
    MdSlider.prototype._updateTickIntervalPercent = function () {
        if (!this.tickInterval) {
            return;
        }
        if (this.tickInterval == 'auto') {
            var /** @type {?} */ trackSize = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
            var /** @type {?} */ pixelsPerStep = trackSize * this.step / (this.max - this.min);
            var /** @type {?} */ stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
            var /** @type {?} */ pixelsPerTick = stepsPerTick * this.step;
            this._tickIntervalPercent = pixelsPerTick / trackSize;
        }
        else {
            this._tickIntervalPercent = this.tickInterval * this.step / (this.max - this.min);
        }
    };
    /**
     * Creates a slider change object from the specified value.
     * @param {?=} value
     * @return {?}
     */
    MdSlider.prototype._createChangeEvent = function (value) {
        if (value === void 0) { value = this.value; }
        var /** @type {?} */ event = new MdSliderChange();
        event.source = this;
        event.value = value;
        return event;
    };
    /**
     * Calculates the percentage of the slider that a value is.
     * @param {?} value
     * @return {?}
     */
    MdSlider.prototype._calculatePercentage = function (value) {
        return (value - this.min) / (this.max - this.min);
    };
    /**
     * Calculates the value a percentage of the slider corresponds to.
     * @param {?} percentage
     * @return {?}
     */
    MdSlider.prototype._calculateValue = function (percentage) {
        return this.min + percentage * (this.max - this.min);
    };
    /**
     * Return a number between two numbers.
     * @param {?} value
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    MdSlider.prototype._clamp = function (value, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.max(min, Math.min(value, max));
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    MdSlider.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Registers a callback to eb triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    MdSlider.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    MdSlider.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    MdSlider.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    return MdSlider;
}(_MdSliderMixinBase));
MdSlider.decorators = [
    { type: _angular_core.Component, args: [{ selector: 'md-slider, mat-slider',
                providers: [MD_SLIDER_VALUE_ACCESSOR],
                host: {
                    '(focus)': '_onFocus()',
                    '(blur)': '_onBlur()',
                    '(click)': '_onClick($event)',
                    '(keydown)': '_onKeydown($event)',
                    '(keyup)': '_onKeyup()',
                    '(mouseenter)': '_onMouseenter()',
                    '(slide)': '_onSlide($event)',
                    '(slideend)': '_onSlideEnd()',
                    '(slidestart)': '_onSlideStart($event)',
                    'class': 'mat-slider',
                    'role': 'slider',
                    'tabindex': '0',
                    '[attr.aria-disabled]': 'disabled',
                    '[attr.aria-valuemax]': 'max',
                    '[attr.aria-valuemin]': 'min',
                    '[attr.aria-valuenow]': 'value',
                    '[class.mat-primary]': 'color == "primary"',
                    '[class.mat-accent]': 'color != "primary" && color != "warn"',
                    '[class.mat-warn]': 'color == "warn"',
                    '[class.mat-slider-disabled]': 'disabled',
                    '[class.mat-slider-has-ticks]': 'tickInterval',
                    '[class.mat-slider-horizontal]': '!vertical',
                    '[class.mat-slider-axis-inverted]': '_invertAxis',
                    '[class.mat-slider-sliding]': '_isSliding',
                    '[class.mat-slider-thumb-label-showing]': 'thumbLabel',
                    '[class.mat-slider-vertical]': 'vertical',
                    '[class.mat-slider-min-value]': '_isMinValue',
                    '[class.mat-slider-hide-last-tick]': 'disabled || _isMinValue && _thumbGap && _invertAxis',
                },
                template: "<div class=\"mat-slider-wrapper\"> <div class=\"mat-slider-track-wrapper\"> <div class=\"mat-slider-track-background\" [ngStyle]=\"_trackBackgroundStyles\"></div> <div class=\"mat-slider-track-fill\" [ngStyle]=\"_trackFillStyles\"></div> </div> <div class=\"mat-slider-ticks-container\" [ngStyle]=\"_ticksContainerStyles\"> <div class=\"mat-slider-ticks\" [ngStyle]=\"_ticksStyles\"></div> </div> <div class=\"mat-slider-thumb-container\" [ngStyle]=\"_thumbContainerStyles\"> <div class=\"mat-slider-focus-ring\"></div> <div class=\"mat-slider-thumb\"></div> <div class=\"mat-slider-thumb-label\"> <span class=\"mat-slider-thumb-label-text\">{{displayValue}}</span> </div> </div> </div> ",
                styles: [".mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:0;vertical-align:middle}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-track-background{position:absolute;transform-origin:100% 100%;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{box-sizing:border-box;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-focus-ring{position:absolute;width:30px;height:30px;border-radius:50%;transform:scale(0);opacity:0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),opacity .4s cubic-bezier(.25,.8,.25,1)}.cdk-keyboard-focused .mat-slider-focus-ring{transform:scale(1);opacity:1}.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb-label{cursor:-webkit-grab;cursor:grab}.mat-slider-sliding:not(.mat-slider-disabled) .mat-slider-thumb,.mat-slider-sliding:not(.mat-slider-disabled) .mat-slider-thumb-label,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb-label:active,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb:active{cursor:-webkit-grabbing;cursor:grabbing}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(.7);transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),border-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform .4s cubic-bezier(.25,.8,.25,1),border-radius .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label-text{z-index:1;font-size:12px;font-weight:700;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-sliding .mat-slider-thumb-container,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-track-fill{transition-duration:0s}.mat-slider-has-ticks .mat-slider-wrapper::after{content:'';position:absolute;border:0 solid rgba(0,0,0,.6);opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-disabled) .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-disabled) .mat-slider-ticks{opacity:1}.mat-slider-thumb-label-showing .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.cdk-focused .mat-slider-thumb-label{border-radius:50% 50% 0}.cdk-focused .mat-slider-thumb-label-text{opacity:1}.cdk-mouse-focused .mat-slider-thumb,.cdk-program-focused .mat-slider-thumb,.cdk-touch-focused .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-disabled .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}.mat-slider-horizontal .mat-slider-ticks{background:repeating-linear-gradient(to right,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent) repeat;background:-moz-repeating-linear-gradient(.0001deg,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent) repeat;background-clip:content-box;height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-focus-ring{top:-15px;right:-15px}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.cdk-focused .mat-slider-thumb-label{transform:rotate(45deg)}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}.mat-slider-vertical .mat-slider-focus-ring{bottom:-15px;left:-15px}.mat-slider-vertical .mat-slider-ticks{background:repeating-linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent) repeat;background-clip:content-box;width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.cdk-focused .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%} /*# sourceMappingURL=slider.css.map */ "],
                inputs: ['disabled'],
                encapsulation: _angular_core.ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdSlider.ctorParameters = function () { return [
    { type: _angular_core.Renderer2, },
    { type: _angular_core.ElementRef, },
    { type: FocusOriginMonitor, },
    { type: Dir, decorators: [{ type: _angular_core.Optional },] },
]; };
MdSlider.propDecorators = {
    'invert': [{ type: _angular_core.Input },],
    'max': [{ type: _angular_core.Input },],
    'min': [{ type: _angular_core.Input },],
    'step': [{ type: _angular_core.Input },],
    'thumbLabel': [{ type: _angular_core.Input },],
    '_thumbLabelDeprecated': [{ type: _angular_core.Input, args: ['thumb-label',] },],
    'tickInterval': [{ type: _angular_core.Input },],
    '_tickIntervalDeprecated': [{ type: _angular_core.Input, args: ['tick-interval',] },],
    'value': [{ type: _angular_core.Input },],
    'vertical': [{ type: _angular_core.Input },],
    'color': [{ type: _angular_core.Input },],
    'change': [{ type: _angular_core.Output },],
    'input': [{ type: _angular_core.Output },],
};
/**
 * Renderer class in order to keep all dom manipulation in one place and outside of the main class.
 * \@docs-private
 */
var SliderRenderer = (function () {
    /**
     * @param {?} elementRef
     */
    function SliderRenderer(elementRef) {
        this._sliderElement = elementRef.nativeElement;
    }
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     * @return {?}
     */
    SliderRenderer.prototype.getSliderDimensions = function () {
        var /** @type {?} */ wrapperElement = this._sliderElement.querySelector('.mat-slider-wrapper');
        return wrapperElement.getBoundingClientRect();
    };
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     * @return {?}
     */
    SliderRenderer.prototype.addFocus = function () {
        this._sliderElement.focus();
    };
    return SliderRenderer;
}());
var MdSliderModule = (function () {
    function MdSliderModule() {
    }
    return MdSliderModule;
}());
MdSliderModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [_angular_common.CommonModule, _angular_forms.FormsModule, MdCommonModule, StyleModule, RtlModule],
                exports: [MdSlider, MdCommonModule],
                declarations: [MdSlider],
                providers: [{ provide: _angular_platformBrowser.HAMMER_GESTURE_CONFIG, useClass: GestureConfig }]
            },] },
];
/**
 * @nocollapse
 */
MdSliderModule.ctorParameters = function () { return []; };
/**
 * Exception thrown when a tooltip has an invalid position.
 * \@docs-private
 */
var MdTooltipInvalidPositionError = (function (_super) {
    __extends(MdTooltipInvalidPositionError, _super);
    /**
     * @param {?} position
     */
    function MdTooltipInvalidPositionError(position) {
        return _super.call(this, "Tooltip position \"" + position + "\" is invalid.") || this;
    }
    return MdTooltipInvalidPositionError;
}(MdError));
/**
 * Time in ms to delay before changing the tooltip visibility to hidden
 */
var TOUCHEND_HIDE_DELAY = 1500;
/**
 * Time in ms to throttle repositioning after scroll events.
 */
var SCROLL_THROTTLE_MS = 20;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
var MdTooltip = (function () {
    /**
     * @param {?} _overlay
     * @param {?} _elementRef
     * @param {?} _scrollDispatcher
     * @param {?} _viewContainerRef
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} _platform
     * @param {?} _dir
     */
    function MdTooltip(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _dir) {
        var _this = this;
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._platform = _platform;
        this._dir = _dir;
        this._position = 'below';
        this._disabled = false;
        /**
         * The default delay in ms before showing the tooltip after show is called
         */
        this.showDelay = 0;
        /**
         * The default delay in ms before hiding the tooltip after hide is called
         */
        this.hideDelay = 0;
        // The mouse events shouldn't be bound on iOS devices, because
        // they can prevent the first tap from firing its click event.
        if (!_platform.IOS) {
            _renderer.listen(_elementRef.nativeElement, 'mouseenter', function () { return _this.show(); });
            _renderer.listen(_elementRef.nativeElement, 'mouseleave', function () { return _this.hide(); });
        }
    }
    Object.defineProperty(MdTooltip.prototype, "position", {
        /**
         * Allows the user to define the position of the tooltip relative to the parent element
         * @return {?}
         */
        get: function () { return this._position; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value !== this._position) {
                this._position = value;
                // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
                // the tooltip.
                if (this._tooltipInstance) {
                    this._disposeTooltip();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "disabled", {
        /**
         * Disables the display of the tooltip.
         * @return {?}
         */
        get: function () { return this._disabled; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            // If tooltip is disabled, hide immediately.
            if (this._disabled) {
                this.hide(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_positionDeprecated", {
        /**
         * @deprecated
         * @return {?}
         */
        get: function () { return this._position; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._position = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "message", {
        /**
         * The message to be displayed in the tooltip
         * @return {?}
         */
        get: function () { return this._message; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._message = value;
            if (this._tooltipInstance) {
                this._setTooltipMessage(this._message);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_deprecatedMessage", {
        /**
         * @deprecated
         * @return {?}
         */
        get: function () { return this.message; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.message = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matMessage", {
        /**
         * @return {?}
         */
        get: function () { return this.message; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.message = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matPosition", {
        /**
         * @return {?}
         */
        get: function () { return this.position; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.position = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matDisabled", {
        /**
         * @return {?}
         */
        get: function () { return this.disabled; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.disabled = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matHideDelay", {
        /**
         * @return {?}
         */
        get: function () { return this.hideDelay; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.hideDelay = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "_matShowDelay", {
        /**
         * @return {?}
         */
        get: function () { return this.showDelay; },
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) { this.showDelay = v; },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    MdTooltip.prototype.ngOnDestroy = function () {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    };
    /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    MdTooltip.prototype.show = function (delay) {
        if (delay === void 0) { delay = this.showDelay; }
        if (this.disabled || !this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    };
    /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    MdTooltip.prototype.hide = function (delay) {
        if (delay === void 0) { delay = this.hideDelay; }
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    };
    /**
     * Shows/hides the tooltip
     * @return {?}
     */
    MdTooltip.prototype.toggle = function () {
        this._isTooltipVisible() ? this.hide() : this.show();
    };
    /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    MdTooltip.prototype._isTooltipVisible = function () {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    };
    /**
     * Create the tooltip to display
     * @return {?}
     */
    MdTooltip.prototype._createTooltip = function () {
        var _this = this;
        this._createOverlay();
        var /** @type {?} */ portal = new ComponentPortal(TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(function () {
            // Check first if the tooltip has already been removed through this components destroy.
            if (_this._tooltipInstance) {
                _this._disposeTooltip();
            }
        });
    };
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    MdTooltip.prototype._createOverlay = function () {
        var _this = this;
        var /** @type {?} */ origin = this._getOrigin();
        var /** @type {?} */ position = this._getOverlayPosition();
        // Create connected position strategy that listens for scroll events to reposition.
        // After position changes occur and the overlay is clipped by a parent scrollable then
        // close the tooltip.
        var /** @type {?} */ strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(function (change) {
            if (change.scrollableViewProperties.isOverlayClipped &&
                _this._tooltipInstance && _this._tooltipInstance.isVisible()) {
                _this.hide(0);
            }
        });
        var /** @type {?} */ config = new OverlayState();
        config.positionStrategy = strategy;
        config.scrollStrategy =
            new RepositionScrollStrategy(this._scrollDispatcher, SCROLL_THROTTLE_MS);
        this._overlayRef = this._overlay.create(config);
    };
    /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    MdTooltip.prototype._disposeTooltip = function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    };
    /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    MdTooltip.prototype._getOrigin = function () {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        var /** @type {?} */ isDirectionLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isDirectionLtr ||
            this.position == 'after' && !isDirectionLtr) {
            return { originX: 'start', originY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isDirectionLtr ||
            this.position == 'before' && !isDirectionLtr) {
            return { originX: 'end', originY: 'center' };
        }
        throw new MdTooltipInvalidPositionError(this.position);
    };
    /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    MdTooltip.prototype._getOverlayPosition = function () {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        var /** @type {?} */ isLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isLtr ||
            this.position == 'after' && !isLtr) {
            return { overlayX: 'end', overlayY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isLtr ||
            this.position == 'before' && !isLtr) {
            return { overlayX: 'start', overlayY: 'center' };
        }
        throw new MdTooltipInvalidPositionError(this.position);
    };
    /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    MdTooltip.prototype._setTooltipMessage = function (message) {
        var _this = this;
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            if (_this._tooltipInstance) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    return MdTooltip;
}());
MdTooltip.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[md-tooltip], [mdTooltip], [mat-tooltip], [matTooltip]',
                host: {
                    '(longpress)': 'show()',
                    '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
                },
                exportAs: 'mdTooltip',
            },] },
];
/**
 * @nocollapse
 */
MdTooltip.ctorParameters = function () { return [
    { type: Overlay, },
    { type: _angular_core.ElementRef, },
    { type: ScrollDispatcher, },
    { type: _angular_core.ViewContainerRef, },
    { type: _angular_core.NgZone, },
    { type: _angular_core.Renderer2, },
    { type: Platform, },
    { type: Dir, decorators: [{ type: _angular_core.Optional },] },
]; };
MdTooltip.propDecorators = {
    'position': [{ type: _angular_core.Input, args: ['mdTooltipPosition',] },],
    'disabled': [{ type: _angular_core.Input, args: ['mdTooltipDisabled',] },],
    '_positionDeprecated': [{ type: _angular_core.Input, args: ['tooltip-position',] },],
    'showDelay': [{ type: _angular_core.Input, args: ['mdTooltipShowDelay',] },],
    'hideDelay': [{ type: _angular_core.Input, args: ['mdTooltipHideDelay',] },],
    'message': [{ type: _angular_core.Input, args: ['mdTooltip',] },],
    '_deprecatedMessage': [{ type: _angular_core.Input, args: ['md-tooltip',] },],
    '_matMessage': [{ type: _angular_core.Input, args: ['matTooltip',] },],
    '_matPosition': [{ type: _angular_core.Input, args: ['matTooltipPosition',] },],
    '_matDisabled': [{ type: _angular_core.Input, args: ['matTooltipDisabled',] },],
    '_matHideDelay': [{ type: _angular_core.Input, args: ['matTooltipHideDelay',] },],
    '_matShowDelay': [{ type: _angular_core.Input, args: ['matTooltipShowDelay',] },],
};
/**
 * Internal component that wraps the tooltip's content.
 * \@docs-private
 */
var TooltipComponent = (function () {
    /**
     * @param {?} _dir
     * @param {?} _changeDetectorRef
     */
    function TooltipComponent(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Property watched by the animation framework to show or hide the tooltip
         */
        this._visibility = 'initial';
        /**
         * Whether interactions on the page should close the tooltip
         */
        this._closeOnInteraction = false;
        /**
         * The transform origin used in the animation for showing and hiding the tooltip
         */
        this._transformOrigin = 'bottom';
        /**
         * Subject for notifying that the tooltip has been hidden from the view
         */
        this._onHide = new rxjs_Subject.Subject();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    TooltipComponent.prototype.show = function (position, delay) {
        var _this = this;
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(function () {
            _this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
            setTimeout(function () { return _this._closeOnInteraction = true; }, 0);
        }, delay);
    };
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    TooltipComponent.prototype.hide = function (delay) {
        var _this = this;
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(function () {
            _this._visibility = 'hidden';
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
        }, delay);
    };
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    TooltipComponent.prototype.afterHidden = function () {
        return this._onHide.asObservable();
    };
    /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    TooltipComponent.prototype.isVisible = function () {
        return this._visibility === 'visible';
    };
    /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    TooltipComponent.prototype._setTransformOrigin = function (value) {
        var /** @type {?} */ isLtr = !this._dir || this._dir.value == 'ltr';
        switch (value) {
            case 'before':
                this._transformOrigin = isLtr ? 'right' : 'left';
                break;
            case 'after':
                this._transformOrigin = isLtr ? 'left' : 'right';
                break;
            case 'left':
                this._transformOrigin = 'right';
                break;
            case 'right':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
            default: throw new MdTooltipInvalidPositionError(value);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TooltipComponent.prototype._afterVisibilityAnimation = function (e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    };
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    TooltipComponent.prototype._handleBodyInteraction = function () {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    };
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    TooltipComponent.prototype._markForCheck = function () {
        this._changeDetectorRef.markForCheck();
    };
    return TooltipComponent;
}());
TooltipComponent.decorators = [
    { type: _angular_core.Component, args: [{ selector: 'md-tooltip-component, mat-tooltip-component',
                template: "<div class=\"mat-tooltip\" [style.transform-origin]=\"_transformOrigin\" [@state]=\"_visibility\" (@state.done)=\"_afterVisibilityAnimation($event)\"> {{message}} </div>",
                styles: [":host{pointer-events:none}.mat-tooltip{color:#fff;padding:6px 8px;border-radius:2px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;margin:14px;max-width:250px}@media screen and (-ms-high-contrast:active){.mat-tooltip{outline:solid 1px}} /*# sourceMappingURL=tooltip.css.map */ "],
                animations: [
                    _angular_animations.trigger('state', [
                        _angular_animations.state('void', _angular_animations.style({ transform: 'scale(0)' })),
                        _angular_animations.state('initial', _angular_animations.style({ transform: 'scale(0)' })),
                        _angular_animations.state('visible', _angular_animations.style({ transform: 'scale(1)' })),
                        _angular_animations.state('hidden', _angular_animations.style({ transform: 'scale(0)' })),
                        _angular_animations.transition('* => visible', _angular_animations.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                        _angular_animations.transition('* => hidden', _angular_animations.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                    ])
                ],
                host: {
                    '(body:click)': 'this._handleBodyInteraction()'
                }
            },] },
];
/**
 * @nocollapse
 */
TooltipComponent.ctorParameters = function () { return [
    { type: Dir, decorators: [{ type: _angular_core.Optional },] },
    { type: _angular_core.ChangeDetectorRef, },
]; };
var MdTooltipModule = (function () {
    function MdTooltipModule() {
    }
    return MdTooltipModule;
}());
MdTooltipModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [OverlayModule, MdCommonModule, PlatformModule],
                exports: [MdTooltip, TooltipComponent, MdCommonModule],
                declarations: [MdTooltip, TooltipComponent],
                entryComponents: [TooltipComponent],
            },] },
];
/**
 * @nocollapse
 */
MdTooltipModule.ctorParameters = function () { return []; };

exports.Dir = Dir;
exports.RtlModule = RtlModule;
exports.ObserveContentModule = ObserveContentModule;
exports.ObserveContent = ObserveContent;
exports.MdOptionModule = MdOptionModule;
exports.MdOption = MdOption;
exports.MdOptionSelectionChange = MdOptionSelectionChange;
exports.Portal = Portal;
exports.BasePortalHost = BasePortalHost;
exports.ComponentPortal = ComponentPortal;
exports.TemplatePortal = TemplatePortal;
exports.PortalHostDirective = PortalHostDirective;
exports.TemplatePortalDirective = TemplatePortalDirective;
exports.PortalModule = PortalModule;
exports.DomPortalHost = DomPortalHost;
exports.GestureConfig = GestureConfig;
exports.LiveAnnouncer = LiveAnnouncer;
exports.LIVE_ANNOUNCER_ELEMENT_TOKEN = LIVE_ANNOUNCER_ELEMENT_TOKEN;
exports.LIVE_ANNOUNCER_PROVIDER = LIVE_ANNOUNCER_PROVIDER;
exports.InteractivityChecker = InteractivityChecker;
exports.isFakeMousedownFromScreenReader = isFakeMousedownFromScreenReader;
exports.A11yModule = A11yModule;
exports.UniqueSelectionDispatcher = UniqueSelectionDispatcher;
exports.UNIQUE_SELECTION_DISPATCHER_PROVIDER = UNIQUE_SELECTION_DISPATCHER_PROVIDER;
exports.MdLineModule = MdLineModule;
exports.MdLine = MdLine;
exports.MdLineSetter = MdLineSetter;
exports.MdError = MdError;
exports.coerceBooleanProperty = coerceBooleanProperty;
exports.coerceNumberProperty = coerceNumberProperty;
exports.CompatibilityModule = CompatibilityModule;
exports.NoConflictStyleCompatibilityMode = NoConflictStyleCompatibilityMode;
exports.MdCommonModule = MdCommonModule;
exports.MdCoreModule = MdCoreModule;
exports.PlatformModule = PlatformModule;
exports.Platform = Platform;
exports.getSupportedInputTypes = getSupportedInputTypes;
exports.Overlay = Overlay;
exports.OVERLAY_PROVIDERS = OVERLAY_PROVIDERS;
exports.OverlayContainer = OverlayContainer;
exports.FullscreenOverlayContainer = FullscreenOverlayContainer;
exports.OverlayRef = OverlayRef;
exports.OverlayState = OverlayState;
exports.ConnectedOverlayDirective = ConnectedOverlayDirective;
exports.OverlayOrigin = OverlayOrigin;
exports.OverlayModule = OverlayModule;
exports.ScrollDispatcher = ScrollDispatcher;
exports.GlobalPositionStrategy = GlobalPositionStrategy;
exports.ConnectedPositionStrategy = ConnectedPositionStrategy;
exports.RepositionScrollStrategy = RepositionScrollStrategy;
exports.CloseScrollStrategy = CloseScrollStrategy;
exports.NoopScrollStrategy = NoopScrollStrategy;
exports.ConnectionPositionPair = ConnectionPositionPair;
exports.ScrollableViewProperties = ScrollableViewProperties;
exports.ConnectedOverlayPositionChange = ConnectedOverlayPositionChange;
exports.MdRipple = MdRipple;
exports.MD_RIPPLE_GLOBAL_OPTIONS = MD_RIPPLE_GLOBAL_OPTIONS;
exports.RippleRef = RippleRef;
exports.RippleState = RippleState;
exports.RIPPLE_FADE_IN_DURATION = RIPPLE_FADE_IN_DURATION;
exports.RIPPLE_FADE_OUT_DURATION = RIPPLE_FADE_OUT_DURATION;
exports.MdRippleModule = MdRippleModule;
exports.SelectionModel = SelectionModel;
exports.SelectionChange = SelectionChange;
exports.FocusTrap = FocusTrap;
exports.FocusTrapFactory = FocusTrapFactory;
exports.FocusTrapDeprecatedDirective = FocusTrapDeprecatedDirective;
exports.FocusTrapDirective = FocusTrapDirective;
exports.StyleModule = StyleModule;
exports.TOUCH_BUFFER_MS = TOUCH_BUFFER_MS;
exports.FocusOriginMonitor = FocusOriginMonitor;
exports.CdkMonitorFocus = CdkMonitorFocus;
exports.FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY = FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY;
exports.FOCUS_ORIGIN_MONITOR_PROVIDER = FOCUS_ORIGIN_MONITOR_PROVIDER;
exports.applyCssTransform = applyCssTransform;
exports.UP_ARROW = UP_ARROW;
exports.DOWN_ARROW = DOWN_ARROW;
exports.RIGHT_ARROW = RIGHT_ARROW;
exports.LEFT_ARROW = LEFT_ARROW;
exports.PAGE_UP = PAGE_UP;
exports.PAGE_DOWN = PAGE_DOWN;
exports.HOME = HOME;
exports.END = END;
exports.ENTER = ENTER;
exports.SPACE = SPACE;
exports.TAB = TAB;
exports.ESCAPE = ESCAPE;
exports.BACKSPACE = BACKSPACE;
exports.DELETE = DELETE;
exports.MATERIAL_COMPATIBILITY_MODE = MATERIAL_COMPATIBILITY_MODE;
exports.MATERIAL_SANITY_CHECKS = MATERIAL_SANITY_CHECKS;
exports.MdCompatibilityInvalidPrefixError = MdCompatibilityInvalidPrefixError;
exports.MAT_ELEMENTS_SELECTOR = MAT_ELEMENTS_SELECTOR;
exports.MD_ELEMENTS_SELECTOR = MD_ELEMENTS_SELECTOR;
exports.MatPrefixRejector = MatPrefixRejector;
exports.MdPrefixRejector = MdPrefixRejector;
exports.AnimationCurves = AnimationCurves;
exports.AnimationDurations = AnimationDurations;
exports.MdSelectionModule = MdSelectionModule;
exports.MdPseudoCheckbox = MdPseudoCheckbox;
exports.NativeDateModule = NativeDateModule;
exports.MdNativeDateModule = MdNativeDateModule;
exports.DateAdapter = DateAdapter;
exports.NativeDateAdapter = NativeDateAdapter;
exports.MdAutocompleteModule = MdAutocompleteModule;
exports.MdAutocomplete = MdAutocomplete;
exports.AUTOCOMPLETE_OPTION_HEIGHT = AUTOCOMPLETE_OPTION_HEIGHT;
exports.AUTOCOMPLETE_PANEL_HEIGHT = AUTOCOMPLETE_PANEL_HEIGHT;
exports.MD_AUTOCOMPLETE_VALUE_ACCESSOR = MD_AUTOCOMPLETE_VALUE_ACCESSOR;
exports.MdAutocompleteTrigger = MdAutocompleteTrigger;
exports.MdInputModule = MdInputModule;
exports.MdTextareaAutosize = MdTextareaAutosize;
exports.MdPlaceholder = MdPlaceholder;
exports.MdHint = MdHint;
exports.MdErrorDirective = MdErrorDirective;
exports.MdPrefix = MdPrefix;
exports.MdSuffix = MdSuffix;
exports.MdInputDirective = MdInputDirective;
exports.MdInputContainer = MdInputContainer;
exports.MdInputContainerPlaceholderConflictError = MdInputContainerPlaceholderConflictError;
exports.MdInputContainerUnsupportedTypeError = MdInputContainerUnsupportedTypeError;
exports.MdInputContainerDuplicatedHintError = MdInputContainerDuplicatedHintError;
exports.MdInputContainerMissingMdInputError = MdInputContainerMissingMdInputError;
exports.MdSliderModule = MdSliderModule;
exports.MD_SLIDER_VALUE_ACCESSOR = MD_SLIDER_VALUE_ACCESSOR;
exports.MdSliderChange = MdSliderChange;
exports.MdSliderBase = MdSliderBase;
exports._MdSliderMixinBase = _MdSliderMixinBase;
exports.MdSlider = MdSlider;
exports.SliderRenderer = SliderRenderer;
exports.MdTooltipModule = MdTooltipModule;
exports.TOUCHEND_HIDE_DELAY = TOUCHEND_HIDE_DELAY;
exports.SCROLL_THROTTLE_MS = SCROLL_THROTTLE_MS;
exports.MdTooltip = MdTooltip;
exports.TooltipComponent = TooltipComponent;
exports.ɵg = LIVE_ANNOUNCER_PROVIDER_FACTORY;
exports.ɵq = mixinDisabled;
exports.ɵh = UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY;
exports.ɵo = MD_DATE_FORMATS;
exports.ɵp = MD_NATIVE_DATE_FORMATS;
exports.ɵa = MdMutationObserverFactory;
exports.ɵc = OVERLAY_CONTAINER_PROVIDER;
exports.ɵb = OVERLAY_CONTAINER_PROVIDER_FACTORY;
exports.ɵn = OverlayPositionBuilder;
exports.ɵm = VIEWPORT_RULER_PROVIDER;
exports.ɵl = VIEWPORT_RULER_PROVIDER_FACTORY;
exports.ɵk = ViewportRuler;
exports.ɵi = ScrollDispatchModule;
exports.ɵe = SCROLL_DISPATCHER_PROVIDER;
exports.ɵd = SCROLL_DISPATCHER_PROVIDER_FACTORY;
exports.ɵj = Scrollable;
exports.ɵf = RippleRenderer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material.umd.js.map
