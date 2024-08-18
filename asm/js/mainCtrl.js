app.controller('mainCtrl', function ($scope, $rootScope) {

    if (localStorage.getItem('cart')) {
        $rootScope.cart=JSON.parse(localStorage.getItem('cart'));
        
    }else{
        $rootScope.cart=[];
    }

    $rootScope.countCartItems = function() {
        let totalItems = 0;
        for (let i = 0; i < $scope.cart.length; i++) {
            totalItems += $scope.cart[i].soluong;
        }
        return totalItems;
    };

    if (localStorage.getItem('user')) {
        $rootScope.user = JSON.parse(localStorage.getItem('user'));

    }
    $scope.logout = function(){
        localStorage.removeItem('user');
        delete $rootScope.user;
        
    }


});