angular.module('igniteApp')

    .factory("getBooks", ['$http', function ($http) { // Factory for getting books details
        var getBooks = {};
        getBooks.booksList = function () {
            return $http({
                method: "GET",
                url: "http://skunkworks.ignitesol.com:8000/books/"
            });
        };

        return getBooks;
    }])
    .factory("shareData",[function(){
        var data = {};
        var category = '';
	return {
	    get: function () {
	        return data;
	    },
	    set: function (value) {
	        data = value;
	    } 
	};

	}]);