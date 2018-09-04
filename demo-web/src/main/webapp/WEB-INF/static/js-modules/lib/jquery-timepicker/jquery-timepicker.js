﻿

//(function ($) {
define(['jquery'], function ($) {
	$.hunterTimePicker = function (box, options) {
		var dates = {
		  hour: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		  minute: ['01', '02', '03', '04', '05', '06',
			       '07', '08', '09', '10', '11', '12',
			       '13', '14', '15', '16', '17', '18',
			       '19', '20', '21', '22', '23', '24',
			       '25', '26', '27', '28', '29', '30','31',
			       ]
		};
		var bigMonth=['01','03','05','07','08','10','12'];
		var smallDate=['01', '02', '03', '04', '05', '06',
		       '07', '08', '09', '10', '11', '12',
		       '13', '14', '15', '16', '17', '18',
		       '19', '20', '21', '22', '23', '24',
		       '25', '26', '27', '28', '29', '30',
		       ];
		var bigDate=['01', '02', '03', '04', '05', '06',
		       '07', '08', '09', '10', '11', '12',
		       '13', '14', '15', '16', '17', '18',
		       '19', '20', '21', '22', '23', '24',
		       '25', '26', '27', '28', '29', '30','31',
		       ];
		var twoDate=['01', '02', '03', '04', '05', '06',
		       '07', '08', '09', '10', '11', '12',
		       '13', '14', '15', '16', '17', '18',
		       '19', '20', '21', '22', '23', '24',
		       '25', '26', '27', '28', '29'
		       ];
		var box = $(box);

		var template = $('<div class="Hunter-time-picker" id="Hunter_time_picker"><div class="Hunter-wrap"><ul class="Hunter-wrap" id="Hunter_time_wrap"></ul></div></div>');

		var time_wrap = $('#Hunter_time_wrap', template);

		$(document).click(function() {
			template.remove();
		});
		$('#Hunter_time_picker').click(function() {
            template.remove();
        });
		$('.Hunter-minute-wrap').click(function() {
            $('.Hunter-minute-wrap').hide();
        });
		box.click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$('.Hunter-time-picker').remove();
			var _this = $(this);
			var offset = _this.offset();
			var top = offset.top + _this.outerHeight() ;
            var viewHeight=$(window).height();
            buildTimePicker();
			if(0.5*viewHeight>top){
                template.css({
                    'left': offset.left,
                    'top': offset.top + _this.outerHeight()
                });
			}else{
                template.css({
                    'left': offset.left,
                    'top': offset.top-0.3*viewHeight
                });
			}


			$('body').append(template);

			$('.Hunter-time-picker').click(function(event){
				event.preventDefault();
				event.stopPropagation();
			});
		});

		function buildTimePicker(){
			buildHourTpl();
			hourEvent();
			minuteEvent();
			cleanBtnEvent();
            backBtnEvent();
		}
		function buildHourTpl(){
			if(options.type=='YM')
			{
				var hour_html = '<p>月份</p>';
				
			}
			else{
				var hour_html = '<p>小时</p>';
				 dates = {
						  hour: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
							    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00'
							  ],
						  minute: ['00','15', '30', '35', '45', '55'
							       ]
						};
			}
			
			for(var i = 0; i < dates.hour.length; i++){
				var temp = box.val().split("-")[0];
				if(dates.hour[i]==temp){
					hour_html += '<li class="Hunter-hour active" data-hour="' + dates.hour[i] +'"><ul class="Hunter-minute-wrap" ></ul><div class="Hunter-hour-name">' + dates.hour[i] + '</div></li>';
				}else{
					hour_html += '<li class="Hunter-hour" data-hour="' + dates.hour[i] +'"><ul class="Hunter-minute-wrap" id="To_Hours"></ul><div class="Hunter-hour-name">' + dates.hour[i] + '</div></li>';
				}
			}

			hour_html += '<li class="Hunter-clean"><input type="button" class="Hunter-clean-btn" id="Hunter_clean_btn" value="清 空"></li>';

			time_wrap.html(hour_html);
		}

		function buildMinuteTpl(cur_time,hourValue){
			var poi = cur_time.position();
			
			if(options.type=='YM')
			{
				var minute_html = '<p>日期</p>';
                hourValue+='';
				var flag=$.inArray(hourValue, bigMonth);
				if(hourValue=='02'){dates.minute=twoDate}
				else if(flag=='-1'){dates.minute=smallDate}
				else{
					dates.minute=bigDate
				}
			
			}
			else{
				var minute_html = '<p>分钟</p>';
			}
			var temp = box.val().split("-")[1];
			for(var j = 0; j < dates.minute.length;j++){
				if(dates.minute[j]==temp){
					
					minute_html += '<li class="Hunter-minute active" data-minute="' + dates.minute[j] + '">' + dates.minute[j] + '</li>';
				}else{
					
					minute_html += '<li class="Hunter-minute" data-minute="' + dates.minute[j] + '">' + dates.minute[j] + '</li>';
				}
			}
			var left=poi.left;
            var top=poi.top;
            var viewHeight=$(window).height();
            if(0.5*viewHeight<top){
            	top=top-0.5*viewHeight;
			}
			if(poi.left>200){
				left=250;
			}
            cur_time.find('.Hunter-minute-wrap').html(minute_html).css({'left': '-'+ left + 'px','top':'-'+top+'px'}).show();

		}
		function hourEvent(){
			time_wrap.on('click', '.Hunter-hour', function(event){
				event.preventDefault();
				event.stopPropagation();
				var _this = $(this);

				time_wrap.find('.Hunter-hour').removeClass('active');
				time_wrap.find('.Hunter-hour-name').removeClass('active');
				time_wrap.find('.Hunter-minute-wrap').hide().children().remove();
				_this.addClass('active');
				_this.find('.Hunter-hour').addClass('active');

				var hourValue = _this.data('hour');
				var temp = box.val().split("-");
				if(temp.length > 1){
					box.val(hourValue+"-"+temp[1]);
				}else{
					box.val(hourValue+"-00");
				}
			
				buildMinuteTpl(_this,hourValue);
				
				
				return false;
			});
		}
		function minuteEvent(){
			time_wrap.on('click', '.Hunter-minute', function(event) {
				event.preventDefault();
				event.stopPropagation();
				var _this = $(this);
				var minuteValue = _this.data('minute');
				var temp = box.val().split("-")[0]+minuteValue;
				box.val(temp);
				template.remove();

				if(options.callback) options.callback(box);

				return false;
			});
		};

		function cleanBtnEvent(){
			time_wrap.on('click', '#Hunter_clean_btn', function(event){
				event.preventDefault();
				event.stopPropagation();
				box.val('');
				template.remove();
				if(options.callback) options.callback(box);
				return false;
			});
		}
        function backBtnEvent(){
            time_wrap.on('click', '#To_Hours', function(event){
                $('.Hunter-minute-wrap').hide();
                return false;
            });
            time_wrap.on('click',function () {
                template.remove();
            })
        }
	};

	$.fn.extend({
		hunterTimePicker: function (options) {
			
			options = $.extend({}, options);
			this.each(function () {
				new $.hunterTimePicker(this, options);
			});
			return this;
		}
	});
});
