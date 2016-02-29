var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var daynow = date.getDate();
var $container = $('#container');
var dayDetailIsShow = false;
var startX = 0;
var startY = 0;
var DATAURL = 'http://localhost:2015/';
var projectJson;
/*******************************
{
	"calendarMonthData": [
		{
			"time": "2015-9-7",
			"user": [
				{
					"name": "cwf",
					"projects": [
						{
							"projectName": "项目管理",
							"projectDetail": "dhauhgdakjdhakhahdahdajdajkda",
							"creatTime": "2015-09-06 15:08:11",
							"finishedTime": "2015-09-30 15:08:27"
						}
					]
				}
			]
		}
	]
	
}
*******************************/
$(document).ready(function() {
	//var isClick = false;
	init();
	

	$('button').on('click',['#month','#week','#day','#monthPrev','#monthNext','#dayNow','#closeDay','#optInsert'],function(e) {
		var e = e || window.event;
		var id = $(this).attr('id');
		/*if(id == 'month'){
			creatMonthBody(beginDay,maxDay);
		}*/
		if(id == 'monthPrev'){
			getPrevMonth();
			//dayDetailInit();
			showTab('month');
			setHeight();
		}else if(id == 'monthNext'){
			getNextMonth();
			//dayDetailInit();
			showTab('month');
			setHeight();
		}else if(id == 'dayNow') {
			var _date = new Date();
			year = _date.getFullYear();
			month = _date.getMonth();
			creatMonthBody(year,month);
			setHeight();
		}else if(id == 'closeDay'){
			var $dayDetail = $('#dayDetail');

			$container.removeClass('toSmall').addClass('toLarge');
			
			//var eleX = $dayDetail.offset().left;
			//var eleY = $dayDetail.offset().top;
			//alert('ele: ' + eleX + ' ' + eleY + '\n' + 'start: ' + startX + ' ' + startY);

			//var moveX = eleX - startX;
			//var moveY = eleY - startY;

			setTimeout(function() {
				/*$dayDetail.animate({
					//'-webkit-transform': 'translate(' + moveX + 'px ' + moveY + 'px)'
					left: moveX + 'px',
					top: moveY + 'px'
				});*/
				$dayDetail.removeClass('dayDetailShow').addClass('dayDetailHide');
			},300);
			
			
			dayDetailIsShow = false;
		}else if(id == 'optInsert') {
			var rst = validateEmpty(['username','projectName','projectDetail','finishedTime']);
			if(rst) {
				var postData = {
					"username": $('#username').val(),
					"projectName": $('#projectName').val(),
					"projectDetail": $('#projectDetail').val(),
					"finishedTime": $('#finishedTime').val() + ' 23:59:59'
				}
				$.ajax({
					url: 'http://localhost:2015/?opt=setData',
					type: 'POST',
					dataType: 'json',
					data: postData,
				})
				.done(function(data) {
					consoleInfo(data);
					consoleInfo("success");
				})
				.fail(function() {
					consoleInfo("error");
				})
				.always(function() {
					consoleInfo("complete");
				});
			}
			
		}else if(id == 'day') {

			
		}else{
			//showTab(id);
		}
	});
	$(document).on('click','.showDetail',function(e) {


		var _this = $(this);
		var isOpen = _this.parent().parent().siblings('.projectDetail').css('display') == 'none' ? false : true ;
		if(!isOpen) {
			_this.css({
				'-webkit-transform': 'rotate(0deg)'
			});
		}else {
			_this.css({
				'-webkit-transform': 'rotate(180deg)'
			});
		}
		_this.parent().parent().siblings('.projectDetail').slideToggle(600);
	});
	/*$('.showDetail').click(function() {
		alert('1231');
	});*/
});
$(window).resize(function() {
	if(dayDetailIsShow) {
		$container.css({
			'left': '665px'
		});
	}
});
function init() {
	creatCalendar();
	setHeight();
	//dayDetailInit();
	/*var $container = $('#container');
	$container.CalendarProject({
		width: '1000px'
	});*/
}
function validateEmpty(ids) {
	for( s in ids) {
		var $_this = $('#' + ids[s]);
		if($_this.val() == '') {
			alert($_this.prev().text() + ' 不能为空');
			return false;
		}
	}
	return true;
}

function consoleInfo(str) {
	console.log(str);
}

function getData(url,today) {
	$.get(url + '?opt=getData&time=' + $.now()).done(function(data) {
		$('.details').each(function(idx,item) {
			item.remove();
		});
		projectJson = data;
		printProject(projectJson,today,$('#dayDetail'));
	});
	
}

function detailIsFull() {
	var $col_6 = $('#dayDetail .details:last').find('.col-xs-6');
	return $col_6.length >1 ? true : false;
}

function printProject(printJson,today,$detailContainer) {
	var templateDetails = "<div class='row details'>"
				      +"</div>";
	var templateProject = "<div class='col-xs-6'>"
				          +"<div class='row bg-primary username'>"
				            +"<div class='col-xs-12'>{{name}}</div>"
				          +"</div>"
				        +"</div>";
	var templateProjectRow = "<div class='row'>"
				            +"<div class='col-xs-12'>"
				              +"<div class='row'>"
				                +"<div class='col-xs-10'>{{projectName}}</div>"
				                +"<div class='col-xs-2'>"
				                  +"<button class='btn btn-primary showDetail'>^</button>"
				                +"</div>"
				              +"</div>"
				              +"<div class='row projectDetail'>"
				                +"<div class='col-xs-12'>"
				                  +"<div class='form-group'>"
				                    +"<label for='projectDetail' class='sr-only'></label>"
				                    +"<textarea id='projectDetail' placeholder='项目描述' class='form-control'>{{projectDetail}}</textarea>"
				                  +"</div>"
				                +"</div>"
				              +"</div>"
				              +"<div class='row projectDetail'>"
				                +"<div class='col-xs-5'>"
				                  +"<div class='form-group'>"
				                    +"<label for='creatTime' class='timeCF'>{{creatTime}}</label>"
				                  +"</div>"
				                +"</div>"
				                +"<div class='col-xs-2'>~</div>"
				                +"<div class='col-xs-5'>"
				                  +"<div class='form-group'>"
				                    +"<label class='timeCF'>{{finishedTime}}</label>"
				                  +"</div>"
				                +"</div>"
				              +"</div>"
				            +"</div>"
				          +"</div>";

	var calendarMonthData = printJson.calendarMonthData;
	$.each(calendarMonthData,function(idx,item) {
		if(item.time == today) {
			//var $allProjects;
			var $projects;
			var $projectDetails;
			
			var users = item.user;
			for( s in users) {
				if(s % 2 == 0) {
					$projectDetails = $(templateDetails);
				}
				var item = users[s];
				var projects = item.projects;
				_templateProject = templateProject.replace(/{{name}}/,item.name);
				$projects = $(_templateProject);
				for( p in projects ) {
					var project = projects[p];
					_templateProjectRow = templateProjectRow.replace(/{{projectName}}/,project.projectName)
										.replace(/{{projectDetail}}/,project.projectDetail)
										.replace(/{{creatTime}}/,project.creatTime)
										.replace(/{{finishedTime}}/,project.finishedTime);
					//$test = $(_templateProject).append($(_templateProjectRow));
					$projects.append($(_templateProjectRow));
				}
				//$projectDetails.insertAfter($prevFlag).append($projects);
				$projectDetails.appendTo($detailContainer).append($projects);
			}
		}
	});



	/*var templateDetails = "<div class='row details'>"
				      +"</div>";
	var templateProject = "<div class='col-xs-6'>"
				          +"<div class='row bg-primary username'>"
				            +"<div class='col-xs-12'>{{name}}</div>"
				          +"</div>"
				        +"</div>";
	var templateProjectRow = "<div class='row'>"
				            +"<div class='col-xs-12'>"
				              +"<div class='row'>"
				                +"<div class='col-xs-10'>{{projectName}}</div>"
				                +"<div class='col-xs-2'>"
				                  +"<button class='btn btn-primary showDetail'>^</button>"
				                +"</div>"
				              +"</div>"
				              +"<div class='row projectDetail'>"
				                +"<div class='col-xs-12'>"
				                  +"<div class='form-group'>"
				                    +"<label for='projectDetail' class='sr-only'></label>"
				                    +"<textarea id='projectDetail' placeholder='项目描述' class='form-control'>{{projectDetail}}</textarea>"
				                  +"</div>"
				                +"</div>"
				              +"</div>"
				              +"<div class='row projectDetail'>"
				                +"<div class='col-xs-5'>"
				                  +"<div class='form-group'>"
				                    +"<label for='creatTime' class='timeCF'>{{creatTime}}</label>"
				                  +"</div>"
				                +"</div>"
				                +"<div class='col-xs-2'>~</div>"
				                +"<div class='col-xs-5'>"
				                  +"<div class='form-group'>"
				                    +"<label class='timeCF'>{{finishedTime}}</label>"
				                  +"</div>"
				                +"</div>"
				              +"</div>"
				            +"</div>"
				          +"</div>";
	//var $allProjects;
	var $projects;
	var $projectDetails;
	
	var users = printJson.user;
	for( s in users) {
		if(s % 2 == 0) {
			$projectDetails = $(templateDetails);
		}
		var item = users[s];
		var projects = item.projects;
		_templateProject = templateProject.replace(/{{name}}/,item.name);
		$projects = $(_templateProject);
		for( p in projects ) {
			var project = projects[p];
			_templateProjectRow = templateProjectRow.replace(/{{projectName}}/,project.projectName)
								.replace(/{{projectDetail}}/,project.projectDetail)
								.replace(/{{creatTime}}/,project.creatTime)
								.replace(/{{finishedTime}}/,project.finishedTime);
			//$test = $(_templateProject).append($(_templateProjectRow));
			$projects.append($(_templateProjectRow));
		}
		//$projectDetails.insertAfter($prevFlag).append($projects);
		$projectDetails.appendTo($detailContainer).append($projects);
	}*/
	//$(templateDetails).insertAfter($prevFlag).append($projects);
}

function dayDetailInit() {
	var $days = $('#monthBody .date .dayDetail');
	$days.each(function(item) {
		var _this = $(this);

		var _dayDetailNow = _this.text();
		_this.on('click',function(e) {
			var e = e || window.event;
			var mouseX = e.pageX;
			var mouseY = e.pageY;


			setTimeout(function() {
				$container.removeClass('toLarge').addClass('toSmall');
			},200);
			
			if(!dayDetailIsShow) {
				var $dayDetail = $('#dayDetail');
				var dayDetailW = $dayDetail.width();
				var dayDetailH = $dayDetail.height();

				startX = mouseX - dayDetailW / 2;
				startY = mouseY - dayDetailH / 2;

				$dayDetail.css({
					'left': startX + 'px',
					'top': startY + 'px'
					//'-webkit-transform-origin': mouseX + 'px ' + mouseY + '50px'
				});
				$dayDetail.removeClass('dayDetailHide').addClass('dayDetailShow');
				setTimeout(function() {
					$dayDetail.css({
						'left': '300px',
						'top': '50px'
					});
				},2000);
				dayDetailIsShow = true;
			}
			$('#dayYeay').text(year);
			$('#dayMonth').text(month + 1);
			$('#dayDate').text(_dayDetailNow);

			var today = year + '-' + (month + 1) + '-' +_dayDetailNow;
			var testUrl = './js/data.json';

			getData(testUrl,today);
			/*if(!isClick){
				$container.removeClass('toLarge').addClass('toSmall');
			}else{
				$container.removeClass('toSmall').addClass('toLarge');
			}
			isClick = !isClick;*/
		});
	});
}

function getPrevMonth() {
	if(month < 1) {
		--year;
		month = 11;
	}else{
		--month;
	}
	$('#calender-month').css({
		'-webkit-transform':'translateX(-800px)',
	});
	setTimeout(function(){
		creatMonthBody(year,month);
		$('#calender-month').css({
			'-webkit-transform':'translateX(0)',
		});
	},500);
	
}
function getNextMonth() {
	if(month > 10) {
		++year;
		month = 0;
	}else{
		++month;
	}
	$('#calender-month').css({
		'-webkit-transform':'translateX(800px)',
	});
	setTimeout(function(){
		creatMonthBody(year,month);
		$('#calender-month').css({
			'-webkit-transform':'translateX(0)',
		});
	},500);
}
function setHeight() {
	var date = $('.date');
	var dateW = date.eq(2).width();
	var ceilH = (dateW / 12);
	date.each(function(item) {
		$(this).css({
			'height': ceilH + 'px',
			'line-height':  ceilH + 'px'
		});
	});
}
function showTab(id) {
	var $calenderBody = $('.calenderBody');
	var $btns = $('#' + id).parent().children();
	$calenderBody.each(function() {
		$(this).css('display','none');
	});
	$btns.each(function() {
		$(this).removeClass('btn-primary');
	});
	$('#calender-' + id).css('display','block');
	$('#' + id).addClass('btn-primary');
}

function creatCalendar() {
	
	creatMonthBody(year,month);
	
}
function getBeginDayByMonth(year,month) {
	var d = new Date(year,month,1);
	return d.getDay();
}
function getMaxDayByMonth(year,month) {
	var d = new Date(year,month,0);
	return d.getDate();
}

function creatMonthBody(year,month) {
	var maxDay = getMaxDayByMonth(year,month);
	var beginDay = getBeginDayByMonth(year,month);
	beginDay = beginDay == 0 ? 7 : beginDay;

	var $monthBody = $('#monthBody');
	$('#monthNow').attr('value',year + ' - ' + (Number(month) + 1));
	
	$monthBody.empty();
	var monthTemplate =  "<div class='row'>"
				            + "<div class='col-xs-2'> </div>"
				            + "<div class='col-xs-1'>一</div>"
				            + "<div class='col-xs-1'>二</div>"
				            + "<div class='col-xs-1'>三</div>"
				            + "<div class='col-xs-1'>四</div>"
				            + "<div class='col-xs-1'>五</div>"
				            + "<div class='col-xs-1'>六</div>"
				            + "<div class='col-xs-1'>日</div>"
				            + "<div class='col-xs-3'> </div>"
				          + "</div>";
	var dayCount = 1;
	var isStart = false;
	for(var s = 0 ;s < 6; s++ ) {
		monthTemplate += "<div class='row date'>"
							+ "<div class='col-xs-2'> </div>";
		for(var i =1; i <= 7; i++) {
			/*var template =  "<div class='col-xs-1'></div>";*/
			if( dayCount <= maxDay){

				if(s == 0 && i == beginDay){
					if(dayCount == daynow && month == new Date().getMonth() && year == new Date().getFullYear()){
						monthTemplate += "<div class='col-xs-1 dayDetail btn-primary'>" + dayCount + "<i></i></div>";
					}else{
						monthTemplate += "<div class='col-xs-1 dayDetail'>" + dayCount + "<i></i></div>";
					}
					isStart = true;
					dayCount++;
				}
				else if (isStart == true){
					if(dayCount == daynow && month == new Date().getMonth() && year == new Date().getFullYear()){
						monthTemplate += "<div class='col-xs-1 dayDetail btn-primary'>" + dayCount + "<i></i></div>";
					}else{
						monthTemplate += "<div class='col-xs-1 dayDetail'>" + dayCount + "<i></i></div>";
					}
					dayCount++;
				}else{
					monthTemplate += "<div class='col-xs-1'> </div>";
				}
			}else{
				monthTemplate += "<div class='col-xs-1'> </div>";
			}
		}
		monthTemplate += "<div class='col-xs-3'> </div>"
						+ "</div>";
	}
	$monthBody.append(monthTemplate);
	dayDetailInit();
	//var $calendarMonth = $('#calender-month');
}

function creatWeekBody() {
	
}