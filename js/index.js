var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var daynow = date.getDate();
var $container = $('#container');
var dayDetailIsShow = false;
var isInsertTableShow = false;
var startX = 0;
var startY = 0;
var URL = 'http://localhost/webProject/';
var selectedUser = 'all';
var selectedDate;
var tableJson;
var isRangeDown = false;
var startTimes_day = new Array();
var dbHelper;
var IDBVersion = 1;
var tableName = ['webProject'];
var isOnline;

$(document).ready(function() {
	//var isClick = false;
	indexedDBInit();
	window.addEventListener('online',function() {
		setTimeout(function() {
			uploadNewProject();
		},3000);
		
	},false);
	window.addEventListener('offline',function() {
		//uploadNewProject();
	},false);
	init();
	/*$('tbody tr .projectDetail').on({
		mouseenter: function(e) {
			var _this = $(this);
			var e = e || window.event;
			var $eleTip = $('<div class=\'tips-detail\'>' + _this.text() + '</div>');
			var eleH = $eleTip.height();
			
			$('.tips-detail').each(function() {
				$(this).remove();
			});
			$('#dayDetail').after($eleTip);

			var eleH = $eleTip.height();
			$eleTip.css({
				left: _this.offset().left + 'px',
				top: (_this.offset().top - eleH - 20) + 'px'
			});
			
		},
		mouseleave: function() {
			$('.tips-detail').each(function() {
				$(this).remove();
			});
		}
	});*/
	/*$('.btn-upd').on('click',function() {
		$('#optInsert').hide();
		$('#optUpdate').show();
		var _this = $(this);
		var $insertTable = $('#insertTable');
		var username = _this.parent().parent().siblings('.username').text();
		var projectName = _this.parent().parent().siblings('.projectName').text();
		var projectDetail = _this.parent().parent().siblings('.projectDetail').text();
		var projectTime = _this.parent().parent().siblings('.projectTime').text().replace(/\s+/g,'').split('~');
		var startTime = projectTime[0];
		var finishedTime = projectTime[1];
		if(isInsertTableShow) {
			$insertTable.slideUp(600).slideDown(600);
			setTimeout(function() {
				$insertTable.find('#username').val(username);
				$insertTable.find('#projectName').val(projectName);
				$insertTable.find('#projectDetail').text(projectDetail);
				$insertTable.find('#startTime').val(startTime);
				$insertTable.find('#finishedTime').val(finishedTime);
			},700);
		}else {
			$insertTable.find('#username').val(username);
			$insertTable.find('#projectName').val(projectName);
			$insertTable.find('#projectDetail').text(projectDetail);
			$insertTable.find('#startTime').val(startTime);
			$insertTable.find('#finishedTime').val(finishedTime);
			$insertTable.slideDown(600);
		}
		isInsertTableShow = true;
	});
	$('.btn-del').on('click',function() {
		if(confirm('确定删除此条记录？')) {
			if(isInsertTableShow) {
				$('#insertTable').slideUp(600);
				isInsertTableShow = false;
			}
			var $_delTr = $(this).parent().parent().parent();
			$_delTr.addClass('del-effect');
			setTimeout(function() {
				$_delTr.remove();
			},500);
		}
	});*/
		
	$('#select').on('change',function() {
		selectedUser = $(this).find('option:selected').text();
		/*var infos = getData(URL,getSelectedTime());
		consoleInfo(infos);
		printTable(infos);*/
		getData();
		setmark();
		//getThisMonthHasP(dayDetailInit);
	});

	/*$('#dayDetail input[type=\'range\']').on('change',function() {
		var _this = $(this);
		var val = _this.val();
		var label = _this.parent().prev().children().eq(0);
		label.text('进度(' + val + '%)');
	});*/

	$('#dayDetail input[type=\'range\']').on({
		change: function(e) {
			e.preventDefault();
			var _this = $(this);
			var val = _this.val();
			var label = _this.parent().prev().children().eq(0);
			label.text('进度(' + val + '%)');
		},
		mousedown: function() {
			isRangeDown = true;
		},
		mousemove: function() {
			if(isRangeDown) {
				var _this = $(this);
				var val = _this.val();
				var label = _this.parent().prev().children().eq(0);
				label.text('进度(' + val + '%)');
			}
		},
		mouseup: function() {
			isRangeDown = false;
		}
	});

	$('button').on('click',function(e) {
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
				submitInfo('add');
			
		}else if(id == 'optInsertCancle') {
			$(this).parents('#insertTable').slideUp(600);
			isInsertTableShow = false;
		}else if(id == 'optUpdate') {
			submitInfo('upd');
		}else if(id == 'day') {
			$('#calender-month').hide(600);
			setTimeout(function() {
				$('#calender-day').show();
			},600);
			
		}else if(id == 'month') {
			$('#calender-day').hide(600);
			setTimeout(function() {
				$('#calender-month').show();
			},600);
		}else{
			//showTab(id);
		}
	});
	
	$('#btnInsert').on('click',function() {
		$('#optUpdate').hide();
		$('#optInsert').show();
		var $insertTable = $('#insertTable');
		if(isInsertTableShow) {
			$insertTable.slideUp(600).slideDown(600);
			setTimeout(function() {
				$insertTable.find('#username').val('');
				$insertTable.find('#projectName').val('');
				$insertTable.find('#projectDetail').val('');
				$insertTable.find('#startTime').val('');
				$insertTable.find('#finishedTime').val('');
				$insertTable.find('#hiddenId').val('');
			},700);
		}else {
			$insertTable.find('#username').val('');
			$insertTable.find('#projectName').val('');
			$insertTable.find('#projectDetail').val('');
			$insertTable.find('#startTime').val('');
			$insertTable.find('#finishedTime').val('');
			$insertTable.find('#hiddenId').val('');
			$insertTable.slideToggle(600);
		}
		$insertTable.css('display') == 'none' ? isInsertTableShow = true : isInsertTableShow = false;
	});
});
$(window).resize(function() {
	if(dayDetailIsShow) {
		$container.css({
			'left': '665px'
		});
	}
});
function init() {
	checkOnline();
	if(!isOnline) {
		indexedDBInit();
	}else {
		refreshProject();
	}
	
	/*var addData = [
		{
			id: 1,
			username: '陈万芳',
			projectName: '日程管理插件',
			projectDetail: '基于jQuery的插件',
			startTime: 1444102489,
			finishedTime: 1445312089,
			isFinished: 0,
			projectProcess: 55
		},
		{
			id: 3,
			username: '陈万芳',
			projectName: 'chrome分享插件',
			projectDetail: '前端专享，基于chrome的分享插件',
			startTime: 1442978584,
			finishedTime: 1444274584,
			isFinished: 1,
			projectProcess: 100
		},
		{
			id: 6,
			username: '陈万芳',
			projectName: '看完H5',
			projectDetail: '把借的这本H5看完，并完成几个有趣的小应用。',
			startTime: 1444965587,
			finishedTime: 1446175187,
			isFinished: 0,
			projectProcess: 10
		}
	];

	dbHelper.startOpt(function() {
		dbHelper.addData(tableName,addData)
	});*/
	

	creatCalendar();
	setHeight();


	//dayDetailInit();
	/*var $container = $('#container');
	$container.CalendarProject({
		width: '1000px'
	});*/
}
function uploadNewProject() {
	indexedDBInit();
	dbHelper.openDB(function() {
		dbHelper.getMultipleData(tableName,'idIndex',function(data) {
			var _tempArr_ = [];

			for(d in data) {
				var _data = data[d];
				if(_data.isNew) {
					_tempArr_.push(_data);
				}
			}
			if(_tempArr_.length <= 0) {
				return;
			}
			var postData = {
				"data": _tempArr_
			};
			var url = URL + '?index&A=uploadNewProject';
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: postData,
			}).done(function(rst) {
				
			});
			refreshProject();
		});
	});
}
function refreshProject() {
	indexedDBInit();
	dbHelper.openDB(function() {
		dbHelper.clearData(tableName,function() {
			$.get(URL + '?index&A=getAllData').done(function(data) {
				tableJson = JSON.parse(data).result;
				dbHelper.addData(tableName,tableJson,function() {
					console.log(tableJson);
					console.log('addData success');
				});
			});
		});
	});
}
function checkOnline() {
	if(navigator.onLine) {
		isOnline = true;
	} else {
		isOnline = false;
	}
}
function indexedDBInit() {
	dbHelper = new DBHelper('yy_webProject',IDBVersion);
	dbHelper.openDB(function() {});
}
function submitInfo(opt) {
	var rst = validateEmpty(['username','projectName','projectDetail','finishedTime']);
	if(rst) {
		if(isOnline) {
			var postData = {
				"username": $('#username').val(),
				"projectName": $('#projectName').val(),
				"projectDetail": $('#projectDetail').val(),
				"startTime": transdate($('#startTime').val()),
				"finishedTime": transdate($('#finishedTime').val()),
				"projectProcess": $('#projectProcess').val()
			}
			if(opt == 'add') {
				var url = URL + '?index&A=add';
			}else if(opt == 'upd') {
				var id = $('#hiddenId').val();
				var url = URL + '?index&A=upd&id=' + id;
			}
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: postData,
			})
			.done(function(data) {
				var alertMsg = '';
				
				if(data.result == 1) {
					if(opt == 'add') {
						alertMsg = '添加成功！';
					}else if(opt == 'upd') {
						alertMsg = '修改成功！';
					}
					alert(alertMsg);
					$('#insertTable').slideUp(600);
					isInsertTableShow = false;
					getData();
				}else {
					if(opt == 'add') {
						alertMsg = '添加失败！';
					}else if(opt == 'upd') {
						alertMsg = '修改失败！';
					}
					alert(alertMsg);
				}
				refreshProject();
				consoleInfo("success");
			});
		} else {
			if(opt == 'add') {
				var addData = [];
				dbHelper.openDB(function() {
					dbHelper.getMultipleData(tableName,'idIndex',function(data) {
						var lastId = data[data.length - 1].id;
						var postData = {
							"id": (Number(lastId) + 1),
							"username": $('#username').val(),
							"projectName": $('#projectName').val(),
							"projectDetail": $('#projectDetail').val(),
							"startTime": transdate($('#startTime').val()),
							"finishedTime": transdate($('#finishedTime').val()),
							"projectProcess": $('#projectProcess').val(),
							"isFinished": 0,
							"isNew": 1
						}
						addData.push(postData);
						console.log('addData');
						console.log(postData);
						dbHelper.addData(tableName,addData,function() {
							alert('添加成功！');
							$('#insertTable').slideUp(600);
							isInsertTableShow = false;
							getData();
						});
						
					});
				});
			} else if(opt == 'upd') {
				var addData = {
					"id": Number($('#hiddenId').val()),
					"username": $('#username').val(),
					"projectName": $('#projectName').val(),
					"projectDetail": $('#projectDetail').val(),
					"startTime": transdate($('#startTime').val()),
					"finishedTime": transdate($('#finishedTime').val()),
					"projectProcess": $('#projectProcess').val()
				};
				dbHelper.openDB(function() {
					dbHelper.updateDataByKey(tableName,addData,function() {
						console.log('update success');
						$('#insertTable').slideUp(600);
						isInsertTableShow = false;
						getData();
					});
				});
				/*dbHelper.startOpt(function() {
					dbHelper.updateDataByKey(tableName,addData,function() {
						console.log('update success');
						$('#insertTable').slideUp(600);
						isInsertTableShow = false;
						getData();
					});
				});*/
			}
			consoleInfo("offline");
		}
	}
}
function transdate(time) {
	var date = new Date();
	times = time.split('-');
	date.setFullYear(times[0]);
	date.setMonth(times[1]);
	date.setDate(times[2]);

	return Date.parse(date) / 1000;
}

function transToDate(timeStr) {
	var _temp = new Date(parseInt(timeStr) * 1000);
	var _fullYear = _temp.getFullYear();
	var _month = _temp.getMonth();
	_month = _month > 9 ? _month : '0' + _month;
	var _day = _temp.getDate();
	_day = _day > 9 ? _day : '0' + _day;
	var returnDate = _fullYear + '-' + _month + '-' + _day;
	return returnDate;
}

function getSelectedTime() {
	return year + '-' + (month + 1) + '-' + selectedDate;
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

function creatTips() {

}

function consoleInfo(str) {
	console.log(str);
}

function getData() {
	var selectedTime = transdate(getSelectedTime());
	if(isOnline) {
		$.get(URL + '?index&A=getData&selectedTime=' + selectedTime + '&selectedUser=' + selectedUser + '&time=' + $.now()).done(function(data) {
			
			tableJson = JSON.parse(data).result;
			
			
			printTable();
			getUsers();
			/*$('.details').each(function(idx,item) {
				item.remove();
			});
			projectJson = data;
			printProject(projectJson,today,$('#dayDetail'));*/
		});
	} else {
		dbHelper.openDB(function() {
			dbHelper.getMultipleData(tableName,'nameIndex',function(data) {
				var _projects = [];
				var _project;
				var _selectedTime = Number(selectedTime);
				for(s in data) {
					_project = data[s];
					if(_selectedTime >= Number(_project.startTime) && _selectedTime <= Number(_project.finishedTime)) {
						if(selectedUser == 'all') {
							_projects.push(_project);
						}else {
							if(_project.username == selectedUser) {
								_projects.push(_project);
							}
						}
					}
				}
				tableJson = _projects;
				printTable();
				getUsers();
			});
		});
	}
}
function printTable() {
	var template_tr = "<tr>"
		                + "<td class='orderNum' data-id='{{id}}'>{{orderNum}}</td>"
		                + "<td class='username'>{{username}}</td>"
		                + "<td class='projectName'>{{projectName}}</td>"
		                + "<td class='projectDetail'>{{projectDetail}}</td>"
		                + "<td class='projectTime'>{{projectTime}}</td>"
		                + "<td class='projectOpts'> "
		                  + "<div class='btns'>"
		                 	+ "<button class='btn btn-primary btn-xs btn-finished' {{finishedStatus}}>{{isFinished}}</button>"
		                    + "<button class='btn btn-primary btn-xs btn-upd' data-projectProcess='{{projectProcess}}'>修改</button>"
		                    + "<button class='btn btn-primary btn-xs btn-del'>删除</button>"
		                  + "</div>"
		                + "</td>"
		              + "</tr>";

	var $tableBody = $('#projectTableBody');
	$tableBody.empty();
	for(s in tableJson) {
		var info = tableJson[s];
		var projectTime = transToDate(info.startTime) + ' ~ ' + transToDate(info.finishedTime);
		var finishedStatus = '';
		var isFinished = '';
		if(info.isFinished == 1) {
			finishedStatus = 'disabled';
			isFinished = '已完成';
		}else {
			finishedStatus = '';
			isFinished = '完成';
		}
		
		_template_tr = template_tr
								.replace(/{{id}}/,info.id)
								.replace(/{{orderNum}}/,(Number(s) + 1))
								.replace(/{{username}}/,info.username)
								.replace(/{{projectName}}/,info.projectName)
								.replace(/{{projectDetail}}/,info.projectDetail)
								.replace(/{{projectTime}}/,projectTime)
								.replace(/{{finishedStatus}}/,finishedStatus)
								.replace(/{{isFinished}}/,isFinished)
								.replace(/{{projectProcess}}/,info.projectProcess);
		$tableBody.append($(_template_tr));
	}
	$('tbody tr .projectDetail').on({
		mouseenter: function(e) {
			var _this = $(this);
			var e = e || window.event;
			var $eleTip = $('<div class=\'tips-detail\'>' + _this.text() + '</div>');
			var eleH = $eleTip.height();
			
			$('.tips-detail').each(function() {
				$(this).remove();
			});
			$('#dayDetail').after($eleTip);

			var eleH = $eleTip.height();
			$eleTip.css({
				left: _this.offset().left + 'px',
				top: (_this.offset().top - eleH - 20) + 'px'
			});
			
		},
		mouseleave: function() {
			$('.tips-detail').each(function() {
				$(this).remove();
			});
		}
	});
	$('.btn-upd').on('click',function() {
		$('#optInsert').hide();
		$('#optUpdate').show();
		var _this = $(this);
		var $insertTable = $('#insertTable');
		$('#hiddenId').val(_this.parent().parent().siblings('.orderNum').attr('data-id'));
		var username = _this.parent().parent().siblings('.username').text();
		var projectName = _this.parent().parent().siblings('.projectName').text();
		var projectDetail = _this.parent().parent().siblings('.projectDetail').text();
		var projectTime = _this.parent().parent().siblings('.projectTime').text().replace(/\s+/g,'').split('~');
		var projectProcess = _this.attr('data-projectProcess');
		var startTime = projectTime[0];
		var finishedTime = projectTime[1];
		var $projectProcess = $insertTable.find('#projectProcess');
		if(isInsertTableShow) {
			$insertTable.slideUp(600).slideDown(600);
			setTimeout(function() {
				$insertTable.find('#username').val(username);
				$insertTable.find('#projectName').val(projectName);
				$insertTable.find('#projectDetail').val(projectDetail);
				$insertTable.find('#startTime').val(startTime);
				$insertTable.find('#finishedTime').val(finishedTime);
				$projectProcess.val(projectProcess);
				$projectProcess.parent().prev().children().eq(0).text('进度(' + projectProcess + '%)');
			},700);
		}else {
			$insertTable.find('#username').val(username);
			$insertTable.find('#projectName').val(projectName);
			$insertTable.find('#projectDetail').val(projectDetail);
			$insertTable.find('#startTime').val(startTime);
			$insertTable.find('#finishedTime').val(finishedTime);
			$projectProcess.val(projectProcess);
			$projectProcess.parent().prev().children().eq(0).text('进度(' + projectProcess + '%)');
			$insertTable.slideDown(600);
		}
		isInsertTableShow = true;
	});
	$('.btn-finished').on('click',function() {
		if(confirm('是否完成？')) {
			var id = $(this).parent().parent().siblings('.orderNum').attr('data-id');
			if(isOnline) {
				$.ajax({
					url: URL + '?index&A=finished&id=' + id,
					type: 'get',
					dataType: 'json'
				}).done(function(data) {
					if(data.result == 1) {
						getData();
						refreshProject();
					}
				});
			} else {
				var finishedData = {
					'key': 'id',
					'value': Number(id)
				};
				dbHelper.openDB(function() {
					dbHelper.finishedProject(tableName,finishedData,function() {
						console.log('finished it');
						getData();
					});
				});
			}
		}
	});
	$('.btn-del').on('click',function() {
		var _this = $(this);
		if(confirm('确定删除此条记录？')) {
			var id = _this.parent().parent().siblings('.orderNum').attr('data-id');
			if(isOnline) {
				$.ajax({
					url: URL + '?index&A=del&id=' + id,
					type: 'get',
					dataType: 'json'
				}).done(function(data) {
					if(data.result == 1) {
						if(isInsertTableShow) {
							$('#insertTable').slideUp(600);
							isInsertTableShow = false;
						}
						var $_delTr = _this.parent().parent().parent();
						$_delTr.addClass('del-effect');
						setTimeout(function() {
							$_delTr.remove();
							getData();
						},500);
						refreshProject();
					}
				});
			} else {
				var delData = {
					'key': 'id',
					'value': Number(id)
				};
				dbHelper.openDB(function() {
					dbHelper.deleteDataByKey(tableName,delData,function() {
						console.log('delete success');
						if(isInsertTableShow) {
							$('#insertTable').slideUp(600);
							isInsertTableShow = false;
						}
						var $_delTr = _this.parent().parent().parent();
						$_delTr.addClass('del-effect');
						setTimeout(function() {
							$_delTr.remove();
							getData();
						},500);
					});
				});
			}
		}
	});
}
function detailIsFull() {
	var $col_6 = $('#dayDetail .details:last').find('.col-xs-6');
	return $col_6.length >1 ? true : false;
}

function getUsers() {
	var $selects = $('#select');
	if(isOnline) {
		$.get(URL + '?index&A=getUser').done(function(data) {
			users = JSON.parse(data).users;
			$selects.empty().append('<option>all</option>');
			for(s in users) {
				var user = users[s];
				var _selected_ = '';
				
				if(user.username == selectedUser) {
					_selected_ = 'selected';
				}
				$selects.append('<option ' + _selected_ + '>' + user.username + '</option>');
			}
		});
	} else {
		dbHelper.openDB(function() {
			dbHelper.getMultipleData(tableName,'nameIndex',function(data) {
				var _tempArr = [];
				var isIn = false;
				console.log(data);
				for( d in data ) {
					var _item = data[d];
					var _name = _item.username;
					for(k in _tempArr) {
						var _tempName = _tempArr[k].username;
						if(_name == _tempName) {
							isIn = true;
							break;
						}
					}
					if(!isIn) {
						_tempArr.push(_item);
						isIn = false;
					}
				}
				$selects.empty().append('<option>all</option>');
				console.log(_tempArr);
				for(s in _tempArr) {
					var item = _tempArr[s];
					var _selected_ = '';
					if(item.username == selectedUser) {
						_selected_ = 'selected';
					}
					$selects.append('<option ' + _selected_ + '>' + item.username + '</option>');
				}
			});
		});
	}
}
function setmark() {
	var $days = $('#monthBody .date .dayDetail');
	$days.each(function(item) {
		var _this = $(this);
		_this.find('i').removeClass();
	});
	getThisMonthHasP(function(){
		$days.each(function(item) {
			var _this = $(this);
			for(d in startTimes_day) {
				var _details = startTimes_day[d];
				var _thisText = Number(_this.text());
				if(_details.date == _thisText) {
					if(_details.isFinished == 1) {
						_this.find('i').addClass('tip-finished');
					} else {
						_this.find('i').addClass('tip-unfinished');
					}
					
					//consoleInfo(month + ' | ' + _details.isFinished);
					//consoleInfo(startTimes_day);
				}
			}
		});
	});
	
}
	
function dayDetailInit() {
	
	setmark();

	var $days = $('#monthBody .date .dayDetail');
	
	
	//getUsers();

	$days.each(function(item) {
		var _this = $(this);

		
		/*for(d in startTimes_day) {
			if(d == _thisText)
			consoleInfo('get: ' + _thisText);
		}*/
		
		_this.on('click',function(e) {
			var _dayDetailNow = selectedDate = _this.text();

			//consoleInfo(getSelectedTime());
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
						'left': '350px',
						'top': '50px'
					});
				},2000);
				dayDetailIsShow = true;
			}
			$('#dayYeay').text(year);
			$('#dayMonth').text(month + 1);
			$('#dayDate').text(_dayDetailNow);
			getData();			
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
	var d = new Date(year,month + 1,0);
	return d.getDate();
}
function getThisMonthHasP(callback) {
	startTimes_day.splice(0,startTimes_day.length);//清空数组
	if(isOnline) {
		$.get(URL + '?index&A=getThisMonthHasP&thisMonth='+ (Number(month) + 1) + '&username=' + selectedUser).done(function(data) {
			var rst = JSON.parse(data).result;
			$.each(rst,function(idx,item) {
				var _dates = transToDate(item.startTime).split('-');
				var _year = Number(_dates[0]);
				var _month = Number(_dates[1]);
				if(_year == year && (_month - 1) == month) {
					var _date = Number(_dates[_dates.length - 1]);
					var _details = {
						'date': _date,
						'isFinished': item.isFinished
					};
					startTimes_day.push(_details);
					//consoleInfo(_month + ' | ' + month);
				}
				
			});
			//consoleInfo(startTimes_day);
			callback();
		});
	} else {
		dbHelper.openDB(function() {
			dbHelper.getMultipleData(tableName,'nameIndex',function(data) {
				$.each(data,function(idx,item) {
					var _dates = transToDate(item.startTime).split('-');
					var _year = Number(_dates[0]);
					var _month = Number(_dates[1]);


					if(selectedUser == 'all') {
						if(_year == year && (_month - 1) == month) {
							var _date = Number(_dates[_dates.length - 1]);
							var _details = {
								'date': _date,
								'isFinished': item.isFinished
							};
							startTimes_day.push(_details);
							//consoleInfo(_month + ' | ' + month);
						}
					}else {
						if(item.username == selectedUser) {
							if(_year == year && (_month - 1) == month) {
								var _date = Number(_dates[_dates.length - 1]);
								var _details = {
									'date': _date,
									'isFinished': item.isFinished
								};
								startTimes_day.push(_details);
								//consoleInfo(_month + ' | ' + month);
							}
						}
					}
					
				});
				callback();
			});
		});
	}
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
	getThisMonthHasP(dayDetailInit);
	//var $calendarMonth = $('#calender-month');
}

function creatWeekBody() {
	
}