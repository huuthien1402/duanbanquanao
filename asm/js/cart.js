app.controller("cartController",function($scope, $rootScope){

    $scope.tinhtong = function() {
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            total += $scope.cart[i].price * $scope.cart[i].soluong;
        }
        return total;
    };
    $scope.saveCart=function () {
        localStorage.setItem('cart',JSON.stringify($rootScope.cart));
    }
    $scope.delete=function (index) {
        $rootScope.cart.splice(index, 1);
        $scope.saveCart();
    }
    $scope.deleteAll=function () {
        $rootScope.cart=[];
        $scope.saveCart();
    }

   
 });