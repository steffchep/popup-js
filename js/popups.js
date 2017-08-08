define(function() {
    "use strict";

    var confirmTemplate =
        '<div class="popup">' +
        '  <div>' +
        '     <div class="popup-title">{title}</div>' +
        '     <div class="popup-content">{message}</div>' +
        '     <div class="popup-buttons"><button id="popup-yes">Yes</button><button id="popup-no">No</button></div>' +
        '  </div>' +
        '</div>';

    var alertTemplate =
        '<div class="popup">' +
        '  <div>' +
        '     <div class="popup-title">{title}</div>' +
        '     <div class="popup-content">{message}</div>' +
        '     <div class="popup-buttons"><button id="popup-yes">OK</button></div>' +
        '  </div>' +
        '</div>';

    function stripEvilTags(html) {
        var evilTags = ["script", "embed", "object", "iframe", "frame", "img", "image", "canvas", "picture", "video", "audio"];
        var i, strippedHtml = html;
        for (i = 0; i < evilTags.length; i += 1) {
            strippedHtml = strippedHtml.replace("<" + evilTags[i], "&lt;" + evilTags[i]);
        }
        return strippedHtml.replace(/\n/g, "<br>");
    }
    
    function createHtml(template, title, message) {
        var msg = stripEvilTags(message);
        var ttl = stripEvilTags(title);
        var innerHTML = template.replace("{title}", ttl);
        innerHTML = innerHTML.replace("{message}", msg);
        return innerHTML;
    }

    function removePopup() {
        var removeMe = document.getElementById("popup-veil");
        document.querySelector("body").removeChild(removeMe);
    }

    function addPopup(template, title, message) {
        var main = document.querySelector("body");
        var node = document.createElement("div");
        node.id = "popup-veil";
        node.innerHTML = createHtml(template, title, message);
        main.appendChild(node);
        document.getElementById('popup-yes').focus();
    }
    
    function registerClickEvent(elementId, method) {
        document.getElementById(elementId).onclick = function(e) {
            e.stopPropagation();
            removePopup();
            if (typeof method === 'function') {
                method(e);
            }
        };
    }
    
    function registerEscapeKey(method) {
        document.onkeypress = function(e) {
            if (e.key === "Escape") {
                removePopup();
                if (typeof method === 'function') {
                    method(e);
                }
            }
        };
    }
    
    function confirm(title, message, onYes, onNo) {
        addPopup(confirmTemplate, title, message);
        registerClickEvent('popup-yes', onYes);
        registerClickEvent('popup-veil', onNo);
        registerEscapeKey(onNo);
    }

    function alert(title, message, onOk) {
        console.log(message);
        addPopup(alertTemplate, title, message);
        registerClickEvent('popup-veil', onOk);
        registerEscapeKey(onOk);
    }

    return {
        confirm: confirm,
        alert: alert
    };
});