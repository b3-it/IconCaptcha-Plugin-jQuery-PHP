"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
    return typeof a
} : function (a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
};
/**
 * Icon Captcha Plugin: v2.4.0
 * Copyright © 2017, Fabian Wennink (https://www.fabianwennink.nl)
 *
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */(function (a) {
    a.fn.extend({
        iconCaptcha: function (b) {
            var c = a.extend({
                captchaTheme: [""],
                captchaFontFamily: "",
                captchaClickDelay: 1e3,
                captchaInvalidDelay: 3e3,
                captchaHoverDetection: !0,
                showCredits: "show",
                enableLoadingAnimation: !1,
                loadingAnimationDelay: 2e3,
                requestIconsDelay: 1500,
                captchaAjaxFile: "",
                captchaMessages: {
                    header: "Select the image that does not belong in the row",
                    correct: {top: "Great!", bottom: "You do not appear to be a robot."},
                    incorrect: {top: "Oops!", bottom: "You've selected the wrong image."}
                }
            }, b);
            return this.each(function (b) {
                function d(a) {
                    var b = "light";
                    c.captchaTheme[o] !== void 0 && ("dark" === c.captchaTheme[o] || "light" === c.captchaTheme[o]) && (b = c.captchaTheme[o].toLowerCase()), s = 0, n.addClass("captcha-theme-" + b), r || f();
                    var d = n.find(".captcha-modal__icons");
                    c.requestIconsDelay && 0 < c.requestIconsDelay && !r ? (!a && l(d), setTimeout(function () {
                        e(b, d, !0)
                    }, c.requestIconsDelay)) : e(b, d, a)
                }

                function e(d, e, f) {
                    a.ajax({
                        url: c.captchaAjaxFile,
                        type: "post",
                        dataType: "json",
                        data: {cID: o, rT: 1, tM: d},
                        success: function (d) {
                            d && "object" === ("undefined" === typeof d ? "undefined" : _typeof(d)) && (!f && l(e), p = new Date, n.find(".captcha-image").each(function (b) {
                                a(this).css("background-image", "url(" + c.captchaAjaxFile + "?cid=" + o + "&hash=" + d[b] + ")"), a(this).attr("icon-hash", d[b]), k(a(this), e)
                            }), !r && n.trigger("init", [{captcha_id: b}]), r = !0)
                        },
                        error: function () {
                            i()
                        }
                    })
                }

                function f() {
                    c.captchaFontFamily ? n.css("font-family", c.captchaFontFamily) : n.css("font-family", "Arial, sans-serif");
                    var a = ["<div class='captcha-modal'>", "<div class='captcha-modal__header'>", "<span>" + (c.captchaMessages.header && c.captchaMessages.header ? c.captchaMessages.header : "Select the image that does not belong in the row") + "</span>", "</div>", "<div class='captcha-modal__icons'>", "<div class='captcha-image'></div>", "<div class='captcha-image'></div>", "<div class='captcha-image'></div>", "<div class='captcha-image'></div>", "<div class='captcha-image'></div>", "</div>"];
                    if ("show" === c.showCredits || "hide" === c.showCredits) {
                        var b = "captcha-modal__credits" + ("hide" === c.showCredits ? " captcha-modal__credits--hide" : "");
                        a.push("<div class='" + b + "' title='IconCaptcha by Fabian Wennink'>", "<a href='https://www.fabianwennink.nl/projects/IconCaptcha/v2/' target='_blank' rel='follow'>IconCaptcha</a> &copy;", "</div>")
                    }
                    a.push("<input type='hidden' name='captcha-hf' required />", "<input type='hidden' name='captcha-idhf' value='" + o + "' required />", "</div>"), n.html(a.join("")).attr("data-captcha-id", o)
                }

                function g(b) {
                    var d = b.attr("icon-hash");
                    d && (n.find("input[name=\"captcha-hf\"]").attr("value", d), n.find("input[name=\"captcha-idhf\"]").attr("value", o), a.ajax({
                        url: c.captchaAjaxFile,
                        type: "post",
                        data: {cID: o, pC: d, rT: 2},
                        success: function () {
                            h()
                        },
                        error: function () {
                            i()
                        }
                    }))
                }

                function h() {
                    n.find(".captcha-modal__icons").empty(), n.addClass("captcha-success"), n.find(".captcha-modal__icons").html("<div class=\"captcha-modal__icons-title\">" + (c.captchaMessages.correct && c.captchaMessages.correct.top ? c.captchaMessages.correct.top : "Great!") + "</div><div class=\"captcha-modal__icons-subtitle\">" + (c.captchaMessages.correct && c.captchaMessages.correct.bottom ? c.captchaMessages.correct.bottom : "You do not appear to be a robot.") + "</div>"), n.trigger("success", [{captcha_id: o}])
                }

                function i() {
                    n.find(".captcha-modal__icons").empty(), n.addClass("captcha-error"), n.find(".captcha-modal__icons").html("<div class=\"captcha-modal__icons-title\">" + (c.captchaMessages.incorrect && c.captchaMessages.incorrect.top ? c.captchaMessages.incorrect.top : "Oops!") + "</div><div class=\"captcha-modal__icons-subtitle\">" + (c.captchaMessages.incorrect && c.captchaMessages.incorrect.bottom ? c.captchaMessages.incorrect.bottom : "You've selected the wrong image.") + "</div>"), n.trigger("error", [{captcha_id: o}]), setTimeout(j, c.captchaInvalidDelay)
                }

                function j() {
                    n.removeClass("captcha-error"), n.find("input[name='captcha-hf']").attr("value", null), n.find(".captcha-modal__icons").html("<div class='captcha-loader'></div>\n<div class='captcha-image'></div>\n<div class='captcha-image'></div>\n<div class='captcha-image'></div>\n<div class='captcha-image'></div>\n<div class='captcha-image'></div>"), n.find(".captcha-modal__icons > .captcha-image").attr("icon-hash", null), d(!0), n.trigger("refreshed", [{captcha_id: o}])
                }

                function k(a, b) {
                    var c = a.css("background-image").match(/\((.*?)\)/)[1].replace(/('|")/g, ""), d = new Image;
                    d.onload = function () {
                        s += 1, 5 == s && b && m(b)
                    }, d.src = c, d.complete && d.onload()
                }

                function l(a) {
                    a.addClass("captcha-opacity"), a.prepend("<div class=\"captcha-loader\"></div>")
                }

                function m(a) {
                    a.removeClass("captcha-opacity"), a.find(".captcha-loader").remove()
                }

                var n = a(this), o = b, p = 0, q = !1, r = !1, s = 0;
                return c.captchaAjaxFile ? void(d(!1), n.on("click", ".captcha-modal__icons > .captcha-image", function (b) {
                    if (!(new Date - p <= c.captchaClickDelay) && (!c.captchaHoverDetection || q)) {
                        var d = b.pageX - a(b.target).offset().left, e = b.pageY - a(b.target).offset().top;
                        if (d && e) {
                            var f = a(this), h = n.find(".captcha-modal__icons");
                            h.hasClass("captcha-opacity") || (n.trigger("selected", [{captcha_id: o}]), !0 === c.enableLoadingAnimation ? (l(h), setTimeout(function () {
                                g(f)
                            }, c.loadingAnimationDelay)) : g(f))
                        }
                    }
                }).on({
                    mouseenter: function () {
                        q || (q = !0)
                    }, mouseleave: function () {
                        q && (q = !1)
                    }
                }, n)) : (console.error("IconCaptcha: The option captchaAjaxFile has not been set."), void n.trigger("error", [{captcha_id: o}]))
            })
        }
    })
})(jQuery);