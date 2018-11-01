angular.module('igniteApp')
    .controller('igniteController', function ($scope, $state, getBooks, shareData) {
        const ctrl = this;

        // Function to fetch all the books category
        $scope.getTitles = () => {
            //Service call for fetching all data
            getBooks.booksList().then(function (res) {
                $scope.getBooksData = res.data.results;
                $scope.title = [];
                var i, booksLength = $scope.getBooksData.length - 1; // -1 done because last the last object within the array is undefined 
                for (i = 0; i <= booksLength; i++) {
                    $scope.title = $scope.title.concat($scope.getBooksData[i].bookshelves);
                }

                // This function is used for removing duplicate values from bookshevles array
                $scope.unique = (list) => {
                    var result = [];
                    $.each(list, function (i, e) {
                        if ($.inArray(e, result) == -1) result.push(e);
                    });
                    return result;
                };

                $scope.titles = $scope.unique($scope.title);
            });
        };
        $scope.getTitles();


        // For showing details page after selecting a category
        $scope.selectedCategory = (selCategory) => {
            $scope.selectedTitle = angular.copy(selCategory);
            $scope.bookDetails = [];
            var j, length = $scope.getBooksData.length - 1;
            for (j = 0; j <= length; j++) {
                if ($scope.getBooksData[j].bookshelves.includes($scope.selectedTitle) && $scope.getBooksData[j].formats.hasOwnProperty('image/jpeg')) {
                    $scope.bookDetails.push($scope.getBooksData[j]);
                }
            }

            // If no book found with same bookshelve then alert added saying 'No books found'
            if ($scope.bookDetails.length == 0) {
                alert('No Books found');
            }
            // Else we will change the state so that details page is shown
            else {
                shareData.set($scope.bookDetails);
                shareData.category = $scope.selectedTitle;
                $state.go('details');
            }
        };

    })

    .controller('detailsController', function ($scope, shareData, $state, $window) {
        $scope.dataFromList = shareData.get();
        $scope.selectedBookTitle = shareData.category;

        console.log('data', $scope.dataFromList);


        $scope.getImagePath = function (booksData) {
            return booksData.formats["image/jpeg"];
        };
        $scope.openBook = (booksData) => {
            if(booksData.formats.hasOwnProperty('text/html; charset=utf-8')){
                window.open(booksData.formats["text/html; charset=utf-8"]);                
            }
            else if(booksData.formats.hasOwnProperty('text/html; charset=utf-8')){
                window.open(booksData.formats["text/plain; charset=utf-8"]);
            }
            else{
                window.open(booksData.formats["application/zip"]);
            }
        };
        // Redirecting to dashboard if clicked back
        $scope.goToDashboard = () => { $state.go('dashboard'); };
    });