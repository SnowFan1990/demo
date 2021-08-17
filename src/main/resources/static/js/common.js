$(function() {

	// slideToTop
	var slideToTop = $("<div />");
	slideToTop.html('<i class="fa fa-chevron-up"></i>');
	slideToTop.css({
		position : 'fixed',
		bottom : '20px',
		right : '25px',
		width : '40px',
		height : '40px',
		color : '#eee',
		'font-size' : '',
		'line-height' : '40px',
		'text-align' : 'center',
		'background-color' : '#222d32',
		cursor : 'pointer',
		'border-radius' : '5px',
		'z-index' : '99999',
		opacity : '.7',
		'display' : 'none'
	});
	slideToTop.on('mouseenter', function() {
		$(this).css('opacity', '1');
	});
	slideToTop.on('mouseout', function() {
		$(this).css('opacity', '.7');
	});
	$('.wrapper').append(slideToTop);
	$(window).scroll(function() {
		if ($(window).scrollTop() >= 150) {
			if (!$(slideToTop).is(':visible')) {
				$(slideToTop).fadeIn(500);
			}
		} else {
			$(slideToTop).fadeOut(500);
		}
	});
	$(slideToTop).click(function() {
		$("html, body").animate({
			scrollTop : 0
		}, 100);
	});

	// 左侧菜单状态，js + 后端 + cookie方式（新）
	$('.sidebar-toggle').click(function() {
		var adminlte_settings = $.cookie('adminlte_settings'); // 左侧菜单展开状态[adminlte_settings]：on=展开，off=折叠
		if ('off' == adminlte_settings) {
			adminlte_settings = 'on';
		} else {
			adminlte_settings = 'off';
		}
		$.cookie('adminlte_settings', adminlte_settings, {
			expires : 7,
			path : '/'
		}); //$.cookie('the_cookie', '', { expires: -1 });
	});
	// 左侧菜单状态，js + cookie方式（遗弃）
	/*
	 var adminlte_settings = $.cookie('adminlte_settings');
	 if (adminlte_settings == 'off') {
	 $('body').addClass('sidebar-collapse');
	 }
	 */

	// logout
	$("#logoutBtn").click(function() {

		layer.confirm("确认注销登录?", {
			icon : 3,
			title : '系统提示',
			btn : [ '确定', '取消' ]
		}, function(index) {
			layer.close(index);

			$.post(base_url + "/logout", function(data, status) {
				if (data.code == "200") {

					layer.msg('注销成功');

					setTimeout(function() {
						window.location.href = base_url + "/";
					}, 500);
				} else {
					layer.open({
						icon : '2',
						content : (data.msg || '注销失败')
					});
				}
			});

		});

	});

	// update pwd
	$('#updatePwd').on('click', function() {
		$('#updatePwdModal').modal({
			backdrop : false,
			keyboard : false
		}).modal('show');
	});
	var updatePwdModalValidate = $("#updatePwdModal .form").validate(
			{
				errorElement : 'span',
				errorClass : 'help-block',
				focusInvalid : true,
				rules : {
					password : {
						required : true,
						rangelength : [ 4, 50 ]
					}
				},
				messages : {
					password : {
						required : '请输入密码',
						rangelength : "密码长度限制为4~50"
					}
				},
				highlight : function(element) {
					$(element).closest('.form-group').addClass('has-error');
				},
				success : function(label) {
					label.closest('.form-group').removeClass('has-error');
					label.remove();
				},
				errorPlacement : function(error, element) {
					element.parent('div').append(error);
				},
				submitHandler : function(form) {
					$.post("/user/updatePwd", $(
							"#updatePwdModal .form").serialize(), function(
							data, status) {
						if (data.code == 200) {
							$('#updatePwdModal').modal('hide');

							layer.msg('修改密码成功，即将注销登陆');
							setTimeout(function() {
								$.post(base_url + "/logout", function(data,
										status) {
									if (data.code == 200) {
										window.location.href = base_url + "/";
									} else {
										layer.open({
											icon : '2',
											content : (data.msg || '注销失败')
										});
									}
								});
							}, 500);
						} else {
							layer.open({
								icon : '2',
								content : (data.msg || '修改密码失败')
							});
						}
					});
				}
			});
	$("#updatePwdModal").on('hide.bs.modal', function() {
		$("#updatePwdModal .form")[0].reset();
		updatePwdModalValidate.resetForm();
		$("#updatePwdModal .form .form-group").removeClass("has-error");
	});
	
	/*用户管理-重置密码*/
	function resetPwd() {
	    var url = '/system/user/profile/resetPwd';
	    $.modal.open("重置密码", url, '800', '500');
	}
	
	// select2复选框事件绑定
	if ($.fn.select2 !== undefined) {
		$("select.form-control:not(.noselect2)").each(function () {
			$(this).select2().on("change", function () {
				$(this).valid();
			})
		})
	}
	// checkbox 事件绑定
	if ($(".check-box").length > 0) {
	    $(".check-box").iCheck({
	    	checkboxClass: 'icheckbox-blue',
			radioClass: 'iradio-blue',
	    })
	}
	// radio 事件绑定
	if ($(".radio-box").length > 0) {
	    $(".radio-box").iCheck({
	    	checkboxClass: 'icheckbox-blue',
			radioClass: 'iradio-blue',
	    })
	}
	// laydate 时间控件绑定
	if ($(".select-time").length > 0) {
		layui.use('laydate', function() {
		    var laydate = layui.laydate;
		    var startDate = laydate.render({
		        elem: '#startTime',
		        max: $('#endTime').val(),
		        theme: 'molv',
		        trigger: 'click',
		        done: function(value, date) {
		            // 结束时间大于开始时间
		            if (value !== '') {
		                endDate.config.min.year = date.year;
		                endDate.config.min.month = date.month - 1;
		                endDate.config.min.date = date.date;
		            } else {
		                endDate.config.min.year = '';
		                endDate.config.min.month = '';
		                endDate.config.min.date = '';
		            }
		        }
		    });
		    var endDate = laydate.render({
		        elem: '#endTime',
		        min: $('#startTime').val(),
		        theme: 'molv',
		        trigger: 'click',
		        done: function(value, date) {
		            // 开始时间小于结束时间
		            if (value !== '') {
		                startDate.config.max.year = date.year;
		                startDate.config.max.month = date.month - 1;
		                startDate.config.max.date = date.date;
		            } else {
		                startDate.config.max.year = '';
		                startDate.config.max.month = '';
		                startDate.config.max.date = '';
		            }
		        }
		    });
		});
	}
	// laydate time-input 时间控件绑定
	if ($(".time-input").length > 0) {
	    layui.use('laydate', function() {
	        var laydate = layui.laydate;
	        var times = $(".time-input");
	        for (var i = 0; i < times.length; i++) {
	            var time = times[i];
	            laydate.render({
	                elem: time,
	                theme: 'molv',
	                trigger: 'click',
	                done: function(value, date) {}
	            });
	        }
	    });
	}
	// tree 关键字搜索绑定
	if ($("#keyword").length > 0) {
		$("#keyword").bind("focus", function focusKey(e) {
		    if ($("#keyword").hasClass("empty")) {
		        $("#keyword").removeClass("empty");
		    }
		}).bind("blur", function blurKey(e) {
		    if ($("#keyword").val() === "") {
		        $("#keyword").addClass("empty");
		    }
		    $.tree.searchNode(e);
		}).bind("input propertychange", $.tree.searchNode);
	}
	// 复选框后按钮样式状态变更
	$("#bootstrap-table").on("check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table", function () {
		var ids = $("#bootstrap-table").bootstrapTable("getSelections");
		$('#toolbar .btn-del').toggleClass('disabled', !ids.length);
		$('#toolbar .btn-edit').toggleClass('disabled', ids.length!=1);
    });
	// tree表格树 展开/折叠
	var expandFlag = false;
	$("#expandAllBtn").click(function() {
	    if (expandFlag) {
	        $('#bootstrap-tree-table').bootstrapTreeTable('expandAll');
	    } else {
	        $('#bootstrap-tree-table').bootstrapTreeTable('collapseAll');
	    }
	    expandFlag = expandFlag ? false: true;
	});
	
});


/** 刷新选项卡 */
var refreshItem = function(){
    var topWindow = $(window.parent.document);
	var currentId = $('.page-tabs-content', topWindow).find('.active').attr('data-id');
	var target = $('.RuoYi_iframe[data-id="' + currentId + '"]', topWindow);
    var url = target.attr('src');
    target.attr('src', url).ready();
}

/** 创建选项卡 */
function createMenuItem(dataUrl, menuName) {
    dataIndex = $.common.random(1,100),
    flag = true;
    if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;
    var topWindow = $(window.parent.document);
    // 选项卡菜单已存在
    $('.menuTab', topWindow).each(function() {
        if ($(this).data('id') == dataUrl) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.menuTab').removeClass('active');
                $('.page-tabs-content').animate({ marginLeft: ""}, "fast");
                // 显示tab对应的内容区
                $('.mainContent .RuoYi_iframe', topWindow).each(function() {
                    if ($(this).data('id') == dataUrl) {
                        $(this).show().siblings('.RuoYi_iframe').hide();
                        return false;
                    }
                });
            }
            flag = false;
            return false;
        }
    });
    // 选项卡菜单不存在
    if (flag) {
        var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        $('.menuTab', topWindow).removeClass('active');

        // 添加选项卡对应的iframe
        var str1 = '<iframe class="RuoYi_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
        $('.mainContent', topWindow).find('iframe.RuoYi_iframe').hide().parents('.mainContent').append(str1);

        // 添加选项卡
        $('.menuTabs .page-tabs-content', topWindow).append(str);
    }
    return false;
}

//日志打印封装处理
var log = {
    log: function (msg) {
    	console.log(msg);
    },
    info: function(msg) {
    	console.info(msg);
    },
    warn: function(msg) {
    	console.warn(msg);
    },
    error: function(msg) {
    	console.error(msg);
    }
};

/** 设置全局ajax处理 */
$.ajaxSetup({
    complete: function(XMLHttpRequest, textStatus) {
        if (textStatus == 'timeout') {
            $.modal.alertWarning("服务器超时，请稍后再试！");
            $.modal.closeLoading();
        } else if (textStatus == "parsererror") {
            $.modal.alertWarning("服务器错误，请联系管理员！");
            $.modal.closeLoading();
        }
    }
});
layer.config({
    extend: 'moon/style.css',
    skin: 'layer-ext-moon'
});

