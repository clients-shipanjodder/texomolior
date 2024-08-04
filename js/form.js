(function ($) {

    $.fn.serializefiles = function() {
        var obj = $(this);
        /* ADD FILE TO PARAM AJAX */
        var formData = new FormData();
        $.each($(obj).find("input[type='file']"), function(i, tag) {
            $.each($(tag)[0].files, function(i, file) {
                formData.append(tag.name, file);
            });
        });
        var params = $(obj).serializeArray();
        $.each(params, function (i, val) {
            formData.append(val.name, val.value);
        });
        return formData;
    };

    var sending = false;

    $(document).ready(function() {

        $('form').on('submit', function(e) {
            e.preventDefault();
            if (sending) return;

            sending = true;

            var form = $(this);
            var data = form.serializefiles();

            $('button[type="submit"]', form).prop('disabled', true);
            $('.has-error', form).removeClass('has-error');
            // $('.help-block', form).remove();
            $('.help-block', form).text('');

            var url = form.data('action');

            $.ajax({
                type: 'POST',
                data: data,
                url: url,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json'
            }).done(function(response) {
                if (response.status && response.status === 'error' && response.messages) {
                    var messages = response.messages;
                    var focused = false;
                    $.each(messages, function(i, message) {
                        var errors = [];
                        for (var key in message) {
                            errors.push(message[key]);
                        }
                        var text = errors.join('. ') + '.';
                        var el = $('input[name="' + i + '"]', form);
                        if (el) {
                            var parent = el.parent();
                            var group = el.parents('.form-group');
                            group.addClass('has-error');
                            $('span.help-block', group).text(text);
                            if (!focused) {
                                el.focus();
                                focused = true;
                            }
                        }
                    });

                    if (messages.validation && messages.csrf) {
                        $('input[name="csrf"]', form).val(messages.csrf);
                        form.submit();
                    }
                } else if (response.status && response.status === 'ok') {
                    var url = form.data('success');
                    if (url) {
                        window.location.href = url;
                    }
                }
            }).fail(function(error) {

            }).always(function() {
                sending = false;
                $('button[type="submit"]', form).prop('disabled', false);
            });
        });

        $('button[type="submit"]').click(function(e) {
            e.preventDefault();
            $(this).parents('form').submit();
        });

        $('form input').on('change', function(e) {
            $(this).siblings('.help-block').text('');
            $(this).parent().removeClass('has-error');
        });

        $('.file-input').on('change', function(e) {
            var el = $('.file-name', $(this).parents('.form-group'));
            var name = el.data('defaultValue');
            if (e.target.files && e.target.files.length > 0) {
                var name = e.target.files[0].name;
            }
            el.text(name);
        });

        $('.file-select button').click(function(e) {
            e.preventDefault();
            $('.file-input', $(this).parents('.form-group')).click();
        });
    });

}(jQuery));
