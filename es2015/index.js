/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, NgZone, NgModule, Injectable } from "@angular/core";
import * as i0 from "@angular/core";
/**
 * @param {?} x
 * @return {?}
 */
function getType(x) {
    // TODO make this faster ?
    return {}.toString.call(x);
}
/**
 * @param {?} obj
 * @param {?} key
 * @return {?}
 */
function hasOwnKey(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
}
/**
 * @param {?} x
 * @return {?}
 */
function copyObject(x) {
    /** @type {?} */
    var output = {};
    // TODO use Object.keys ?
    for (var key in x) {
        if (hasOwnKey(x, key)) {
            output[key] = copy(x[key]);
        }
    }
    return output;
}
/**
 * @param {?} x
 * @return {?}
 */
function copyArray(x) {
    /** @type {?} */
    var length = x.length;
    /** @type {?} */
    var output = new Array(length);
    for (var i = 0; i < length; ++i) {
        output[i] = copy(x[i]);
    }
    return output;
}
// TODO can this be made faster ?
// TODO what about regexps, etc. ?
/**
 * @param {?} x
 * @return {?}
 */
function copy(x) {
    switch (getType(x)) {
        case "[object Array]":
            return copyArray(x);
        case "[object Object]":
            return copyObject(x);
        // TODO is this necessary ?
        case "[object Date]":
            return new Date(x.getTime());
        default:
            return x;
    }
}
/**
 * @param {?} x
 * @return {?}
 */
function isNaN(x) {
    return x !== x;
}
/**
 * @param {?} x
 * @param {?} y
 * @return {?}
 */
function isNumberEqual(x, y) {
    return x === y || (isNaN(x) && isNaN(y));
}
/**
 * @param {?} chart
 * @param {?} x
 * @param {?} y
 * @return {?}
 */
function removeChartListeners(chart, x, y) {
    if (x !== y) {
        // TODO is this necessary ?
        if (x == null) {
            x = [];
        }
        // TODO is this necessary ?
        if (y == null) {
            y = [];
        }
        /** @type {?} */
        var xLength = x.length;
        /** @type {?} */
        var yLength = y.length;
        for (var i = 0; i < xLength; ++i) {
            /** @type {?} */
            var xValue = x[i];
            /** @type {?} */
            var has = false;
            // TODO make this faster ?
            for (var j = 0; j < yLength; ++j) {
                /** @type {?} */
                var yValue = y[j];
                // TODO is this correct ?
                if (xValue.event === yValue.event &&
                    xValue.method === yValue.method) {
                    has = true;
                    break;
                }
            }
            if (!has) {
                // TODO is this correct ?
                chart.removeListener(chart, xValue.event, xValue.method);
            }
        }
    }
}
/**
 * @param {?} a
 * @param {?} x
 * @param {?} y
 * @return {?}
 */
function updateArray(a, x, y) {
    /** @type {?} */
    var didUpdate = false;
    if (x !== y) {
        /** @type {?} */
        var xLength = x.length;
        /** @type {?} */
        var yLength = y.length;
        if (xLength !== yLength) {
            a.length = yLength;
            didUpdate = true;
        }
        for (var i = 0; i < yLength; ++i) {
            if (i < xLength) {
                if (update(a, i, x[i], y[i])) {
                    didUpdate = true;
                }
            }
            else {
                // TODO make this faster ?
                a[i] = copy(y[i]);
                // TODO is this necessary ?
                didUpdate = true;
            }
        }
    }
    return didUpdate;
}
/**
 * @param {?} obj
 * @param {?} key
 * @param {?} x
 * @param {?} y
 * @return {?}
 */
function update(obj, key, x, y) {
    /** @type {?} */
    var didUpdate = false;
    if (x !== y) {
        /** @type {?} */
        var xType = getType(x);
        /** @type {?} */
        var yType = getType(y);
        if (xType === yType) {
            switch (xType) {
                case "[object Array]":
                    if (updateArray(obj[key], x, y)) {
                        didUpdate = true;
                    }
                    break;
                case "[object Object]":
                    if (updateObject(obj[key], x, y)) {
                        didUpdate = true;
                    }
                    break;
                case "[object Date]":
                    if (x.getTime() !== y.getTime()) {
                        // TODO make this faster ?
                        obj[key] = copy(y);
                        didUpdate = true;
                    }
                    break;
                case "[object Number]":
                    if (!isNumberEqual(x, y)) {
                        // TODO is the copy necessary ?
                        obj[key] = copy(y);
                        didUpdate = true;
                    }
                    break;
                default:
                    if (x !== y) {
                        // TODO is the copy necessary ?
                        obj[key] = copy(y);
                        didUpdate = true;
                    }
                    break;
            }
            // TODO is this correct ?
        }
        else {
            // TODO make this faster ?
            obj[key] = copy(y);
            didUpdate = true;
        }
    }
    return didUpdate;
}
/**
 * @param {?} chart
 * @param {?} oldObj
 * @param {?} newObj
 * @return {?}
 */
function updateObject(chart, oldObj, newObj) {
    /** @type {?} */
    var didUpdate = false;
    if (oldObj !== newObj) {
        // TODO use Object.keys ?
        for (var key in newObj) {
            if (hasOwnKey(newObj, key)) {
                // TODO make this faster ?
                if (hasOwnKey(oldObj, key)) {
                    // TODO should this count as an update ?
                    if (key === "listeners") {
                        // TODO make this faster ?
                        removeChartListeners(chart, oldObj[key], newObj[key]);
                    }
                    if (update(chart, key, oldObj[key], newObj[key])) {
                        didUpdate = true;
                    }
                }
                else {
                    // TODO make this faster ?
                    chart[key] = copy(newObj[key]);
                    didUpdate = true;
                }
            }
        }
        // TODO use Object.keys ?
        for (var key in oldObj) {
            if (hasOwnKey(oldObj, key) && !hasOwnKey(newObj, key)) {
                if (key === "listeners") {
                    removeChartListeners(chart, oldObj[key], []);
                }
                delete chart[key];
                didUpdate = true;
            }
        }
    }
    return didUpdate;
}
export class AmChartsDirective {
    /**
     * @param {?} el
     * @param {?} AmCharts
     * @param {?} zone
     */
    constructor(el, AmCharts, zone) {
        this.el = el;
        this.AmCharts = AmCharts;
        this.zone = zone;
        // TODO better type for this
        this.delay = 0;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // AmCharts mutates the config object, so we have to make a deep copy to prevent that
        /** @type {?} */
        const props = copy(this.options);
        /** @type {?} */
        const el = this.el.nativeElement;
        el.id = this.id;
        el.style.display = "block";
        this.chart = this.AmCharts.makeChart(this.id, props, this.delay);
    }
    // TODO is this correct ?
    /**
     * @param {?} x
     * @return {?}
     */
    ngOnChanges(x) {
        /** @type {?} */
        const el = this.el.nativeElement;
        if (x.id) {
            el.id = x.id.currentValue;
        }
        if (x.options) {
            // Update the chart after init
            if (this.chart) {
                // This is needed to avoid triggering ngDoCheck
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    var didUpdate = updateObject(this.chart, x.options.previousValue, x.options.currentValue);
                    // TODO make this faster
                    if (didUpdate) {
                        this.chart.validateNow(true);
                    }
                }));
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    }
}
/** @nocollapse */ AmChartsDirective.ɵfac = function AmChartsDirective_Factory(t) { return new (t || AmChartsDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(AmChartsService), i0.ɵɵdirectiveInject(i0.NgZone)); };
/** @nocollapse */ AmChartsDirective.ɵdir = i0.ɵɵdefineDirective({ type: AmChartsDirective, selectors: [["amCharts"]], inputs: { id: "id", options: "options", delay: "delay" }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AmChartsDirective, [{
        type: Directive,
        args: [{
                selector: "amCharts"
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: AmChartsService }, { type: i0.NgZone }]; }, { id: [{
            type: Input
        }], options: [{
            type: Input
        }], delay: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    AmChartsDirective.prototype.id;
    /** @type {?} */
    AmChartsDirective.prototype.options;
    /** @type {?} */
    AmChartsDirective.prototype.delay;
    /**
     * @type {?}
     * @private
     */
    AmChartsDirective.prototype.chart;
    /**
     * @type {?}
     * @private
     */
    AmChartsDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    AmChartsDirective.prototype.AmCharts;
    /**
     * @type {?}
     * @private
     */
    AmChartsDirective.prototype.zone;
}
/**
 * @record
 */
export function AmChart() { }
/**
 * @record
 */
export function AmEvent() { }
/**
 * @record
 */
export function Formatter() { }
if (false) {
    /** @type {?} */
    Formatter.prototype.precision;
    /** @type {?} */
    Formatter.prototype.decimalSeparator;
    /** @type {?} */
    Formatter.prototype.thousandsSeparator;
}
export class AmChartsService {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
    }
    /**
     * @return {?}
     */
    get StockPanel() {
        return AmCharts.StockPanel;
    }
    /**
     * @return {?}
     */
    get StockGraph() {
        return AmCharts.StockGraph;
    }
    /**
     * @return {?}
     */
    get StockEvent() {
        return AmCharts.StockEvent;
    }
    /**
     * @return {?}
     */
    get StockLegend() {
        return AmCharts.StockLegend;
    }
    /**
     * @return {?}
     */
    get baseHref() {
        return AmCharts.baseHref;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set baseHref(v) {
        AmCharts.baseHref = v;
    }
    /**
     * @return {?}
     */
    get useUTC() {
        return AmCharts.useUTC;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set useUTC(v) {
        AmCharts.useUTC = v;
    }
    /**
     * @return {?}
     */
    get dayNames() {
        return AmCharts.dayNames;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dayNames(v) {
        AmCharts.dayNames = v;
    }
    /**
     * @return {?}
     */
    get monthNames() {
        return AmCharts.monthNames;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set monthNames(v) {
        AmCharts.monthNames = v;
    }
    /**
     * @return {?}
     */
    get shortDayNames() {
        return AmCharts.shortDayNames;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set shortDayNames(v) {
        AmCharts.shortDayNames = v;
    }
    /**
     * @return {?}
     */
    get shortMonthNames() {
        return AmCharts.shortMonthNames;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set shortMonthNames(v) {
        AmCharts.shortMonthNames = v;
    }
    // TODO better type for this
    /**
     * @return {?}
     */
    get theme() {
        return AmCharts.theme;
    }
    // TODO better type for this
    /**
     * @param {?} v
     * @return {?}
     */
    set theme(v) {
        AmCharts.theme = v;
    }
    /**
     * @return {?}
     */
    get processDelay() {
        return AmCharts.processDelay;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set processDelay(v) {
        AmCharts.processDelay = v;
    }
    /**
     * @return {?}
     */
    get charts() {
        return AmCharts.charts;
    }
    /**
     * @param {?} handler
     * @param {?=} types
     * @return {?}
     */
    addInitHandler(handler, types) {
        // TODO use this.zone.runOutsideAngular ?
        AmCharts.addInitHandler(handler, types);
    }
    /**
     * @param {?} value
     * @param {?} prefixesBig
     * @param {?} prefixesSmall
     * @param {?} numberFormatter
     * @return {?}
     */
    addPrefix(value, prefixesBig, prefixesSmall, numberFormatter) {
        // TODO use this.zone.runOutsideAngular ?
        return AmCharts.addPrefix(value, prefixesBig, prefixesSmall, numberFormatter);
    }
    /**
     * @return {?}
     */
    clear() {
        // TODO use this.zone.runOutsideAngular ?
        AmCharts.clear();
    }
    /**
     * @param {?} date
     * @param {?} format
     * @return {?}
     */
    formatDate(date, format) {
        // TODO use this.zone.runOutsideAngular ?
        return AmCharts.formatDate(date, format);
    }
    /**
     * @param {?} number
     * @param {?} formatter
     * @param {?} zeroCount
     * @return {?}
     */
    formatNumber(number, formatter, zeroCount) {
        // TODO use this.zone.runOutsideAngular ?
        return AmCharts.formatNumber(number, formatter, zeroCount);
    }
    /**
     * @param {?} string
     * @param {?} format
     * @return {?}
     */
    stringToDate(string, format) {
        // TODO use this.zone.runOutsideAngular ?
        return AmCharts.stringToDate(string, format);
    }
    // TODO is Node the correct type ?
    // TODO better type for config
    /**
     * @param {?} id
     * @param {?} config
     * @param {?=} delay
     * @return {?}
     */
    makeChart(id, config, delay) {
        return this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => AmCharts.makeChart(id, config, delay)));
    }
    /**
     * @param {?} chart
     * @param {?} type
     * @param {?} fn
     * @return {?}
     */
    addListener(chart, type, fn) {
        /** @type {?} */
        const callback = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.zone.run((/**
             * @return {?}
             */
            () => {
                fn(e);
            }));
        });
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            chart.addListener(type, callback);
        }));
        return (/**
         * @return {?}
         */
        () => {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                chart.removeListener(chart, type, callback);
            }));
        });
    }
    /**
     * @param {?} chart
     * @param {?} fn
     * @return {?}
     */
    updateChart(chart, fn) {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            fn();
            chart.validateNow(true);
        }));
    }
    /**
     * @param {?} chart
     * @return {?}
     */
    destroyChart(chart) {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            chart.clear();
        }));
    }
}
/** @nocollapse */ AmChartsService.ɵfac = function AmChartsService_Factory(t) { return new (t || AmChartsService)(i0.ɵɵinject(i0.NgZone)); };
/** @nocollapse */ AmChartsService.ɵprov = i0.ɵɵdefineInjectable({ token: AmChartsService, factory: AmChartsService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AmChartsService, [{
        type: Injectable
    }], function () { return [{ type: i0.NgZone }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    AmChartsService.prototype.zone;
}
export class AmChartsModule {
}
/** @nocollapse */ AmChartsModule.ɵmod = i0.ɵɵdefineNgModule({ type: AmChartsModule });
/** @nocollapse */ AmChartsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function AmChartsModule_Factory(t) { return new (t || AmChartsModule)(); }, providers: [
        AmChartsService
    ] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AmChartsModule, { declarations: [AmChartsDirective], exports: [AmChartsDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AmChartsModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    AmChartsDirective
                ],
                exports: [
                    AmChartsDirective
                ],
                providers: [
                    AmChartsService
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=index.js.map