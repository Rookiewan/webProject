/*;(function($) {
	$.fn.CalendarProject = function(options) {
		var DEFAULTS = {
			width: '1000px'
		};


		var template = "<div class='row'>"
        + "<div class='col-xs-12'>123123</div>"
      + "</div>"
      + "<div class='row'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>一</div>"
        + "<div class='col-xs-1'>二</div>"
        + "<div class='col-xs-1'>三</div>"
        + "<div class='col-xs-1'>四</div>"
        + "<div class='col-xs-1'>五</div>"
        + "<div class='col-xs-1'>六</div>"
        + "<div class='col-xs-1'>七</div>"
        + "<div class='col-xs-1'>日</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>1</div>"
        + "<div class='col-xs-1'>2</div>"
        + "<div class='col-xs-1'>3</div>"
        + "<div class='col-xs-1'>4</div>"
        + "<div class='col-xs-1'>5</div>"
        + "<div class='col-xs-1'>6</div>"
        + "<div class='col-xs-1'>7</div>"
        + "<div class='col-xs-1'>8</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>9</div>"
        + "<div class='col-xs-1'>10</div>"
        + "<div class='col-xs-1'>11</div>"
        + "<div class='col-xs-1'>12</div>"
        + "<div class='col-xs-1'>13</div>"
        + "<div class='col-xs-1'>14</div>"
        + "<div class='col-xs-1'>15</div>"
        + "<div class='col-xs-1'>16</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>17</div>"
        + "<div class='col-xs-1'>18</div>"
        + "<div class='col-xs-1'>19</div>"
        + "<div class='col-xs-1'>20</div>"
        + "<div class='col-xs-1'>21</div>"
        + "<div class='col-xs-1'>22</div>"
        + "<div class='col-xs-1'>23</div>"
        + "<div class='col-xs-1'>24</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>25</div>"
        + "<div class='col-xs-1'>26</div>"
        + "<div class='col-xs-1'>27</div>"
        + "<div class='col-xs-1'>28</div>"
        + "<div class='col-xs-1'>29</div>"
        + "<div class='col-xs-1'>30</div>"
        + "<div class='col-xs-1'>31</div>"
        + "<div class='col-xs-1'>32</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>33</div>"
        + "<div class='col-xs-1'>34</div>"
        + "<div class='col-xs-1'>35</div>"
        + "<div class='col-xs-1'>36</div>"
        + "<div class='col-xs-1'>37</div>"
        + "<div class='col-xs-1'>38</div>"
        + "<div class='col-xs-1'>39</div>"
        + "<div class='col-xs-1'>40</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>41</div>"
        + "<div class='col-xs-1'>42</div>"
        + "<div class='col-xs-1'>43</div>"
        + "<div class='col-xs-1'>44</div>"
        + "<div class='col-xs-1'>45</div>"
        + "<div class='col-xs-1'>46</div>"
        + "<div class='col-xs-1'>47</div>"
        + "<div class='col-xs-1'>48</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>";
		var options = $.extend({},DEFAULTS,options);
		setCeilHeight(this);
		return this.each(function() {
			$(this).append(template);
		});
		
		function setCeilHeight() {
			var date = $(template).find('date');
			var dateW = date.eq(2).width();
			alert(dateW);
			var ceilH = (dateW / 12);
			date.each(function(item) {
				$(this).css({
					'height': ceilH + 'px',
					'line-height':  ceilH + 'px'
				});
			});
		};
	};
})(jQuery)*/

//定义构造函数
;(function($) {
	var Calendar = function(ele,opt) {
		this.$element = ele;
		this.options = $.extend({},this.DEFAULTS,opt);
	}
	Calendar.prototype = {
		creatCalendar: function() {
			var $template = $(this.TEMPLATE);
			var $date = $template.find('.date');
			var dateW = this.options.width;
			var ceilH = (dateW / 12);
			$date.each(function(item) {
				alert(item.height());
				$(this).css({
					'height': ceilH + 'px',
					'line-height':  ceilH + 'px'
				});
			});

			return $template;
		},
		showCalendar: function(template) {
			var $container = $(this.$element);
			var ceilH = $container.width() / 12;
			
			return this.$element.append(template);
		}
	}

	$.fn.CalendarProject = function(options) {
		var calendar = new Calendar(this,options);

		return calendar.showCalendar(calendar.creatCalendar());
	}

	Calendar.prototype.DEFAULTS = {
		width: '900px'
	}
	Calendar.prototype.TEMPLATE ="<div class='row'>"
        + "<div class='col-xs-12'>123123</div>"
      + "</div>"
      + "<div class='row'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>一</div>"
        + "<div class='col-xs-1'>二</div>"
        + "<div class='col-xs-1'>三</div>"
        + "<div class='col-xs-1'>四</div>"
        + "<div class='col-xs-1'>五</div>"
        + "<div class='col-xs-1'>六</div>"
        + "<div class='col-xs-1'>七</div>"
        + "<div class='col-xs-1'>日</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>1</div>"
        + "<div class='col-xs-1'>2</div>"
        + "<div class='col-xs-1'>3</div>"
        + "<div class='col-xs-1'>4</div>"
        + "<div class='col-xs-1'>5</div>"
        + "<div class='col-xs-1'>6</div>"
        + "<div class='col-xs-1'>7</div>"
        + "<div class='col-xs-1'>8</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>9</div>"
        + "<div class='col-xs-1'>10</div>"
        + "<div class='col-xs-1'>11</div>"
        + "<div class='col-xs-1'>12</div>"
        + "<div class='col-xs-1'>13</div>"
        + "<div class='col-xs-1'>14</div>"
        + "<div class='col-xs-1'>15</div>"
        + "<div class='col-xs-1'>16</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>17</div>"
        + "<div class='col-xs-1'>18</div>"
        + "<div class='col-xs-1'>19</div>"
        + "<div class='col-xs-1'>20</div>"
        + "<div class='col-xs-1'>21</div>"
        + "<div class='col-xs-1'>22</div>"
        + "<div class='col-xs-1'>23</div>"
        + "<div class='col-xs-1'>24</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>25</div>"
        + "<div class='col-xs-1'>26</div>"
        + "<div class='col-xs-1'>27</div>"
        + "<div class='col-xs-1'>28</div>"
        + "<div class='col-xs-1'>29</div>"
        + "<div class='col-xs-1'>30</div>"
        + "<div class='col-xs-1'>31</div>"
        + "<div class='col-xs-1'>32</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>33</div>"
        + "<div class='col-xs-1'>34</div>"
        + "<div class='col-xs-1'>35</div>"
        + "<div class='col-xs-1'>36</div>"
        + "<div class='col-xs-1'>37</div>"
        + "<div class='col-xs-1'>38</div>"
        + "<div class='col-xs-1'>39</div>"
        + "<div class='col-xs-1'>40</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>"
      + "<div class='row date'>"
        + "<div class='col-xs-2'> </div>"
        + "<div class='col-xs-1'>41</div>"
        + "<div class='col-xs-1'>42</div>"
        + "<div class='col-xs-1'>43</div>"
        + "<div class='col-xs-1'>44</div>"
        + "<div class='col-xs-1'>45</div>"
        + "<div class='col-xs-1'>46</div>"
        + "<div class='col-xs-1'>47</div>"
        + "<div class='col-xs-1'>48</div>"
        + "<div class='col-xs-2'> </div>"
      + "</div>";
})(jQuery);
