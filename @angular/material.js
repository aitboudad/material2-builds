/**
  * @license Angular Material v2.0.0-beta.6
  * Copyright (c) 2017 Google, Inc. https://material.angular.io/
  * License: MIT
  */
import { ApplicationRef, Attribute, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, Inject, Injectable, InjectionToken, Injector, Input, NgModule, NgZone, Optional, Output, Renderer2, Self, SkipSelf, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, forwardRef, isDevMode } from '@angular/core';
import { DOCUMENT, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import { FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'rxjs/add/operator/startWith';

const MATERIAL_COMPATIBILITY_MODE = new InjectionToken('md-compatibility-mode');
/**
 * Injection token that configures whether the Material sanity checks are enabled.
 */
const MATERIAL_SANITY_CHECKS = new InjectionToken('md-sanity-checks');
/**
 * Returns an exception to be thrown if the consumer has used
 * an invalid Material prefix on a component.
 * \@docs-private
 * @param {?} prefix
 * @param {?} nodeName
 * @return {?}
 */
function getMdCompatibilityInvalidPrefixError(prefix, nodeName) {
    return new Error(`The "${prefix}-" prefix cannot be used in ng-material v1 compatibility mode. ` +
        `It was used on an "${nodeName.toLowerCase()}" element.`);
}
/**
 * Selector that matches all elements that may have style collisions with AngularJS Material.
 */
const MAT_ELEMENTS_SELECTOR = `
  [mat-button],
  [mat-card-subtitle],
  [mat-card-title],
  [mat-dialog-actions],
  [mat-dialog-close],
  [mat-dialog-content],
  [mat-dialog-title],
  [mat-fab],
  [mat-icon-button],
  [mat-menu-trigger-for],
  [mat-mini-fab],
  [mat-raised-button],
  [mat-tab-label],
  [mat-tab-link],
  [mat-tab-nav-bar],
  [matTooltip],
  mat-autocomplete,
  mat-button-toggle,
  mat-button-toggle-group,
  mat-button-toggle,
  mat-card,
  mat-card-actions,
  mat-card-content,
  mat-card-footer,
  mat-card-header,
  mat-card-subtitle,
  mat-card-title,
  mat-card-title-group,
  mat-checkbox,
  mat-chip,
  mat-dialog-actions,
  mat-dialog-container,
  mat-dialog-content,
  mat-divider,
  mat-grid-list,
  mat-grid-tile,
  mat-grid-tile-footer,
  mat-grid-tile-header,
  mat-hint,
  mat-icon,
  mat-list,
  mat-list-item,
  mat-menu,
  mat-nav-list,
  mat-option,
  mat-placeholder,
  mat-progress-bar,
  mat-pseudo-checkbox,
  mat-radio-button,
  mat-radio-group,
  mat-select,
  mat-sidenav,
  mat-sidenav-container,
  mat-slider,
  mat-spinner,
  mat-tab,
  mat-tab-group,
  mat-toolbar,
  mat-error`;
/**
 * Selector that matches all elements that may have style collisions with AngularJS Material.
 */
const MD_ELEMENTS_SELECTOR = `
  [md-button],
  [md-card-subtitle],
  [md-card-title],
  [md-dialog-actions],
  [md-dialog-close],
  [md-dialog-content],
  [md-dialog-title],
  [md-fab],
  [md-icon-button],
  [md-menu-trigger-for],
  [md-mini-fab],
  [md-raised-button],
  [md-tab-label],
  [md-tab-link],
  [md-tab-nav-bar],
  [mdTooltip],
  md-autocomplete,
  md-button-toggle,
  md-button-toggle-group,
  md-button-toggle,
  md-card,
  md-card-actions,
  md-card-content,
  md-card-footer,
  md-card-header,
  md-card-subtitle,
  md-card-title,
  md-card-title-group,
  md-checkbox,
  md-chip,
  md-dialog-actions,
  md-dialog-container,
  md-dialog-content,
  md-divider,
  md-grid-list,
  md-grid-tile,
  md-grid-tile-footer,
  md-grid-tile-header,
  md-hint,
  md-icon,
  md-list,
  md-list-item,
  md-menu,
  md-nav-list,
  md-option,
  md-placeholder,
  md-progress-bar,
  md-pseudo-checkbox,
  md-radio-button,
  md-radio-group,
  md-select,
  md-sidenav,
  md-sidenav-container,
  md-slider,
  md-spinner,
  md-tab,
  md-tab-group,
  md-toolbar,
  md-error`;
/**
 * Directive that enforces that the `mat-` prefix cannot be used.
 */
class MatPrefixRejector {
    /**
     * @param {?} isCompatibilityMode
     * @param {?} elementRef
     */
    constructor(isCompatibilityMode, elementRef) {
        if (!isCompatibilityMode) {
            throw getMdCompatibilityInvalidPrefixError('mat', elementRef.nativeElement.nodeName);
        }
    }
}
MatPrefixRejector.decorators = [
    { type: Directive, args: [{ selector: MAT_ELEMENTS_SELECTOR },] },
];
/**
 * @nocollapse
 */
MatPrefixRejector.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
    { type: ElementRef, },
];
/**
 * Directive that enforces that the `md-` prefix cannot be used.
 */
class MdPrefixRejector {
    /**
     * @param {?} isCompatibilityMode
     * @param {?} elementRef
     */
    constructor(isCompatibilityMode, elementRef) {
        if (isCompatibilityMode) {
            throw getMdCompatibilityInvalidPrefixError('md', elementRef.nativeElement.nodeName);
        }
    }
}
MdPrefixRejector.decorators = [
    { type: Directive, args: [{ selector: MD_ELEMENTS_SELECTOR },] },
];
/**
 * @nocollapse
 */
MdPrefixRejector.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
    { type: ElementRef, },
];
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
class CompatibilityModule {
    /**
     * @param {?} _document
     * @param {?} _sanityChecksEnabled
     */
    constructor(_document, _sanityChecksEnabled) {
        this._document = _document;
        /**
         * Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
         */
        this._hasDoneGlobalChecks = false;
        if (_sanityChecksEnabled && !this._hasDoneGlobalChecks && _document && isDevMode()) {
            // Delay running the check to allow more time for the user's styles to load.
            this._checkDoctype();
            this._checkTheme();
            this._hasDoneGlobalChecks = true;
        }
    }
    /**
     * @return {?}
     */
    _checkDoctype() {
        if (!this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    }
    /**
     * @return {?}
     */
    _checkTheme() {
        if (typeof getComputedStyle === 'function') {
            const /** @type {?} */ testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            if (getComputedStyle(testElement).display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    }
}
CompatibilityModule.decorators = [
    { type: NgModule, args: [{
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
CompatibilityModule.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_SANITY_CHECKS,] },] },
];
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
class NoConflictStyleCompatibilityMode {
}
NoConflictStyleCompatibilityMode.decorators = [
    { type: NgModule, args: [{
                providers: [{
                        provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                    }],
            },] },
];
/**
 * @nocollapse
 */
NoConflictStyleCompatibilityMode.ctorParameters = () => [];

/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, compatibility mode, etc.
 *
 * This module should be imported to each top-level component module (e.g., MdTabsModule).
 */
class MdCommonModule {
}
MdCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [CompatibilityModule],
            },] },
];
/**
 * @nocollapse
 */
MdCommonModule.ctorParameters = () => [];

/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
class MdLine {
}
MdLine.decorators = [
    { type: Directive, args: [{
                selector: '[md-line], [mat-line]',
                host: {
                    '[class.mat-line]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdLine.ctorParameters = () => [];
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
class MdLineSetter {
    /**
     * @param {?} _lines
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_lines, _renderer, _element) {
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this._setLineClass(this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    _setLineClass(count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass(`mat-${count}-line`, true);
        }
        else if (count > 3) {
            this._setClass(`mat-multi-line`, true);
        }
    }
    /**
     * @return {?}
     */
    _resetClasses() {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    }
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    _setClass(className, isAdd) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    }
}
class MdLineModule {
}
MdLineModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdCommonModule],
                exports: [MdLine, MdCommonModule],
                declarations: [MdLine],
            },] },
];
/**
 * @nocollapse
 */
MdLineModule.ctorParameters = () => [];

/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
class Dir {
    constructor() {
        /**
         * Layout direction of the element.
         */
        this._dir = 'ltr';
        /**
         * Event emitted when the direction changes.
         */
        this.dirChange = new EventEmitter();
    }
    /**
     * \@docs-private
     * @return {?}
     */
    get dir() {
        return this._dir;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dir(v) {
        let /** @type {?} */ old = this._dir;
        this._dir = v;
        if (old != this._dir) {
            this.dirChange.emit();
        }
    }
    /**
     * Current layout direction of the element.
     * @return {?}
     */
    get value() { return this.dir; }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) { this.dir = v; }
}
Dir.decorators = [
    { type: Directive, args: [{
                selector: '[dir]',
                // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
                exportAs: '$implicit'
            },] },
];
/**
 * @nocollapse
 */
Dir.ctorParameters = () => [];
Dir.propDecorators = {
    '_dir': [{ type: Input, args: ['dir',] },],
    'dirChange': [{ type: Output },],
    'dir': [{ type: HostBinding, args: ['attr.dir',] },],
};
class RtlModule {
}
RtlModule.decorators = [
    { type: NgModule, args: [{
                exports: [Dir],
                declarations: [Dir]
            },] },
];
/**
 * @nocollapse
 */
RtlModule.ctorParameters = () => [];

/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * \@docs-private
 */
class MdMutationObserverFactory {
    /**
     * @param {?} callback
     * @return {?}
     */
    create(callback) {
        return new MutationObserver(callback);
    }
}
MdMutationObserverFactory.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MdMutationObserverFactory.ctorParameters = () => [];
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
class ObserveContent {
    /**
     * @param {?} _mutationObserverFactory
     * @param {?} _elementRef
     */
    constructor(_mutationObserverFactory, _elementRef) {
        this._mutationObserverFactory = _mutationObserverFactory;
        this._elementRef = _elementRef;
        /**
         * Event emitted for each change in the element's content.
         */
        this.event = new EventEmitter();
        /**
         * Used for debouncing the emitted values to the observeContent event.
         */
        this._debouncer = new Subject();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.debounce > 0) {
            this._debouncer
                .debounceTime(this.debounce)
                .subscribe(mutations => this.event.emit(mutations));
        }
        else {
            this._debouncer.subscribe(mutations => this.event.emit(mutations));
        }
        this._observer = this._mutationObserverFactory.create((mutations) => {
            this._debouncer.next(mutations);
        });
        this._observer.observe(this._elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._observer) {
            this._observer.disconnect();
            this._debouncer.complete();
            this._debouncer = this._observer = null;
        }
    }
}
ObserveContent.decorators = [
    { type: Directive, args: [{
                selector: '[cdkObserveContent]'
            },] },
];
/**
 * @nocollapse
 */
ObserveContent.ctorParameters = () => [
    { type: MdMutationObserverFactory, },
    { type: ElementRef, },
];
ObserveContent.propDecorators = {
    'event': [{ type: Output, args: ['cdkObserveContent',] },],
    'debounce': [{ type: Input },],
};
class ObserveContentModule {
}
ObserveContentModule.decorators = [
    { type: NgModule, args: [{
                exports: [ObserveContent],
                declarations: [ObserveContent],
                providers: [MdMutationObserverFactory]
            },] },
];
/**
 * @nocollapse
 */
ObserveContentModule.ctorParameters = () => [];

// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const PAGE_UP = 33;
const PAGE_DOWN = 34;
const HOME = 36;
const END = 35;
const ENTER = 13;
const SPACE = 32;
const TAB = 9;
const ESCAPE = 27;
const BACKSPACE = 8;
const DELETE = 46;

/**
 * Coerces a data-bound value (typically a string) to a boolean.
 * @param {?} value
 * @return {?}
 */
function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}

let RippleState = {};
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
class RippleRef {
    /**
     * @param {?} _renderer
     * @param {?} element
     * @param {?} config
     */
    constructor(_renderer, element, config) {
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
    fadeOut() {
        this._renderer.fadeOutRipple(this);
    }
}

/**
 * Fade-in duration for the ripples. Can be modified with the speedFactor option.
 */
const RIPPLE_FADE_IN_DURATION = 450;
/**
 * Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor.
 */
const RIPPLE_FADE_OUT_DURATION = 400;
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
class RippleRenderer {
    /**
     * @param {?} elementRef
     * @param {?} _ngZone
     * @param {?} _ruler
     * @param {?} platform
     */
    constructor(elementRef, _ngZone, _ruler, platform) {
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
    fadeInRipple(pageX, pageY, config = {}) {
        let /** @type {?} */ containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            pageX = containerRect.left + containerRect.width / 2;
            pageY = containerRect.top + containerRect.height / 2;
        }
        else {
            // Subtract scroll values from the coordinates because calculations below
            // are always relative to the viewport rectangle.
            let /** @type {?} */ scrollPosition = this._ruler.getViewportScrollPosition();
            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
        }
        let /** @type {?} */ radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
        let /** @type {?} */ duration = RIPPLE_FADE_IN_DURATION * (1 / (config.speedFactor || 1));
        let /** @type {?} */ offsetX = pageX - containerRect.left;
        let /** @type {?} */ offsetY = pageY - containerRect.top;
        let /** @type {?} */ ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = `${offsetX - radius}px`;
        ripple.style.top = `${offsetY - radius}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.style.width = `${radius * 2}px`;
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color;
        ripple.style.transitionDuration = `${duration}ms`;
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        // Exposed reference to the ripple that will be returned.
        let /** @type {?} */ rippleRef = new RippleRef(this, ripple, config);
        rippleRef.state = RippleState.FADING_IN;
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.add(rippleRef);
        // Wait for the ripple element to be completely faded in.
        // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
        this.runTimeoutOutsideZone(() => {
            rippleRef.state = RippleState.VISIBLE;
            if (!config.persistent && !this._isMousedown) {
                rippleRef.fadeOut();
            }
        }, duration);
        return rippleRef;
    }
    /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    fadeOutRipple(rippleRef) {
        // For ripples that are not active anymore, don't re-un the fade-out animation.
        if (!this._activeRipples.delete(rippleRef)) {
            return;
        }
        let /** @type {?} */ rippleEl = rippleRef.element;
        rippleEl.style.transitionDuration = `${RIPPLE_FADE_OUT_DURATION}ms`;
        rippleEl.style.opacity = '0';
        rippleRef.state = RippleState.FADING_OUT;
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(() => {
            rippleRef.state = RippleState.HIDDEN;
            rippleEl.parentNode.removeChild(rippleEl);
        }, RIPPLE_FADE_OUT_DURATION);
    }
    /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    fadeOutAll() {
        this._activeRipples.forEach(ripple => ripple.fadeOut());
    }
    /**
     * Sets the trigger element and registers the mouse events.
     * @param {?} element
     * @return {?}
     */
    setTriggerElement(element) {
        // Remove all previously register event listeners from the trigger element.
        if (this._triggerElement) {
            this._triggerEvents.forEach((fn, type) => this._triggerElement.removeEventListener(type, fn));
        }
        if (element) {
            // If the element is not null, register all event listeners on the trigger element.
            this._ngZone.runOutsideAngular(() => {
                this._triggerEvents.forEach((fn, type) => element.addEventListener(type, fn));
            });
        }
        this._triggerElement = element;
    }
    /**
     * Listener being called on mousedown event.
     * @param {?} event
     * @return {?}
     */
    onMousedown(event) {
        if (!this.rippleDisabled) {
            this._isMousedown = true;
            this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
        }
    }
    /**
     * Listener being called on mouseup event.
     * @return {?}
     */
    onMouseup() {
        this._isMousedown = false;
        // Fade-out all ripples that are completely visible and not persistent.
        this._activeRipples.forEach(ripple => {
            if (!ripple.config.persistent && ripple.state === RippleState.VISIBLE) {
                ripple.fadeOut();
            }
        });
    }
    /**
     * Listener being called on mouseleave event.
     * @return {?}
     */
    onMouseLeave() {
        if (this._isMousedown) {
            this.onMouseup();
        }
    }
    /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    runTimeoutOutsideZone(fn, delay = 0) {
        this._ngZone.runOutsideAngular(() => setTimeout(fn, delay));
    }
}
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
    const /** @type {?} */ distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const /** @type {?} */ distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}

// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
const hasV8BreakIterator = (typeof (Intl) !== 'undefined' && ((Intl)).v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * \@docs-private
 */
class Platform {
    constructor() {
        this.isBrowser = typeof document === 'object' && !!document;
        /**
         * Layout Engines
         */
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
        this.BLINK = this.isBrowser &&
            (!!(((window)).chrome || hasV8BreakIterator) && !!CSS && !this.EDGE && !this.TRIDENT);
        // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
        // ensure that Webkit runs standalone and is not used as another engine's base.
        this.WEBKIT = this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
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
}
Platform.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Platform.ctorParameters = () => [];

let supportedInputTypes;
/**
 * @return {?} The input types supported by this browser.
 */
function getSupportedInputTypes() {
    if (!supportedInputTypes) {
        let /** @type {?} */ featureTestInput = document.createElement('input');
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
        ].filter(value => {
            featureTestInput.setAttribute('type', value);
            return featureTestInput.type === value;
        }));
    }
    return supportedInputTypes;
}

class PlatformModule {
}
PlatformModule.decorators = [
    { type: NgModule, args: [{
                providers: [Platform]
            },] },
];
/**
 * @nocollapse
 */
PlatformModule.ctorParameters = () => [];

/**
 * Time in ms to throttle the scrolling events by default.
 */
const DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
class ScrollDispatcher {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    constructor(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * Subject for notifying that a registered scrollable reference element has been scrolled.
         */
        this._scrolled = new Subject();
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
    register(scrollable) {
        const /** @type {?} */ scrollSubscription = scrollable.elementScrolled().subscribe(() => this._notify());
        this.scrollableReferences.set(scrollable, scrollSubscription);
    }
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    deregister(scrollable) {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    }
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @param {?=} callback
     * @return {?}
     */
    scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME, callback) {
        // Scroll events can only happen on the browser, so do nothing if we're not on the browser.
        if (!this._platform.isBrowser) {
            return Subscription.EMPTY;
        }
        // In the case of a 0ms delay, use an observable without auditTime
        // since it does add a perceptible delay in processing overhead.
        let /** @type {?} */ observable = auditTimeInMs > 0 ?
            this._scrolled.asObservable().auditTime(auditTimeInMs) :
            this._scrolled.asObservable();
        this._scrolledCount++;
        if (!this._globalSubscription) {
            this._globalSubscription = this._ngZone.runOutsideAngular(() => {
                return Observable.merge(Observable.fromEvent(window.document, 'scroll'), Observable.fromEvent(window, 'resize')).subscribe(() => this._notify());
            });
        }
        // Note that we need to do the subscribing from here, in order to be able to remove
        // the global event listeners once there are no more subscriptions.
        let /** @type {?} */ subscription = observable.subscribe(callback);
        subscription.add(() => {
            this._scrolledCount--;
            if (this._globalSubscription && !this.scrollableReferences.size && !this._scrolledCount) {
                this._globalSubscription.unsubscribe();
                this._globalSubscription = null;
            }
        });
        return subscription;
    }
    /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    getScrollContainers(elementRef) {
        const /** @type {?} */ scrollingContainers = [];
        this.scrollableReferences.forEach((subscription, scrollable) => {
            if (this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    }
    /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    scrollableContainsElement(scrollable, elementRef) {
        let /** @type {?} */ element = elementRef.nativeElement;
        let /** @type {?} */ scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    }
    /**
     * Sends a notification that a scroll event has been fired.
     * @return {?}
     */
    _notify() {
        this._scrolled.next();
    }
}
ScrollDispatcher.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ScrollDispatcher.ctorParameters = () => [
    { type: NgZone, },
    { type: Platform, },
];
/**
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}
const SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new Optional(), new SkipSelf(), ScrollDispatcher], NgZone, Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};

/**
 * Simple utility for getting the bounds of the browser viewport.
 * \@docs-private
 */
class ViewportRuler {
    /**
     * @param {?} scrollDispatcher
     */
    constructor(scrollDispatcher) {
        // Subscribe to scroll and resize events and update the document rectangle on changes.
        scrollDispatcher.scrolled(null, () => this._cacheViewportGeometry());
    }
    /**
     * Gets a ClientRect for the viewport's bounds.
     * @param {?=} documentRect
     * @return {?}
     */
    getViewportRect(documentRect = this._documentRect) {
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
        const /** @type {?} */ scrollPosition = this.getViewportScrollPosition(documentRect);
        const /** @type {?} */ height = window.innerHeight;
        const /** @type {?} */ width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height,
            width,
        };
    }
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param {?=} documentRect
     * @return {?}
     */
    getViewportScrollPosition(documentRect = this._documentRect) {
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
        const /** @type {?} */ top = -documentRect.top || document.body.scrollTop || window.scrollY ||
            document.documentElement.scrollTop || 0;
        const /** @type {?} */ left = -documentRect.left || document.body.scrollLeft || window.scrollX ||
            document.documentElement.scrollLeft || 0;
        return { top, left };
    }
    /**
     * Caches the latest client rectangle of the document element.
     * @return {?}
     */
    _cacheViewportGeometry() {
        this._documentRect = document.documentElement.getBoundingClientRect();
    }
}
ViewportRuler.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ViewportRuler.ctorParameters = () => [
    { type: ScrollDispatcher, },
];
/**
 * @param {?} parentRuler
 * @param {?} scrollDispatcher
 * @return {?}
 */
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, scrollDispatcher) {
    return parentRuler || new ViewportRuler(scrollDispatcher);
}
const VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new Optional(), new SkipSelf(), ViewportRuler], ScrollDispatcher],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};

/**
 * Injection token that can be used to specify the global ripple options.
 */
const MD_RIPPLE_GLOBAL_OPTIONS = new InjectionToken('md-ripple-global-options');
class MdRipple {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} ruler
     * @param {?} platform
     * @param {?} globalOptions
     */
    constructor(elementRef, ngZone, ruler, platform, globalOptions) {
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
    ngOnChanges(changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._updateRippleRenderer();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    }
    /**
     * Launches a manual ripple at the specified position.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    launch(pageX, pageY, config = this.rippleConfig) {
        return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    }
    /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    fadeOutAll() {
        this._rippleRenderer.fadeOutAll();
    }
    /**
     * Ripple configuration from the directive's input values.
     * @return {?}
     */
    get rippleConfig() {
        return {
            centered: this.centered,
            speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
            radius: this.radius,
            color: this.color
        };
    }
    /**
     * Updates the ripple renderer with the latest ripple configuration.
     * @return {?}
     */
    _updateRippleRenderer() {
        this._rippleRenderer.rippleDisabled = this._globalOptions.disabled || this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    }
}
MdRipple.decorators = [
    { type: Directive, args: [{
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
MdRipple.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgZone, },
    { type: ViewportRuler, },
    { type: Platform, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_RIPPLE_GLOBAL_OPTIONS,] },] },
];
MdRipple.propDecorators = {
    'trigger': [{ type: Input, args: ['mdRippleTrigger',] },],
    'centered': [{ type: Input, args: ['mdRippleCentered',] },],
    'disabled': [{ type: Input, args: ['mdRippleDisabled',] },],
    'radius': [{ type: Input, args: ['mdRippleRadius',] },],
    'speedFactor': [{ type: Input, args: ['mdRippleSpeedFactor',] },],
    'color': [{ type: Input, args: ['mdRippleColor',] },],
    'unbounded': [{ type: Input, args: ['mdRippleUnbounded',] },],
};

/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
class Scrollable {
    /**
     * @param {?} _elementRef
     * @param {?} _scroll
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    constructor(_elementRef, _scroll, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementScrolled = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._scrollListener = this._ngZone.runOutsideAngular(() => {
            return this._renderer.listen(this.getElementRef().nativeElement, 'scroll', (event) => {
                this._elementScrolled.next(event);
            });
        });
        this._scroll.register(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._scroll.deregister(this);
        if (this._scrollListener) {
            this._scrollListener();
            this._scrollListener = null;
        }
    }
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    elementScrolled() {
        return this._elementScrolled.asObservable();
    }
    /**
     * @return {?}
     */
    getElementRef() {
        return this._elementRef;
    }
}
Scrollable.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-scrollable], [cdkScrollable]'
            },] },
];
/**
 * @nocollapse
 */
Scrollable.ctorParameters = () => [
    { type: ElementRef, },
    { type: ScrollDispatcher, },
    { type: NgZone, },
    { type: Renderer2, },
];

/**
 * Strategy that will update the element position as the user is scrolling.
 */
class RepositionScrollStrategy {
    /**
     * @param {?} _scrollDispatcher
     * @param {?=} _scrollThrottle
     */
    constructor(_scrollDispatcher, _scrollThrottle = 0) {
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollThrottle = _scrollThrottle;
        this._scrollSubscription = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    attach(overlayRef) {
        this._overlayRef = overlayRef;
    }
    /**
     * @return {?}
     */
    enable() {
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(this._scrollThrottle, () => {
                this._overlayRef.updatePosition();
            });
        }
    }
    /**
     * @return {?}
     */
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
class CloseScrollStrategy {
    /**
     * @param {?} _scrollDispatcher
     */
    constructor(_scrollDispatcher) {
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollSubscription = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    attach(overlayRef) {
        this._overlayRef = overlayRef;
    }
    /**
     * @return {?}
     */
    enable() {
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(null, () => {
                if (this._overlayRef.hasAttached()) {
                    this._overlayRef.detach();
                }
                this.disable();
            });
        }
    }
    /**
     * @return {?}
     */
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * Scroll strategy that doesn't do anything.
 */
class NoopScrollStrategy {
    /**
     * @return {?}
     */
    enable() { }
    /**
     * @return {?}
     */
    disable() { }
    /**
     * @return {?}
     */
    attach() { }
}

/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
class BlockScrollStrategy {
    /**
     * @param {?} _viewportRuler
     */
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = { top: null, left: null };
        this._isEnabled = false;
    }
    /**
     * @return {?}
     */
    attach() { }
    /**
     * @return {?}
     */
    enable() {
        if (this._canBeEnabled()) {
            const /** @type {?} */ root = document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
            // Cache the previous inline styles in case the user had set them.
            this._previousHTMLStyles.left = root.style.left;
            this._previousHTMLStyles.top = root.style.top;
            // Note: we're using the `html` node, instead of the `body`, because the `body` may
            // have the user agent margin, whereas the `html` is guaranteed not to have one.
            root.style.left = `${-this._previousScrollPosition.left}px`;
            root.style.top = `${-this._previousScrollPosition.top}px`;
            root.classList.add('cdk-global-scrollblock');
            this._isEnabled = true;
        }
    }
    /**
     * @return {?}
     */
    disable() {
        if (this._isEnabled) {
            this._isEnabled = false;
            document.documentElement.style.left = this._previousHTMLStyles.left;
            document.documentElement.style.top = this._previousHTMLStyles.top;
            document.documentElement.classList.remove('cdk-global-scrollblock');
            window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
        }
    }
    /**
     * @return {?}
     */
    _canBeEnabled() {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        if (document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
            return false;
        }
        const /** @type {?} */ body = document.body;
        const /** @type {?} */ viewport = this._viewportRuler.getViewportRect();
        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
    }
}

class ScrollDispatchModule {
}
ScrollDispatchModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                exports: [Scrollable],
                declarations: [Scrollable],
                providers: [SCROLL_DISPATCHER_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
ScrollDispatchModule.ctorParameters = () => [];

class MdRippleModule {
}
MdRippleModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdCommonModule, PlatformModule, ScrollDispatchModule],
                exports: [MdRipple, MdCommonModule],
                declarations: [MdRipple],
                providers: [VIEWPORT_RULER_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
MdRippleModule.ctorParameters = () => [];

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
class MdPseudoCheckbox {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
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
    /**
     * Color of the checkbox.
     * @return {?}
     */
    get color() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        if (value) {
            let /** @type {?} */ nativeElement = this._elementRef.nativeElement;
            this._renderer.removeClass(nativeElement, `mat-${this.color}`);
            this._renderer.addClass(nativeElement, `mat-${value}`);
            this._color = value;
        }
    }
}
MdPseudoCheckbox.decorators = [
    { type: Component, args: [{encapsulation: ViewEncapsulation.None,
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
MdPseudoCheckbox.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
MdPseudoCheckbox.propDecorators = {
    'state': [{ type: Input },],
    'disabled': [{ type: Input },],
    'color': [{ type: Input },],
};

class MdSelectionModule {
}
MdSelectionModule.decorators = [
    { type: NgModule, args: [{
                exports: [MdPseudoCheckbox],
                declarations: [MdPseudoCheckbox]
            },] },
];
/**
 * @nocollapse
 */
MdSelectionModule.ctorParameters = () => [];

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;
/**
 * Event object emitted by MdOption when selected or deselected.
 */
class MdOptionSelectionChange {
    /**
     * @param {?} source
     * @param {?=} isUserInput
     */
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
/**
 * Single option inside of a `<md-select>` element.
 */
class MdOption {
    /**
     * @param {?} _element
     * @param {?} _isCompatibilityMode
     */
    constructor(_element, _isCompatibilityMode) {
        this._element = _element;
        this._isCompatibilityMode = _isCompatibilityMode;
        this._selected = false;
        this._active = false;
        /**
         * Whether the option is disabled.
         */
        this._disabled = false;
        this._id = `md-option-${_uniqueIdCounter++}`;
        /**
         * Whether the wrapping component is in multiple selection mode.
         */
        this.multiple = false;
        /**
         * Event emitted when the option is selected or deselected.
         */
        this.onSelectionChange = new EventEmitter();
    }
    /**
     * The unique ID of the option.
     * @return {?}
     */
    get id() { return this._id; }
    /**
     * Whether or not the option is currently selected.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * Whether the option is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     * @return {?}
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     * @return {?}
     */
    get viewValue() {
        // TODO(kara): Add input property alternative for node envs.
        return this._getHostElement().textContent.trim();
    }
    /**
     * Selects the option.
     * @return {?}
     */
    select() {
        this._selected = true;
        this._emitSelectionChangeEvent();
    }
    /**
     * Deselects the option.
     * @return {?}
     */
    deselect() {
        this._selected = false;
        this._emitSelectionChangeEvent();
    }
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    focus() {
        this._getHostElement().focus();
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setActiveStyles() {
        this._active = true;
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setInactiveStyles() {
        this._active = false;
    }
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    }
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    }
    /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /**
     * Fetches the host DOM element.
     * @return {?}
     */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new MdOptionSelectionChange(this, isUserInput));
    }
}
MdOption.decorators = [
    { type: Component, args: [{selector: 'md-option, mat-option',
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
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
MdOption.ctorParameters = () => [
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
];
MdOption.propDecorators = {
    'value': [{ type: Input },],
    'disabled': [{ type: Input },],
    'onSelectionChange': [{ type: Output },],
};
class MdOptionModule {
}
MdOptionModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdRippleModule, CommonModule, MdSelectionModule],
                exports: [MdOption],
                declarations: [MdOption]
            },] },
];
/**
 * @nocollapse
 */
MdOptionModule.ctorParameters = () => [];

/**
 * Throws an exception when attempting to attach a null portal to a host.
 * \@docs-private
 * @return {?}
 */
function throwNullPortalError() {
    throw new Error('Must provide a portal to attach');
}
/**
 * Throws an exception when attempting to attach a portal to a host that is already attached.
 * \@docs-private
 * @return {?}
 */
function throwPortalAlreadyAttachedError() {
    throw new Error('Host already has a portal attached');
}
/**
 * Throws an exception when attempting to attach a portal to an already-disposed host.
 * \@docs-private
 * @return {?}
 */
function throwPortalHostAlreadyDisposedError() {
    throw new Error('This PortalHost has already been disposed');
}
/**
 * Throws an exception when attempting to attach an unknown portal type.
 * \@docs-private
 * @return {?}
 */
function throwUnknownPortalTypeError() {
    throw new Error('Attempting to attach an unknown Portal type. BasePortalHost accepts either' +
        'a ComponentPortal or a TemplatePortal.');
}
/**
 * Throws an exception when attempting to attach a portal to a null host.
 * \@docs-private
 * @return {?}
 */
function throwNullPortalHostError() {
    throw new Error('Attempting to attach a portal to a null PortalHost');
}
/**
 * Throws an exception when attempting to detach a portal that is not attached.
 * \@docs-privatew
 * @return {?}
 */
function throwNoPortalAttachedError() {
    throw new Error('Attempting to detach a portal that is not attached to a host');
}

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 * @abstract
 */
class Portal {
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @return {?}
     */
    attach(host) {
        if (host == null) {
            throwNullPortalHostError();
        }
        if (host.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return (host.attach(this));
    }
    /**
     * Detach this portal from its host
     * @return {?}
     */
    detach() {
        let /** @type {?} */ host = this._attachedHost;
        if (host == null) {
            throwNoPortalAttachedError();
        }
        this._attachedHost = null;
        return host.detach();
    }
    /**
     * Whether this portal is attached to a host.
     * @return {?}
     */
    get isAttached() {
        return this._attachedHost != null;
    }
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?} host
     * @return {?}
     */
    setAttachedHost(host) {
        this._attachedHost = host;
    }
}
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
class ComponentPortal extends Portal {
    /**
     * @param {?} component
     * @param {?=} viewContainerRef
     * @param {?=} injector
     */
    constructor(component, viewContainerRef = null, injector = null) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
}
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
class TemplatePortal extends Portal {
    /**
     * @param {?} template
     * @param {?} viewContainerRef
     */
    constructor(template, viewContainerRef) {
        super();
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        this.locals = new Map();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
    }
    /**
     * @return {?}
     */
    get origin() {
        return this.templateRef.elementRef;
    }
    /**
     * @param {?} host
     * @param {?=} locals
     * @return {?}
     */
    attach(host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return super.attach(host);
    }
    /**
     * @return {?}
     */
    detach() {
        this.locals = new Map();
        return super.detach();
    }
}
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
class BasePortalHost {
    constructor() {
        /**
         * Whether this host has already been permanently disposed.
         */
        this._isDisposed = false;
    }
    /**
     * Whether this host has an attached portal.
     * @return {?}
     */
    hasAttached() {
        return !!this._attachedPortal;
    }
    /**
     * @param {?} portal
     * @return {?}
     */
    attach(portal) {
        if (!portal) {
            throwNullPortalError();
        }
        if (this.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throwPortalHostAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throwUnknownPortalTypeError();
    }
    /**
     * @abstract
     * @template T
     * @param {?} portal
     * @return {?}
     */
    attachComponentPortal(portal) { }
    /**
     * @abstract
     * @param {?} portal
     * @return {?}
     */
    attachTemplatePortal(portal) { }
    /**
     * @return {?}
     */
    detach() {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setDisposeFn(fn) {
        this._disposeFn = fn;
    }
    /**
     * @return {?}
     */
    _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}

/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <ng-template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </ng-template>
 */
class TemplatePortalDirective extends TemplatePortal {
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
TemplatePortalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-portal], [cdkPortal], [portal]',
                exportAs: 'cdkPortal',
            },] },
];
/**
 * @nocollapse
 */
TemplatePortalDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
class PortalHostDirective extends BasePortalHost {
    /**
     * @param {?} _componentFactoryResolver
     * @param {?} _viewContainerRef
     */
    constructor(_componentFactoryResolver, _viewContainerRef) {
        super();
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedPortal() { return this.portal; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _deprecatedPortal(v) { this.portal = v; }
    /**
     * Portal associated with the Portal host.
     * @return {?}
     */
    get portal() {
        return this._portal;
    }
    /**
     * @param {?} portal
     * @return {?}
     */
    set portal(portal) {
        if (this.hasAttached()) {
            super.detach();
        }
        if (portal) {
            super.attach(portal);
        }
        this._portal = portal;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.dispose();
        this._portal = null;
    }
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @template T
     * @param {?} portal Portal to be attached to the portal host.
     * @return {?}
     */
    attachComponentPortal(portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        let /** @type {?} */ viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        let /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let /** @type {?} */ ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        super.setDisposeFn(() => ref.destroy());
        this._portal = portal;
        return ref;
    }
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    attachTemplatePortal(portal) {
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        super.setDisposeFn(() => this._viewContainerRef.clear());
        this._portal = portal;
        // TODO(jelbourn): return locals from view
        return new Map();
    }
}
PortalHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkPortalHost], [portalHost]',
                inputs: ['portal: cdkPortalHost']
            },] },
];
/**
 * @nocollapse
 */
PortalHostDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: ViewContainerRef, },
];
PortalHostDirective.propDecorators = {
    '_deprecatedPortal': [{ type: Input, args: ['portalHost',] },],
};
class PortalModule {
}
PortalModule.decorators = [
    { type: NgModule, args: [{
                exports: [TemplatePortalDirective, PortalHostDirective],
                declarations: [TemplatePortalDirective, PortalHostDirective],
            },] },
];
/**
 * @nocollapse
 */
PortalModule.ctorParameters = () => [];

/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
class OverlayState {
    constructor() {
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
}

/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
class DomPortalHost extends BasePortalHost {
    /**
     * @param {?} _hostDomElement
     * @param {?} _componentFactoryResolver
     * @param {?} _appRef
     * @param {?} _defaultInjector
     */
    constructor(_hostDomElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        super();
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._defaultInjector = _defaultInjector;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @return {?}
     */
    attachComponentPortal(portal) {
        let /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let /** @type {?} */ componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(() => componentRef.destroy());
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    }
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    attachTemplatePortal(portal) {
        let /** @type {?} */ viewContainer = portal.viewContainerRef;
        let /** @type {?} */ viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.detectChanges();
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
        // To move the view to the specified host element. We just re-append the existing root nodes.
        viewRef.rootNodes.forEach(rootNode => this._hostDomElement.appendChild(rootNode));
        this.setDisposeFn((() => {
            let /** @type {?} */ index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    }
    /**
     * Clears out a portal from the DOM.
     * @return {?}
     */
    dispose() {
        super.dispose();
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    }
    /**
     * Gets the root HTMLElement for an instantiated component.
     * @param {?} componentRef
     * @return {?}
     */
    _getComponentRootNode(componentRef) {
        return (((componentRef.hostView)).rootNodes[0]);
    }
}

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
class OverlayRef {
    /**
     * @param {?} _portalHost
     * @param {?} _pane
     * @param {?} _state
     * @param {?} _ngZone
     */
    constructor(_portalHost, _pane, _state, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._ngZone = _ngZone;
        this._backdropElement = null;
        this._backdropClick = new Subject();
        this._attachments = new Subject();
        this._detachments = new Subject();
        this._state.scrollStrategy.attach(this);
    }
    /**
     * The overlay's HTML element
     * @return {?}
     */
    get overlayElement() {
        return this._pane;
    }
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param {?} portal Portal instance to which to attach the overlay.
     * @return {?} The portal attachment result.
     */
    attach(portal) {
        let /** @type {?} */ attachResult = this._portalHost.attach(portal);
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
    }
    /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    detach() {
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        this._state.scrollStrategy.disable();
        this._detachments.next();
        return this._portalHost.detach();
    }
    /**
     * Cleans up the overlay from the DOM.
     * @return {?}
     */
    dispose() {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.dispose();
        }
        this.detachBackdrop();
        this._portalHost.dispose();
        this._state.scrollStrategy.disable();
        this._detachments.next();
        this._detachments.complete();
        this._attachments.complete();
    }
    /**
     * Checks whether the overlay has been attached.
     * @return {?}
     */
    hasAttached() {
        return this._portalHost.hasAttached();
    }
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this._backdropClick.asObservable();
    }
    /**
     * Returns an observable that emits when the overlay has been attached.
     * @return {?}
     */
    attachments() {
        return this._attachments.asObservable();
    }
    /**
     * Returns an observable that emits when the overlay has been detached.
     * @return {?}
     */
    detachments() {
        return this._detachments.asObservable();
    }
    /**
     * Gets the current state config of the overlay.
     * @return {?}
     */
    getState() {
        return this._state;
    }
    /**
     * Updates the position of the overlay based on the position strategy.
     * @return {?}
     */
    updatePosition() {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    }
    /**
     * Updates the text direction of the overlay panel.
     * @return {?}
     */
    updateDirection() {
        this._pane.setAttribute('dir', this._state.direction);
    }
    /**
     * Updates the size of the overlay based on the overlay config.
     * @return {?}
     */
    updateSize() {
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
    }
    /**
     * Toggles the pointer events for the overlay pane element.
     * @param {?} enablePointer
     * @return {?}
     */
    _togglePointerEvents(enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    }
    /**
     * Attaches a backdrop for this overlay.
     * @return {?}
     */
    _attachBackdrop() {
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', () => this._backdropClick.next(null));
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(() => {
            if (this._backdropElement) {
                this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
            }
        });
    }
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     * @return {?}
     */
    _updateStackingOrder() {
        if (this._pane.nextSibling) {
            this._pane.parentNode.appendChild(this._pane);
        }
    }
    /**
     * Detaches the backdrop (if any) associated with the overlay.
     * @return {?}
     */
    detachBackdrop() {
        let /** @type {?} */ backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            let /** @type {?} */ finishDetach = () => {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (this._backdropElement == backdropToDetach) {
                    this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', finishDetach);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(() => {
                setTimeout(finishDetach, 500);
            });
        }
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function formatCssUnit(value) {
    return typeof value === 'string' ? (value) : `${value}px`;
}

/** Horizontal dimension of a connection point on the perimeter of the origin or overlay element. */
/**
 * The points of the origin element and the overlay element to connect.
 */
class ConnectionPositionPair {
    /**
     * @param {?} origin
     * @param {?} overlay
     */
    constructor(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
}
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
class ScrollableViewProperties {
}
/**
 * The change event emitted by the strategy when a fallback position is used.
 */
class ConnectedOverlayPositionChange {
    /**
     * @param {?} connectionPair
     * @param {?} scrollableViewProperties
     */
    constructor(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
}
/**
 * @nocollapse
 */
ConnectedOverlayPositionChange.ctorParameters = () => [
    { type: ConnectionPositionPair, },
    { type: ScrollableViewProperties, decorators: [{ type: Optional },] },
];

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
class ConnectedPositionStrategy {
    /**
     * @param {?} _connectedTo
     * @param {?} _originPos
     * @param {?} _overlayPos
     * @param {?} _viewportRuler
     */
    constructor(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
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
        this._onPositionChange = new Subject();
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(_originPos, _overlayPos);
    }
    /**
     * Whether the we're dealing with an RTL context
     * @return {?}
     */
    get _isRtl() {
        return this._dir === 'rtl';
    }
    /**
     * Emits an event when the connection point changes.
     * @return {?}
     */
    get onPositionChange() {
        return this._onPositionChange.asObservable();
    }
    /**
     * Ordered list of preferred positions, from most to least desirable.
     * @return {?}
     */
    get positions() {
        return this._preferredPositions;
    }
    /**
     * To be used to for any cleanup after the element gets destroyed.
     * @return {?}
     */
    dispose() { }
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS styles.
     * @return {?} Resolves when the styles have been applied.
     */
    apply(element) {
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        const /** @type {?} */ originRect = this._origin.getBoundingClientRect();
        const /** @type {?} */ overlayRect = element.getBoundingClientRect();
        // We use the viewport rect to determine whether a position would go off-screen.
        const /** @type {?} */ viewportRect = this._viewportRuler.getViewportRect();
        // Fallback point if none of the fallbacks fit into the viewport.
        let /** @type {?} */ fallbackPoint = null;
        let /** @type {?} */ fallbackPosition = null;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (let /** @type {?} */ pos of this._preferredPositions) {
            // Get the (x, y) point of connection on the origin, and then use that to get the
            // (top, left) coordinate for the overlay at `pos`.
            let /** @type {?} */ originPoint = this._getOriginConnectionPoint(originRect, pos);
            let /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(element, overlayRect, overlayPoint, pos);
                // Save the last connected position in case the position needs to be re-calculated.
                this._lastConnectedPosition = pos;
                // Notify that the position has been changed along with its change properties.
                const /** @type {?} */ scrollableViewProperties = this.getScrollableViewProperties(element);
                const /** @type {?} */ positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
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
    }
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    recalculateLastPosition() {
        const /** @type {?} */ originRect = this._origin.getBoundingClientRect();
        const /** @type {?} */ overlayRect = this._pane.getBoundingClientRect();
        const /** @type {?} */ viewportRect = this._viewportRuler.getViewportRect();
        const /** @type {?} */ lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        let /** @type {?} */ originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        let /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, lastPosition);
        this._setElementPosition(this._pane, overlayRect, overlayPoint, lastPosition);
    }
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    withScrollableContainers(scrollables) {
        this.scrollables = scrollables;
    }
    /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    withFallbackPosition(originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    }
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    withDirection(dir) {
        this._dir = dir;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    withOffsetX(offset) {
        this._offsetX = offset;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    withOffsetY(offset) {
        this._offsetY = offset;
        return this;
    }
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    _getStartX(rect) {
        return this._isRtl ? rect.right : rect.left;
    }
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    _getEndX(rect) {
        return this._isRtl ? rect.left : rect.right;
    }
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    _getOriginConnectionPoint(originRect, pos) {
        const /** @type {?} */ originStartX = this._getStartX(originRect);
        const /** @type {?} */ originEndX = this._getEndX(originRect);
        let /** @type {?} */ x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        let /** @type {?} */ y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x, y };
    }
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
    _getOverlayPoint(originPoint, overlayRect, viewportRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
        // relative to the origin point.
        let /** @type {?} */ overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl ? 0 : -overlayRect.width;
        }
        let /** @type {?} */ overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        // The (x, y) coordinates of the overlay.
        let /** @type {?} */ x = originPoint.x + overlayStartX + this._offsetX;
        let /** @type {?} */ y = originPoint.y + overlayStartY + this._offsetY;
        // How much the overlay would overflow at this position, on each side.
        let /** @type {?} */ leftOverflow = 0 - x;
        let /** @type {?} */ rightOverflow = (x + overlayRect.width) - viewportRect.width;
        let /** @type {?} */ topOverflow = 0 - y;
        let /** @type {?} */ bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        // Visible parts of the element on each axis.
        let /** @type {?} */ visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        let /** @type {?} */ visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        // The area of the element that's within the viewport.
        let /** @type {?} */ visibleArea = visibleWidth * visibleHeight;
        let /** @type {?} */ fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x, y, fitsInViewport, visibleArea };
    }
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    getScrollableViewProperties(overlay) {
        const /** @type {?} */ originBounds = this._getElementBounds(this._origin);
        const /** @type {?} */ overlayBounds = this._getElementBounds(overlay);
        const /** @type {?} */ scrollContainerBounds = this.scrollables.map((scrollable) => {
            return this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    }
    /**
     * Whether the element is completely out of the view of any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    isElementOutsideView(elementBounds, containersBounds) {
        return containersBounds.some((containerBounds) => {
            const /** @type {?} */ outsideAbove = elementBounds.bottom < containerBounds.top;
            const /** @type {?} */ outsideBelow = elementBounds.top > containerBounds.bottom;
            const /** @type {?} */ outsideLeft = elementBounds.right < containerBounds.left;
            const /** @type {?} */ outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    }
    /**
     * Whether the element is clipped by any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    isElementClipped(elementBounds, containersBounds) {
        return containersBounds.some((containerBounds) => {
            const /** @type {?} */ clippedAbove = elementBounds.top < containerBounds.top;
            const /** @type {?} */ clippedBelow = elementBounds.bottom > containerBounds.bottom;
            const /** @type {?} */ clippedLeft = elementBounds.left < containerBounds.left;
            const /** @type {?} */ clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    }
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    _setElementPosition(element, overlayRect, overlayPoint, pos) {
        // We want to set either `top` or `bottom` based on whether the overlay wants to appear above
        // or below the origin and the direction in which the element will expand.
        let /** @type {?} */ verticalStyleProperty = pos.overlayY === 'bottom' ? 'bottom' : 'top';
        // When using `bottom`, we adjust the y position such that it is the distance
        // from the bottom of the viewport rather than the top.
        let /** @type {?} */ y = verticalStyleProperty === 'top' ?
            overlayPoint.y :
            document.documentElement.clientHeight - (overlayPoint.y + overlayRect.height);
        // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
        // or "after" the origin, which determines the direction in which the element will expand.
        // For the horizontal axis, the meaning of "before" and "after" change based on whether the
        // page is in RTL or LTR.
        let /** @type {?} */ horizontalStyleProperty;
        if (this._dir === 'rtl') {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'right' : 'left';
        }
        // When we're setting `right`, we adjust the x position such that it is the distance
        // from the right edge of the viewport rather than the left edge.
        let /** @type {?} */ x = horizontalStyleProperty === 'left' ?
            overlayPoint.x :
            document.documentElement.clientWidth - (overlayPoint.x + overlayRect.width);
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        ['top', 'bottom', 'left', 'right'].forEach(p => element.style[p] = null);
        element.style[verticalStyleProperty] = `${y}px`;
        element.style[horizontalStyleProperty] = `${x}px`;
    }
    /**
     * Returns the bounding positions of the provided element with respect to the viewport.
     * @param {?} element
     * @return {?}
     */
    _getElementBounds(element) {
        const /** @type {?} */ boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    }
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    _subtractOverflows(length, ...overflows) {
        return overflows.reduce((currentValue, currentOverflow) => {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    }
}

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
class GlobalPositionStrategy {
    constructor() {
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
    top(value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    }
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New left offset.
     * @return {?}
     */
    left(value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    }
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?} value New bottom offset.
     * @return {?}
     */
    bottom(value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    }
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New right offset.
     * @return {?}
     */
    right(value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    }
    /**
     * Sets the overlay width and clears any previously set width.
     * @param {?} value New width for the overlay
     * @return {?}
     */
    width(value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    }
    /**
     * Sets the overlay height and clears any previously set height.
     * @param {?} value New height for the overlay
     * @return {?}
     */
    height(value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    }
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    centerHorizontally(offset = '') {
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    }
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    centerVertically(offset = '') {
        this.top(offset);
        this._alignItems = 'center';
        return this;
    }
    /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS.
     * @return {?} Resolved when the styles have been applied.
     */
    apply(element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        let /** @type {?} */ styles = element.style;
        let /** @type {?} */ parentStyles = ((element.parentNode)).style;
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
    }
    /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    dispose() {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    }
}

/**
 * Builder for overlay position strategy.
 */
class OverlayPositionBuilder {
    /**
     * @param {?} _viewportRuler
     */
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /**
     * Creates a global position strategy.
     * @return {?}
     */
    global() {
        return new GlobalPositionStrategy();
    }
    /**
     * Creates a relative position strategy.
     * @param {?} elementRef
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    connectedTo(elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    }
}
OverlayPositionBuilder.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OverlayPositionBuilder.ctorParameters = () => [
    { type: ViewportRuler, },
];

/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
class OverlayContainer {
    /**
     * Base theme to be applied to all overlay-based components.
     * @return {?}
     */
    get themeClass() { return this._themeClass; }
    /**
     * @param {?} value
     * @return {?}
     */
    set themeClass(value) {
        if (this._containerElement) {
            this._containerElement.classList.remove(this._themeClass);
            if (value) {
                this._containerElement.classList.add(value);
            }
        }
        this._themeClass = value;
    }
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    getContainerElement() {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    }
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    _createContainer() {
        let /** @type {?} */ container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        if (this._themeClass) {
            container.classList.add(this._themeClass);
        }
        document.body.appendChild(container);
        this._containerElement = container;
    }
}
OverlayContainer.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OverlayContainer.ctorParameters = () => [];
/**
 * @param {?} parentContainer
 * @return {?}
 */
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer) {
    return parentContainer || new OverlayContainer();
}
const OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [[new Optional(), new SkipSelf(), OverlayContainer]],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};

/**
 * Next overlay unique ID.
 */
let nextUniqueId = 0;
/**
 * The default state for newly created overlays.
 */
let defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
class Overlay {
    /**
     * @param {?} _overlayContainer
     * @param {?} _componentFactoryResolver
     * @param {?} _positionBuilder
     * @param {?} _appRef
     * @param {?} _injector
     * @param {?} _ngZone
     */
    constructor(_overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
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
    create(state$$1 = defaultState) {
        return this._createOverlayRef(this._createPaneElement(), state$$1);
    }
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @return {?}
     */
    position() {
        return this._positionBuilder;
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @return {?} Newly-created pane element
     */
    _createPaneElement() {
        let /** @type {?} */ pane = document.createElement('div');
        pane.id = `cdk-overlay-${nextUniqueId++}`;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    }
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef, this._injector);
    }
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @param {?} state
     * @return {?}
     */
    _createOverlayRef(pane, state$$1) {
        return new OverlayRef(this._createPortalHost(pane), pane, state$$1, this._ngZone);
    }
}
Overlay.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Overlay.ctorParameters = () => [
    { type: OverlayContainer, },
    { type: ComponentFactoryResolver, },
    { type: OverlayPositionBuilder, },
    { type: ApplicationRef, },
    { type: Injector, },
    { type: NgZone, },
];
/**
 * Providers for Overlay and its related injectables.
 */
const OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    VIEWPORT_RULER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
];

/**
 * Default set of positions for the overlay. Follows the behavior of a dropdown.
 */
let defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
class OverlayOrigin {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
OverlayOrigin.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
                exportAs: 'cdkOverlayOrigin',
            },] },
];
/**
 * @nocollapse
 */
OverlayOrigin.ctorParameters = () => [
    { type: ElementRef, },
];
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
class ConnectedOverlayDirective {
    /**
     * @param {?} _overlay
     * @param {?} _renderer
     * @param {?} _scrollDispatcher
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} _dir
     */
    constructor(_overlay, _renderer, _scrollDispatcher, templateRef, viewContainerRef, _dir) {
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
        this.backdropClick = new EventEmitter();
        /**
         * Event emitted when the position has changed.
         */
        this.positionChange = new EventEmitter();
        /**
         * Event emitted when the overlay has been attached.
         */
        this.attach = new EventEmitter();
        /**
         * Event emitted when the overlay has been detached.
         */
        this.detach = new EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    /**
     * The offset in pixels for the overlay connection point on the x-axis
     * @return {?}
     */
    get offsetX() {
        return this._offsetX;
    }
    /**
     * @param {?} offsetX
     * @return {?}
     */
    set offsetX(offsetX) {
        this._offsetX = offsetX;
        if (this._position) {
            this._position.withOffsetX(offsetX);
        }
    }
    /**
     * The offset in pixels for the overlay connection point on the y-axis
     * @return {?}
     */
    get offsetY() {
        return this._offsetY;
    }
    /**
     * @param {?} offsetY
     * @return {?}
     */
    set offsetY(offsetY) {
        this._offsetY = offsetY;
        if (this._position) {
            this._position.withOffsetY(offsetY);
        }
    }
    /**
     * Whether or not the overlay should attach a backdrop.
     * @return {?}
     */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * The associated overlay reference.
     * @return {?}
     */
    get overlayRef() {
        return this._overlayRef;
    }
    /**
     * The element's layout direction.
     * @return {?}
     */
    get dir() {
        return this._dir ? this._dir.value : 'ltr';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyOverlay();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['open']) {
            this.open ? this._attachOverlay() : this._detachOverlay();
        }
    }
    /**
     * Creates an overlay
     * @return {?}
     */
    _createOverlay() {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    }
    /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    _buildConfig() {
        let /** @type {?} */ overlayConfig = new OverlayState();
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
    }
    /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    _createPositionStrategy() {
        const /** @type {?} */ pos = this.positions[0];
        const /** @type {?} */ originPoint = { originX: pos.originX, originY: pos.originY };
        const /** @type {?} */ overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        const /** @type {?} */ strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    }
    /**
     * @param {?} strategy
     * @return {?}
     */
    _handlePositionChanges(strategy) {
        for (let /** @type {?} */ i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(pos => this.positionChange.emit(pos));
    }
    /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    _attachOverlay() {
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
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
                this.backdropClick.emit();
            });
        }
    }
    /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    _detachOverlay() {
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
    }
    /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    _destroyOverlay() {
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
    }
    /**
     * Sets the event listener that closes the overlay when pressing Escape.
     * @return {?}
     */
    _initEscapeListener() {
        this._escapeListener = this._renderer.listen('document', 'keydown', (event) => {
            if (event.keyCode === ESCAPE) {
                this._detachOverlay();
            }
        });
    }
}
ConnectedOverlayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
                exportAs: 'cdkConnectedOverlay'
            },] },
];
/**
 * @nocollapse
 */
ConnectedOverlayDirective.ctorParameters = () => [
    { type: Overlay, },
    { type: Renderer2, },
    { type: ScrollDispatcher, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: Dir, decorators: [{ type: Optional },] },
];
ConnectedOverlayDirective.propDecorators = {
    'origin': [{ type: Input },],
    'positions': [{ type: Input },],
    'offsetX': [{ type: Input },],
    'offsetY': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'minWidth': [{ type: Input },],
    'minHeight': [{ type: Input },],
    'backdropClass': [{ type: Input },],
    'scrollStrategy': [{ type: Input },],
    'open': [{ type: Input },],
    'hasBackdrop': [{ type: Input },],
    'backdropClick': [{ type: Output },],
    'positionChange': [{ type: Output },],
    'attach': [{ type: Output },],
    'detach': [{ type: Output },],
};
class OverlayModule {
}
OverlayModule.decorators = [
    { type: NgModule, args: [{
                imports: [PortalModule, ScrollDispatchModule],
                exports: [ConnectedOverlayDirective, OverlayOrigin, ScrollDispatchModule],
                declarations: [ConnectedOverlayDirective, OverlayOrigin],
                providers: [OVERLAY_PROVIDERS],
            },] },
];
/**
 * @nocollapse
 */
OverlayModule.ctorParameters = () => [];

/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
class InteractivityChecker {
    /**
     * @param {?} _platform
     */
    constructor(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is disabled.
     */
    isDisabled(element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    }
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @param {?} element
     * @return {?} Whether the element is visible.
     */
    isVisible(element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    }
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is tabbable.
     */
    isTabbable(element) {
        let /** @type {?} */ frameElement = (getWindow(element).frameElement);
        if (frameElement) {
            let /** @type {?} */ frameType = frameElement && frameElement.nodeName.toLowerCase();
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
        let /** @type {?} */ nodeName = element.nodeName.toLowerCase();
        let /** @type {?} */ tabIndexValue = getTabIndexValue(element);
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
    }
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is focusable.
     */
    isFocusable(element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    }
}
InteractivityChecker.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
InteractivityChecker.ctorParameters = () => [
    { type: Platform, },
];
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
    let /** @type {?} */ nodeName = element.nodeName.toLowerCase();
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
    let /** @type {?} */ tabIndex = element.getAttribute('tabindex');
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
    const /** @type {?} */ tabIndex = parseInt(element.getAttribute('tabindex'), 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/**
 * Checks whether the specified element is potentially tabbable on iOS
 * @param {?} element
 * @return {?}
 */
function isPotentiallyTabbableIOS(element) {
    let /** @type {?} */ nodeName = element.nodeName.toLowerCase();
    let /** @type {?} */ inputType = nodeName === 'input' && ((element)).type;
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
class FocusTrap {
    /**
     * @param {?} _element
     * @param {?} _checker
     * @param {?} _ngZone
     * @param {?=} deferAnchors
     */
    constructor(_element, _checker, _ngZone, deferAnchors = false) {
        this._element = _element;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get enabled() { return this._enabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set enabled(val) {
        this._enabled = val;
        if (this._startAnchor && this._endAnchor) {
            this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
        }
    }
    /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    destroy() {
        if (this._startAnchor && this._startAnchor.parentNode) {
            this._startAnchor.parentNode.removeChild(this._startAnchor);
        }
        if (this._endAnchor && this._endAnchor.parentNode) {
            this._endAnchor.parentNode.removeChild(this._endAnchor);
        }
        this._startAnchor = this._endAnchor = null;
    }
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?}
     */
    attachAnchors() {
        if (!this._startAnchor) {
            this._startAnchor = this._createAnchor();
        }
        if (!this._endAnchor) {
            this._endAnchor = this._createAnchor();
        }
        this._ngZone.runOutsideAngular(() => {
            this._startAnchor.addEventListener('focus', () => this.focusLastTabbableElement());
            this._endAnchor.addEventListener('focus', () => this.focusFirstTabbableElement());
            this._element.parentNode.insertBefore(this._startAnchor, this._element);
            this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
        });
    }
    /**
     * @return {?}
     */
    focusInitialElementWhenReady() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this.focusInitialElement());
    }
    /**
     * Waits for microtask queue to empty, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?}
     */
    focusFirstTabbableElementWhenReady() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this.focusFirstTabbableElement());
    }
    /**
     * Waits for microtask queue to empty, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?}
     */
    focusLastTabbableElementWhenReady() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this.focusLastTabbableElement());
    }
    /**
     * Get the specified boundary element of the trapped region.
     * @param {?} bound The boundary to get (start or end of trapped region).
     * @return {?} The boundary element.
     */
    _getRegionBoundary(bound) {
        let /** @type {?} */ markers = [
            ...Array.prototype.slice.call(this._element.querySelectorAll(`[cdk-focus-region-${bound}]`)),
            // Deprecated version of selector, for temporary backwards comparability:
            ...Array.prototype.slice.call(this._element.querySelectorAll(`[cdk-focus-${bound}]`)),
        ];
        markers.forEach((el) => {
            if (el.hasAttribute(`cdk-focus-${bound}`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}',` +
                    ` use 'cdk-focus-region-${bound}' instead.`, el);
            }
        });
        if (bound == 'start') {
            return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
        }
        return markers.length ?
            markers[markers.length - 1] : this._getLastTabbableElement(this._element);
    }
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @return {?}
     */
    focusInitialElement() {
        let /** @type {?} */ redirectToElement = (this._element.querySelector('[cdk-focus-initial]'));
        if (redirectToElement) {
            redirectToElement.focus();
        }
        else {
            this.focusFirstTabbableElement();
        }
    }
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?}
     */
    focusFirstTabbableElement() {
        let /** @type {?} */ redirectToElement = this._getRegionBoundary('start');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    }
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?}
     */
    focusLastTabbableElement() {
        let /** @type {?} */ redirectToElement = this._getRegionBoundary('end');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    }
    /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    _getFirstTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        let /** @type {?} */ children = root.children || root.childNodes;
        for (let /** @type {?} */ i = 0; i < children.length; i++) {
            let /** @type {?} */ tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getFirstTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    _getLastTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        let /** @type {?} */ children = root.children || root.childNodes;
        for (let /** @type {?} */ i = children.length - 1; i >= 0; i--) {
            let /** @type {?} */ tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getLastTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /**
     * Creates an anchor element.
     * @return {?}
     */
    _createAnchor() {
        let /** @type {?} */ anchor = document.createElement('div');
        anchor.tabIndex = this._enabled ? 0 : -1;
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        return anchor;
    }
}
/**
 * Factory that allows easy instantiation of focus traps.
 */
class FocusTrapFactory {
    /**
     * @param {?} _checker
     * @param {?} _ngZone
     */
    constructor(_checker, _ngZone) {
        this._checker = _checker;
        this._ngZone = _ngZone;
    }
    /**
     * @param {?} element
     * @param {?=} deferAnchors
     * @return {?}
     */
    create(element, deferAnchors = false) {
        return new FocusTrap(element, this._checker, this._ngZone, deferAnchors);
    }
}
FocusTrapFactory.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FocusTrapFactory.ctorParameters = () => [
    { type: InteractivityChecker, },
    { type: NgZone, },
];
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
class FocusTrapDeprecatedDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    constructor(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get disabled() { return !this.focusTrap.enabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set disabled(val) {
        this.focusTrap.enabled = !coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusTrap.destroy();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
    }
}
FocusTrapDeprecatedDirective.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-focus-trap',
            },] },
];
/**
 * @nocollapse
 */
FocusTrapDeprecatedDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusTrapFactory, },
];
FocusTrapDeprecatedDirective.propDecorators = {
    'disabled': [{ type: Input },],
};
/**
 * Directive for trapping focus within a region.
 */
class FocusTrapDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    constructor(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get enabled() { return this.focusTrap.enabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set enabled(value) { this.focusTrap.enabled = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusTrap.destroy();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
    }
}
FocusTrapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTrapFocus]',
                exportAs: 'cdkTrapFocus',
            },] },
];
/**
 * @nocollapse
 */
FocusTrapDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusTrapFactory, },
];
FocusTrapDirective.propDecorators = {
    'enabled': [{ type: Input, args: ['cdkTrapFocus',] },],
};

const LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken('liveAnnouncerElement');
class LiveAnnouncer {
    /**
     * @param {?} elementToken
     * @param {?} platform
     */
    constructor(elementToken, platform) {
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
    announce(message, politeness = 'polite') {
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(() => this._liveElement.textContent = message, 100);
    }
    /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    _removeLiveElement() {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    }
    /**
     * @return {?}
     */
    _createLiveElement() {
        let /** @type {?} */ liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    }
}
LiveAnnouncer.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
LiveAnnouncer.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] },] },
    { type: Platform, },
];
/**
 * @param {?} parentDispatcher
 * @param {?} liveElement
 * @param {?} platform
 * @return {?}
 */
function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement, platform) {
    return parentDispatcher || new LiveAnnouncer(liveElement, platform);
}
const LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        Platform,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};

class A11yModule {
}
A11yModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PlatformModule],
                declarations: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                exports: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
            },] },
];
/**
 * @nocollapse
 */
A11yModule.ctorParameters = () => [];

/**
 * The FullscreenOverlayContainer is the alternative to OverlayContainer
 * that supports correct displaying of overlay elements in Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 * It should be provided in the root component that way:
 * providers: [
 *   {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
 * ],
 */
class FullscreenOverlayContainer extends OverlayContainer {
    /**
     * @return {?}
     */
    _createContainer() {
        super._createContainer();
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
    }
    /**
     * @return {?}
     */
    _adjustParentForFullscreenChange() {
        if (!this._containerElement) {
            return;
        }
        let /** @type {?} */ fullscreenElement = this.getFullscreenElement();
        let /** @type {?} */ parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    _addFullscreenChangeListener(fn) {
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
    }
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    getFullscreenElement() {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            ((document)).mozFullScreenElement ||
            ((document)).msFullscreenElement ||
            null;
    }
}
FullscreenOverlayContainer.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FullscreenOverlayContainer.ctorParameters = () => [];

class GestureConfig extends HammerGestureConfig {
    constructor() {
        super();
        this._hammer = typeof window !== 'undefined' ? ((window)).Hammer : null;
        /* List of new event names to add to the gesture support list */
        this.events = this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!this._hammer && isDevMode()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
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
    buildHammer(element) {
        const /** @type {?} */ mc = new this._hammer(element);
        // Default Hammer Recognizers.
        let /** @type {?} */ pan = new this._hammer.Pan();
        let /** @type {?} */ swipe = new this._hammer.Swipe();
        let /** @type {?} */ press = new this._hammer.Press();
        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
        // Otherwise the previous `recognizeWith` will be dropped.
        // TODO: Confirm threshold numbers with Material Design UX Team
        let /** @type {?} */ slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        let /** @type {?} */ longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return (mc);
    }
    /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    _createRecognizer(base, options, ...inheritances) {
        let /** @type {?} */ recognizer = new ((base.constructor))(options);
        inheritances.push(base);
        inheritances.forEach(item => recognizer.recognizeWith(item));
        return recognizer;
    }
}
GestureConfig.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
GestureConfig.ctorParameters = () => [];

/**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 */
class SelectionModel {
    /**
     * @param {?=} _isMulti
     * @param {?=} initiallySelectedValues
     * @param {?=} _emitChanges
     */
    constructor(_isMulti = false, initiallySelectedValues, _emitChanges = true) {
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
        this.onChange = this._emitChanges ? new Subject() : null;
        if (initiallySelectedValues) {
            if (_isMulti) {
                initiallySelectedValues.forEach(value => this._markSelected(value));
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    /**
     * Selected value(s).
     * @return {?}
     */
    get selected() {
        if (!this._selected) {
            this._selected = Array.from(this._selection.values());
        }
        return this._selected;
    }
    /**
     * Selects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    select(value) {
        this._markSelected(value);
        this._emitChangeEvent();
    }
    /**
     * Deselects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    deselect(value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    }
    /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    toggle(value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    }
    /**
     * Clears all of the selected values.
     * @return {?}
     */
    clear() {
        this._unmarkAll();
        this._emitChangeEvent();
    }
    /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    isSelected(value) {
        return this._selection.has(value);
    }
    /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    isEmpty() {
        return this._selection.size === 0;
    }
    /**
     * Determines whether the model has a value.
     * @return {?}
     */
    hasValue() {
        return !this.isEmpty();
    }
    /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    sort(predicate) {
        if (this._isMulti && this.selected) {
            this._selected.sort(predicate);
        }
    }
    /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    _emitChangeEvent() {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            let /** @type {?} */ eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
        this._selected = null;
    }
    /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    _markSelected(value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    }
    /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    _unmarkSelected(value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    }
    /**
     * Clears out the selected values.
     * @return {?}
     */
    _unmarkAll() {
        if (!this.isEmpty()) {
            this._selection.forEach(value => this._unmarkSelected(value));
        }
    }
}
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 */
class SelectionChange {
    /**
     * @param {?=} added
     * @param {?=} removed
     */
    constructor(added, removed) {
        this.added = added;
        this.removed = removed;
    }
}

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
class UniqueSelectionDispatcher {
    constructor() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    notify(id, name) {
        for (let /** @type {?} */ listener of this._listeners) {
            listener(id, name);
        }
    }
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    listen(listener) {
        this._listeners.push(listener);
    }
}
UniqueSelectionDispatcher.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UniqueSelectionDispatcher.ctorParameters = () => [];
/**
 * @param {?} parentDispatcher
 * @return {?}
 */
function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
const UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new Optional(), new SkipSelf(), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};

// This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
const TOUCH_BUFFER_MS = 650;
/**
 * Monitors mouse and keyboard events to determine the cause of focus events.
 */
class FocusOriginMonitor {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    constructor(_ngZone, _platform) {
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
        this._ngZone.runOutsideAngular(() => this._registerDocumentEvents());
    }
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param {?} element The element to monitor
     * @param {?} renderer The renderer to use to apply CSS classes to the element.
     * @param {?} checkChildren Whether to count the element as focused when its children are focused.
     * @return {?} An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    monitor(element, renderer, checkChildren) {
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return Observable.of();
        }
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            let /** @type {?} */ info = this._elementInfo.get(element);
            info.checkChildren = checkChildren;
            return info.subject.asObservable();
        }
        // Create monitored element info.
        let /** @type {?} */ info = {
            unlisten: null,
            checkChildren: checkChildren,
            renderer: renderer,
            subject: new Subject()
        };
        this._elementInfo.set(element, info);
        // Start listening. We need to listen in capture phase since focus events don't bubble.
        let /** @type {?} */ focusListener = (event) => this._onFocus(event, element);
        let /** @type {?} */ blurListener = (event) => this._onBlur(event, element);
        this._ngZone.runOutsideAngular(() => {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        });
        // Create an unlisten function for later.
        info.unlisten = () => {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        };
        return info.subject.asObservable();
    }
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    stopMonitoring(element) {
        let /** @type {?} */ elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            elementInfo.unlisten();
            elementInfo.subject.complete();
            this._setClasses(element, null);
            this._elementInfo.delete(element);
        }
    }
    /**
     * Focuses the element via the specified focus origin.
     * @param {?} element The element to focus.
     * @param {?} renderer The renderer to use to invoke the focus method on the element.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    focusVia(element, renderer, origin) {
        this._setOriginForCurrentEventQueue(origin);
        element.focus();
    }
    /**
     * Register necessary event listeners on the document and window.
     * @return {?}
     */
    _registerDocumentEvents() {
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return;
        }
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        // On keydown record the origin and clear any touch event that may be in progress.
        document.addEventListener('keydown', () => {
            this._lastTouchTarget = null;
            this._setOriginForCurrentEventQueue('keyboard');
        }, true);
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        document.addEventListener('mousedown', () => {
            if (!this._lastTouchTarget) {
                this._setOriginForCurrentEventQueue('mouse');
            }
        }, true);
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        document.addEventListener('touchstart', (event) => {
            if (this._touchTimeout != null) {
                clearTimeout(this._touchTimeout);
            }
            this._lastTouchTarget = event.target;
            this._touchTimeout = setTimeout(() => this._lastTouchTarget = null, TOUCH_BUFFER_MS);
        }, true);
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        window.addEventListener('focus', () => {
            this._windowFocused = true;
            setTimeout(() => this._windowFocused = false, 0);
        });
    }
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param {?} element The element to update the classes on.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    _setClasses(element, origin) {
        let /** @type {?} */ renderer = this._elementInfo.get(element).renderer;
        let /** @type {?} */ toggleClass = (className, shouldSet) => {
            shouldSet ? renderer.addClass(element, className) : renderer.removeClass(element, className);
        };
        toggleClass('cdk-focused', !!origin);
        toggleClass('cdk-touch-focused', origin === 'touch');
        toggleClass('cdk-keyboard-focused', origin === 'keyboard');
        toggleClass('cdk-mouse-focused', origin === 'mouse');
        toggleClass('cdk-program-focused', origin === 'program');
    }
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param {?} origin The origin to set.
     * @return {?}
     */
    _setOriginForCurrentEventQueue(origin) {
        this._origin = origin;
        setTimeout(() => this._origin = null, 0);
    }
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param {?} event The focus event to check.
     * @return {?} Whether the event was caused by a touch.
     */
    _wasCausedByTouch(event) {
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
        let /** @type {?} */ focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    }
    /**
     * Handles focus events on a registered element.
     * @param {?} event The focus event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    _onFocus(event, element) {
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
    }
    /**
     * Handles blur events on a registered element.
     * @param {?} event The blur event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    _onBlur(event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        if (this._elementInfo.get(element).checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget)) {
            return;
        }
        this._setClasses(element, null);
        this._elementInfo.get(element).subject.next(null);
    }
}
FocusOriginMonitor.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FocusOriginMonitor.ctorParameters = () => [
    { type: NgZone, },
    { type: Platform, },
];
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
class CdkMonitorFocus {
    /**
     * @param {?} _elementRef
     * @param {?} _focusOriginMonitor
     * @param {?} renderer
     */
    constructor(_elementRef, _focusOriginMonitor, renderer) {
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this.cdkFocusChange = new EventEmitter();
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(origin => this.cdkFocusChange.emit(origin));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}
CdkMonitorFocus.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]',
            },] },
];
/**
 * @nocollapse
 */
CdkMonitorFocus.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusOriginMonitor, },
    { type: Renderer2, },
];
CdkMonitorFocus.propDecorators = {
    'cdkFocusChange': [{ type: Output },],
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
const FOCUS_ORIGIN_MONITOR_PROVIDER = {
    // If there is already a FocusOriginMonitor available, use that. Otherwise, provide a new one.
    provide: FocusOriginMonitor,
    deps: [[new Optional(), new SkipSelf(), FocusOriginMonitor], NgZone, Platform],
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
    let /** @type {?} */ value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}

class StyleModule {
}
StyleModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                declarations: [CdkMonitorFocus],
                exports: [CdkMonitorFocus],
                providers: [FOCUS_ORIGIN_MONITOR_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
StyleModule.ctorParameters = () => [];

/**
 * \@docs-private
 */
class AnimationCurves {
}
AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
/**
 * \@docs-private
 */
class AnimationDurations {
}
AnimationDurations.COMPLEX = '375ms';
AnimationDurations.ENTERING = '225ms';
AnimationDurations.EXITING = '195ms';

/**
 * Coerces a data-bound value (typically a string) to a number.
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
function coerceNumberProperty(value, fallbackValue = 0) {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return isNaN(parseFloat(/** @type {?} */ (value))) || isNaN(Number(value)) ? fallbackValue : Number(value);
}

class MdCoreModule {
}
MdCoreModule.decorators = [
    { type: NgModule, args: [{
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
MdCoreModule.ctorParameters = () => [];

/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
class ListKeyManager {
    /**
     * @param {?} _items
     */
    constructor(_items) {
        this._items = _items;
        this._activeItemIndex = null;
        this._tabOut = new Subject();
        this._wrap = false;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @return {?} The ListKeyManager that the method was called on.
     */
    withWrap() {
        this._wrap = true;
        return this;
    }
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param {?} index The index of the item to be set as active.
     * @return {?}
     */
    setActiveItem(index) {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    }
    /**
     * Sets the active item depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    onKeydown(event) {
        switch (event.keyCode) {
            case DOWN_ARROW:
                this.setNextItemActive();
                break;
            case UP_ARROW:
                this.setPreviousItemActive();
                break;
            case TAB:
                // Note that we shouldn't prevent the default action on tab.
                this._tabOut.next(null);
                return;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
     * Returns the index of the currently active item.
     * @return {?}
     */
    get activeItemIndex() {
        return this._activeItemIndex;
    }
    /**
     * Returns the currently active item.
     * @return {?}
     */
    get activeItem() {
        return this._activeItem;
    }
    /**
     * Sets the active item to the first enabled item in the list.
     * @return {?}
     */
    setFirstItemActive() {
        this._setActiveItemByIndex(0, 1);
    }
    /**
     * Sets the active item to the last enabled item in the list.
     * @return {?}
     */
    setLastItemActive() {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    }
    /**
     * Sets the active item to the next enabled item in the list.
     * @return {?}
     */
    setNextItemActive() {
        this._activeItemIndex === null ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    }
    /**
     * Sets the active item to a previous enabled item in the list.
     * @return {?}
     */
    setPreviousItemActive() {
        this._activeItemIndex === null && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    }
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param {?} index The new activeItemIndex.
     * @return {?}
     */
    updateActiveItemIndex(index) {
        this._activeItemIndex = index;
    }
    /**
     * Observable that emits any time the TAB key is pressed, so components can react
     * when focus is shifted off of the list.
     * @return {?}
     */
    get tabOut() {
        return this._tabOut.asObservable();
    }
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @param {?} delta
     * @param {?=} items
     * @return {?}
     */
    _setActiveItemByDelta(delta, items = this._items.toArray()) {
        this._wrap ? this._setActiveInWrapMode(delta, items)
            : this._setActiveInDefaultMode(delta, items);
    }
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    _setActiveInWrapMode(delta, items) {
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
    }
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    _setActiveInDefaultMode(delta, items) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta, items);
    }
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @param {?} index
     * @param {?} fallbackDelta
     * @param {?=} items
     * @return {?}
     */
    _setActiveItemByIndex(index, fallbackDelta, items = this._items.toArray()) {
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
    }
}

class ActiveDescendantKeyManager extends ListKeyManager {
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     * @param {?} index
     * @return {?}
     */
    setActiveItem(index) {
        Promise.resolve().then(() => {
            if (this.activeItem) {
                this.activeItem.setInactiveStyles();
            }
            super.setActiveItem(index);
            if (this.activeItem) {
                this.activeItem.setActiveStyles();
            }
        });
    }
}

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueAutocompleteIdCounter = 0;
class MdAutocomplete {
    /**
     * @param {?} _changeDetectorRef
     */
    constructor(_changeDetectorRef) {
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
        this.id = `md-autocomplete-${_uniqueAutocompleteIdCounter++}`;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap();
    }
    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display
     * options below the fold, as they are not actually being focused when active.
     * @param {?} scrollTop
     * @return {?}
     */
    _setScrollTop(scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    }
    /**
     * Panel should hide itself when the option list is empty.
     * @return {?}
     */
    _setVisibility() {
        Promise.resolve().then(() => {
            this.showPanel = !!this.options.length;
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * Sets a class on the panel based on its position (used to set y-offset).
     * @return {?}
     */
    _getClassList() {
        return {
            'mat-autocomplete-panel-below': this.positionY === 'below',
            'mat-autocomplete-panel-above': this.positionY === 'above',
            'mat-autocomplete-visible': this.showPanel,
            'mat-autocomplete-hidden': !this.showPanel
        };
    }
}
MdAutocomplete.decorators = [
    { type: Component, args: [{selector: 'md-autocomplete, mat-autocomplete',
                template: "<ng-template> <div class=\"mat-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"_getClassList()\" #panel> <ng-content></ng-content> </div> </ng-template> ",
                styles: [".mat-autocomplete-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative}.mat-autocomplete-panel.mat-autocomplete-panel-below{top:6px}.mat-autocomplete-panel.mat-autocomplete-panel-above{top:-24px}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden} /*# sourceMappingURL=autocomplete.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mdAutocomplete',
                host: {
                    '[class.mat-autocomplete]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdAutocomplete.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
MdAutocomplete.propDecorators = {
    'template': [{ type: ViewChild, args: [TemplateRef,] },],
    'panel': [{ type: ViewChild, args: ['panel',] },],
    'options': [{ type: ContentChildren, args: [MdOption,] },],
    'displayWith': [{ type: Input },],
};

// import {MdInputContainer} from '../input/input-container';
/**
 * The height of each autocomplete option.
 */
const AUTOCOMPLETE_OPTION_HEIGHT = 48;
/**
 * The total height of the autocomplete panel.
 */
const AUTOCOMPLETE_PANEL_HEIGHT = 256;
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 */
const MD_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdAutocompleteTrigger),
    multi: true
};
class MdAutocompleteTrigger {
    /**
     * @param {?} _element
     * @param {?} _overlay
     * @param {?} _viewContainerRef
     * @param {?} _changeDetectorRef
     * @param {?} _scrollDispatcher
     * @param {?} _dir
     * @param {?} _zone
     * @param {?} _document
     */
    constructor(_element, _overlay, _viewContainerRef, _changeDetectorRef, _scrollDispatcher, _dir, _zone, _document) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._dir = _dir;
        this._zone = _zone;
        this._document = _document;
        this._panelOpen = false;
        /**
         * Whether or not the placeholder state is being overridden.
         */
        this._manuallyFloatingPlaceholder = false;
        /**
         * View -> model callback called when value changes
         */
        this._onChange = (value) => { };
        /**
         * View -> model callback called when autocomplete has been touched
         */
        this._onTouched = () => { };
    }
    /**
     * Property with mat- prefix for no-conflict mode.
     * @return {?}
     */
    get _matAutocomplete() {
        return this.autocomplete;
    }
    /**
     * @param {?} autocomplete
     * @return {?}
     */
    set _matAutocomplete(autocomplete) {
        this.autocomplete = autocomplete;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._panelPositionSubscription) {
            this._panelPositionSubscription.unsubscribe();
        }
        this._destroyPanel();
    }
    /**
     * @return {?}
     */
    get panelOpen() {
        return this._panelOpen && this.autocomplete.showPanel;
    }
    /**
     * Opens the autocomplete suggestion panel.
     * @return {?}
     */
    openPanel() {
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
    }
    /**
     * Closes the autocomplete suggestion panel.
     * @return {?}
     */
    closePanel() {
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
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     * @return {?}
     */
    get panelClosingActions() {
        return Observable.merge(this.optionSelections, this.autocomplete._keyManager.tabOut, this._outsideClickStream);
    }
    /**
     * Stream of autocomplete option selections.
     * @return {?}
     */
    get optionSelections() {
        return Observable.merge(...this.autocomplete.options.map(option => option.onSelectionChange));
    }
    /**
     * The currently active option, coerced to MdOption type.
     * @return {?}
     */
    get activeOption() {
        if (this.autocomplete._keyManager) {
            return (this.autocomplete._keyManager.activeItem);
        }
    }
    /**
     * Stream of clicks outside of the autocomplete panel.
     * @return {?}
     */
    get _outsideClickStream() {
        if (this._document) {
            return Observable.fromEvent(this._document, 'click').filter((event) => {
                const /** @type {?} */ clickTarget = (event.target);
                const /** @type {?} */ inputContainer = this._inputContainer ?
                    this._inputContainer._elementRef.nativeElement : null;
                return this._panelOpen &&
                    clickTarget !== this._element.nativeElement &&
                    (!inputContainer || !inputContainer.contains(clickTarget)) &&
                    !this._overlayRef.overlayElement.contains(clickTarget);
            });
        }
    }
    /**
     * Sets the autocomplete's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    writeValue(value) {
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    /**
     * Saves a callback function to be invoked when the autocomplete's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Saves a callback function to be invoked when the autocomplete is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (this.activeOption && event.keyCode === ENTER) {
            this.activeOption._selectViaInteraction();
            event.preventDefault();
        }
        else {
            const /** @type {?} */ prevActiveItem = this.autocomplete._keyManager.activeItem;
            const /** @type {?} */ isArrowKey = event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW;
            this.autocomplete._keyManager.onKeydown(event);
            if (isArrowKey) {
                this.openPanel();
            }
            Promise.resolve().then(() => {
                if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
                    this._scrollToOption();
                }
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleInput(event) {
        // We need to ensure that the input is focused, because IE will fire the `input`
        // event on focus/blur/load if the input has a placeholder. See:
        // https://connect.microsoft.com/IE/feedback/details/885747/
        if (document.activeElement === event.target) {
            this._onChange(((event.target)).value);
            this.openPanel();
        }
    }
    /**
     * In "auto" mode, the placeholder will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the placeholder until the panel can be closed.
     * @return {?}
     */
    _floatPlaceholder() {
        if (this._inputContainer && this._inputContainer.floatPlaceholder === 'auto') {
            this._inputContainer.floatPlaceholder = 'always';
            this._manuallyFloatingPlaceholder = true;
        }
    }
    /**
     * If the placeholder has been manually elevated, return it to its normal state.
     * @return {?}
     */
    _resetPlaceholder() {
        if (this._manuallyFloatingPlaceholder && this._inputContainer) {
            this._inputContainer.floatPlaceholder = 'auto';
            this._manuallyFloatingPlaceholder = false;
        }
    }
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. The new scrollTop will be that offset - the panel height + the option
     * height, so the active option will be just visible at the bottom of the panel.
     * @return {?}
     */
    _scrollToOption() {
        const /** @type {?} */ optionOffset = this.autocomplete._keyManager.activeItemIndex * AUTOCOMPLETE_OPTION_HEIGHT;
        const /** @type {?} */ newScrollTop = Math.max(0, optionOffset - AUTOCOMPLETE_PANEL_HEIGHT + AUTOCOMPLETE_OPTION_HEIGHT);
        this.autocomplete._setScrollTop(newScrollTop);
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @return {?}
     */
    _subscribeToClosingActions() {
        // When the zone is stable initially, and when the option list changes...
        Observable.merge(this._zone.onStable.first(), this.autocomplete.options.changes)
            .switchMap(() => {
            this._resetPanel();
            return this.panelClosingActions;
        })
            .first()
            .subscribe(event => this._setValueAndClose(event));
    }
    /**
     * Destroys the autocomplete suggestion panel.
     * @return {?}
     */
    _destroyPanel() {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _setTriggerValue(value) {
        const /** @type {?} */ toDisplay = this.autocomplete.displayWith ? this.autocomplete.displayWith(value) : value;
        this._element.nativeElement.value = toDisplay || '';
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     * @param {?} event
     * @return {?}
     */
    _setValueAndClose(event) {
        if (event && event.source) {
            this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source.value);
            this._onChange(event.source.value);
            this._element.nativeElement.focus();
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     * @param {?} skip
     * @return {?}
     */
    _clearPreviousSelectedOption(skip) {
        this.autocomplete.options.forEach((option) => {
            if (option != skip && option.selected) {
                option.deselect();
            }
        });
    }
    /**
     * @return {?}
     */
    _createOverlay() {
        this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef);
        this._overlayRef = this._overlay.create(this._getOverlayConfig());
    }
    /**
     * @return {?}
     */
    _getOverlayConfig() {
        const /** @type {?} */ overlayState = new OverlayState();
        overlayState.positionStrategy = this._getOverlayPosition();
        overlayState.width = this._getHostWidth();
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        overlayState.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
        return overlayState;
    }
    /**
     * @return {?}
     */
    _getOverlayPosition() {
        this._positionStrategy = this._overlay.position().connectedTo(this._element, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
        this._subscribeToPositionChanges(this._positionStrategy);
        return this._positionStrategy;
    }
    /**
     * This method subscribes to position changes in the autocomplete panel, so the panel's
     * y-offset can be adjusted to match the new position.
     * @param {?} strategy
     * @return {?}
     */
    _subscribeToPositionChanges(strategy) {
        this._panelPositionSubscription = strategy.onPositionChange.subscribe(change => {
            this.autocomplete.positionY = change.connectionPair.originY === 'top' ? 'above' : 'below';
        });
    }
    /**
     * Returns the width of the input element, so the panel width can match it.
     * @return {?}
     */
    _getHostWidth() {
        return this._element.nativeElement.getBoundingClientRect().width;
    }
    /**
     * Reset active item to null so arrow events will activate the correct options.
     * @return {?}
     */
    _resetActiveItem() {
        this.autocomplete._keyManager.setActiveItem(null);
    }
    /**
     * Resets the active item and re-calculates alignment of the panel in case its size
     * has changed due to fewer or greater number of options.
     * @return {?}
     */
    _resetPanel() {
        this._resetActiveItem();
        this._positionStrategy.recalculateLastPosition();
        this.autocomplete._setVisibility();
    }
}
MdAutocompleteTrigger.decorators = [
    { type: Directive, args: [{
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
MdAutocompleteTrigger.ctorParameters = () => [
    { type: ElementRef, },
    { type: Overlay, },
    { type: ViewContainerRef, },
    { type: ChangeDetectorRef, },
    { type: ScrollDispatcher, },
    { type: Dir, decorators: [{ type: Optional },] },
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
];
MdAutocompleteTrigger.propDecorators = {
    'autocomplete': [{ type: Input, args: ['mdAutocomplete',] },],
    '_matAutocomplete': [{ type: Input, args: ['matAutocomplete',] },],
};

class MdAutocompleteModule {
}
MdAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdOptionModule, OverlayModule, MdCommonModule, CommonModule],
                exports: [MdAutocomplete, MdOptionModule, MdAutocompleteTrigger, MdCommonModule],
                declarations: [MdAutocomplete, MdAutocompleteTrigger],
            },] },
];
/**
 * @nocollapse
 */
MdAutocompleteModule.ctorParameters = () => [];

class FocusKeyManager extends ListKeyManager {
    /**
     * @param {?} items
     */
    constructor(items) {
        super(items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    setActiveItem(index) {
        super.setActiveItem(index);
        if (this.activeItem) {
            this.activeItem.focus();
        }
    }
}

/**
 * This animation shrinks the placeholder text to 75% of its normal size and translates
 * it to either the top left corner (ltr) or top right corner (rtl) of the trigger,
 * depending on the text direction of the application.
 */
const transformPlaceholder = trigger('transformPlaceholder', [
    state('floating-ltr', style({
        top: '-22px',
        left: '-2px',
        transform: `scale(0.75)`
    })),
    state('floating-rtl', style({
        top: '-22px',
        left: '2px',
        transform: `scale(0.75)`
    })),
    transition('* => *', animate(`400ms cubic-bezier(0.25, 0.8, 0.25, 1)`))
]);
/**
 * This animation transforms the select's overlay panel on and off the page.
 *
 * When the panel is attached to the DOM, it expands its width 32px, scales it up to
 * 100% on the Y axis, fades in its border, and translates slightly up and to the
 * side to ensure the option text correctly overlaps the trigger text.
 *
 * When the panel is removed from the DOM, it simply fades out linearly.
 */
const transformPanel = trigger('transformPanel', [
    state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: `scaleY(1)`
    })),
    transition('void => *', [
        style({
            opacity: 0,
            minWidth: '100%',
            transform: `scaleY(0)`
        }),
        animate(`150ms cubic-bezier(0.25, 0.8, 0.25, 1)`)
    ]),
    transition('* => void', [
        animate('250ms 100ms linear', style({ opacity: 0 }))
    ])
]);
/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
const fadeInContent = trigger('fadeInContent', [
    state('showing', style({ opacity: 1 })),
    transition('void => showing', [
        style({ opacity: 0 }),
        animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
    ])
]);

/**
 * Returns an exception to be thrown when attempting to change a s
 * elect's `multiple` option after initialization.
 * \@docs-private
 * @return {?}
 */
function getMdSelectDynamicMultipleError() {
    return new Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * \@docs-private
 * @return {?}
 */
function getMdSelectNonArrayValueError() {
    return new Error('Cannot assign truthy non-array value to select in `multiple` mode.');
}

/**
 * The fixed height of every option element.
 */
const SELECT_OPTION_HEIGHT = 48;
/**
 * The max height of the select's overlay panel
 */
const SELECT_PANEL_MAX_HEIGHT = 256;
/**
 * The max number of options visible at once in the select panel.
 */
const SELECT_MAX_OPTIONS_DISPLAYED = 5;
/**
 * The fixed height of the select's trigger element.
 */
const SELECT_TRIGGER_HEIGHT = 30;
/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 * (SELECT_OPTION_HEIGHT (48) - SELECT_TRIGGER_HEIGHT (30)) / 2 = 9
 */
const SELECT_OPTION_HEIGHT_ADJUSTMENT = 9;
/**
 * The panel's padding on the x-axis
 */
const SELECT_PANEL_PADDING_X = 16;
/**
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
 */
const SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.75 + 20;
/**
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
 */
const SELECT_PANEL_PADDING_Y = 16;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
const SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Change event object that is emitted when the select value has changed.
 */
class MdSelectChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
class MdSelect {
    /**
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} _viewportRuler
     * @param {?} _changeDetectorRef
     * @param {?} _dir
     * @param {?} _control
     * @param {?} tabIndex
     */
    constructor(_element, _renderer, _viewportRuler, _changeDetectorRef, _dir, _control, tabIndex) {
        this._element = _element;
        this._renderer = _renderer;
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._control = _control;
        /**
         * Whether or not the overlay panel is open.
         */
        this._panelOpen = false;
        /**
         * Whether filling out the select is required in the form.
         */
        this._required = false;
        /**
         * Whether the select is disabled.
         */
        this._disabled = false;
        /**
         * The scroll position of the overlay panel, calculated to center the selected option.
         */
        this._scrollTop = 0;
        /**
         * Whether the component is in multiple selection mode.
         */
        this._multiple = false;
        /**
         * The animation state of the placeholder.
         */
        this._placeholderState = '';
        /**
         * View -> model callback called when value changes
         */
        this._onChange = (value) => { };
        /**
         * View -> model callback called when select has been touched
         */
        this._onTouched = () => { };
        /**
         * The IDs of child options to be passed to the aria-owns attribute.
         */
        this._optionIds = '';
        /**
         * The value of the select panel's transform-origin property.
         */
        this._transformOrigin = 'top';
        /**
         * Whether the panel's animation is done.
         */
        this._panelDoneAnimating = false;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
        this._floatPlaceholder = 'auto';
        /**
         * Aria label of the select. If not specified, the placeholder will be used as label.
         */
        this.ariaLabel = '';
        /**
         * Input that can be used to specify the `aria-labelledby` attribute.
         */
        this.ariaLabelledby = '';
        /**
         * Event emitted when the select has been opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Event emitted when the select has been closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event emitted when the selected value has been changed by the user.
         */
        this.change = new EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._tabIndex = parseInt(tabIndex) || 0;
    }
    /**
     * Placeholder to be shown if no value has been selected.
     * @return {?}
     */
    get placeholder() { return this._placeholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        this._placeholder = value;
        // Must wait to record the trigger width to ensure placeholder width is included.
        Promise.resolve(null).then(() => this._setTriggerWidth());
    }
    /**
     * Whether the component is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether the component is required.
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Whether the user should be allowed to select multiple options.
     * @return {?}
     */
    get multiple() { return this._multiple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        if (this._selectionModel) {
            throw getMdSelectDynamicMultipleError();
        }
        this._multiple = coerceBooleanProperty(value);
    }
    /**
     * Whether to float the placeholder text.
     * @return {?}
     */
    get floatPlaceholder() { return this._floatPlaceholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set floatPlaceholder(value) {
        this._floatPlaceholder = value || 'auto';
    }
    /**
     * Tab index for the select element.
     * @return {?}
     */
    get tabIndex() { return this._disabled ? -1 : this._tabIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        if (typeof value !== 'undefined') {
            this._tabIndex = value;
        }
    }
    /**
     * Theme color for the component.
     * @return {?}
     */
    get color() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        if (value && value !== this._color) {
            this._renderer.removeClass(this._element.nativeElement, `mat-${this._color}`);
            this._renderer.addClass(this._element.nativeElement, `mat-${value}`);
            this._color = value;
        }
    }
    /**
     * Combined stream of all of the child options' change events.
     * @return {?}
     */
    get optionSelectionChanges() {
        return Observable.merge(...this.options.map(option => option.onSelectionChange));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple, null, false);
        this.color = this.color || 'primary';
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._initKeyManager();
        this._changeSubscription = this.options.changes.startWith(null).subscribe(() => {
            this._resetOptions();
            if (this._control) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve(null).then(() => this._setSelectionByValue(this._control.value));
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dropSubscriptions();
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    }
    /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    toggle() {
        this.panelOpen ? this.close() : this.open();
    }
    /**
     * Opens the overlay panel.
     * @return {?}
     */
    open() {
        if (this.disabled || !this.options.length) {
            return;
        }
        if (!this._triggerWidth) {
            this._setTriggerWidth();
        }
        this._calculateOverlayPosition();
        this._placeholderState = this._floatPlaceholderState();
        this._panelOpen = true;
    }
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    close() {
        if (this._panelOpen) {
            this._panelOpen = false;
            if (this._selectionModel.isEmpty()) {
                this._placeholderState = '';
            }
            this._focusHost();
        }
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    writeValue(value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    }
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} isDisabled Sets whether the component is disabled.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Whether or not the overlay panel is open.
     * @return {?}
     */
    get panelOpen() {
        return this._panelOpen;
    }
    /**
     * The currently selected option.
     * @return {?}
     */
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    /**
     * The value displayed in the trigger.
     * @return {?}
     */
    get triggerValue() {
        if (this._multiple) {
            let /** @type {?} */ selectedOptions = this._selectionModel.selected.map(option => option.viewValue);
            if (this._isRtl()) {
                selectedOptions.reverse();
            }
            // TODO(crisbeto): delimiter should be configurable for proper localization.
            return selectedOptions.join(', ');
        }
        return this._selectionModel.selected[0].viewValue;
    }
    /**
     * Whether the element is in RTL mode.
     * @return {?}
     */
    _isRtl() {
        return this._dir ? this._dir.value === 'rtl' : false;
    }
    /**
     * Sets the width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     * @return {?}
     */
    _setTriggerWidth() {
        this._triggerWidth = this._getTriggerRect().width;
    }
    /**
     * Handles the keyboard interactions of a closed select.
     * @param {?} event
     * @return {?}
     */
    _handleClosedKeydown(event) {
        if (!this.disabled) {
            if (event.keyCode === ENTER || event.keyCode === SPACE) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.open();
            }
            else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
                this._handleArrowKey(event);
            }
        }
    }
    /**
     * Handles keypresses inside the panel.
     * @param {?} event
     * @return {?}
     */
    _handlePanelKeydown(event) {
        if (event.keyCode === HOME || event.keyCode === END) {
            event.preventDefault();
            event.keyCode === HOME ? this._keyManager.setFirstItemActive() :
                this._keyManager.setLastItemActive();
        }
        else {
            this._keyManager.onKeydown(event);
        }
    }
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     * @return {?}
     */
    _onPanelDone() {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
            this._panelDoneAnimating = false;
            this.overlayDir.offsetX = 0;
        }
    }
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    _onFadeInDone() {
        this._panelDoneAnimating = this.panelOpen;
    }
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    _onBlur() {
        if (!this.panelOpen) {
            this._onTouched();
        }
    }
    /**
     * Callback that is invoked when the overlay panel has been attached.
     * @return {?}
     */
    _onAttached() {
        this._calculateOverlayOffsetX();
        this._setScrollTop();
    }
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     * @return {?}
     */
    _setScrollTop() {
        const /** @type {?} */ scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.mat-select-panel');
        scrollContainer.scrollTop = this._scrollTop;
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @param {?} value
     * @return {?}
     */
    _setSelectionByValue(value) {
        const /** @type {?} */ isArray = Array.isArray(value);
        if (this.multiple && value && !isArray) {
            throw getMdSelectNonArrayValueError();
        }
        this._clearSelection();
        if (isArray) {
            value.forEach((currentValue) => this._selectValue(currentValue));
            this._sortValues();
        }
        else {
            this._selectValue(value);
        }
        this._setValueWidth();
        if (this._selectionModel.isEmpty()) {
            this._placeholderState = '';
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Finds and selects and option based on its value.
     * @param {?} value
     * @return {?} Option that has the corresponding value.
     */
    _selectValue(value) {
        let /** @type {?} */ optionsArray = this.options.toArray();
        let /** @type {?} */ correspondingOption = optionsArray.find(option => option.value && option.value === value);
        if (correspondingOption) {
            correspondingOption.select();
            this._selectionModel.select(correspondingOption);
            this._keyManager.setActiveItem(optionsArray.indexOf(correspondingOption));
        }
        return correspondingOption;
    }
    /**
     * Clears the select trigger and deselects every option in the list.
     * @param {?=} skip Option that should not be deselected.
     * @return {?}
     */
    _clearSelection(skip) {
        this._selectionModel.clear();
        this.options.forEach(option => {
            if (option !== skip) {
                option.deselect();
            }
        });
    }
    /**
     * @return {?}
     */
    _getTriggerRect() {
        return this.trigger.nativeElement.getBoundingClientRect();
    }
    /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @return {?}
     */
    _initKeyManager() {
        this._keyManager = new FocusKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(() => this.close());
    }
    /**
     * Drops current option subscriptions and IDs and resets from scratch.
     * @return {?}
     */
    _resetOptions() {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
        this._setOptionMultiple();
    }
    /**
     * Listens to user-generated selection events on each option.
     * @return {?}
     */
    _listenToOptions() {
        this._optionSubscription = this.optionSelectionChanges
            .filter(event => event.isUserInput)
            .subscribe(event => {
            this._onSelect(event.source);
            this._setValueWidth();
            if (!this.multiple) {
                this.close();
            }
        });
    }
    /**
     * Invoked when an option is clicked.
     * @param {?} option
     * @return {?}
     */
    _onSelect(option) {
        const /** @type {?} */ wasSelected = this._selectionModel.isSelected(option);
        // TODO(crisbeto): handle blank/null options inside multi-select.
        if (this.multiple) {
            this._selectionModel.toggle(option);
            wasSelected ? option.deselect() : option.select();
            this._sortValues();
        }
        else {
            this._clearSelection(option.value == null ? null : option);
            if (option.value == null) {
                this._propagateChanges(option.value);
            }
            else {
                this._selectionModel.select(option);
            }
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
    }
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @return {?}
     */
    _sortValues() {
        if (this._multiple) {
            this._selectionModel.clear();
            this.options.forEach(option => {
                if (option.selected) {
                    this._selectionModel.select(option);
                }
            });
        }
    }
    /**
     * Unsubscribes from all option subscriptions.
     * @return {?}
     */
    _dropSubscriptions() {
        if (this._optionSubscription) {
            this._optionSubscription.unsubscribe();
            this._optionSubscription = null;
        }
    }
    /**
     * Emits change event to set the model value.
     * @param {?=} fallbackValue
     * @return {?}
     */
    _propagateChanges(fallbackValue) {
        let /** @type {?} */ valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(option => option.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._onChange(valueToEmit);
        this.change.emit(new MdSelectChange(this, valueToEmit));
    }
    /**
     * Records option IDs to pass to the aria-owns property.
     * @return {?}
     */
    _setOptionIds() {
        this._optionIds = this.options.map(option => option.id).join(' ');
    }
    /**
     * Sets the `multiple` property on each option. The promise is necessary
     * in order to avoid Angular errors when modifying the property after init.
     * @return {?}
     */
    _setOptionMultiple() {
        if (this.multiple) {
            Promise.resolve(null).then(() => {
                this.options.forEach(option => option.multiple = this.multiple);
            });
        }
    }
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     * @return {?}
     */
    _setValueWidth() {
        this._selectedValueWidth = this._triggerWidth - 13;
    }
    /**
     * Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     * @return {?}
     */
    _focusCorrectOption() {
        if (this._selectionModel.isEmpty()) {
            this._keyManager.setFirstItemActive();
        }
        else {
            this._keyManager.setActiveItem(this._getOptionIndex(this._selectionModel.selected[0]));
        }
    }
    /**
     * Focuses the host element when the panel closes.
     * @return {?}
     */
    _focusHost() {
        this._element.nativeElement.focus();
    }
    /**
     * Gets the index of the provided option in the option list.
     * @param {?} option
     * @return {?}
     */
    _getOptionIndex(option) {
        return this.options.reduce((result, current, index) => {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    }
    /**
     * Calculates the scroll position and x- and y-offsets of the overlay panel.
     * @return {?}
     */
    _calculateOverlayPosition() {
        const /** @type {?} */ panelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        const /** @type {?} */ scrollContainerHeight = this.options.length * SELECT_OPTION_HEIGHT;
        // The farthest the panel can be scrolled before it hits the bottom
        const /** @type {?} */ maxScroll = scrollContainerHeight - panelHeight;
        if (this._selectionModel.hasValue()) {
            const /** @type {?} */ selectedIndex = this._getOptionIndex(this._selectionModel.selected[0]);
            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            const /** @type {?} */ scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffsetY(selectedIndex, scrollBuffer, maxScroll);
        }
        else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_OPTION_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1;
        }
        this._checkOverlayWithinViewport(maxScroll);
    }
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    _calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll) {
        const /** @type {?} */ optionOffsetFromScrollTop = SELECT_OPTION_HEIGHT * selectedIndex;
        const /** @type {?} */ halfOptionHeight = SELECT_OPTION_HEIGHT / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        const /** @type {?} */ optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    }
    /**
     * Figures out the appropriate animation state for the placeholder.
     * @return {?}
     */
    _getPlaceholderAnimationState() {
        if (this.floatPlaceholder === 'never') {
            return '';
        }
        if (this.floatPlaceholder === 'always') {
            return this._floatPlaceholderState();
        }
        return this._placeholderState;
    }
    /**
     * Determines the CSS `opacity` of the placeholder element.
     * @return {?}
     */
    _getPlaceholderOpacity() {
        return (this.floatPlaceholder !== 'never' || this._selectionModel.isEmpty()) ?
            '1' : '0';
    }
    /**
     * Returns the aria-label of the select component.
     * @return {?}
     */
    get _ariaLabel() {
        // If an ariaLabelledby value has been set, the select should not overwrite the
        // `aria-labelledby` value by setting the ariaLabel to the placeholder.
        return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
    }
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     * @return {?}
     */
    _calculateOverlayOffsetX() {
        const /** @type {?} */ overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        const /** @type {?} */ viewportRect = this._viewportRuler.getViewportRect();
        const /** @type {?} */ isRtl = this._isRtl();
        let /** @type {?} */ offsetX = this.multiple ? SELECT_MULTIPLE_PANEL_PADDING_X : SELECT_PANEL_PADDING_X;
        if (!isRtl) {
            offsetX *= -1;
        }
        const /** @type {?} */ leftOverflow = 0 - (overlayRect.left + offsetX
            - (isRtl ? SELECT_PANEL_PADDING_X * 2 : 0));
        const /** @type {?} */ rightOverflow = overlayRect.right + offsetX - viewportRect.width
            + (isRtl ? 0 : SELECT_PANEL_PADDING_X * 2);
        if (leftOverflow > 0) {
            offsetX += leftOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        else if (rightOverflow > 0) {
            offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors.
        this.overlayDir.offsetX = offsetX;
        this.overlayDir.overlayRef.updatePosition();
    }
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    _calculateOverlayOffsetY(selectedIndex, scrollBuffer, maxScroll) {
        let /** @type {?} */ optionOffsetFromPanelTop;
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_OPTION_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            const /** @type {?} */ firstDisplayedIndex = this.options.length - SELECT_MAX_OPTIONS_DISPLAYED;
            const /** @type {?} */ selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_OPTION_HEIGHT + SELECT_PANEL_PADDING_Y;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_OPTION_HEIGHT / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height
        // difference, multiplied by -1 to ensure that the overlay moves in the correct
        // direction up the page.
        return optionOffsetFromPanelTop * -1 - SELECT_OPTION_HEIGHT_ADJUSTMENT;
    }
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     * @param {?} maxScroll
     * @return {?}
     */
    _checkOverlayWithinViewport(maxScroll) {
        const /** @type {?} */ viewportRect = this._viewportRuler.getViewportRect();
        const /** @type {?} */ triggerRect = this._getTriggerRect();
        const /** @type {?} */ topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        const /** @type {?} */ bottomSpaceAvailable = viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        const /** @type {?} */ panelHeightTop = Math.abs(this._offsetY);
        const /** @type {?} */ totalPanelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        const /** @type {?} */ panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    }
    /**
     * Adjusts the overlay panel up to fit in the viewport.
     * @param {?} panelHeightBottom
     * @param {?} bottomSpaceAvailable
     * @return {?}
     */
    _adjustPanelUp(panelHeightBottom, bottomSpaceAvailable) {
        const /** @type {?} */ distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = `50% bottom 0px`;
        }
    }
    /**
     * Adjusts the overlay panel down to fit in the viewport.
     * @param {?} panelHeightTop
     * @param {?} topSpaceAvailable
     * @param {?} maxScroll
     * @return {?}
     */
    _adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll) {
        const /** @type {?} */ distanceAboveViewport = panelHeightTop - topSpaceAvailable;
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = `50% top 0px`;
            return;
        }
    }
    /**
     * Sets the transform origin point based on the selected option.
     * @return {?}
     */
    _getOriginBasedOnOption() {
        const /** @type {?} */ originY = Math.abs(this._offsetY) - SELECT_OPTION_HEIGHT_ADJUSTMENT + SELECT_OPTION_HEIGHT / 2;
        return `50% ${originY}px 0px`;
    }
    /**
     * Figures out the floating placeholder state value.
     * @return {?}
     */
    _floatPlaceholderState() {
        return this._isRtl() ? 'floating-rtl' : 'floating-ltr';
    }
    /**
     * Handles the user pressing the arrow keys on a closed select.
     * @param {?} event
     * @return {?}
     */
    _handleArrowKey(event) {
        if (this._multiple) {
            event.preventDefault();
            this.open();
        }
        else {
            const /** @type {?} */ prevActiveItem = this._keyManager.activeItem;
            // Cycle though the select options even when the select is closed,
            // matching the behavior of the native select element.
            // TODO(crisbeto): native selects also cycle through the options with left/right arrows,
            // however the key manager only supports up/down at the moment.
            this._keyManager.onKeydown(event);
            const /** @type {?} */ currentActiveItem = (this._keyManager.activeItem);
            if (currentActiveItem !== prevActiveItem) {
                this._clearSelection();
                this._setSelectionByValue(currentActiveItem.value);
                this._propagateChanges();
            }
        }
    }
}
MdSelect.decorators = [
    { type: Component, args: [{selector: 'md-select, mat-select',
                template: "<div class=\"mat-select-trigger\" cdk-overlay-origin (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger> <span class=\"mat-select-placeholder\" [class.mat-floating-placeholder]=\"_selectionModel.hasValue()\" [@transformPlaceholder]=\"_getPlaceholderAnimationState()\" [style.opacity]=\"_getPlaceholderOpacity()\" [style.width.px]=\"_selectedValueWidth\"> {{ placeholder }} </span> <span class=\"mat-select-value\" *ngIf=\"_selectionModel.hasValue()\"> <span class=\"mat-select-value-text\">{{ triggerValue }}</span> </span> <span class=\"mat-select-arrow\"></span> <span class=\"mat-select-underline\"></span> </div> <ng-template cdk-connected-overlay [origin]=\"origin\" [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\" backdropClass=\"cdk-overlay-transparent-backdrop\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\" [offsetY]=\"_offsetY\" (attach)=\"_onAttached()\" (detach)=\"close()\"> <div class=\"mat-select-panel\" [@transformPanel]=\"'showing'\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_handlePanelKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.mat-select-panel-done-animating]=\"_panelDoneAnimating\" [ngClass]=\"'mat-' + color\"> <div class=\"mat-select-content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"> <ng-content></ng-content> </div> </div> </ng-template> ",
                styles: [".mat-select{display:inline-block;outline:0;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{display:flex;align-items:center;height:30px;min-width:112px;cursor:pointer;position:relative;box-sizing:border-box;font-size:16px}[aria-disabled=true] .mat-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-select-underline{position:absolute;bottom:0;left:0;right:0;height:1px}[aria-disabled=true] .mat-select-underline{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-color:transparent;background-position:0 bottom}.mat-select-placeholder{position:relative;padding:0 2px;transform-origin:left top;flex-grow:1}.mat-select-placeholder.mat-floating-placeholder{top:-22px;left:-2px;text-align:left;transform:scale(.75)}[dir=rtl] .mat-select-placeholder{transform-origin:right top}[dir=rtl] .mat-select-placeholder.mat-floating-placeholder{left:2px;text-align:right}[aria-required=true] .mat-select-placeholder::after{content:'*'}.mat-select-value{position:absolute;max-width:calc(100% - 18px);flex-grow:1;top:0;left:0;bottom:0;display:flex;align-items:center}[dir=rtl] .mat-select-value{left:auto;right:0}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:30px}.mat-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-select-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%}@media screen and (-ms-high-contrast:active){.mat-select-panel{outline:solid 1px}} /*# sourceMappingURL=select.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                host: {
                    'role': 'listbox',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.aria-label]': '_ariaLabel',
                    '[attr.aria-labelledby]': 'ariaLabelledby',
                    '[attr.aria-required]': 'required.toString()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-invalid]': '_control?.invalid || "false"',
                    '[attr.aria-owns]': '_optionIds',
                    '[class.mat-select-disabled]': 'disabled',
                    '[class.mat-select]': 'true',
                    '(keydown)': '_handleClosedKeydown($event)',
                    '(blur)': '_onBlur()',
                },
                animations: [
                    transformPlaceholder,
                    transformPanel,
                    fadeInContent
                ],
                exportAs: 'mdSelect',
            },] },
];
/**
 * @nocollapse
 */
MdSelect.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ViewportRuler, },
    { type: ChangeDetectorRef, },
    { type: Dir, decorators: [{ type: Optional },] },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
];
MdSelect.propDecorators = {
    'trigger': [{ type: ViewChild, args: ['trigger',] },],
    'overlayDir': [{ type: ViewChild, args: [ConnectedOverlayDirective,] },],
    'options': [{ type: ContentChildren, args: [MdOption,] },],
    'placeholder': [{ type: Input },],
    'disabled': [{ type: Input },],
    'required': [{ type: Input },],
    'multiple': [{ type: Input },],
    'floatPlaceholder': [{ type: Input },],
    'tabIndex': [{ type: Input },],
    'ariaLabel': [{ type: Input, args: ['aria-label',] },],
    'ariaLabelledby': [{ type: Input, args: ['aria-labelledby',] },],
    'color': [{ type: Input },],
    'onOpen': [{ type: Output },],
    'onClose': [{ type: Output },],
    'change': [{ type: Output },],
};
/**
 * Clamps a value n between min and max values.
 * @param {?} min
 * @param {?} n
 * @param {?} max
 * @return {?}
 */
function clampValue(min, n, max) {
    return Math.min(Math.max(min, n), max);
}

class MdSelectModule {
}
MdSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    MdOptionModule,
                    MdCommonModule,
                ],
                exports: [MdSelect, MdOptionModule, MdCommonModule],
                declarations: [MdSelect],
            },] },
];
/**
 * @nocollapse
 */
MdSelectModule.ctorParameters = () => [];

/**
 * Mixin to augment a directive with a `disabled` property.
 * @template T
 * @param {?} base
 * @return {?}
 */
function mixinDisabled(base) {
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this._disabled = false;
        }
        /**
         * @return {?}
         */
        get disabled() { return this._disabled; }
        /**
         * @param {?} value
         * @return {?}
         */
        set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    };
}

/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
const MIN_AUTO_TICK_SEPARATION = 30;
/**
 * The thumb gap size for a disabled slider.
 */
const DISABLED_THUMB_GAP = 7;
/**
 * The thumb gap size for a non-active slider at its minimum value.
 */
const MIN_VALUE_NONACTIVE_THUMB_GAP = 7;
/**
 * The thumb gap size for an active slider at its minimum value.
 */
const MIN_VALUE_ACTIVE_THUMB_GAP = 10;
/**
 * Provider Expression that allows md-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 */
const MD_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdSlider),
    multi: true
};
/**
 * A simple change event emitted by the MdSlider component.
 */
class MdSliderChange {
}
class MdSliderBase {
}
const _MdSliderMixinBase = mixinDisabled(MdSliderBase);
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
class MdSlider extends _MdSliderMixinBase {
    /**
     * @param {?} renderer
     * @param {?} _elementRef
     * @param {?} _focusOriginMonitor
     * @param {?} _dir
     */
    constructor(renderer, _elementRef, _focusOriginMonitor, _dir) {
        super();
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this._dir = _dir;
        this._invert = false;
        this._max = 100;
        this._min = 0;
        this._step = 1;
        this._thumbLabel = false;
        this._tickInterval = 0;
        this._value = null;
        this._vertical = false;
        this.color = 'accent';
        /**
         * Event emitted when the slider value has changed.
         */
        this.change = new EventEmitter();
        /**
         * Event emitted when the slider thumb moves.
         */
        this.input = new EventEmitter();
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        this.onTouched = () => { };
        this._percent = 0;
        /**
         * Whether or not the thumb is sliding.
         * Used to determine if there should be a transition for the thumb and fill track.
         */
        this._isSliding = false;
        /**
         * Whether or not the slider is active (clicked or sliding).
         * Used to shrink and grow the thumb as according to the Material Design spec.
         */
        this._isActive = false;
        /**
         * The size of a tick interval as a percentage of the size of the track.
         */
        this._tickIntervalPercent = 0;
        /**
         * A renderer to handle updating the slider's thumb and fill track.
         */
        this._renderer = null;
        /**
         * The dimensions of the slider.
         */
        this._sliderDimensions = null;
        this._controlValueAccessorChangeFn = () => { };
        /**
         * The last value for which a change event was emitted.
         */
        this._lastChangeValue = null;
        /**
         * The last value for which an input event was emitted.
         */
        this._lastInputValue = null;
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, true)
            .subscribe((origin) => this._isActive = !!origin && origin !== 'keyboard');
        this._renderer = new SliderRenderer(this._elementRef);
    }
    /**
     * Whether the slider is inverted.
     * @return {?}
     */
    get invert() { return this._invert; }
    /**
     * @param {?} value
     * @return {?}
     */
    set invert(value) { this._invert = coerceBooleanProperty(value); }
    /**
     * The maximum value that the slider can have.
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set max(v) {
        this._max = coerceNumberProperty(v, this._max);
        this._percent = this._calculatePercentage(this._value);
    }
    /**
     * The minimum value that the slider can have.
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set min(v) {
        this._min = coerceNumberProperty(v, this._min);
        // If the value wasn't explicitly set by the user, set it to the min.
        if (this._value === null) {
            this.value = this._min;
        }
        this._percent = this._calculatePercentage(this._value);
    }
    /**
     * The values at which the thumb will snap.
     * @return {?}
     */
    get step() { return this._step; }
    /**
     * @param {?} v
     * @return {?}
     */
    set step(v) {
        this._step = coerceNumberProperty(v, this._step);
        if (this._step % 1 !== 0) {
            this._roundLabelTo = this._step.toString().split('.').pop().length;
        }
    }
    /**
     * Whether or not to show the thumb label.
     * @return {?}
     */
    get thumbLabel() { return this._thumbLabel; }
    /**
     * @param {?} value
     * @return {?}
     */
    set thumbLabel(value) { this._thumbLabel = coerceBooleanProperty(value); }
    /**
     * @deprecated
     * @return {?}
     */
    get _thumbLabelDeprecated() { return this._thumbLabel; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _thumbLabelDeprecated(value) { this._thumbLabel = value; }
    /**
     * How often to show ticks. Relative to the step so that a tick always appears on a step.
     * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
     * @return {?}
     */
    get tickInterval() { return this._tickInterval; }
    /**
     * @param {?} value
     * @return {?}
     */
    set tickInterval(value) {
        if (value === 'auto') {
            this._tickInterval = 'auto';
        }
        else if (typeof value === 'number' || typeof value === 'string') {
            this._tickInterval = coerceNumberProperty(value, /** @type {?} */ (this._tickInterval));
        }
        else {
            this._tickInterval = 0;
        }
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _tickIntervalDeprecated() { return this.tickInterval; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _tickIntervalDeprecated(v) { this.tickInterval = v; }
    /**
     * Value of the slider.
     * @return {?}
     */
    get value() {
        // If the value needs to be read and it is still uninitialized, initialize it to the min.
        if (this._value === null) {
            this.value = this._min;
        }
        return this._value;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        this._value = coerceNumberProperty(v, this._value);
        this._percent = this._calculatePercentage(this._value);
    }
    /**
     * Whether the slider is vertical.
     * @return {?}
     */
    get vertical() { return this._vertical; }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) { this._vertical = coerceBooleanProperty(value); }
    /**
     * The value to be used for display purposes.
     * @return {?}
     */
    get displayValue() {
        // Note that this could be improved further by rounding something like 0.999 to 1 or
        // 0.899 to 0.9, however it is very performance sensitive, because it gets called on
        // every change detection cycle.
        if (this._roundLabelTo && this.value % 1 !== 0) {
            return this.value.toFixed(this._roundLabelTo);
        }
        return this.value;
    }
    /**
     * The percentage of the slider that coincides with the value.
     * @return {?}
     */
    get percent() { return this._clamp(this._percent); }
    /**
     * Whether the axis of the slider is inverted.
     * (i.e. whether moving the thumb in the positive x or y direction decreases the slider's value).
     * @return {?}
     */
    get _invertAxis() {
        // Standard non-inverted mode for a vertical slider should be dragging the thumb from bottom to
        // top. However from a y-axis standpoint this is inverted.
        return this.vertical ? !this.invert : this.invert;
    }
    /**
     * Whether the slider is at its minimum value.
     * @return {?}
     */
    get _isMinValue() {
        return this.percent === 0;
    }
    /**
     * The amount of space to leave between the slider thumb and the track fill & track background
     * elements.
     * @return {?}
     */
    get _thumbGap() {
        if (this.disabled) {
            return DISABLED_THUMB_GAP;
        }
        if (this._isMinValue && !this.thumbLabel) {
            return this._isActive ? MIN_VALUE_ACTIVE_THUMB_GAP : MIN_VALUE_NONACTIVE_THUMB_GAP;
        }
        return 0;
    }
    /**
     * CSS styles for the track background element.
     * @return {?}
     */
    get _trackBackgroundStyles() {
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        let /** @type {?} */ sign = this._invertMouseCoords ? '-' : '';
        return {
            'transform': `translate${axis}(${sign}${this._thumbGap}px) scale${axis}(${1 - this.percent})`
        };
    }
    /**
     * CSS styles for the track fill element.
     * @return {?}
     */
    get _trackFillStyles() {
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        let /** @type {?} */ sign = this._invertMouseCoords ? '' : '-';
        return {
            'transform': `translate${axis}(${sign}${this._thumbGap}px) scale${axis}(${this.percent})`
        };
    }
    /**
     * CSS styles for the ticks container element.
     * @return {?}
     */
    get _ticksContainerStyles() {
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        // For a horizontal slider in RTL languages we push the ticks container off the left edge
        // instead of the right edge to avoid causing a horizontal scrollbar to appear.
        let /** @type {?} */ sign = !this.vertical && this._direction == 'rtl' ? '' : '-';
        let /** @type {?} */ offset = this._tickIntervalPercent / 2 * 100;
        return {
            'transform': `translate${axis}(${sign}${offset}%)`
        };
    }
    /**
     * CSS styles for the ticks element.
     * @return {?}
     */
    get _ticksStyles() {
        let /** @type {?} */ tickSize = this._tickIntervalPercent * 100;
        let /** @type {?} */ backgroundSize = this.vertical ? `2px ${tickSize}%` : `${tickSize}% 2px`;
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        // Depending on the direction we pushed the ticks container, push the ticks the opposite
        // direction to re-center them but clip off the end edge. In RTL languages we need to flip the
        // ticks 180 degrees so we're really cutting off the end edge abd not the start.
        let /** @type {?} */ sign = !this.vertical && this._direction == 'rtl' ? '-' : '';
        let /** @type {?} */ rotate = !this.vertical && this._direction == 'rtl' ? ' rotate(180deg)' : '';
        let /** @type {?} */ styles = {
            'backgroundSize': backgroundSize,
            // Without translateZ ticks sometimes jitter as the slider moves on Chrome & Firefox.
            'transform': `translateZ(0) translate${axis}(${sign}${tickSize / 2}%)${rotate}`
        };
        if (this._isMinValue && this._thumbGap) {
            let /** @type {?} */ side = this.vertical ?
                (this._invertAxis ? 'Bottom' : 'Top') :
                (this._invertAxis ? 'Right' : 'Left');
            styles[`padding${side}`] = `${this._thumbGap}px`;
        }
        return styles;
    }
    /**
     * @return {?}
     */
    get _thumbContainerStyles() {
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        // For a horizontal slider in RTL languages we push the thumb container off the left edge
        // instead of the right edge to avoid causing a horizontal scrollbar to appear.
        let /** @type {?} */ invertOffset = (this._direction == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
        let /** @type {?} */ offset = (invertOffset ? this.percent : 1 - this.percent) * 100;
        return {
            'transform': `translate${axis}(-${offset}%)`
        };
    }
    /**
     * Whether mouse events should be converted to a slider position by calculating their distance
     * from the right or bottom edge of the slider as opposed to the top or left.
     * @return {?}
     */
    get _invertMouseCoords() {
        return (this._direction == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
    }
    /**
     * The language direction for this slider element.
     * @return {?}
     */
    get _direction() {
        return (this._dir && this._dir.value == 'rtl') ? 'rtl' : 'ltr';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    _onMouseenter() {
        if (this.disabled) {
            return;
        }
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this._updateTickIntervalPercent();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onClick(event) {
        if (this.disabled) {
            return;
        }
        this._isSliding = false;
        this._renderer.addFocus();
        this._updateValueFromPosition({ x: event.clientX, y: event.clientY });
        /* Emits a change and input event if the value changed. */
        this._emitInputEvent();
        this._emitValueIfChanged();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onSlide(event) {
        if (this.disabled) {
            return;
        }
        // Prevent the slide from selecting anything else.
        event.preventDefault();
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
        // Native range elements always emit `input` events when the value changed while sliding.
        this._emitInputEvent();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onSlideStart(event) {
        if (this.disabled) {
            return;
        }
        // Simulate mouseenter in case this is a mobile device.
        this._onMouseenter();
        event.preventDefault();
        this._isSliding = true;
        this._renderer.addFocus();
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
    }
    /**
     * @return {?}
     */
    _onSlideEnd() {
        this._isSliding = false;
        this._emitValueIfChanged();
    }
    /**
     * @return {?}
     */
    _onFocus() {
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this._updateTickIntervalPercent();
    }
    /**
     * @return {?}
     */
    _onBlur() {
        this.onTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onKeydown(event) {
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
    }
    /**
     * @return {?}
     */
    _onKeyup() {
        this._isSliding = false;
    }
    /**
     * Increments the slider by the given number of steps (negative number decrements).
     * @param {?} numSteps
     * @return {?}
     */
    _increment(numSteps) {
        this.value = this._clamp(this.value + this.step * numSteps, this.min, this.max);
        this._emitInputEvent();
        this._emitValueIfChanged();
    }
    /**
     * Calculate the new value from the new physical location. The value will always be snapped.
     * @param {?} pos
     * @return {?}
     */
    _updateValueFromPosition(pos) {
        if (!this._sliderDimensions) {
            return;
        }
        let /** @type {?} */ offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
        let /** @type {?} */ size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
        let /** @type {?} */ posComponent = this.vertical ? pos.y : pos.x;
        // The exact value is calculated from the event and used to find the closest snap value.
        let /** @type {?} */ percent = this._clamp((posComponent - offset) / size);
        if (this._invertMouseCoords) {
            percent = 1 - percent;
        }
        let /** @type {?} */ exactValue = this._calculateValue(percent);
        // This calculation finds the closest step by finding the closest whole number divisible by the
        // step relative to the min.
        let /** @type {?} */ closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
        // The value needs to snap to the min and max.
        this.value = this._clamp(closestValue, this.min, this.max);
    }
    /**
     * Emits a change event if the current value is different from the last emitted value.
     * @return {?}
     */
    _emitValueIfChanged() {
        if (this.value != this._lastChangeValue) {
            let /** @type {?} */ event = this._createChangeEvent();
            this._lastChangeValue = this.value;
            this._controlValueAccessorChangeFn(this.value);
            this.change.emit(event);
        }
    }
    /**
     * Emits an input event when the current value is different from the last emitted value.
     * @return {?}
     */
    _emitInputEvent() {
        if (this.value != this._lastInputValue) {
            let /** @type {?} */ event = this._createChangeEvent();
            this._lastInputValue = this.value;
            this.input.emit(event);
        }
    }
    /**
     * Updates the amount of space between ticks as a percentage of the width of the slider.
     * @return {?}
     */
    _updateTickIntervalPercent() {
        if (!this.tickInterval) {
            return;
        }
        if (this.tickInterval == 'auto') {
            let /** @type {?} */ trackSize = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
            let /** @type {?} */ pixelsPerStep = trackSize * this.step / (this.max - this.min);
            let /** @type {?} */ stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
            let /** @type {?} */ pixelsPerTick = stepsPerTick * this.step;
            this._tickIntervalPercent = pixelsPerTick / trackSize;
        }
        else {
            this._tickIntervalPercent = this.tickInterval * this.step / (this.max - this.min);
        }
    }
    /**
     * Creates a slider change object from the specified value.
     * @param {?=} value
     * @return {?}
     */
    _createChangeEvent(value = this.value) {
        let /** @type {?} */ event = new MdSliderChange();
        event.source = this;
        event.value = value;
        return event;
    }
    /**
     * Calculates the percentage of the slider that a value is.
     * @param {?} value
     * @return {?}
     */
    _calculatePercentage(value) {
        return (value - this.min) / (this.max - this.min);
    }
    /**
     * Calculates the value a percentage of the slider corresponds to.
     * @param {?} percentage
     * @return {?}
     */
    _calculateValue(percentage) {
        return this.min + percentage * (this.max - this.min);
    }
    /**
     * Return a number between two numbers.
     * @param {?} value
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    _clamp(value, min = 0, max = 1) {
        return Math.max(min, Math.min(value, max));
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Registers a callback to eb triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
MdSlider.decorators = [
    { type: Component, args: [{selector: 'md-slider, mat-slider',
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
                    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
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
                styles: [".mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:0;vertical-align:middle}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-track-background{position:absolute;transform-origin:100% 100%;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{background-repeat:repeat;background-clip:content-box;box-sizing:border-box;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-focus-ring{position:absolute;width:30px;height:30px;border-radius:50%;transform:scale(0);opacity:0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),opacity .4s cubic-bezier(.25,.8,.25,1)}.cdk-keyboard-focused .mat-slider-focus-ring{transform:scale(1);opacity:1}.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb-label{cursor:-webkit-grab;cursor:grab}.mat-slider-sliding:not(.mat-slider-disabled) .mat-slider-thumb,.mat-slider-sliding:not(.mat-slider-disabled) .mat-slider-thumb-label,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb-label:active,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb:active{cursor:-webkit-grabbing;cursor:grabbing}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(.7);transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),border-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform .4s cubic-bezier(.25,.8,.25,1),border-radius .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label-text{z-index:1;font-size:12px;font-weight:700;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-sliding .mat-slider-thumb-container,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-track-fill{transition-duration:0s}.mat-slider-has-ticks .mat-slider-wrapper::after{content:'';position:absolute;border-width:0;border-style:solid;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-disabled) .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-disabled) .mat-slider-ticks{opacity:1}.mat-slider-thumb-label-showing .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.cdk-focused .mat-slider-thumb-label{border-radius:50% 50% 0}.cdk-focused .mat-slider-thumb-label-text{opacity:1}.cdk-mouse-focused .mat-slider-thumb,.cdk-program-focused .mat-slider-thumb,.cdk-touch-focused .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-disabled .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}.mat-slider-horizontal .mat-slider-ticks{height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-focus-ring{top:-15px;right:-15px}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.cdk-focused .mat-slider-thumb-label{transform:rotate(45deg)}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}.mat-slider-vertical .mat-slider-focus-ring{bottom:-15px;left:-15px}.mat-slider-vertical .mat-slider-ticks{width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.cdk-focused .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%} /*# sourceMappingURL=slider.css.map */ "],
                inputs: ['disabled'],
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdSlider.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
    { type: FocusOriginMonitor, },
    { type: Dir, decorators: [{ type: Optional },] },
];
MdSlider.propDecorators = {
    'invert': [{ type: Input },],
    'max': [{ type: Input },],
    'min': [{ type: Input },],
    'step': [{ type: Input },],
    'thumbLabel': [{ type: Input },],
    '_thumbLabelDeprecated': [{ type: Input, args: ['thumb-label',] },],
    'tickInterval': [{ type: Input },],
    '_tickIntervalDeprecated': [{ type: Input, args: ['tick-interval',] },],
    'value': [{ type: Input },],
    'vertical': [{ type: Input },],
    'color': [{ type: Input },],
    'change': [{ type: Output },],
    'input': [{ type: Output },],
};
/**
 * Renderer class in order to keep all dom manipulation in one place and outside of the main class.
 * \@docs-private
 */
class SliderRenderer {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this._sliderElement = elementRef.nativeElement;
    }
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     * @return {?}
     */
    getSliderDimensions() {
        let /** @type {?} */ wrapperElement = this._sliderElement.querySelector('.mat-slider-wrapper');
        return wrapperElement.getBoundingClientRect();
    }
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     * @return {?}
     */
    addFocus() {
        this._sliderElement.focus();
    }
}

class MdSliderModule {
}
MdSliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, MdCommonModule, StyleModule, RtlModule],
                exports: [MdSlider, MdCommonModule],
                declarations: [MdSlider],
                providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }]
            },] },
];
/**
 * @nocollapse
 */
MdSliderModule.ctorParameters = () => [];

/**
 * Time in ms to delay before changing the tooltip visibility to hidden
 */
const TOUCHEND_HIDE_DELAY = 1500;
/**
 * Time in ms to throttle repositioning after scroll events.
 */
const SCROLL_THROTTLE_MS = 20;
/**
 * Throws an error if the user supplied an invalid tooltip position.
 * @param {?} position
 * @return {?}
 */
function throwMdTooltipInvalidPositionError(position) {
    throw new Error(`Tooltip position "${position}" is invalid.`);
}
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
class MdTooltip {
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
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _dir) {
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
            _renderer.listen(_elementRef.nativeElement, 'mouseenter', () => this.show());
            _renderer.listen(_elementRef.nativeElement, 'mouseleave', () => this.hide());
        }
    }
    /**
     * Allows the user to define the position of the tooltip relative to the parent element
     * @return {?}
     */
    get position() { return this._position; }
    /**
     * @param {?} value
     * @return {?}
     */
    set position(value) {
        if (value !== this._position) {
            this._position = value;
            // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
            // the tooltip.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        }
    }
    /**
     * Disables the display of the tooltip.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // If tooltip is disabled, hide immediately.
        if (this._disabled) {
            this.hide(0);
        }
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _positionDeprecated() { return this._position; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _positionDeprecated(value) { this._position = value; }
    /**
     * The message to be displayed in the tooltip
     * @return {?}
     */
    get message() { return this._message; }
    /**
     * @param {?} value
     * @return {?}
     */
    set message(value) {
        this._message = value;
        if (this._tooltipInstance) {
            this._setTooltipMessage(this._message);
        }
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedMessage() { return this.message; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _deprecatedMessage(v) { this.message = v; }
    /**
     * @return {?}
     */
    get _matMessage() { return this.message; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matMessage(v) { this.message = v; }
    /**
     * @return {?}
     */
    get _matPosition() { return this.position; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matPosition(v) { this.position = v; }
    /**
     * @return {?}
     */
    get _matDisabled() { return this.disabled; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matDisabled(v) { this.disabled = v; }
    /**
     * @return {?}
     */
    get _matHideDelay() { return this.hideDelay; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matHideDelay(v) { this.hideDelay = v; }
    /**
     * @return {?}
     */
    get _matShowDelay() { return this.showDelay; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matShowDelay(v) { this.showDelay = v; }
    /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    }
    /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    show(delay = this.showDelay) {
        if (this.disabled || !this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    }
    /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    hide(delay = this.hideDelay) {
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    }
    /**
     * Shows/hides the tooltip
     * @return {?}
     */
    toggle() {
        this._isTooltipVisible() ? this.hide() : this.show();
    }
    /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    _isTooltipVisible() {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    }
    /**
     * Create the tooltip to display
     * @return {?}
     */
    _createTooltip() {
        this._createOverlay();
        let /** @type {?} */ portal = new ComponentPortal(TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(() => {
            // Check first if the tooltip has already been removed through this components destroy.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        });
    }
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    _createOverlay() {
        let /** @type {?} */ origin = this._getOrigin();
        let /** @type {?} */ position = this._getOverlayPosition();
        // Create connected position strategy that listens for scroll events to reposition.
        // After position changes occur and the overlay is clipped by a parent scrollable then
        // close the tooltip.
        let /** @type {?} */ strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(change => {
            if (change.scrollableViewProperties.isOverlayClipped &&
                this._tooltipInstance && this._tooltipInstance.isVisible()) {
                this.hide(0);
            }
        });
        let /** @type {?} */ config = new OverlayState();
        config.direction = this._dir ? this._dir.value : 'ltr';
        config.positionStrategy = strategy;
        config.scrollStrategy =
            new RepositionScrollStrategy(this._scrollDispatcher, SCROLL_THROTTLE_MS);
        this._overlayRef = this._overlay.create(config);
    }
    /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    _disposeTooltip() {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    }
    /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    _getOrigin() {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        const /** @type {?} */ isDirectionLtr = !this._dir || this._dir.value == 'ltr';
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
        throwMdTooltipInvalidPositionError(this.position);
    }
    /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    _getOverlayPosition() {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        const /** @type {?} */ isLtr = !this._dir || this._dir.value == 'ltr';
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
        throwMdTooltipInvalidPositionError(this.position);
    }
    /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    _setTooltipMessage(message) {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => {
            if (this._tooltipInstance) {
                this._overlayRef.updatePosition();
            }
        });
    }
}
MdTooltip.decorators = [
    { type: Directive, args: [{
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
MdTooltip.ctorParameters = () => [
    { type: Overlay, },
    { type: ElementRef, },
    { type: ScrollDispatcher, },
    { type: ViewContainerRef, },
    { type: NgZone, },
    { type: Renderer2, },
    { type: Platform, },
    { type: Dir, decorators: [{ type: Optional },] },
];
MdTooltip.propDecorators = {
    'position': [{ type: Input, args: ['mdTooltipPosition',] },],
    'disabled': [{ type: Input, args: ['mdTooltipDisabled',] },],
    '_positionDeprecated': [{ type: Input, args: ['tooltip-position',] },],
    'showDelay': [{ type: Input, args: ['mdTooltipShowDelay',] },],
    'hideDelay': [{ type: Input, args: ['mdTooltipHideDelay',] },],
    'message': [{ type: Input, args: ['mdTooltip',] },],
    '_deprecatedMessage': [{ type: Input, args: ['md-tooltip',] },],
    '_matMessage': [{ type: Input, args: ['matTooltip',] },],
    '_matPosition': [{ type: Input, args: ['matTooltipPosition',] },],
    '_matDisabled': [{ type: Input, args: ['matTooltipDisabled',] },],
    '_matHideDelay': [{ type: Input, args: ['matTooltipHideDelay',] },],
    '_matShowDelay': [{ type: Input, args: ['matTooltipShowDelay',] },],
};
/**
 * Internal component that wraps the tooltip's content.
 * \@docs-private
 */
class TooltipComponent {
    /**
     * @param {?} _dir
     * @param {?} _changeDetectorRef
     */
    constructor(_dir, _changeDetectorRef) {
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
        this._onHide = new Subject();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    show(position, delay) {
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(() => {
            this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
            setTimeout(() => this._closeOnInteraction = true, 0);
        }, delay);
    }
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    hide(delay) {
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(() => {
            this._visibility = 'hidden';
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
        }, delay);
    }
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    afterHidden() {
        return this._onHide.asObservable();
    }
    /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    isVisible() {
        return this._visibility === 'visible';
    }
    /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    _setTransformOrigin(value) {
        const /** @type {?} */ isLtr = !this._dir || this._dir.value == 'ltr';
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
            default: throwMdTooltipInvalidPositionError(value);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _afterVisibilityAnimation(e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    }
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    _handleBodyInteraction() {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    }
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
TooltipComponent.decorators = [
    { type: Component, args: [{selector: 'md-tooltip-component, mat-tooltip-component',
                template: "<div class=\"mat-tooltip\" [style.transform-origin]=\"_transformOrigin\" [@state]=\"_visibility\" (@state.done)=\"_afterVisibilityAnimation($event)\"> {{message}} </div>",
                styles: [":host{pointer-events:none}.mat-tooltip{color:#fff;padding:6px 8px;border-radius:2px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;margin:14px;max-width:250px}@media screen and (-ms-high-contrast:active){.mat-tooltip{outline:solid 1px}} /*# sourceMappingURL=tooltip.css.map */ "],
                animations: [
                    trigger('state', [
                        state('void', style({ transform: 'scale(0)' })),
                        state('initial', style({ transform: 'scale(0)' })),
                        state('visible', style({ transform: 'scale(1)' })),
                        state('hidden', style({ transform: 'scale(0)' })),
                        transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                        transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
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
TooltipComponent.ctorParameters = () => [
    { type: Dir, decorators: [{ type: Optional },] },
    { type: ChangeDetectorRef, },
];

class MdTooltipModule {
}
MdTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [OverlayModule, MdCommonModule, PlatformModule],
                exports: [MdTooltip, TooltipComponent, MdCommonModule],
                declarations: [MdTooltip, TooltipComponent],
                entryComponents: [TooltipComponent],
            },] },
];
/**
 * @nocollapse
 */
MdTooltipModule.ctorParameters = () => [];

/**
 * @module
 * @description
 * Entry point for all public APIs of Angular Material.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Dir, RtlModule, ObserveContentModule, ObserveContent, MdOptionModule, MdOption, MdOptionSelectionChange, Portal, BasePortalHost, ComponentPortal, TemplatePortal, PortalHostDirective, TemplatePortalDirective, PortalModule, DomPortalHost, GestureConfig, LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, InteractivityChecker, isFakeMousedownFromScreenReader, A11yModule, UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, MdLineModule, MdLine, MdLineSetter, coerceBooleanProperty, coerceNumberProperty, CompatibilityModule, NoConflictStyleCompatibilityMode, MdCommonModule, MdCoreModule, PlatformModule, Platform, getSupportedInputTypes, Overlay, OVERLAY_PROVIDERS, OverlayContainer, FullscreenOverlayContainer, OverlayRef, OverlayState, ConnectedOverlayDirective, OverlayOrigin, OverlayModule, ViewportRuler, GlobalPositionStrategy, ConnectedPositionStrategy, ConnectionPositionPair, ScrollableViewProperties, ConnectedOverlayPositionChange, Scrollable, ScrollDispatcher, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, ScrollDispatchModule, MdRipple, MD_RIPPLE_GLOBAL_OPTIONS, RippleRef, RippleState, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION, MdRippleModule, SelectionModel, SelectionChange, FocusTrap, FocusTrapFactory, FocusTrapDeprecatedDirective, FocusTrapDirective, StyleModule, TOUCH_BUFFER_MS, FocusOriginMonitor, CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY, FOCUS_ORIGIN_MONITOR_PROVIDER, applyCssTransform, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, TAB, ESCAPE, BACKSPACE, DELETE, MATERIAL_COMPATIBILITY_MODE, MATERIAL_SANITY_CHECKS, getMdCompatibilityInvalidPrefixError, MAT_ELEMENTS_SELECTOR, MD_ELEMENTS_SELECTOR, MatPrefixRejector, MdPrefixRejector, AnimationCurves, AnimationDurations, MdSelectionModule, MdPseudoCheckbox, MdAutocompleteModule, MdAutocomplete, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT, MD_AUTOCOMPLETE_VALUE_ACCESSOR, MdAutocompleteTrigger, MdSelectModule, fadeInContent, transformPanel, transformPlaceholder, SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT, SELECT_MAX_OPTIONS_DISPLAYED, SELECT_TRIGGER_HEIGHT, SELECT_OPTION_HEIGHT_ADJUSTMENT, SELECT_PANEL_PADDING_X, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_PADDING_Y, SELECT_PANEL_VIEWPORT_PADDING, MdSelectChange, MdSelect, MdSliderModule, MD_SLIDER_VALUE_ACCESSOR, MdSliderChange, MdSliderBase, _MdSliderMixinBase, MdSlider, SliderRenderer, MdTooltipModule, TOUCHEND_HIDE_DELAY, SCROLL_THROTTLE_MS, throwMdTooltipInvalidPositionError, MdTooltip, TooltipComponent, LIVE_ANNOUNCER_PROVIDER_FACTORY as ɵi, mixinDisabled as ɵl, UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY as ɵj, MdMutationObserverFactory as ɵa, OVERLAY_CONTAINER_PROVIDER as ɵc, OVERLAY_CONTAINER_PROVIDER_FACTORY as ɵb, OverlayPositionBuilder as ɵk, VIEWPORT_RULER_PROVIDER as ɵe, VIEWPORT_RULER_PROVIDER_FACTORY as ɵd, SCROLL_DISPATCHER_PROVIDER as ɵg, SCROLL_DISPATCHER_PROVIDER_FACTORY as ɵf, RippleRenderer as ɵh };
//# sourceMappingURL=material.js.map
