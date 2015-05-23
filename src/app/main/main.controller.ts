module splitchore {
  'use strict';

  class Thing {
    public rank: number;
    public title: string;
    public url: string;
    public description: string;
    public logo: string;

    constructor(title: string, url: string, description: string, logo: string) {
      this.title = title;
      this.url = url;
      this.description = description;
      this.logo = logo;
      this.rank = Math.random();
    }
  }

  interface IMainScope extends ng.IScope {
	  ctrl: MainCtrl;
  }

  export class MainCtrl {
	  awesomeThings: angularfire.FireArray<Thing>;

    /* @ngInject */
    constructor ($scope: IMainScope, $firebaseArray: angularfire.ArrayService) {
	    $scope.ctrl = this;
      this.awesomeThings = $firebaseArray<Thing>(new Firebase("https://splitchore.firebaseio.com/things"));
    }

	  removeThing(thing: Thing) {
		  this.awesomeThings.$remove(thing);
	  }
  }
}
