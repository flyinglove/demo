//<button bgcolor="skyblue" radius="4">按钮</button>
// 获取页面上所有包含attr的自定义属性
// 遍历并观察dom， 如果有attr中的相关属性， 则再取相关的自定义属性的值作为对应attr属性的值
(function() {
    function init() {
        if (window.MutationObserver) {
            var observeList = new MutationObserver((mutationList) => {
                mutationList.forEach((mutation) => {
                    var nodeAdded = mutation.addedNodes
                    nodeAdded.forEach(node => {
                        setAttrs(node)
                    })
                    var attributeName = mutation.attributeName
                    if (mutation.target && mutation.target.attrNeedWatch && mutation.target.attrNeedWatch.include(attributeName)) {
                        setAttrs(mutation.target)
                    }
                })
            })
            observeList.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true
            })
        }
        // 给初始化dom节点上执行转换
        // 观察即将到来的节点， 添加转换
        document.querySelectorAll('*').forEach(ele => {
            setAttrs(ele)
        })
    }
    function setAttrs(ele) {
        if (node.nodeType !== 1) return
    }
    if (document.readyState !== 'loading') {
        init()
    } else {
        window.addEventListener('DOMContentLoaded', init)
    }
})()