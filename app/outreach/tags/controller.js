import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		doSomething: function(){
			console.log('doing something at controller');
		},
		submit:function () {
			console.log('submiting');
		}

	}
});