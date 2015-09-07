import Ember from 'ember';

export default Ember.Component.extend({

	didInsertElement: function() {

		var _this = this;
		Ember.run.scheduleOnce('afterRender', this, function() {

			var autoInput = $('#fm-autocomplete');
			var autoResultContainer = $('.fm-auto-results');


			var autoInputLeft = autoInput.offset().left,
			autoInputTop = autoInput.offset().top,
			autoInputHeight = autoInput.outerHeight(),
			autoInputWidth = autoInput.outerWidth();


			autoResultContainer.css({
				left: autoInputLeft,
				top: autoInputTop + autoInputHeight
			});

			autoInput.on('keyup', function() {
				var q = $(this).val().trim().toLowerCase();

				if (q == "") {
					return;
				}

				$.ajax({
					url: 'http://localhost:8000/search?q=' + q,
					crossDomain: true
				}).success(function(data) {

					var results = data;

					autoResultContainer.show()
					autoResultContainer.find('ul').empty();

					results.matches.forEach(function(result) {
						autoResultContainer.find('ul').append('<li>' + result + '</li>');
					});


					if (!results.exact) {
						//not match
						results.matches.unshift(q);
						autoResultContainer.find('ul').prepend('<li>' + q + ' <span>New</span> </li>');
						autoResultContainer.find('li').eq(1).addClass('selected');

						if(autoResultContainer.find('li').size()==1){
							autoResultContainer.find('li').first().addClass('selected');
						}
					}else{
						//match
						autoResultContainer.find('li').first().addClass('selected');
					}

					autoResultContainer.find('li').hover(function(){
						$(this).addClass('selected');
					},function(){
						$(this).removeClass('selected');
					});


					autoResultContainer.find('li').on('click', function(e) {
						var i = $(this).index();
						var val = results.matches[i];
						autoInput.val(val);

						_this.sendAction('doSomething',val);

					});
				});

				$(document).click(function(e) {
					if ($(e.target).is(autoResultContainer.find('li'))) {
						// return;
					}
					autoResultContainer.hide();
				});
			});

		});
	}
});