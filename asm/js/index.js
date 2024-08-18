

var app = angular.module("myApp", ["ngRoute"]);
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
                // controller: "homeController"
            })
            .when("/product", {
                templateUrl: "sanpham.html",
                controller: "productController"
            })
            .when("/cart", {
                templateUrl: "giohang.html",
                controller: "cartController"
            })
            .when("/dangky", {
                templateUrl: "dangky.html",
                controller: "resgiterController"
                
            })
            .when("/login", {
                templateUrl: "login.html",
                controller: "loginController"
                
            })
          
            .when("/param/:id", {
                templateUrl: "detail2.html",
                controller: "detailController"
            })
            .otherwise({
                template: "<h1>404</h1><p>Không tìm thấy trang</p>"
            });
        ;
    });
    
    
   
    

       
       
    