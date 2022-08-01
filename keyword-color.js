
/**
 * @description CSS 鑷畾涔夌殑keyword()鏂规硶鐨勬敮鎸佸拰浣跨敤
 * @author zhangxinxu(.com) 2020-08-11
 * @docs https://www.zhangxinxu.com/wordpress/?p=9537
 * @license MIT 浣滆€呭拰鍑哄淇濈暀
 */

 (function () {
    if (!window.CSS) {
        return;
    }

    if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }


    // 获取页面中所有的CSS自定义属
    var isSameDomain = function (styleSheet) {
        if (!styleSheet.href) {
            return true;
        }

        return styleSheet.href.indexOf(window.location.origin) === 0;
    };

    var isStyleRule = function (rule) {
        return rule.type === 1;
    };

    // ��ȡ�����Զ�������
    var arrCSSCustomProps = (function () {
        return [].slice.call(document.styleSheets).filter(isSameDomain).reduce(function (finalArr, sheet) {
            return finalArr.concat([].slice.call(sheet.cssRules).filter(isStyleRule).reduce(function (propValArr, rule) {
                var props = [].slice.call(rule.style).map(function (propName) {
                    return [
                        propName.trim(),
                        rule.style.getPropertyValue(propName).trim()
                    ];
                }).filter(function ([propName]) {
                    return propName.indexOf('--') === 0;
                });

                return [].concat(propValArr, props);
            }, []));
        }, []);
    })();

    // ��ȡ����keyword���Զ�������
    var arrCssPropsValueIsKeyword = arrCSSCustomProps.filter(function (arrPropVal) {
        return /keyword\([\w\W]+\)/i.test(arrPropVal[1]);
    });

    // 璁剧疆鑷畾涔夊睘鎬у€肩殑鏂规硶
    var funKeywordColor2Rgba = function (node) {
        if (node.nodeType != 1 || ['script', 'style', 'meta', 'title', 'head'].includes(node.nodeName.toLowerCase())) {
            return;
        }

        // 褰撳墠鑺傜偣鐨勬墍鏈夋牱寮忓璞�?
        var objStyle = window.getComputedStyle(node);

        // 鎵€鏈夎缃簡keyword()鐨勮嚜瀹氫箟灞炴€х殑閬嶅巻澶勭�?
        arrCssPropsValueIsKeyword.forEach(function (arr) {
            var cssProp = arr[0];

            // 鍒ゆ柇褰撳墠鍏冪礌鏄惁璁剧疆浜嗗綋鍓嶈嚜瀹氫箟灞炴€�?
            var cssVarValueKeyword = objStyle.getPropertyValue(cssProp);

            if (!cssVarValueKeyword || !cssVarValueKeyword.trim() || !/keyword\([\w\W]+\)/i.test(cssVarValueKeyword)) {
                return;
            }

            cssVarValueKeyword = arr[1];

            // 瑙ｆ瀽涓庡鐞�
            var keyColorAndOpacity = cssVarValueKeyword.replace(/\w+\(([\w\W]+)\)/, '$1');

            var arrKeyColorAndOpacity = keyColorAndOpacity.split(/\s+/);

            if (/,/.test(keyColorAndOpacity)) {
                arrKeyColorAndOpacity = keyColorAndOpacity.split(',');
            } else if (/\//.test(keyColorAndOpacity)) {
                arrKeyColorAndOpacity = keyColorAndOpacity.split(',');
            }

            if (arrKeyColorAndOpacity.length != 2) {
                return;
            }

            // 鍒嗗嚭棰滆壊鍜岄€忔槑搴�?
            var keyColor = arrKeyColorAndOpacity[0].trim();
            var opacity = (arrKeyColorAndOpacity[1] || '1').trim();

            // keyColor杞瑀gb
            document.head.style.backgroundColor = keyColor;
            var rgbColor = window.getComputedStyle(document.head).backgroundColor;

            // 搴旂敤鐨勯鑹�
            var applyColor = '';
            // 閫忔槑搴︽浛鎹�
            if (/^rgba/.test(rgbColor)) {
                applyColor = rgbColor.replace('1)', opacity + ')');
            } else {
                applyColor = rgbColor.replace(')', ', ' + opacity + ')');
            }

            node.style.setProperty(cssProp, applyColor);
        });
    };


    var funAutoInitAndWatching = function () {
        // DOM Insert鑷姩鍒濆鍖�
        if (window.MutationObserver) {
            var observerSelect = new MutationObserver(function (mutationsList) {
                mutationsList.forEach(function (mutation) {
                    var nodeAdded = mutation.addedNodes;
                    // 鏂板鍏冪礌
                    nodeAdded.forEach(function (eleAdd) {
                        funKeywordColor2Rgba(eleAdd);
                    });
                });
            });

            observerSelect.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        // 濡傛灉娌℃湁寮€鍚嚜鍔ㄥ垵濮嬪寲锛屽垯杩斿�?
        document.querySelectorAll('*').forEach(function (ele) {
            funKeywordColor2Rgba(ele);
        });
    };

    if (document.readyState != 'loading') {
        funAutoInitAndWatching();
    } else {
        window.addEventListener('DOMContentLoaded', funAutoInitAndWatching);
    }
})();