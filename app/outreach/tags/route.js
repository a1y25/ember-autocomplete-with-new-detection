import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.find('outreach/md-tags');
	},
	actions:{
		doSomething: function(){
			console.log('doing something @ route');
		}
	}
});