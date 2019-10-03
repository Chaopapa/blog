
//加载公共模块
define (function (){
    function loadPublicModule(selector,page,callBack) {
        var header = $(selector);
        header.load(page);
        callBack&&callBack();
    }
    return {
        loadPublicModule:loadPublicModule
    }
});

