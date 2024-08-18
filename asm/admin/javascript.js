var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "thongke.html",
            controller: "homeController"
        })
        .when("/product", {
            templateUrl: "sanpham.html",
           
        })
        .when("/addproduct", {
            templateUrl: "Themsanpham.html",
            controller: "productController"
            
        })
        .when("/account", {
            templateUrl: "account.html",
            controller: "userController"
            
        })
        .when("/accountADD", {
            templateUrl: "accountADD.html",
            controller: "userController"
            
        })
      
        .when("/param/:id", {
            templateUrl: "detail2.html",
            controller: "paramController"
        })
        .otherwise({
            template: "<h1>404</h1><p>Không tìm thấy trang</p>"
        });
    ;
});

app.controller("userController",function($scope, $http){

    $scope.addUser=function(){
    if($scope.myForm.$valid){
    console.log($scope.user);
    $http.post("http://localhost:3000/users",$scope.user)
    .then(res=>{
    $scope.loadData()
    })
    }
    }
    $scope.users=[]
    $scope.loadData=function(){
    $http.get("http://localhost:3000/users")
    .then(res=>{
    $scope.users=res.data
    })
    }
    $scope.loadData()
    $scope.deleteUser=function(id){
    $http.delete("http://localhost:3000/users/"+id)
    .then(res=>{
    $scope.loadData()
    })
    }
    $scope.editUser=function(id){
    $http.get("http://localhost:3000/users/"+id)
    .then(res=>{
    $scope.edituser=res.data
    })
    }
    $scope.updateUser=function(){$http.put("http://localhost:3000/users/"+$scope.edituser.id, $scope.edituser)
    .then(res=>{
    $scope.loadData()
    })
    }
    $scope.search=function(event){
    $http.get("http://localhost:3000/users")
    .then(res=>{
    $scope.users=res.data.filter(user=>
    user.name.toLowerCase().includes($scope.txtSearch.toLowerCase())
    || user.email.toLowerCase().includes($scope.txtSearch.toLowerCase())
    )
    })
    } 
    })

    app.controller("productController",function($scope, $http){ 
        

        $scope.addProduct=function(){
            if($scope.myForm.$valid){
            console.log($scope.product);
            $scope.product.daban = 0; // Giá trị mặc định cho daban
            $scope.product.view = 0; // Giá trị mặc định cho view
            $http.post("http://localhost:3000/products",$scope.product)
            .then(res=>{
                alert("Thêm Sản Phẩm Thành Công");
                    $scope.loadDataproduct();
            })
            }
            }

            $scope.products = [];
            $scope.begin = 0;
            $scope.pageCount = 0;
            

        $scope.loadDataproduct=function(){
            $http.get("http://localhost:3000/products")
            .then(res=>{
            $scope.products=res.data
            $scope.pageCount = Math.ceil($scope.products.length / 4);
            console.log($scope.pageCount);
            // Tìm ID lớn nhất trong danh sách sản phẩm
            var maxId = Math.max.apply(Math, $scope.products.map(function(product) {
                return product.id;
            }));
            // Tính toán ID kế tiếp
            $scope.nextId = maxId + 1;
           
            })
           
            }
          

            $scope.updateStatus = function() {
               
                if ($scope.product.quantity === 0) {
                    $scope.product.trangthai = "Hết Hàng";
                } else {
                    $scope.product.trangthai = "Còn Hàng";
                }
            };
            
            $scope.prop = "name";
            $scope.sortBy = function(prop) {
                $scope.prop = prop;
            }

            $scope.first = function () {
                $scope.begin = 0;
            };

            $scope.prev = function () {
                if ($scope.begin > 0) {
                    $scope.begin -= 4;
                }
            };

            $scope.next = function () {
                if ($scope.begin < ($scope.pageCount - 1) * 4) {
                    $scope.begin += 4;
                }
            };

            $scope.last = function () {
                $scope.begin = ($scope.pageCount - 1) * 4;
            };
        $scope.loadDataproduct()  

        
        $scope.getPageNumbers = function() {
            var pages = [];
            for (var i = 1; i <= $scope.pageCount; i++) {
                pages.push(i);
            }
            return pages;
        };
        
        $scope.goToPage = function(pageNum) {
            $scope.begin = (pageNum - 1) * 4;
        };
        
        $scope.deleteProducts=function(id){
            var confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
            if (confirmDelete) {
                // Nếu người dùng chấp nhận xóa, gửi request DELETE đến API
                $http.delete("http://localhost:3000/products/" + id)
                    .then(function(response) {
                        // Hiển thị thông báo xóa thành công
                        alert("Xóa Sản Phẩm Thành Công");
                        // Load lại dữ liệu sản phẩm sau khi xóa thành công
                        $scope.loadDataproduct();
                    })
                    .catch(function(error) {
                        // Xử lý lỗi nếu có
                        console.error("Lỗi khi xóa sản phẩm: ", error);
                        alert("Có lỗi xảy ra khi xóa sản phẩm!");
                    });
            }
            };

        $scope.editProducts=function(id){
            $http.get("http://localhost:3000/products/"+id)
            .then(res=>{
            $scope.editproduct=res.data
            })
            }

        $scope.updateProducts=function(){
            if ($scope.editproduct.quantity === 0) {
                $scope.editproduct.trangthai = "Hết Hàng";
            } else {
                $scope.editproduct.trangthai = "Còn Hàng";
            }
            $http.put("http://localhost:3000/products/"+$scope.editproduct.id, $scope.editproduct)
        .then(res=>{
            alert("Bạn Cập Nhật Sản Phẩm Hả?");
        $scope.loadDataproduct();
      
        })
        }

        $scope.searchproduct=function(event){
            $http.get("http://localhost:3000/products")
            .then(res=>{
            $scope.products=res.data.filter(product=>product.name.toLowerCase().includes($scope.txtSearch.toLowerCase())
            
            )
            })
            }

     

        })
    