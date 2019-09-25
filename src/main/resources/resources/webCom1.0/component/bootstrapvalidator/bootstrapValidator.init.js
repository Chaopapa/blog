(function (window, $) {
    $(function () {
        var $self = $('[component=bootstrapvalidator]').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            }
        }).on('success.form.bv', function (e) {
            e.preventDefault();
            var $form = $(e.target),
                bvSuccess = $form.attr('bv-success'),
                bvSuccessCallback = $form.attr('bv-success-callback');
            bvSuccessCallback = bvSuccessCallback ? window[bvSuccessCallback] : null;
            if (bvSuccess && window[bvSuccess]) {
                window[bvSuccess](e);
            } else {
                $.ajax({
                    url: $form.attr('action') || '',
                    type: $form.attr('method') || 'post',
                    data: $form.serialize(),
                    successAuto: bvSuccessCallback || function (data) {
                        System.parent.System.alert({title: '提示', text: '保存成功', type: 'success'});
                        System.closeThisWindow();
                        System.parent.refreshData && System.parent.refreshData();
                    },
                    complete: function () {
                        System.hideLoading();
                        $form.data().bootstrapValidator.disableSubmitButtons(false);
                    }
                });
            }
        });
        System.setReady($self);
    });
})(window, $);