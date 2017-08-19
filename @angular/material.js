/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Injectable, InjectionToken, Injector, Input, LOCALE_ID, NgModule, NgZone, Optional, Output, Renderer2, Self, SkipSelf, TemplateRef, Version, ViewChild, ViewContainerRef, ViewEncapsulation, forwardRef, isDevMode } from '@angular/core';
import { A11yModule, ActiveDescendantKeyManager, FocusKeyManager, FocusTrap, FocusTrapDeprecatedDirective, FocusTrapDirective, FocusTrapFactory, InteractivityChecker, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, LiveAnnouncer, isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { BidiModule, Dir, Directionality } from '@angular/cdk/bidi';
import { ObserveContent, ObserversModule } from '@angular/cdk/observers';
import { BlockScrollStrategy, CloseScrollStrategy, ConnectedOverlayDirective, ConnectedOverlayPositionChange, ConnectedPositionStrategy, ConnectionPositionPair, FullscreenOverlayContainer, GlobalPositionStrategy, NoopScrollStrategy, OVERLAY_PROVIDERS, Overlay, OverlayContainer, OverlayModule, OverlayOrigin, OverlayRef, OverlayState, RepositionScrollStrategy, ScrollDispatchModule, ScrollDispatcher, ScrollStrategyOptions, Scrollable, ScrollableViewProperties, VIEWPORT_RULER_PROVIDER, ViewportRuler } from '@angular/cdk/overlay';
import { BasePortalHost, ComponentPortal, DomPortalHost, Portal, PortalHostDirective, PortalModule, TemplatePortal, TemplatePortalDirective } from '@angular/cdk/portal';
import { DOCUMENT, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';
import { Platform, PlatformModule, getSupportedInputTypes } from '@angular/cdk/platform';
import { A, BACKSPACE, DELETE, DOWN_ARROW, END, ENTER, ESCAPE, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE, TAB, UP_ARROW, Z } from '@angular/cdk/keycodes';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, NgForm } from '@angular/forms';
import { RxChain, filter, first, map, startWith, switchMap } from '@angular/cdk/rxjs';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { defer } from 'rxjs/observable/defer';
import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * Current version of Angular Material.
 */
const VERSION = new Version('2.0.0-beta.8');

const MATERIAL_COMPATIBILITY_MODE = new InjectionToken('md-compatibility-mode');
/**
 * Returns an exception to be thrown if the consumer has used
 * an invalid Material prefix on a component.
 * \@docs-private
 * @param {?} prefix
 * @param {?} nodeName
 * @return {?}
 */
function getMdCompatibilityInvalidPrefixError(prefix, nodeName) {
    return Error(`The "${prefix}-" prefix cannot be used in ng-material v1 compatibility mode. ` +
        `It was used on an "${nodeName.toLowerCase()}" element.`);
}
/**
 * Selector that matches all elements that may have style collisions with AngularJS Material.
 */
const MAT_ELEMENTS_SELECTOR = `
  [mat-button],
  [mat-fab],
  [mat-icon-button],
  [mat-mini-fab],
  [mat-raised-button],
  [matCardSubtitle],
  [matCardTitle],
  [matCellDef],
  [matColumnDef],
  [matDialogActions],
  [matDialogClose],
  [matDialogContent],
  [matDialogTitle],
  [matHeaderCellDef],
  [matHeaderRowDef],
  [matLine],
  [matRowDef],
  [matTabLabel],
  [matTabLink],
  [matTabNav],
  [matTooltip],
  [matInput],
  [matPrefix],
  [matSuffix],
  mat-autocomplete,
  mat-button-toggle,
  mat-button-toggle,
  mat-button-toggle-group,
  mat-card,
  mat-card-actions,
  mat-card-content,
  mat-card-footer,
  mat-card-header,
  mat-card-subtitle,
  mat-card-title,
  mat-card-title-group,
  mat-cell,
  mat-checkbox,
  mat-chip,
  mat-dialog-actions,
  mat-dialog-container,
  mat-dialog-content,
  mat-divider,
  mat-error,
  mat-grid-list,
  mat-grid-tile,
  mat-grid-tile-footer,
  mat-grid-tile-header,
  mat-header-cell,
  mat-header-row,
  mat-hint,
  mat-icon,
  mat-input-container,
  mat-form-field,
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
  mat-row,
  mat-select,
  mat-sidenav,
  mat-sidenav-container,
  mat-slider,
  mat-spinner,
  mat-tab,
  mat-table,
  mat-tab-group,
  mat-toolbar`;
/**
 * Selector that matches all elements that may have style collisions with AngularJS Material.
 */
const MD_ELEMENTS_SELECTOR = `
  [md-button],
  [md-fab],
  [md-icon-button],
  [md-mini-fab],
  [md-raised-button],
  [mdCardSubtitle],
  [mdCardTitle],
  [mdCellDef],
  [mdColumnDef],
  [mdDialogActions],
  [mdDialogClose],
  [mdDialogContent],
  [mdDialogTitle],
  [mdHeaderCellDef],
  [mdHeaderRowDef],
  [mdLine],
  [mdRowDef],
  [mdTabLabel],
  [mdTabLink],
  [mdTabNav],
  [mdTooltip],
  [mdInput],
  [mdPrefix],
  [mdSuffix],
  md-autocomplete,
  md-button-toggle,
  md-button-toggle,
  md-button-toggle-group,
  md-card,
  md-card-actions,
  md-card-content,
  md-card-footer,
  md-card-header,
  md-card-subtitle,
  md-card-title,
  md-card-title-group,
  md-cell,
  md-checkbox,
  md-chip,
  md-dialog-actions,
  md-dialog-container,
  md-dialog-content,
  md-divider,
  md-error,
  md-grid-list,
  md-grid-tile,
  md-grid-tile-footer,
  md-grid-tile-header,
  md-header-cell,
  md-header-row,
  md-hint,
  md-icon,
  md-input-container,
  md-form-field,
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
  md-row,
  md-select,
  md-sidenav,
  md-sidenav-container,
  md-slider,
  md-spinner,
  md-tab,
  md-table,
  md-tab-group,
  md-toolbar`;
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
}
CompatibilityModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MatPrefixRejector, MdPrefixRejector],
                exports: [MatPrefixRejector, MdPrefixRejector],
            },] },
];
/**
 * @nocollapse
 */
CompatibilityModule.ctorParameters = () => [];
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
 * Injection token that configures whether the Material sanity checks are enabled.
 */
const MATERIAL_SANITY_CHECKS = new InjectionToken('md-sanity-checks');
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, compatibility mode, etc.
 *
 * This module should be imported to each top-level component module (e.g., MdTabsModule).
 */
class MdCommonModule {
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
MdCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule, BidiModule],
                exports: [CompatibilityModule, BidiModule],
                providers: [{
                        provide: MATERIAL_SANITY_CHECKS, useValue: true,
                    }],
            },] },
];
/**
 * @nocollapse
 */
MdCommonModule.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_SANITY_CHECKS,] },] },
];

/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
class MdLine {
}
MdLine.decorators = [
    { type: Directive, args: [{
                selector: '[md-line], [mat-line], [mdLine], [matLine]',
                host: { 'class': 'mat-line' }
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
        ripple.style.backgroundColor = config.color || null;
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
            rippleRef.state = RippleState.HIDDEN; /** @type {?} */
            ((rippleEl.parentNode)).removeChild(rippleEl);
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
            this._triggerEvents.forEach((fn, type) => {
                ((this._triggerElement)).removeEventListener(type, fn);
            });
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
     * @return {?}
     */
    get _matRippleTrigger() { return this.trigger; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matRippleTrigger(v) { this.trigger = v; }
    /**
     * @return {?}
     */
    get _matRippleCentered() { return this.centered; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matRippleCentered(v) { this.centered = v; }
    /**
     * @return {?}
     */
    get _matRippleDisabled() { return this.disabled; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matRippleDisabled(v) { this.disabled = v; }
    /**
     * @return {?}
     */
    get _matRippleRadius() { return this.radius; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matRippleRadius(v) { this.radius = v; }
    /**
     * @return {?}
     */
    get _matRippleSpeedFactor() { return this.speedFactor; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matRippleSpeedFactor(v) { this.speedFactor = v; }
    /**
     * @return {?}
     */
    get _matRippleColor() { return this.color; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matRippleColor(v) { this.color = v; }
    /**
     * @return {?}
     */
    get _matRippleUnbounded() { return this.unbounded; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matRippleUnbounded(v) { this.unbounded = v; }
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
    '_matRippleTrigger': [{ type: Input, args: ['matRippleTrigger',] },],
    '_matRippleCentered': [{ type: Input, args: ['matRippleCentered',] },],
    '_matRippleDisabled': [{ type: Input, args: ['matRippleDisabled',] },],
    '_matRippleRadius': [{ type: Input, args: ['matRippleRadius',] },],
    '_matRippleSpeedFactor': [{ type: Input, args: ['matRippleSpeedFactor',] },],
    '_matRippleColor': [{ type: Input, args: ['matRippleColor',] },],
    '_matRippleUnbounded': [{ type: Input, args: ['matRippleUnbounded',] },],
};

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
 * Note that theming is meant to be handled by the parent element, e.g.
 * `mat-primary .mat-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * \@docs-private
 */
class MdPseudoCheckbox {
    constructor() {
        /**
         * Display state of the checkbox.
         */
        this.state = 'unchecked';
        /**
         * Whether the checkbox is disabled.
         */
        this.disabled = false;
    }
}
MdPseudoCheckbox.decorators = [
    { type: Component, args: [{encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
                styles: [".mat-pseudo-checkbox{width:20px;height:20px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:9px;left:2px;width:16px;opacity:1}.mat-pseudo-checkbox-checked::after{top:5px;left:3px;width:12px;height:5px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1}"],
                template: '',
                host: {
                    'class': 'mat-pseudo-checkbox',
                    '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                    '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
                    '[class.mat-pseudo-checkbox-disabled]': 'disabled',
                },
            },] },
];
/**
 * @nocollapse
 */
MdPseudoCheckbox.ctorParameters = () => [];
MdPseudoCheckbox.propDecorators = {
    'state': [{ type: Input },],
    'disabled': [{ type: Input },],
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
 * \@docs-private
 */
class MdOptgroupBase {
}
const _MdOptgroupMixinBase = mixinDisabled(MdOptgroupBase);
// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `md-option`.
 */
class MdOptgroup extends _MdOptgroupMixinBase {
    constructor() {
        super(...arguments);
        /**
         * Unique id for the underlying label.
         */
        this._labelId = `mat-optgroup-label-${_uniqueOptgroupIdCounter++}`;
    }
}
MdOptgroup.decorators = [
    { type: Component, args: [{selector: 'md-optgroup, mat-optgroup',
                template: "<label class=\"mat-optgroup-label\" [id]=\"_labelId\">{{ label }}</label><ng-content select=\"md-option, mat-option\"></ng-content>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled'],
                host: {
                    'class': 'mat-optgroup',
                    'role': 'group',
                    '[class.mat-optgroup-disabled]': 'disabled',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-labelledby]': '_labelId',
                }
            },] },
];
/**
 * @nocollapse
 */
MdOptgroup.ctorParameters = () => [];
MdOptgroup.propDecorators = {
    'label': [{ type: Input },],
};

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
     * @param {?} _changeDetectorRef
     * @param {?} group
     * @param {?} _isCompatibilityMode
     */
    constructor(_element, _changeDetectorRef, group, _isCompatibilityMode) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this.group = group;
        this._isCompatibilityMode = _isCompatibilityMode;
        this._selected = false;
        this._active = false;
        this._multiple = false;
        this._disableRipple = false;
        /**
         * Whether the option is disabled.
         */
        this._disabled = false;
        this._id = `md-option-${_uniqueIdCounter++}`;
        /**
         * Event emitted when the option is selected or deselected.
         */
        this.onSelectionChange = new EventEmitter();
    }
    /**
     * Whether the wrapping component is in multiple selection mode.
     * @return {?}
     */
    get multiple() { return this._multiple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        if (value !== this._multiple) {
            this._multiple = value;
            this._changeDetectorRef.markForCheck();
        }
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
    get disabled() { return (this.group && this.group.disabled) || this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether ripples for the option are disabled.
     * @return {?}
     */
    get disableRipple() { return this._disableRipple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disableRipple(value) {
        this._disableRipple = value;
        this._changeDetectorRef.markForCheck();
    }
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
        return (this._getHostElement().textContent || '').trim();
    }
    /**
     * Selects the option.
     * @return {?}
     */
    select() {
        this._selected = true;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent();
    }
    /**
     * Deselects the option.
     * @return {?}
     */
    deselect() {
        this._selected = false;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent();
    }
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    focus() {
        const /** @type {?} */ element = this._getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    getLabel() {
        return this.viewValue;
    }
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
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
            this._changeDetectorRef.markForCheck();
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
     * Gets the host DOM element.
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
                    'class': 'mat-option',
                },
                template: "<span [ngSwitch]=\"_isCompatibilityMode\" *ngIf=\"multiple\"><mat-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchCase=\"true\" [state]=\"selected ? 'checked' : ''\"></mat-pseudo-checkbox><md-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchDefault [state]=\"selected ? 'checked' : ''\"></md-pseudo-checkbox></span><ng-content></ng-content><div class=\"mat-option-ripple\" md-ripple [mdRippleTrigger]=\"_getHostElement()\" [mdRippleDisabled]=\"disabled || disableRipple\"></div>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/**
 * @nocollapse
 */
MdOption.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: MdOptgroup, decorators: [{ type: Optional },] },
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
                exports: [MdOption, MdOptgroup],
                declarations: [MdOption, MdOptgroup]
            },] },
];
/**
 * @nocollapse
 */
MdOptionModule.ctorParameters = () => [];

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
        if (this._isMulti && this._selected) {
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
            if (this.onChange) {
                this.onChange.next(eventData);
            }
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
     * @return {?} Function used to deregister listener
     *
     */
    listen(listener) {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter((registered) => {
                return listener !== registered;
            });
        };
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
 * \@docs-private
 * @param {?} parentDispatcher
 * @return {?}
 */
function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
/**
 * \@docs-private
 */
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
            return of(null);
        }
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            let /** @type {?} */ cachedInfo = this._elementInfo.get(element); /** @type {?} */
            ((cachedInfo)).checkChildren = checkChildren;
            return ((cachedInfo)).subject.asObservable();
        }
        // Create monitored element info.
        let /** @type {?} */ info = {
            unlisten: () => { },
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
            this._setClasses(element);
            this._elementInfo.delete(element);
        }
    }
    /**
     * Focuses the element via the specified focus origin.
     * @param {?} element The element to focus.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    focusVia(element, origin) {
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
     * @param {?=} origin The focus origin.
     * @return {?}
     */
    _setClasses(element, origin) {
        const /** @type {?} */ elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            const /** @type {?} */ toggleClass = (className, shouldSet) => {
                shouldSet ? elementInfo.renderer.addClass(element, className) :
                    elementInfo.renderer.removeClass(element, className);
            };
            toggleClass('cdk-focused', !!origin);
            toggleClass('cdk-touch-focused', origin === 'touch');
            toggleClass('cdk-keyboard-focused', origin === 'keyboard');
            toggleClass('cdk-mouse-focused', origin === 'mouse');
            toggleClass('cdk-program-focused', origin === 'program');
        }
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
        const /** @type {?} */ elementInfo = this._elementInfo.get(element);
        if (!elementInfo || (!elementInfo.checkChildren && element !== event.target)) {
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
        elementInfo.subject.next(this._origin);
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
        const /** @type {?} */ elementInfo = this._elementInfo.get(element);
        if (!elementInfo || (elementInfo.checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget))) {
            return;
        }
        this._setClasses(element);
        elementInfo.subject.next(null);
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
        this._monitorSubscription = this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(origin => this.cdkFocusChange.emit(origin));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
        this._monitorSubscription.unsubscribe();
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
 * \@docs-private
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new FocusOriginMonitor(ngZone, platform);
}
/**
 * \@docs-private
 */
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
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 */
class DateAdapter {
    /**
     * Gets the year component of the given date.
     * @abstract
     * @param {?} date The date to extract the year from.
     * @return {?} The year component.
     */
    getYear(date) { }
    /**
     * Gets the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the month from.
     * @return {?} The month component (0-indexed, 0 = January).
     */
    getMonth(date) { }
    /**
     * Gets the date of the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the date of the month from.
     * @return {?} The month component (1-indexed, 1 = first of month).
     */
    getDate(date) { }
    /**
     * Gets the day of the week component of the given date.
     * @abstract
     * @param {?} date The date to extract the day of the week from.
     * @return {?} The month component (0-indexed, 0 = Sunday).
     */
    getDayOfWeek(date) { }
    /**
     * Gets a list of names for the months.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @return {?} An ordered list of all month names, starting with January.
     */
    getMonthNames(style$$1) { }
    /**
     * Gets a list of names for the dates of the month.
     * @abstract
     * @return {?} An ordered list of all date of the month names, starting with '1'.
     */
    getDateNames() { }
    /**
     * Gets a list of names for the days of the week.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @return {?} An ordered list of all weekday names, starting with Sunday.
     */
    getDayOfWeekNames(style$$1) { }
    /**
     * Gets the name for the year of the given date.
     * @abstract
     * @param {?} date The date to get the year name for.
     * @return {?} The name of the given year (e.g. '2017').
     */
    getYearName(date) { }
    /**
     * Gets the first day of the week.
     * @abstract
     * @return {?} The first day of the week (0-indexed, 0 = Sunday).
     */
    getFirstDayOfWeek() { }
    /**
     * Gets the number of days in the month of the given date.
     * @abstract
     * @param {?} date The date whose month should be checked.
     * @return {?} The number of days in the month of the given date.
     */
    getNumDaysInMonth(date) { }
    /**
     * Clones the given date.
     * @abstract
     * @param {?} date The date to clone
     * @return {?} A new date equal to the given date.
     */
    clone(date) { }
    /**
     * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
     * month and date.
     * @abstract
     * @param {?} year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param {?} month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param {?} date The date of month of the date. Must be an integer 1 - length of the given month.
     * @return {?} The new date, or null if invalid.
     */
    createDate(year, month, date) { }
    /**
     * Gets today's date.
     * @abstract
     * @return {?} Today's date.
     */
    today() { }
    /**
     * Parses a date from a value.
     * @abstract
     * @param {?} value The value to parse.
     * @param {?} parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @return {?} The parsed date.
     */
    parse(value, parseFormat) { }
    /**
     * Formats a date as a string.
     * @abstract
     * @param {?} date The value to format.
     * @param {?} displayFormat The format to use to display the date as a string.
     * @return {?} The formatted date string.
     */
    format(date, displayFormat) { }
    /**
     * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
     * calendar for each year and then finding the closest date in the new month. For example when
     * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add years to.
     * @param {?} years The number of years to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of years added.
     */
    addCalendarYears(date, years) { }
    /**
     * Adds the given number of months to the date. Months are counted as if flipping a page on the
     * calendar for each month and then finding the closest date in the new month. For example when
     * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add months to.
     * @param {?} months The number of months to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of months added.
     */
    addCalendarMonths(date, months) { }
    /**
     * Adds the given number of days to the date. Days are counted as if moving one cell on the
     * calendar for each day.
     * @abstract
     * @param {?} date The date to add days to.
     * @param {?} days The number of days to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of days added.
     */
    addCalendarDays(date, days) { }
    /**
     * Gets the RFC 3339 compatible date string (https://tools.ietf.org/html/rfc3339)  for the given
     * date.
     * @abstract
     * @param {?} date The date to get the ISO date string for.
     * @return {?} The ISO date string date string.
     */
    getISODateString(date) { }
    /**
     * Checks whether the given object is considered a date instance by this DateAdapter.
     * @abstract
     * @param {?} obj The object to check
     * @return {?} Whether the object is a date instance.
     */
    isDateInstance(obj) { }
    /**
     * Checks whether the given date is valid.
     * @abstract
     * @param {?} date The date to check.
     * @return {?} Whether the date is valid.
     */
    isValid(date) { }
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
    }
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first$$1, second) {
        return this.getYear(first$$1) - this.getYear(second) ||
            this.getMonth(first$$1) - this.getMonth(second) ||
            this.getDate(first$$1) - this.getDate(second);
    }
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     *     Null dates are considered equal to other null dates.
     * @return {?}
     */
    sameDate(first$$1, second) {
        return first$$1 && second ? !this.compareDate(first$$1, second) : first$$1 == second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    }
}

/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param {?} dest The object which will have properties copied to it.
 * @param {...?} sources The source objects from which properties will be copied.
 * @return {?}
 */
function extendObject(dest, ...sources) {
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (let /** @type {?} */ source of sources) {
        if (source != null) {
            for (let /** @type {?} */ key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}

/**
 * Whether the browser supports the Intl API.
 */
const SUPPORTS_INTL_API = typeof Intl != 'undefined';
/**
 * The default month names to use if Intl API is not available.
 */
const DEFAULT_MONTH_NAMES = {
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
const DEFAULT_DATE_NAMES = range(31, i => String(i + 1));
/**
 * The default day of the week names to use if Intl API is not available.
 */
const DEFAULT_DAY_OF_WEEK_NAMES = {
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
    const /** @type {?} */ valuesArray = Array(length);
    for (let /** @type {?} */ i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
class NativeDateAdapter extends DateAdapter {
    /**
     * @param {?} localeId
     */
    constructor(localeId) {
        super();
        /**
         * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
         * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
         * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
         * will produce `'8/13/1800'`.
         */
        this.useUtcForDisplay = true;
        super.setLocale(localeId);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return date.getFullYear();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return date.getMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return date.getDate();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return date.getDay();
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style$$1) {
        if (SUPPORTS_INTL_API) {
            let /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, { month: style$$1 });
            return range(12, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, i, 1))));
        }
        return DEFAULT_MONTH_NAMES[style$$1];
    }
    /**
     * @return {?}
     */
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            let /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
            return range(31, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DATE_NAMES;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style$$1) {
        if (SUPPORTS_INTL_API) {
            let /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, { weekday: style$$1 });
            return range(7, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style$$1];
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            let /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return String(this.getYear(date));
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    createDate(year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        let /** @type {?} */ result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() != month) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @return {?}
     */
    today() {
        return new Date();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value == 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('NativeDateAdapter: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            if (this.useUtcForDisplay) {
                date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
                displayFormat = extendObject({}, displayFormat, { timeZone: 'utc' });
            }
            let /** @type {?} */ dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        let /** @type {?} */ newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getISODateString(date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return !isNaN(date.getTime());
    }
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    _createDateWithOverflow(year, month, date) {
        let /** @type {?} */ result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    _2digit(n) {
        return ('00' + n).slice(-2);
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    _stripDirectionalityCharacters(str) {
        return str.replace(/[\u200e\u200f]/g, '');
    }
}
NativeDateAdapter.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
NativeDateAdapter.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LOCALE_ID,] },] },
];

const MD_DATE_FORMATS = new InjectionToken('md-date-formats');

const MD_NATIVE_DATE_FORMATS = {
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

class NativeDateModule {
}
NativeDateModule.decorators = [
    { type: NgModule, args: [{
                providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
            },] },
];
/**
 * @nocollapse
 */
NativeDateModule.ctorParameters = () => [];
class MdNativeDateModule {
}
MdNativeDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateModule],
                providers: [{ provide: MD_DATE_FORMATS, useValue: MD_NATIVE_DATE_FORMATS }],
            },] },
];
/**
 * @nocollapse
 */
MdNativeDateModule.ctorParameters = () => [];

/**
 * InjectionToken that can be used to specify the global placeholder options.
 */
const MD_PLACEHOLDER_GLOBAL_OPTIONS = new InjectionToken('md-placeholder-global-options');

/**
 * Injection token that can be used to specify the global error options.
 */
const MD_ERROR_GLOBAL_OPTIONS = new InjectionToken('md-error-global-options');
/**
 * Returns whether control is invalid and is either touched or is a part of a submitted form.
 * @param {?} control
 * @param {?} form
 * @return {?}
 */
function defaultErrorStateMatcher(control, form) {
    const /** @type {?} */ isSubmitted = form && form.submitted;
    return !!(control.invalid && (control.touched || isSubmitted));
}
/**
 * Returns whether control is invalid and is either dirty or is a part of a submitted form.
 * @param {?} control
 * @param {?} form
 * @return {?}
 */
function showOnDirtyErrorStateMatcher(control, form) {
    const /** @type {?} */ isSubmitted = form && form.submitted;
    return !!(control.invalid && (control.dirty || isSubmitted));
}

class MdCoreModule {
}
MdCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MdLineModule,
                    BidiModule,
                    MdRippleModule,
                    ObserversModule,
                    PortalModule,
                    OverlayModule,
                    A11yModule,
                    MdOptionModule,
                    MdSelectionModule,
                ],
                exports: [
                    MdLineModule,
                    BidiModule,
                    MdRippleModule,
                    ObserversModule,
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
         * Whether the autocomplete panel should be visible, depending on option length.
         */
        this.showPanel = false;
        /**
         * Function that maps an option's control value to its display value in the trigger.
         */
        this.displayWith = null;
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
     * Sets the panel scrollTop. This allows us to manually scroll to display options
     * above or below the fold, as they are not actually being focused when active.
     * @param {?} scrollTop
     * @return {?}
     */
    _setScrollTop(scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    }
    /**
     * Returns the panel's scrollTop.
     * @return {?}
     */
    _getScrollTop() {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
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
     * Sets a class on the panel based on whether it is visible.
     * @return {?}
     */
    _getClassList() {
        return {
            'mat-autocomplete-visible': this.showPanel,
            'mat-autocomplete-hidden': !this.showPanel
        };
    }
}
MdAutocomplete.decorators = [
    { type: Component, args: [{selector: 'md-autocomplete, mat-autocomplete',
                template: "<ng-template><div class=\"mat-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"_getClassList()\" #panel><ng-content></ng-content></div></ng-template>",
                styles: [".mat-autocomplete-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative}.mat-autocomplete-panel:not([class*=mat-elevation-z]){box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'mdAutocomplete',
                host: {
                    'class': 'mat-autocomplete'
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

/**
 * The height of each autocomplete option.
 */
const AUTOCOMPLETE_OPTION_HEIGHT = 48;
/**
 * The total height of the autocomplete panel.
 */
const AUTOCOMPLETE_PANEL_HEIGHT = 256;
/**
 * Injection token that determines the scroll handling while the autocomplete panel is open.
 */
const MD_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken('md-autocomplete-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MD_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/**
 * \@docs-private
 */
const MD_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER = {
    provide: MD_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MD_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 */
const MD_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdAutocompleteTrigger),
    multi: true
};
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 * @return {?}
 */
function getMdAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `md-autocomplete`. ' +
        'Make sure that the id passed to the `mdAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}
class MdAutocompleteTrigger {
    /**
     * @param {?} _element
     * @param {?} _overlay
     * @param {?} _viewContainerRef
     * @param {?} _zone
     * @param {?} _changeDetectorRef
     * @param {?} _scrollStrategy
     * @param {?} _dir
     * @param {?} _document
     */
    constructor(_element, _overlay, _viewContainerRef, _zone, _changeDetectorRef, _scrollStrategy, _dir, _document) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._zone = _zone;
        this._changeDetectorRef = _changeDetectorRef;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this._document = _document;
        this._panelOpen = false;
        /**
         * Whether or not the placeholder state is being overridden.
         */
        this._manuallyFloatingPlaceholder = false;
        /**
         * View -> model callback called when value changes
         */
        this._onChange = () => { };
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
        if (!this.autocomplete) {
            throw getMdAutocompleteMissingPanelError();
        }
        if (!this._overlayRef) {
            this._createOverlay();
        }
        else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.getState().width = this._getHostWidth();
            this._overlayRef.updateSize();
        }
        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
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
            this._closingActionsSubscription.unsubscribe();
        }
        this._resetPlaceholder();
        if (this._panelOpen) {
            this._panelOpen = false;
            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the placeholder is reset when the
            // user clicks outside.
            this._changeDetectorRef.detectChanges();
        }
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     * @return {?}
     */
    get panelClosingActions() {
        return merge(this.optionSelections, this.autocomplete._keyManager.tabOut, this._outsideClickStream);
    }
    /**
     * Stream of autocomplete option selections.
     * @return {?}
     */
    get optionSelections() {
        return merge(...this.autocomplete.options.map(option => option.onSelectionChange));
    }
    /**
     * The currently active option, coerced to MdOption type.
     * @return {?}
     */
    get activeOption() {
        if (this.autocomplete && this.autocomplete._keyManager) {
            return this.autocomplete._keyManager.activeItem;
        }
        return null;
    }
    /**
     * Stream of clicks outside of the autocomplete panel.
     * @return {?}
     */
    get _outsideClickStream() {
        if (!this._document) {
            return of(null);
        }
        return RxChain.from(merge(fromEvent(this._document, 'click'), fromEvent(this._document, 'touchend'))).call(filter, (event) => {
            const /** @type {?} */ clickTarget = (event.target);
            const /** @type {?} */ formField = this._formField ?
                this._formField._elementRef.nativeElement : null;
            return this._panelOpen &&
                clickTarget !== this._element.nativeElement &&
                (!formField || !formField.contains(clickTarget)) &&
                (!!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget));
        }).result();
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
        if (event.keyCode === ESCAPE && this.panelOpen) {
            this._resetActiveItem();
            this.closePanel();
            event.stopPropagation();
        }
        else if (this.activeOption && event.keyCode === ENTER && this.panelOpen) {
            this.activeOption._selectViaInteraction();
            this._resetActiveItem();
            event.preventDefault();
        }
        else {
            const /** @type {?} */ prevActiveItem = this.autocomplete._keyManager.activeItem;
            const /** @type {?} */ isArrowKey = event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW;
            if (this.panelOpen) {
                this.autocomplete._keyManager.onKeydown(event);
            }
            else if (isArrowKey) {
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
        if (this._formField && this._formField.floatPlaceholder === 'auto') {
            this._formField.floatPlaceholder = 'always';
            this._manuallyFloatingPlaceholder = true;
        }
    }
    /**
     * If the placeholder has been manually elevated, return it to its normal state.
     * @return {?}
     */
    _resetPlaceholder() {
        if (this._manuallyFloatingPlaceholder) {
            this._formField.floatPlaceholder = 'auto';
            this._manuallyFloatingPlaceholder = false;
        }
    }
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     * @return {?}
     */
    _scrollToOption() {
        const /** @type {?} */ optionOffset = this.autocomplete._keyManager.activeItemIndex ?
            this.autocomplete._keyManager.activeItemIndex * AUTOCOMPLETE_OPTION_HEIGHT : 0;
        const /** @type {?} */ panelTop = this.autocomplete._getScrollTop();
        if (optionOffset < panelTop) {
            // Scroll up to reveal selected option scrolled above the panel top
            this.autocomplete._setScrollTop(optionOffset);
        }
        else if (optionOffset + AUTOCOMPLETE_OPTION_HEIGHT > panelTop + AUTOCOMPLETE_PANEL_HEIGHT) {
            // Scroll down to reveal selected option scrolled below the panel bottom
            const /** @type {?} */ newScrollTop = Math.max(0, optionOffset - AUTOCOMPLETE_PANEL_HEIGHT + AUTOCOMPLETE_OPTION_HEIGHT);
            this.autocomplete._setScrollTop(newScrollTop);
        }
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @return {?}
     */
    _subscribeToClosingActions() {
        const /** @type {?} */ firstStable = first.call(this._zone.onStable);
        const /** @type {?} */ optionChanges = map.call(this.autocomplete.options.changes, () => this._positionStrategy.recalculateLastPosition());
        // When the zone is stable initially, and when the option list changes...
        return RxChain.from(merge(firstStable, optionChanges))
            .call(switchMap, () => {
            this._resetActiveItem();
            this.autocomplete._setVisibility();
            return this.panelClosingActions;
        })
            .call(first)
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
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const /** @type {?} */ inputValue = toDisplay != null ? toDisplay : '';
        // If it's used within a `MdFormField`, we should set it through the property so it can go
        // through change detection.
        if (this._formField) {
            this._formField._control.value = inputValue;
        }
        else {
            this._element.nativeElement.value = inputValue;
        }
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
        this.autocomplete.options.forEach(option => {
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
        overlayState.scrollStrategy = this._scrollStrategy();
        return overlayState;
    }
    /**
     * @return {?}
     */
    _getOverlayPosition() {
        this._positionStrategy = this._overlay.position().connectedTo(this._getConnectedElement(), { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
        return this._positionStrategy;
    }
    /**
     * @return {?}
     */
    _getConnectedElement() {
        return this._formField ? this._formField._connectionContainerRef : this._element;
    }
    /**
     * Returns the width of the input element, so the panel width can match it.
     * @return {?}
     */
    _getHostWidth() {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
    /**
     * Reset active item to -1 so arrow events will activate the correct options.
     * @return {?}
     */
    _resetActiveItem() {
        this.autocomplete._keyManager.setActiveItem(-1);
    }
}
MdAutocompleteTrigger.decorators = [
    { type: Directive, args: [{
                selector: `input[mdAutocomplete], input[matAutocomplete],
             textarea[mdAutocomplete], textarea[matAutocomplete]`,
                host: {
                    'role': 'combobox',
                    'autocomplete': 'off',
                    'aria-autocomplete': 'list',
                    'aria-multiline': 'false',
                    '[attr.aria-activedescendant]': 'activeOption?.id',
                    '[attr.aria-expanded]': 'panelOpen.toString()',
                    '[attr.aria-owns]': 'autocomplete?.id',
                    // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
                    // a little earlier. This avoids issues where IE delays the focusing of the input.
                    '(focusin)': 'openPanel()',
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
    { type: NgZone, },
    { type: ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: Inject, args: [MD_AUTOCOMPLETE_SCROLL_STRATEGY,] },] },
    { type: Directionality, decorators: [{ type: Optional },] },
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
                providers: [MD_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
MdAutocompleteModule.ctorParameters = () => [];

/**
 * Custom injector to be used when providing custom
 * injection tokens to components inside a portal.
 * \@docs-private
 */
class PortalInjector {
    /**
     * @param {?} _parentInjector
     * @param {?} _customTokens
     */
    constructor(_parentInjector, _customTokens) {
        this._parentInjector = _parentInjector;
        this._customTokens = _customTokens;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) {
        const /** @type {?} */ value = this._customTokens.get(token);
        if (typeof value !== 'undefined') {
            return value;
        }
        return this._parentInjector.get(token, notFoundValue);
    }
}

/**
 * Configuration for opening a modal dialog with the MdDialog service.
 */
class MdDialogConfig {
    constructor() {
        /**
         * The ARIA role of the dialog element.
         */
        this.role = 'dialog';
        /**
         * Custom class for the overlay pane.
         */
        this.panelClass = '';
        /**
         * Whether the dialog has a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * Custom class for the backdrop,
         */
        this.backdropClass = '';
        /**
         * Whether the user can use escape or clicking outside to close a modal.
         */
        this.disableClose = false;
        /**
         * Width of the dialog.
         */
        this.width = '';
        /**
         * Height of the dialog.
         */
        this.height = '';
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        /**
         * Layout direction for the dialog's content.
         */
        this.direction = 'ltr';
        /**
         * ID of the element that describes the dialog.
         */
        this.ariaDescribedBy = null;
        // TODO(jelbourn): add configuration for lifecycle hooks, ARIA labelling.
    }
}

// TODO(jelbourn): resizing
// TODO(jelbourn): afterOpen and beforeClose
// Counter for unique dialog ids.
let uniqueId = 0;
/**
 * Reference to a dialog opened via the MdDialog service.
 */
class MdDialogRef {
    /**
     * @param {?} _overlayRef
     * @param {?} _containerInstance
     * @param {?=} id
     */
    constructor(_overlayRef, _containerInstance, id = `md-dialog-${uniqueId++}`) {
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        /**
         * Whether the user is allowed to close the dialog.
         */
        this.disableClose = this._containerInstance._config.disableClose;
        /**
         * Subject for notifying the user that the dialog has finished closing.
         */
        this._afterClosed = new Subject();
        RxChain.from(_containerInstance._animationStateChanged)
            .call(filter, event => event.phaseName === 'done' && event.toState === 'exit')
            .call(first)
            .subscribe(() => {
            this._overlayRef.dispose();
            this._afterClosed.next(this._result);
            this._afterClosed.complete();
            this.componentInstance = null;
        });
    }
    /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    close(dialogResult) {
        this._result = dialogResult;
        // Transition the backdrop in parallel to the dialog.
        RxChain.from(this._containerInstance._animationStateChanged)
            .call(filter, event => event.phaseName === 'start')
            .call(first)
            .subscribe(() => this._overlayRef.detachBackdrop());
        this._containerInstance._startExitAnimation();
    }
    /**
     * Gets an observable that is notified when the dialog is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    /**
     * Updates the dialog's position.
     * @param {?=} position New dialog position.
     * @return {?}
     */
    updatePosition(position) {
        let /** @type {?} */ strategy = this._getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        this._overlayRef.updatePosition();
        return this;
    }
    /**
     * Updates the dialog's width and height.
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {?}
     */
    updateSize(width = 'auto', height = 'auto') {
        this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    }
    /**
     * Returns whether the dialog is animating.
     * @return {?}
     */
    _isAnimating() {
        return this._containerInstance._isAnimating;
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    _getPositionStrategy() {
        return (this._overlayRef.getState().positionStrategy);
    }
}

/**
 * Throws an exception for the case when a ComponentPortal is
 * attached to a DomPortalHost without an origin.
 * \@docs-private
 * @return {?}
 */
function throwMdDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
/**
 * Internal component that wraps user-provided dialog content.
 * Animation is based on https://material.io/guidelines/motion/choreography.html.
 * \@docs-private
 */
class MdDialogContainer extends BasePortalHost {
    /**
     * @param {?} _ngZone
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     * @param {?} _changeDetectorRef
     * @param {?} _document
     */
    constructor(_ngZone, _elementRef, _focusTrapFactory, _changeDetectorRef, _document) {
        super();
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._changeDetectorRef = _changeDetectorRef;
        this._document = _document;
        /**
         * Element that was focused before the dialog was opened. Save this to restore upon close.
         */
        this._elementFocusedBeforeDialogWasOpened = null;
        /**
         * State of the dialog animation.
         */
        this._state = 'enter';
        /**
         * Emits when an animation state changes.
         */
        this._animationStateChanged = new EventEmitter();
        /**
         * ID of the element that should be considered as the dialog's label.
         */
        this._ariaLabelledBy = null;
        /**
         * Whether the container is currently mid-animation.
         */
        this._isAnimating = false;
    }
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    attachComponentPortal(portal) {
        if (this._portalHost.hasAttached()) {
            throwMdDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachComponentPortal(portal);
    }
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    attachTemplatePortal(portal) {
        if (this._portalHost.hasAttached()) {
            throwMdDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachTemplatePortal(portal);
    }
    /**
     * Moves the focus inside the focus trap.
     * @return {?}
     */
    _trapFocus() {
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        this._focusTrap.focusInitialElementWhenReady();
    }
    /**
     * Restores focus to the element that was focused before the dialog opened.
     * @return {?}
     */
    _restoreFocus() {
        const /** @type {?} */ toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    }
    /**
     * Saves a reference to the element that was focused before the dialog was opened.
     * @return {?}
     */
    _savePreviouslyFocusedElement() {
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = (this._document.activeElement);
        }
    }
    /**
     * Callback, invoked whenever an animation on the host completes.
     * @param {?} event
     * @return {?}
     */
    _onAnimationDone(event) {
        if (event.toState === 'enter') {
            this._trapFocus();
        }
        else if (event.toState === 'exit') {
            this._restoreFocus();
        }
        this._animationStateChanged.emit(event);
        this._isAnimating = false;
    }
    /**
     * Callback, invoked when an animation on the host starts.
     * @param {?} event
     * @return {?}
     */
    _onAnimationStart(event) {
        this._isAnimating = true;
        this._animationStateChanged.emit(event);
    }
    /**
     * Starts the dialog exit animation.
     * @return {?}
     */
    _startExitAnimation() {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    }
}
MdDialogContainer.decorators = [
    { type: Component, args: [{selector: 'md-dialog-container, mat-dialog-container',
                template: "<ng-template cdkPortalHost></ng-template>",
                styles: [".mat-dialog-container{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:block;padding:24px;border-radius:2px;box-sizing:border-box;overflow:auto;max-width:80vw;width:100%;height:100%}@media screen and (-ms-high-contrast:active){.mat-dialog-container{outline:solid 1px}}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:12px 0;display:flex;flex-wrap:wrap}.mat-dialog-actions:last-child{margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button+.mat-button,.mat-dialog-actions .mat-button+.mat-raised-button,.mat-dialog-actions .mat-raised-button+.mat-button,.mat-dialog-actions .mat-raised-button+.mat-raised-button{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button+.mat-button,[dir=rtl] .mat-dialog-actions .mat-button+.mat-raised-button,[dir=rtl] .mat-dialog-actions .mat-raised-button+.mat-button,[dir=rtl] .mat-dialog-actions .mat-raised-button+.mat-raised-button{margin-left:0;margin-right:8px}"],
                encapsulation: ViewEncapsulation.None,
                animations: [
                    trigger('slideDialog', [
                        // Note: The `enter` animation doesn't transition to something like `translate3d(0, 0, 0)
                        // scale(1)`, because for some reason specifying the transform explicitly, causes IE both
                        // to blur the dialog content and decimate the animation performance. Leaving it as `none`
                        // solves both issues.
                        state('enter', style({ transform: 'none', opacity: 1 })),
                        state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
                        state('exit', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
                        transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
                    ])
                ],
                host: {
                    'class': 'mat-dialog-container',
                    '[attr.role]': '_config?.role',
                    '[attr.aria-labelledby]': '_ariaLabelledBy',
                    '[attr.aria-describedby]': '_config?.ariaDescribedBy || null',
                    '[@slideDialog]': '_state',
                    '(@slideDialog.start)': '_onAnimationStart($event)',
                    '(@slideDialog.done)': '_onAnimationDone($event)',
                },
            },] },
];
/**
 * @nocollapse
 */
MdDialogContainer.ctorParameters = () => [
    { type: NgZone, },
    { type: ElementRef, },
    { type: FocusTrapFactory, },
    { type: ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
];
MdDialogContainer.propDecorators = {
    '_portalHost': [{ type: ViewChild, args: [PortalHostDirective,] },],
};

const MD_DIALOG_DATA = new InjectionToken('MdDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 */
const MD_DIALOG_SCROLL_STRATEGY = new InjectionToken('md-dialog-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MD_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
/**
 * \@docs-private
 */
const MD_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: MD_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MD_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/**
 * Service to open Material Design modal dialogs.
 */
class MdDialog {
    /**
     * @param {?} _overlay
     * @param {?} _injector
     * @param {?} _scrollStrategy
     * @param {?} _location
     * @param {?} _parentDialog
     */
    constructor(_overlay, _injector, _scrollStrategy, _location, _parentDialog) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._scrollStrategy = _scrollStrategy;
        this._location = _location;
        this._parentDialog = _parentDialog;
        this._openDialogsAtThisLevel = [];
        this._afterAllClosedAtThisLevel = new Subject();
        this._afterOpenAtThisLevel = new Subject();
        this._boundKeydown = this._handleKeydown.bind(this);
        /**
         * Stream that emits when all open dialog have finished closing.
         * Will emit on subscribe if there are no open dialogs to begin with.
         */
        this.afterAllClosed = defer(() => this.openDialogs.length ?
            this._afterAllClosed :
            startWith.call(this._afterAllClosed, undefined));
        // Close all of the dialogs when the user goes forwards/backwards in history or when the
        // location hash changes. Note that this usually doesn't include clicking on links (unless
        // the user is using the `HashLocationStrategy`).
        if (!_parentDialog && _location) {
            _location.subscribe(() => this.closeAll());
        }
    }
    /**
     * Keeps track of the currently-open dialogs.
     * @return {?}
     */
    get openDialogs() {
        return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
    }
    /**
     * Stream that emits when a dialog has been opened.
     * @return {?}
     */
    get afterOpen() {
        return this._parentDialog ? this._parentDialog.afterOpen : this._afterOpenAtThisLevel;
    }
    /**
     * @return {?}
     */
    get _afterAllClosed() {
        const /** @type {?} */ parent = this._parentDialog;
        return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
    }
    /**
     * Opens a modal dialog containing the given component.
     * @template T
     * @param {?} componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param {?=} config Extra configuration options.
     * @return {?} Reference to the newly-opened dialog.
     */
    open(componentOrTemplateRef, config) {
        const /** @type {?} */ inProgressDialog = this.openDialogs.find(dialog => dialog._isAnimating());
        // If there's a dialog that is in the process of being opened, return it instead.
        if (inProgressDialog) {
            return inProgressDialog;
        }
        config = _applyConfigDefaults(config);
        if (config.id && this.getDialogById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        const /** @type {?} */ overlayRef = this._createOverlay(config);
        const /** @type {?} */ dialogContainer = this._attachDialogContainer(overlayRef, config);
        const /** @type {?} */ dialogRef = this._attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this.openDialogs.length) {
            document.addEventListener('keydown', this._boundKeydown);
        }
        this.openDialogs.push(dialogRef);
        dialogRef.afterClosed().subscribe(() => this._removeOpenDialog(dialogRef));
        this.afterOpen.next(dialogRef);
        return dialogRef;
    }
    /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    closeAll() {
        let /** @type {?} */ i = this.openDialogs.length;
        while (i--) {
            // The `_openDialogs` property isn't updated after close until the rxjs subscription
            // runs on the next microtask, in addition to modifying the array as we're going
            // through it. We loop through all of them and call close without assuming that
            // they'll be removed from the list instantaneously.
            this.openDialogs[i].close();
        }
    }
    /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    getDialogById(id) {
        return this.openDialogs.find(dialog => dialog.id === id);
    }
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the OverlayRef for the created overlay.
     */
    _createOverlay(config) {
        const /** @type {?} */ overlayState = this._getOverlayState(config);
        return this._overlay.create(overlayState);
    }
    /**
     * Creates an overlay state from a dialog config.
     * @param {?} dialogConfig The dialog configuration.
     * @return {?} The overlay configuration.
     */
    _getOverlayState(dialogConfig) {
        const /** @type {?} */ overlayState = new OverlayState();
        overlayState.panelClass = dialogConfig.panelClass;
        overlayState.hasBackdrop = dialogConfig.hasBackdrop;
        overlayState.scrollStrategy = this._scrollStrategy();
        overlayState.direction = dialogConfig.direction;
        if (dialogConfig.backdropClass) {
            overlayState.backdropClass = dialogConfig.backdropClass;
        }
        overlayState.positionStrategy = this._overlay.position().global();
        return overlayState;
    }
    /**
     * Attaches an MdDialogContainer to a dialog's already-created overlay.
     * @param {?} overlay Reference to the dialog's underlying overlay.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to a ComponentRef for the attached container.
     */
    _attachDialogContainer(overlay, config) {
        let /** @type {?} */ containerPortal = new ComponentPortal(MdDialogContainer, config.viewContainerRef);
        let /** @type {?} */ containerRef = overlay.attach(containerPortal);
        containerRef.instance._config = config;
        return containerRef.instance;
    }
    /**
     * Attaches the user-provided component to the already-created MdDialogContainer.
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MdDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MdDialogRef that should be returned to the user.
     */
    _attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        const /** @type {?} */ dialogRef = new MdDialogRef(overlayRef, dialogContainer, config.id);
        // When the dialog backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            });
        }
        if (componentOrTemplateRef instanceof TemplateRef) {
            dialogContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, /** @type {?} */ ((null))));
        }
        else {
            const /** @type {?} */ injector = this._createInjector(config, dialogRef, dialogContainer);
            const /** @type {?} */ contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    }
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @template T
     * @param {?} config Config object that is used to construct the dialog.
     * @param {?} dialogRef Reference to the dialog.
     * @param {?} dialogContainer
     * @return {?} The custom injector that can be used inside the dialog.
     */
    _createInjector(config, dialogRef, dialogContainer) {
        const /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const /** @type {?} */ injectionTokens = new WeakMap();
        injectionTokens.set(MdDialogRef, dialogRef);
        injectionTokens.set(MdDialogContainer, dialogContainer);
        injectionTokens.set(MD_DIALOG_DATA, config.data);
        return new PortalInjector(userInjector || this._injector, injectionTokens);
    }
    /**
     * Removes a dialog from the array of open dialogs.
     * @param {?} dialogRef Dialog to be removed.
     * @return {?}
     */
    _removeOpenDialog(dialogRef) {
        const /** @type {?} */ index = this.openDialogs.indexOf(dialogRef);
        if (index > -1) {
            this.openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this.openDialogs.length) {
                this._afterAllClosed.next();
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
    }
    /**
     * Handles global key presses while there are open dialogs. Closes the
     * top dialog when the user presses escape.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        const /** @type {?} */ topDialog = this.openDialogs[this.openDialogs.length - 1];
        const /** @type {?} */ canClose = topDialog ? !topDialog.disableClose : false;
        if (event.keyCode === ESCAPE && canClose) {
            topDialog.close();
        }
    }
}
MdDialog.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MdDialog.ctorParameters = () => [
    { type: Overlay, },
    { type: Injector, },
    { type: undefined, decorators: [{ type: Inject, args: [MD_DIALOG_SCROLL_STRATEGY,] },] },
    { type: Location, decorators: [{ type: Optional },] },
    { type: MdDialog, decorators: [{ type: Optional }, { type: SkipSelf },] },
];
/**
 * Applies default options to the dialog config.
 * @param {?=} config Config to be modified.
 * @return {?} The new configuration object.
 */
function _applyConfigDefaults(config) {
    return extendObject(new MdDialogConfig(), config);
}

/**
 * Counter used to generate unique IDs for dialog elements.
 */
let dialogElementUid = 0;
/**
 * Button that will close the current dialog.
 */
class MdDialogClose {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
        /**
         * Screenreader label for the button.
         */
        this.ariaLabel = 'Close dialog';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ proxiedChange = changes._matDialogClose || changes._mdDialogClose ||
            changes._matDialogCloseResult;
        if (proxiedChange) {
            this.dialogResult = proxiedChange.currentValue;
        }
    }
}
MdDialogClose.decorators = [
    { type: Directive, args: [{
                selector: `button[md-dialog-close], button[mat-dialog-close],
             button[mdDialogClose], button[matDialogClose]`,
                host: {
                    '(click)': 'dialogRef.close(dialogResult)',
                    '[attr.aria-label]': 'ariaLabel',
                    'type': 'button',
                }
            },] },
];
/**
 * @nocollapse
 */
MdDialogClose.ctorParameters = () => [
    { type: MdDialogRef, },
];
MdDialogClose.propDecorators = {
    'ariaLabel': [{ type: Input, args: ['aria-label',] },],
    'dialogResult': [{ type: Input, args: ['md-dialog-close',] },],
    '_matDialogClose': [{ type: Input, args: ['matDialogClose',] },],
    '_mdDialogClose': [{ type: Input, args: ['mdDialogClose',] },],
    '_matDialogCloseResult': [{ type: Input, args: ['mat-dialog-close',] },],
};
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
class MdDialogTitle {
    /**
     * @param {?} _container
     */
    constructor(_container) {
        this._container = _container;
        this.id = `md-dialog-title-${dialogElementUid++}`;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this._container && !this._container._ariaLabelledBy) {
            Promise.resolve().then(() => this._container._ariaLabelledBy = this.id);
        }
    }
}
MdDialogTitle.decorators = [
    { type: Directive, args: [{
                selector: '[md-dialog-title], [mat-dialog-title], [mdDialogTitle], [matDialogTitle]',
                host: {
                    'class': 'mat-dialog-title',
                    '[id]': 'id',
                },
            },] },
];
/**
 * @nocollapse
 */
MdDialogTitle.ctorParameters = () => [
    { type: MdDialogContainer, decorators: [{ type: Optional },] },
];
MdDialogTitle.propDecorators = {
    'id': [{ type: Input },],
};
/**
 * Scrollable content container of a dialog.
 */
class MdDialogContent {
}
MdDialogContent.decorators = [
    { type: Directive, args: [{
                selector: `[md-dialog-content], md-dialog-content, [mat-dialog-content], mat-dialog-content,
             [mdDialogContent], [matDialogContent]`,
                host: { 'class': 'mat-dialog-content' }
            },] },
];
/**
 * @nocollapse
 */
MdDialogContent.ctorParameters = () => [];
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
class MdDialogActions {
}
MdDialogActions.decorators = [
    { type: Directive, args: [{
                selector: `[md-dialog-actions], md-dialog-actions, [mat-dialog-actions], mat-dialog-actions,
             [mdDialogActions], [matDialogActions]`,
                host: { 'class': 'mat-dialog-actions' }
            },] },
];
/**
 * @nocollapse
 */
MdDialogActions.ctorParameters = () => [];

class MdDialogModule {
}
MdDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    PortalModule,
                    A11yModule,
                    MdCommonModule,
                ],
                exports: [
                    MdDialogContainer,
                    MdDialogClose,
                    MdDialogTitle,
                    MdDialogContent,
                    MdDialogActions,
                    MdCommonModule,
                ],
                declarations: [
                    MdDialogContainer,
                    MdDialogClose,
                    MdDialogTitle,
                    MdDialogActions,
                    MdDialogContent,
                ],
                providers: [
                    MdDialog,
                    MD_DIALOG_SCROLL_STRATEGY_PROVIDER,
                ],
                entryComponents: [MdDialogContainer],
            },] },
];
/**
 * @nocollapse
 */
MdDialogModule.ctorParameters = () => [];

/**
 * This animation shrinks the placeholder text to 75% of its normal size and translates
 * it to either the top left corner (ltr) or top right corner (rtl) of the trigger,
 * depending on the text direction of the application.
 */
const transformPlaceholder = trigger('transformPlaceholder', [
    state('floating-ltr', style({
        top: '-22px',
        left: '-2px',
        transform: 'scale(0.75)'
    })),
    state('floating-rtl', style({
        top: '-22px',
        left: '2px',
        transform: 'scale(0.75)'
    })),
    transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
]);
/**
 * This animation transforms the select's overlay panel on and off the page.
 *
 * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
 * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
 * side to ensure the option text correctly overlaps the trigger text.
 *
 * When the panel is removed from the DOM, it simply fades out linearly.
 */
const transformPanel = trigger('transformPanel', [
    state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: 'scaleY(1)'
    })),
    state('showing-multiple', style({
        opacity: 1,
        minWidth: 'calc(100% + 64px)',
        transform: 'scaleY(1)'
    })),
    transition('void => *', [
        style({
            opacity: 0,
            minWidth: '100%',
            transform: 'scaleY(0)'
        }),
        animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
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
        animate('150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')
    ])
]);

/**
 * Returns an exception to be thrown when attempting to change a s
 * elect's `multiple` option after initialization.
 * \@docs-private
 * @return {?}
 */
function getMdSelectDynamicMultipleError() {
    return Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * \@docs-private
 * @return {?}
 */
function getMdSelectNonArrayValueError() {
    return Error('Cannot assign truthy non-array value to select in `multiple` mode.');
}

/**
 * Mixin to augment a directive with a `color` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultColor
 * @return {?}
 */
function mixinColor(base, defaultColor) {
    return class extends base {
        /**
         * @return {?}
         */
        get color() { return this._color; }
        /**
         * @param {?} value
         * @return {?}
         */
        set color(value) {
            const /** @type {?} */ colorPalette = value || defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._renderer.removeClass(this._elementRef.nativeElement, `mat-${this._color}`);
                }
                if (colorPalette) {
                    this._renderer.addClass(this._elementRef.nativeElement, `mat-${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            // Set the default color that can be specified from the mixin.
            this.color = defaultColor;
        }
    };
}

/**
 * The fixed height of every option element (option, group header etc.).
 */
const SELECT_ITEM_HEIGHT = 48;
/**
 * The max height of the select's overlay panel
 */
const SELECT_PANEL_MAX_HEIGHT = 256;
/**
 * The max number of options visible at once in the select panel.
 */
const SELECT_MAX_OPTIONS_DISPLAYED = Math.floor(SELECT_PANEL_MAX_HEIGHT / SELECT_ITEM_HEIGHT);
/**
 * The fixed height of the select's trigger element.
 */
const SELECT_TRIGGER_HEIGHT = 30;
/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 */
const SELECT_OPTION_HEIGHT_ADJUSTMENT = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2;
/**
 * The panel's padding on the x-axis
 */
const SELECT_PANEL_PADDING_X = 16;
/**
 * The panel's x axis padding if it is indented (e.g. there is an option group).
 */
const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
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
 * Default minimum width of the trigger based on the CSS.
 * Used as a fallback for server-side rendering.
 * \@docs-private
 */
const SELECT_TRIGGER_MIN_WIDTH = 112;
/**
 * Injection token that determines the scroll handling while a select is open.
 */
const MD_SELECT_SCROLL_STRATEGY = new InjectionToken('md-select-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MD_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/**
 * \@docs-private
 */
const MD_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: MD_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MD_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
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
/**
 * \@docs-private
 */
class MdSelectBase {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
}
const _MdSelectMixinBase = mixinColor(mixinDisabled(MdSelectBase), 'primary');
/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
class MdSelectTrigger {
}
MdSelectTrigger.decorators = [
    { type: Directive, args: [{
                selector: 'md-select-trigger, mat-select-trigger'
            },] },
];
/**
 * @nocollapse
 */
MdSelectTrigger.ctorParameters = () => [];
class MdSelect extends _MdSelectMixinBase {
    /**
     * @param {?} _viewportRuler
     * @param {?} _changeDetectorRef
     * @param {?} _overlay
     * @param {?} _platform
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} _dir
     * @param {?} _parentForm
     * @param {?} _parentFormGroup
     * @param {?} _control
     * @param {?} tabIndex
     * @param {?} placeholderOptions
     * @param {?} _scrollStrategyFactory
     */
    constructor(_viewportRuler, _changeDetectorRef, _overlay, _platform, renderer, elementRef, _dir, _parentForm, _parentFormGroup, _control, tabIndex, placeholderOptions, _scrollStrategyFactory) {
        super(renderer, elementRef);
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._overlay = _overlay;
        this._platform = _platform;
        this._dir = _dir;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this._control = _control;
        this._scrollStrategyFactory = _scrollStrategyFactory;
        /**
         * Whether or not the overlay panel is open.
         */
        this._panelOpen = false;
        /**
         * Whether filling out the select is required in the form.
         */
        this._required = false;
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
        this._onChange = () => { };
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
         * Strategy that will be used to handle scrolling while the select panel is open.
         */
        this._scrollStrategy = this._scrollStrategyFactory();
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
        this._disableRipple = false;
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
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */
        this.valueChange = new EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._tabIndex = parseInt(tabIndex) || 0;
        this._placeholderOptions = placeholderOptions ? placeholderOptions : {};
        this.floatPlaceholder = this._placeholderOptions.float || 'auto';
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
        this._floatPlaceholder = value || this._placeholderOptions.float || 'auto';
    }
    /**
     * Tab index for the select element.
     * @return {?}
     */
    get tabIndex() { return this.disabled ? -1 : this._tabIndex; }
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
     * Value of the select control.
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        this.writeValue(newValue);
        this._value = newValue;
    }
    /**
     * Whether ripples for all options in the select are disabled.
     * @return {?}
     */
    get disableRipple() { return this._disableRipple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disableRipple(value) {
        this._disableRipple = coerceBooleanProperty(value);
        this._setOptionDisableRipple();
    }
    /**
     * Combined stream of all of the child options' change events.
     * @return {?}
     */
    get optionSelectionChanges() {
        return merge(...this.options.map(option => option.onSelectionChange));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple, undefined, false);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._initKeyManager();
        this._changeSubscription = startWith.call(this.options.changes, null).subscribe(() => {
            this._resetOptions();
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then(() => {
                this._setSelectionByValue(this._control ? this._control.value : this._value);
            });
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
        this._changeDetectorRef.markForCheck();
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
            this._changeDetectorRef.markForCheck();
            this.focus();
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
        this._changeDetectorRef.markForCheck();
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
        this._triggerWidth = this._platform.isBrowser ? this._getTriggerRect().width :
            SELECT_TRIGGER_MIN_WIDTH;
        this._changeDetectorRef.markForCheck();
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
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    _onFadeInDone() {
        this._panelDoneAnimating = this.panelOpen;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    _onBlur() {
        if (!this.disabled && !this.panelOpen) {
            this._onTouched();
            this._changeDetectorRef.markForCheck();
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
     * Whether the select has a value.
     * @return {?}
     */
    _hasValue() {
        return this._selectionModel && this._selectionModel.hasValue();
    }
    /**
     * Whether the select is in an error state.
     * @return {?}
     */
    _isErrorState() {
        const /** @type {?} */ isInvalid = this._control && this._control.invalid;
        const /** @type {?} */ isTouched = this._control && this._control.touched;
        const /** @type {?} */ isSubmitted = (this._parentFormGroup && this._parentFormGroup.submitted) ||
            (this._parentForm && this._parentForm.submitted);
        return !!(isInvalid && (isTouched || isSubmitted));
    }
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     * @return {?}
     */
    _setScrollTop() {
        const /** @type {?} */ scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.mat-select-panel'); /** @type {?} */
        ((scrollContainer)).scrollTop = this._scrollTop;
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    _setSelectionByValue(value, isUserInput = false) {
        const /** @type {?} */ isArray = Array.isArray(value);
        if (this.multiple && value && !isArray) {
            throw getMdSelectNonArrayValueError();
        }
        this._clearSelection();
        if (isArray) {
            value.forEach((currentValue) => this._selectValue(currentValue, isUserInput));
            this._sortValues();
        }
        else {
            const /** @type {?} */ correspondingOption = this._selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this._keyManager.setActiveItem(this.options.toArray().indexOf(correspondingOption));
            }
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
     * @param {?=} isUserInput
     * @return {?} Option that has the corresponding value.
     */
    _selectValue(value, isUserInput = false) {
        let /** @type {?} */ correspondingOption = this.options.find(option => {
            return option.value != null && option.value === value;
        });
        if (correspondingOption) {
            isUserInput ? correspondingOption._selectViaInteraction() : correspondingOption.select();
            this._selectionModel.select(correspondingOption);
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
        this._keyManager = new FocusKeyManager(this.options).withTypeAhead();
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
        this._setOptionDisableRipple();
    }
    /**
     * Listens to user-generated selection events on each option.
     * @return {?}
     */
    _listenToOptions() {
        this._optionSubscription = filter.call(this.optionSelectionChanges, event => event.isUserInput).subscribe(event => {
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
            this._clearSelection(option.value == null ? undefined : option);
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
        this._value = valueToEmit;
        this._onChange(valueToEmit);
        this.change.emit(new MdSelectChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
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
     * Sets the `disableRipple` property on each option.
     * @return {?}
     */
    _setOptionDisableRipple() {
        if (this.options) {
            this.options.forEach(option => option.disableRipple = this.disableRipple);
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
        this._changeDetectorRef.markForCheck();
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
            this._keyManager.setActiveItem(/** @type {?} */ ((this._getOptionIndex(this._selectionModel.selected[0]))));
        }
    }
    /**
     * Focuses the select element.
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
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
        const /** @type {?} */ items = this._getItemCount();
        const /** @type {?} */ panelHeight = Math.min(items * SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        const /** @type {?} */ scrollContainerHeight = items * SELECT_ITEM_HEIGHT;
        // The farthest the panel can be scrolled before it hits the bottom
        const /** @type {?} */ maxScroll = scrollContainerHeight - panelHeight;
        if (this._hasValue()) {
            let /** @type {?} */ selectedOptionOffset = ((this._getOptionIndex(this._selectionModel.selected[0])));
            selectedOptionOffset += this._getLabelCountBeforeOption(selectedOptionOffset);
            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            const /** @type {?} */ scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffsetY(selectedOptionOffset, scrollBuffer, maxScroll);
        }
        else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1 -
                (this._getLabelCountBeforeOption(0) * SELECT_ITEM_HEIGHT);
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
        const /** @type {?} */ optionOffsetFromScrollTop = SELECT_ITEM_HEIGHT * selectedIndex;
        const /** @type {?} */ halfOptionHeight = SELECT_ITEM_HEIGHT / 2;
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
        return (this.floatPlaceholder !== 'never' || this._selectionModel.isEmpty()) ? '1' : '0';
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
        const /** @type {?} */ paddingWidth = this.multiple ? SELECT_MULTIPLE_PANEL_PADDING_X + SELECT_PANEL_PADDING_X :
            SELECT_PANEL_PADDING_X * 2;
        let /** @type {?} */ offsetX;
        // Adjust the offset, depending on the option padding.
        if (this.multiple) {
            offsetX = SELECT_MULTIPLE_PANEL_PADDING_X;
        }
        else {
            let /** @type {?} */ selected = this._selectionModel.selected[0] || this.options.first;
            offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        }
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        const /** @type {?} */ leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        const /** @type {?} */ rightOverflow = overlayRect.right + offsetX - viewportRect.width
            + (isRtl ? 0 : paddingWidth);
        // If the element overflows on either side, reduce the offset to allow it to fit.
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
            optionOffsetFromPanelTop = selectedIndex * SELECT_ITEM_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            const /** @type {?} */ firstDisplayedIndex = this._getItemCount() - SELECT_MAX_OPTIONS_DISPLAYED;
            const /** @type {?} */ selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_ITEM_HEIGHT + SELECT_PANEL_PADDING_Y;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_ITEM_HEIGHT / 2;
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
        const /** @type {?} */ totalPanelHeight = Math.min(this._getItemCount() * SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
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
        const /** @type {?} */ originY = Math.abs(this._offsetY) - SELECT_OPTION_HEIGHT_ADJUSTMENT + SELECT_ITEM_HEIGHT / 2;
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
                this._setSelectionByValue(currentActiveItem.value, true);
                this._propagateChanges();
            }
        }
    }
    /**
     * Calculates the amount of items in the select. This includes options and group labels.
     * @return {?}
     */
    _getItemCount() {
        return this.options.length + this.optionGroups.length;
    }
    /**
     * Calculates the amount of option group labels that precede the specified option.
     * Useful when positioning the panel, because the labels will offset the index of the
     * currently-selected option.
     * @param {?} optionIndex
     * @return {?}
     */
    _getLabelCountBeforeOption(optionIndex) {
        if (this.optionGroups.length) {
            let /** @type {?} */ options = this.options.toArray();
            let /** @type {?} */ groups = this.optionGroups.toArray();
            let /** @type {?} */ groupCounter = 0;
            for (let /** @type {?} */ i = 0; i < optionIndex + 1; i++) {
                if (options[i].group && options[i].group === groups[groupCounter]) {
                    groupCounter++;
                }
            }
            return groupCounter;
        }
        return 0;
    }
}
MdSelect.decorators = [
    { type: Component, args: [{selector: 'md-select, mat-select',
                template: "<div cdk-overlay-origin class=\"mat-select-trigger\" aria-hidden=\"true\" (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger><span class=\"mat-select-placeholder\" [class.mat-floating-placeholder]=\"_hasValue()\" [@transformPlaceholder]=\"_getPlaceholderAnimationState()\" [style.opacity]=\"_getPlaceholderOpacity()\" [style.width.px]=\"_selectedValueWidth\">{{ placeholder }} </span><span class=\"mat-select-value\" *ngIf=\"_hasValue()\"><span class=\"mat-select-value-text\" [ngSwitch]=\"!!customTrigger\"><span *ngSwitchDefault>{{ triggerValue }}</span><ng-content select=\"md-select-trigger, mat-select-trigger\" *ngSwitchCase=\"true\"></ng-content></span></span><span class=\"mat-select-arrow\"></span> <span class=\"mat-select-underline\"></span></div><ng-template cdk-connected-overlay hasBackdrop backdropClass=\"cdk-overlay-transparent-backdrop\" [scrollStrategy]=\"_scrollStrategy\" [origin]=\"origin\" [open]=\"panelOpen\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\" [offsetY]=\"_offsetY\" (backdropClick)=\"close()\" (attach)=\"_onAttached()\" (detach)=\"close()\"><div class=\"mat-select-panel {{ 'mat-' + color }}\" [ngClass]=\"panelClass\" [@transformPanel]=\"multiple ? 'showing-multiple' : 'showing'\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_handlePanelKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.mat-select-panel-done-animating]=\"_panelDoneAnimating\"><div class=\"mat-select-content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"><ng-content></ng-content></div></div></ng-template>",
                styles: [".mat-select{display:inline-block;outline:0}.mat-select-trigger{display:flex;align-items:center;height:30px;min-width:112px;cursor:pointer;position:relative;box-sizing:border-box}.mat-select-disabled .mat-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-select-underline{position:absolute;bottom:0;left:0;right:0;height:1px}.mat-select:focus .mat-select-underline{height:2px}.mat-select-disabled .mat-select-underline{background-color:transparent;background-position:0 bottom}.mat-select-placeholder{position:relative;padding:0 2px;transform-origin:left top;flex-grow:1}.mat-select-placeholder.mat-floating-placeholder{top:-22px;left:-2px;text-align:left;transform:scale(.75)}[dir=rtl] .mat-select-placeholder{transform-origin:right top}[dir=rtl] .mat-select-placeholder.mat-floating-placeholder{left:2px;text-align:right}.mat-select-required .mat-select-placeholder::after{content:'*'}.mat-select-value{position:absolute;max-width:calc(100% - 18px);flex-grow:1;top:0;left:0;bottom:0;display:flex;align-items:center}[dir=rtl] .mat-select-value{left:auto;right:0}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:30px}.mat-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-select-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%}.mat-select-panel:not([class*=mat-elevation-z]){box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-select-panel{outline:solid 1px}}"],
                inputs: ['color', 'disabled'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'role': 'listbox',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.aria-label]': '_ariaLabel',
                    '[attr.aria-labelledby]': 'ariaLabelledby',
                    '[attr.aria-required]': 'required.toString()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-invalid]': '_isErrorState()',
                    '[attr.aria-owns]': '_optionIds',
                    '[attr.aria-multiselectable]': 'multiple',
                    '[class.mat-select-disabled]': 'disabled',
                    '[class.mat-select-invalid]': '_isErrorState()',
                    '[class.mat-select-required]': 'required',
                    'class': 'mat-select',
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
    { type: ViewportRuler, },
    { type: ChangeDetectorRef, },
    { type: Overlay, },
    { type: Platform, },
    { type: Renderer2, },
    { type: ElementRef, },
    { type: Directionality, decorators: [{ type: Optional },] },
    { type: NgForm, decorators: [{ type: Optional },] },
    { type: FormGroupDirective, decorators: [{ type: Optional },] },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_PLACEHOLDER_GLOBAL_OPTIONS,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [MD_SELECT_SCROLL_STRATEGY,] },] },
];
MdSelect.propDecorators = {
    'trigger': [{ type: ViewChild, args: ['trigger',] },],
    'overlayDir': [{ type: ViewChild, args: [ConnectedOverlayDirective,] },],
    'options': [{ type: ContentChildren, args: [MdOption, { descendants: true },] },],
    'optionGroups': [{ type: ContentChildren, args: [MdOptgroup,] },],
    'panelClass': [{ type: Input },],
    'customTrigger': [{ type: ContentChild, args: [MdSelectTrigger,] },],
    'placeholder': [{ type: Input },],
    'required': [{ type: Input },],
    'multiple': [{ type: Input },],
    'floatPlaceholder': [{ type: Input },],
    'tabIndex': [{ type: Input },],
    'value': [{ type: Input },],
    'disableRipple': [{ type: Input },],
    'ariaLabel': [{ type: Input, args: ['aria-label',] },],
    'ariaLabelledby': [{ type: Input, args: ['aria-labelledby',] },],
    'onOpen': [{ type: Output },],
    'onClose': [{ type: Output },],
    'change': [{ type: Output },],
    'valueChange': [{ type: Output },],
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
                exports: [MdSelect, MdSelectTrigger, MdOptionModule, MdCommonModule],
                declarations: [MdSelect, MdSelectTrigger],
                providers: [MD_SELECT_SCROLL_STRATEGY_PROVIDER]
            },] },
];
/**
 * @nocollapse
 */
MdSelectModule.ctorParameters = () => [];

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
/**
 * \@docs-private
 */
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
     * @param {?} _changeDetectorRef
     * @param {?} _dir
     */
    constructor(renderer, _elementRef, _focusOriginMonitor, _changeDetectorRef, _dir) {
        super();
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this._changeDetectorRef = _changeDetectorRef;
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
         * The dimensions of the slider.
         */
        this._sliderDimensions = null;
        this._controlValueAccessorChangeFn = () => { };
        this._focusOriginMonitor
            .monitor(this._elementRef.nativeElement, renderer, true)
            .subscribe((origin) => this._isActive = !!origin && origin !== 'keyboard');
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
    set invert(value) {
        this._invert = coerceBooleanProperty(value);
    }
    /**
     * The maximum value that the slider can have.
     * @return {?}
     */
    get max() { return this._max; }
    /**
     * @param {?} v
     * @return {?}
     */
    set max(v) {
        this._max = coerceNumberProperty(v, this._max);
        this._percent = this._calculatePercentage(this._value);
        // Since this also modifies the percentage, we need to let the change detection know.
        this._changeDetectorRef.markForCheck();
    }
    /**
     * The minimum value that the slider can have.
     * @return {?}
     */
    get min() { return this._min; }
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
        // Since this also modifies the percentage, we need to let the change detection know.
        this._changeDetectorRef.markForCheck();
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
            this._roundLabelTo = ((this._step.toString().split('.').pop())).length;
        }
        // Since this could modify the label, we need to notify the change detection.
        this._changeDetectorRef.markForCheck();
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
        if (v !== this._value) {
            this._value = coerceNumberProperty(v, this._value || 0);
            this._percent = this._calculatePercentage(this._value);
            // Since this also modifies the percentage, we need to let the change detection know.
            this._changeDetectorRef.markForCheck();
        }
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
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    /**
     * The value to be used for display purposes.
     * @return {?}
     */
    get displayValue() {
        // Note that this could be improved further by rounding something like 0.999 to 1 or
        // 0.899 to 0.9, however it is very performance sensitive, because it gets called on
        // every change detection cycle.
        if (this._roundLabelTo && this.value && this.value % 1 !== 0) {
            return this.value.toFixed(this._roundLabelTo);
        }
        return this.value || 0;
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
        this._sliderDimensions = this._getSliderDimensions();
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
        let /** @type {?} */ oldValue = this.value;
        this._isSliding = false;
        this._focusHostElement();
        this._updateValueFromPosition({ x: event.clientX, y: event.clientY });
        /* Emit a change and input event if the value changed. */
        if (oldValue != this.value) {
            this._emitInputEvent();
            this._emitChangeEvent();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onSlide(event) {
        if (this.disabled) {
            return;
        }
        // The slide start event sometimes fails to fire on iOS, so if we're not already in the sliding
        // state, call the slide start handler manually.
        if (!this._isSliding) {
            this._onSlideStart(null);
        }
        // Prevent the slide from selecting anything else.
        event.preventDefault();
        let /** @type {?} */ oldValue = this.value;
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
        // Native range elements always emit `input` events when the value changed while sliding.
        if (oldValue != this.value) {
            this._emitInputEvent();
        }
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
        this._isSliding = true;
        this._focusHostElement();
        this._valueOnSlideStart = this.value;
        if (event) {
            this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
            event.preventDefault();
        }
    }
    /**
     * @return {?}
     */
    _onSlideEnd() {
        this._isSliding = false;
        if (this._valueOnSlideStart != this.value) {
            this._emitChangeEvent();
        }
        this._valueOnSlideStart = null;
    }
    /**
     * @return {?}
     */
    _onFocus() {
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._getSliderDimensions();
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
        let /** @type {?} */ oldValue = this.value;
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
        if (oldValue != this.value) {
            this._emitInputEvent();
            this._emitChangeEvent();
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
        this.value = this._clamp((this.value || 0) + this.step * numSteps, this.min, this.max);
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
    _emitChangeEvent() {
        this._controlValueAccessorChangeFn(this.value);
        this.change.emit(this._createChangeEvent());
    }
    /**
     * Emits an input event when the current value is different from the last emitted value.
     * @return {?}
     */
    _emitInputEvent() {
        this.input.emit(this._createChangeEvent());
    }
    /**
     * Updates the amount of space between ticks as a percentage of the width of the slider.
     * @return {?}
     */
    _updateTickIntervalPercent() {
        if (!this.tickInterval || !this._sliderDimensions) {
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
        return ((value || 0) - this.min) / (this.max - this.min);
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
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     * @return {?}
     */
    _getSliderDimensions() {
        return this._sliderWrapper ? this._sliderWrapper.nativeElement.getBoundingClientRect() : null;
    }
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     * @return {?}
     */
    _focusHostElement() {
        this._elementRef.nativeElement.focus();
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
                template: "<div class=\"mat-slider-wrapper\" #sliderWrapper><div class=\"mat-slider-track-wrapper\"><div class=\"mat-slider-track-background\" [ngStyle]=\"_trackBackgroundStyles\"></div><div class=\"mat-slider-track-fill\" [ngStyle]=\"_trackFillStyles\"></div></div><div class=\"mat-slider-ticks-container\" [ngStyle]=\"_ticksContainerStyles\"><div class=\"mat-slider-ticks\" [ngStyle]=\"_ticksStyles\"></div></div><div class=\"mat-slider-thumb-container\" [ngStyle]=\"_thumbContainerStyles\"><div class=\"mat-slider-focus-ring\"></div><div class=\"mat-slider-thumb\"></div><div class=\"mat-slider-thumb-label\"><span class=\"mat-slider-thumb-label-text\">{{displayValue}}</span></div></div></div>",
                styles: [".mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:0;vertical-align:middle}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-track-background{position:absolute;transform-origin:100% 100%;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{background-repeat:repeat;background-clip:content-box;box-sizing:border-box;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-focus-ring{position:absolute;width:30px;height:30px;border-radius:50%;transform:scale(0);opacity:0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),opacity .4s cubic-bezier(.25,.8,.25,1)}.cdk-keyboard-focused .mat-slider-focus-ring{transform:scale(1);opacity:1}.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb-label{cursor:-webkit-grab;cursor:grab}.mat-slider-sliding:not(.mat-slider-disabled) .mat-slider-thumb,.mat-slider-sliding:not(.mat-slider-disabled) .mat-slider-thumb-label,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb-label:active,.mat-slider:not(.mat-slider-disabled) .mat-slider-thumb:active{cursor:-webkit-grabbing;cursor:grabbing}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(.7);transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),border-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform .4s cubic-bezier(.25,.8,.25,1),border-radius .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label-text{z-index:1;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-sliding .mat-slider-thumb-container,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-track-fill{transition-duration:0s}.mat-slider-has-ticks .mat-slider-wrapper::after{content:'';position:absolute;border-width:0;border-style:solid;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-disabled) .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-disabled) .mat-slider-ticks{opacity:1}.mat-slider-thumb-label-showing .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.cdk-focused .mat-slider-thumb-label{border-radius:50% 50% 0}.cdk-focused .mat-slider-thumb-label-text{opacity:1}.cdk-mouse-focused .mat-slider-thumb,.cdk-program-focused .mat-slider-thumb,.cdk-touch-focused .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-disabled .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}.mat-slider-horizontal .mat-slider-ticks{height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-focus-ring{top:-15px;right:-15px}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.cdk-focused .mat-slider-thumb-label{transform:rotate(45deg)}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}.mat-slider-vertical .mat-slider-focus-ring{bottom:-15px;left:-15px}.mat-slider-vertical .mat-slider-ticks{width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.cdk-focused .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%}"],
                inputs: ['disabled'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/**
 * @nocollapse
 */
MdSlider.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
    { type: FocusOriginMonitor, },
    { type: ChangeDetectorRef, },
    { type: Directionality, decorators: [{ type: Optional },] },
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
    '_sliderWrapper': [{ type: ViewChild, args: ['sliderWrapper',] },],
};

class MdSliderModule {
}
MdSliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MdCommonModule, StyleModule, BidiModule],
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
 * CSS class that will be attached to the overlay panel.
 */
const TOOLTIP_PANEL_CLASS = 'mat-tooltip-panel';
/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @param {?} position
 * @return {?}
 */
function getMdTooltipInvalidPositionError(position) {
    return Error(`Tooltip position "${position}" is invalid.`);
}
/**
 * Injection token that determines the scroll handling while a tooltip is visible.
 */
const MD_TOOLTIP_SCROLL_STRATEGY = new InjectionToken('md-tooltip-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MD_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: SCROLL_THROTTLE_MS });
}
/**
 * \@docs-private
 */
const MD_TOOLTIP_SCROLL_STRATEGY_PROVIDER = {
    provide: MD_TOOLTIP_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MD_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY
};
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
     * @param {?} _scrollStrategy
     * @param {?} _dir
     */
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _scrollStrategy, _dir) {
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._platform = _platform;
        this._scrollStrategy = _scrollStrategy;
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
            this._enterListener =
                _renderer.listen(_elementRef.nativeElement, 'mouseenter', () => this.show());
            this._leaveListener =
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
        this._setTooltipMessage(this._message);
    }
    /**
     * Classes to be passed to the tooltip. Supports the same syntax as `ngClass`.
     * @return {?}
     */
    get tooltipClass() { return this._tooltipClass; }
    /**
     * @param {?} value
     * @return {?}
     */
    set tooltipClass(value) {
        this._tooltipClass = value;
        if (this._tooltipInstance) {
            this._setTooltipClass(this._tooltipClass);
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
     * @return {?}
     */
    get _matClass() { return this.tooltipClass; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matClass(v) { this.tooltipClass = v; }
    /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
        // Clean up the event listeners set in the constructor
        if (!this._platform.IOS) {
            this._enterListener();
            this._leaveListener();
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
        this._setTooltipClass(this._tooltipClass);
        this._setTooltipMessage(this._message); /** @type {?} */
        ((this._tooltipInstance)).show(this._position, delay);
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
        let /** @type {?} */ overlayRef = this._createOverlay();
        let /** @type {?} */ portal = new ComponentPortal(TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = overlayRef.attach(portal).instance; /** @type {?} */
        ((
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance)).afterHidden().subscribe(() => {
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
        config.panelClass = TOOLTIP_PANEL_CLASS;
        config.scrollStrategy = this._scrollStrategy();
        this._overlayRef = this._overlay.create(config);
        return this._overlayRef;
    }
    /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    _disposeTooltip() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
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
        throw getMdTooltipInvalidPositionError(this.position);
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
        throw getMdTooltipInvalidPositionError(this.position);
    }
    /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    _setTooltipMessage(message) {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        if (this._tooltipInstance) {
            this._tooltipInstance.message = message;
            this._tooltipInstance._markForCheck();
            first.call(this._ngZone.onMicrotaskEmpty).subscribe(() => {
                if (this._tooltipInstance) {
                    ((this._overlayRef)).updatePosition();
                }
            });
        }
    }
    /**
     * Updates the tooltip class
     * @param {?} tooltipClass
     * @return {?}
     */
    _setTooltipClass(tooltipClass) {
        if (this._tooltipInstance) {
            this._tooltipInstance.tooltipClass = tooltipClass;
            this._tooltipInstance._markForCheck();
        }
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
    { type: undefined, decorators: [{ type: Inject, args: [MD_TOOLTIP_SCROLL_STRATEGY,] },] },
    { type: Directionality, decorators: [{ type: Optional },] },
];
MdTooltip.propDecorators = {
    'position': [{ type: Input, args: ['mdTooltipPosition',] },],
    'disabled': [{ type: Input, args: ['mdTooltipDisabled',] },],
    '_positionDeprecated': [{ type: Input, args: ['tooltip-position',] },],
    'showDelay': [{ type: Input, args: ['mdTooltipShowDelay',] },],
    'hideDelay': [{ type: Input, args: ['mdTooltipHideDelay',] },],
    'message': [{ type: Input, args: ['mdTooltip',] },],
    'tooltipClass': [{ type: Input, args: ['mdTooltipClass',] },],
    '_deprecatedMessage': [{ type: Input, args: ['md-tooltip',] },],
    '_matMessage': [{ type: Input, args: ['matTooltip',] },],
    '_matPosition': [{ type: Input, args: ['matTooltipPosition',] },],
    '_matDisabled': [{ type: Input, args: ['matTooltipDisabled',] },],
    '_matHideDelay': [{ type: Input, args: ['matTooltipHideDelay',] },],
    '_matShowDelay': [{ type: Input, args: ['matTooltipShowDelay',] },],
    '_matClass': [{ type: Input, args: ['matTooltipClass',] },],
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
            default: throw getMdTooltipInvalidPositionError(value);
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
                template: "<div class=\"mat-tooltip\" [ngClass]=\"tooltipClass\" [style.transform-origin]=\"_transformOrigin\" [@state]=\"_visibility\" (@state.done)=\"_afterVisibilityAnimation($event)\">{{message}}</div>",
                styles: [".mat-tooltip-panel{pointer-events:none!important}.mat-tooltip{color:#fff;border-radius:2px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px}@media screen and (-ms-high-contrast:active){.mat-tooltip{outline:solid 1px}}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
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
                    // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                    // won't be rendered if the animations are disabled or there is no web animations polyfill.
                    '[style.zoom]': '_visibility === "visible" ? 1 : null',
                    '(body:click)': 'this._handleBodyInteraction()'
                }
            },] },
];
/**
 * @nocollapse
 */
TooltipComponent.ctorParameters = () => [
    { type: Directionality, decorators: [{ type: Optional },] },
    { type: ChangeDetectorRef, },
];

class MdTooltipModule {
}
MdTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    MdCommonModule,
                    PlatformModule
                ],
                exports: [MdTooltip, TooltipComponent, MdCommonModule],
                declarations: [MdTooltip, TooltipComponent],
                entryComponents: [TooltipComponent],
                providers: [MD_TOOLTIP_SCROLL_STRATEGY_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
MdTooltipModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { VERSION, coerceBooleanProperty, coerceNumberProperty, ObserversModule, ObserveContent, Dir, Directionality, BidiModule, Portal, BasePortalHost, ComponentPortal, TemplatePortal, PortalHostDirective, TemplatePortalDirective, PortalModule, DomPortalHost, GestureConfig, LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, InteractivityChecker, FocusTrap, FocusTrapFactory, FocusTrapDeprecatedDirective, FocusTrapDirective, isFakeMousedownFromScreenReader, A11yModule, UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, MdLineModule, MdLine, MdLineSetter, CompatibilityModule, NoConflictStyleCompatibilityMode, MdCommonModule, MATERIAL_SANITY_CHECKS, MD_PLACEHOLDER_GLOBAL_OPTIONS, MD_ERROR_GLOBAL_OPTIONS, defaultErrorStateMatcher, showOnDirtyErrorStateMatcher, MdCoreModule, MdOptionModule, MdOptionSelectionChange, MdOption, MdOptgroupBase, _MdOptgroupMixinBase, MdOptgroup, PlatformModule, Platform, getSupportedInputTypes, OVERLAY_PROVIDERS, OverlayModule, Overlay, OverlayContainer, FullscreenOverlayContainer, OverlayRef, OverlayState, ConnectedOverlayDirective, OverlayOrigin, ViewportRuler, GlobalPositionStrategy, ConnectedPositionStrategy, VIEWPORT_RULER_PROVIDER, ConnectionPositionPair, ScrollableViewProperties, ConnectedOverlayPositionChange, Scrollable, ScrollDispatcher, ScrollStrategyOptions, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, ScrollDispatchModule, MdRipple, MD_RIPPLE_GLOBAL_OPTIONS, RippleRef, RippleState, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION, MdRippleModule, SelectionModel, SelectionChange, StyleModule, TOUCH_BUFFER_MS, FocusOriginMonitor, CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY, FOCUS_ORIGIN_MONITOR_PROVIDER, applyCssTransform, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, TAB, ESCAPE, BACKSPACE, DELETE, A, Z, MATERIAL_COMPATIBILITY_MODE, getMdCompatibilityInvalidPrefixError, MAT_ELEMENTS_SELECTOR, MD_ELEMENTS_SELECTOR, MatPrefixRejector, MdPrefixRejector, AnimationCurves, AnimationDurations, MdSelectionModule, MdPseudoCheckbox, NativeDateModule, MdNativeDateModule, DateAdapter, MD_DATE_FORMATS, NativeDateAdapter, MD_NATIVE_DATE_FORMATS, MdAutocompleteModule, MdAutocomplete, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT, MD_AUTOCOMPLETE_SCROLL_STRATEGY, MD_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY, MD_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER, MD_AUTOCOMPLETE_VALUE_ACCESSOR, getMdAutocompleteMissingPanelError, MdAutocompleteTrigger, MdDialogModule, MD_DIALOG_DATA, MD_DIALOG_SCROLL_STRATEGY, MD_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY, MD_DIALOG_SCROLL_STRATEGY_PROVIDER, MdDialog, throwMdDialogContentAlreadyAttachedError, MdDialogContainer, MdDialogClose, MdDialogTitle, MdDialogContent, MdDialogActions, MdDialogConfig, MdDialogRef, MdSelectModule, fadeInContent, transformPanel, transformPlaceholder, SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT, SELECT_MAX_OPTIONS_DISPLAYED, SELECT_TRIGGER_HEIGHT, SELECT_OPTION_HEIGHT_ADJUSTMENT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_PADDING_Y, SELECT_PANEL_VIEWPORT_PADDING, MD_SELECT_SCROLL_STRATEGY, MD_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY, MD_SELECT_SCROLL_STRATEGY_PROVIDER, MdSelectChange, MdSelectBase, _MdSelectMixinBase, MdSelectTrigger, MdSelect, MdSliderModule, MD_SLIDER_VALUE_ACCESSOR, MdSliderChange, MdSliderBase, _MdSliderMixinBase, MdSlider, MdTooltipModule, TOUCHEND_HIDE_DELAY, SCROLL_THROTTLE_MS, TOOLTIP_PANEL_CLASS, getMdTooltipInvalidPositionError, MD_TOOLTIP_SCROLL_STRATEGY, MD_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY, MD_TOOLTIP_SCROLL_STRATEGY_PROVIDER, MdTooltip, TooltipComponent, mixinColor as ɵd, mixinDisabled as ɵc, UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY as ɵb, RippleRenderer as ɵa };
//# sourceMappingURL=material.js.map
