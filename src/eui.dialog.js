/**
 * Created by cjh1 on 2016/3/15.
 */


if (!eui) {
    var eui = {};
}

eui.on = function (obj, event, func) {
    $(document).off(event, obj).on(event, obj, func);
};

eui.bs = {};
eui.bs.modaloptions = {
    id: 'bsmodal',
    close: true,
    title: 'title',
    showHeader: true, // 是否显示头部
    showFooter: true, // 是否显示脚部
    btn: false, // 是否显示两个按钮
    okbtn: '确定',
    qubtn: '取消',
    msg: 'msg',
};
eui.bs.modalstr = function (opt) {
    var start = '<div class="modal fade" id="' + opt.id + '" tabindex="-1" role="dialog" aria-labelledby="bsmodaltitle" aria-hidden="true" style="position:fixed;top:20px;">';
    start += '<div class="modal-dialog"><div class="modal-content">';
    var end = '</div></div></div>';

    var head = '';
    if (opt.showHeader) {
        head += '<div class="modal-header">';
        if (opt.close) {
            head += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
        }
        head += '<h3 class="modal-title" id="bsmodaltitle">' + opt.title + '</h3></div>';
    }

    var body = '<div class="modal-body"><p><h4>' + opt.msg + '</h4></p></div>';

    var foot = '';
    if (opt.showFooter) {
        foot += '<div class="modal-footer"><button type="button" class="btn btn-primary bsok">' + opt.okbtn + '</button>';
        if (opt.btn) {
            foot += '<button type="button" class="btn btn-default bscancel">' + opt.qubtn + '</button>';
        }
        foot += '</div>';
    }

    return start + head + body + foot + end;
};

eui.bs.alert = function (options, func) {
    // options
    var opt = $.extend({}, eui.bs.modaloptions);

    opt.title = '提示';
    if (typeof options == 'string') {
        opt.msg = options;
    } else {
        $.extend(opt, options);
    }

    // add
    $('body').append(eui.bs.modalstr(opt));

    // init
    var $modal = $('#' + opt.id);
    $modal.modal(opt);

    // bind
    eui.on('button.bsok', 'click', function () {
        if (func) func();
        $modal.modal('hide');
    });
    eui.on('#' + opt.id, 'hidden.bs.modal', function () {
        $modal.remove();
    });

    // show
    $modal.modal('show');
};

eui.bs.confirm = function (options, ok, cancel) {
    var opt = $.extend({}, eui.bs.modaloptions);

    opt.title = '确认操作';
    if (typeof options == 'string') {
        opt.msg = options;
    } else {
        $.extend(opt, options);
    }
    opt.btn = true;

    // 添加到body
    $('body').append(eui.bs.modalstr(opt));

    // 初始化
    var $modal = $('#' + opt.id);
    $modal.modal(opt);

    // 绑定事件
    eui.on('button.bsok', 'click', function () {
        if (ok) {
            ok();
        }
        $modal.modal('hide');
    });
    eui.on('button.bscancel', 'click', function () {
        if (cancel) {
            cancel();
        }
        $modal.modal('hide');
    });
    eui.on('#' + opt.id, 'hidden.bs.modal', function () {
        $modal.remove();
    });

    // 显示
    $modal.modal('show');
};