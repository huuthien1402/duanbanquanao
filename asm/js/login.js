app.controller('loginController', function ($scope, $http, $rootScope, $location) {
    $scope.isError = false;
   
    $scope.login = function(){
        $http.get(`http://localhost:3000/users?email=${$scope.email}&password=${$scope.password}`).then(
            function(res){
                console.log(res);
                if(res.data.lenght==0){ //ko đăng nhập đc
                    $scope.isError=true;
                }else{
                    // console.log(res);
                $rootScope.user = res.data [0]
                localStorage.setItem('user', JSON.stringify($rootScope.user));
                $location.path('/')
                }
                
            },
            function(res){
                $scope.isError = true;
            }

            
        )
        
    }
    
})