app.controller("productController",function($scope, $http, $routeParams, $rootScope){ 
    console.log($routeParams.id);
    $scope.addProduct=function(){
        if($scope.myForm.$valid){
        console.log($scope.product);
        $http.post("http://localhost:3000/products",$scope.product)
        .then(res=>{
        $scope.loadDataproduct()
        })
        }
        }
        $scope.products = [];
        $scope.begin = 0;
        $scope.pageCount = 0;
        var originalProducts = [];
        $scope.selectedCategories = {};
        $scope.selectedPriceRanges = {};

        // if (localStorage.getItem('giohang')) {
        //     $rootScope.cart = JSON.parse(localStorage.getItem('giohang'));
            
        // }else{
        //     $rootScope.cart=[];
        // }
      

        // Hàm thêm sản phẩm vào giỏ hàng
    $scope.addToCart = function(product) {
        let inCart = false;

        // Đã có trong giỏ hàng: tăng số lượng
        for (let i = 0; i < $rootScope.cart.length; i++) {
            if ($rootScope.cart[i].id === product.id) {
                inCart = true;
                $rootScope.cart[i].soluong++;
                break; // Dừng vòng lặp khi tìm thấy sản phẩm trong giỏ hàng
            }
        }

        // Chưa có trong giỏ hàng: thêm vào giỏ hàng
        if (!inCart) {
            product.soluong = 1;
            $rootScope.cart.push(product);
        }

       
        localStorage.setItem('cart',JSON.stringify($rootScope.cart))
        alert("Thêm Sản Phẩm Vào Giỏ Hàng Thành Công");
    };
 
    $scope.loadDataproduct=function(){
        $http.get("http://localhost:3000/products")
        .then(res=>{
        $scope.products=res.data
        originalProducts = angular.copy($scope.products); // Sao chép mảng ban đầu
        $scope.pageCount = Math.ceil($scope.products.length / 4);
        console.log($scope.pageCount);
        })
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

    $scope.deleteProducts=function(id){
        $http.delete("http://localhost:3000/products/"+id)
        .then(res=>{
        $scope.loadDataproduct()
        })
        }

    $scope.editProducts=function(id){
        $http.get("http://localhost:3000/products/"+id)
        .then(res=>{
        $scope.editproduct=res.data
        })
        }

    $scope.updateProducts=function(){$http.put("http://localhost:3000/products/"+$scope.editproduct.id, $scope.editproduct)
    .then(res=>{
    $scope.loadDataproduct()
    })
    }

    $scope.searchproduct=function(event){
        $http.get("http://localhost:3000/products")
        .then(res=>{
        $scope.products=res.data.filter(product=>product.name.toLowerCase().includes($scope.txtSearch.toLowerCase())
        
        )
        })
        }

        $scope.loadTopSellingProducts = function() {
            $http.get("http://localhost:3000/products")
            .then(function(response) {
                // Sắp xếp danh sách sản phẩm theo trường daban giảm dần
                $scope.products = response.data.sort(function(a, b) {
                    return b.daban - a.daban;
                });
        
                // Chỉ lấy 4 sản phẩm đầu tiên
                $scope.topSellingProducts = $scope.products.slice(0, 4);
            })
            .catch(function(error) {
                console.error("Lỗi khi tải sản phẩm: ", error);
                // Xử lý lỗi nếu có
            });
        }
        
        $scope.loadTopSellingProducts();

        $scope.loadTopSaleProducts = function() {
            $http.get("http://localhost:3000/products")
            .then(function(response) {
                // Lọc ra các sản phẩm có sale khác 0
                var saleProducts = response.data.filter(function(product) {
                    return product.sale !== 0;
                });
        
                // Sắp xếp danh sách sản phẩm theo giá trị của trường sale giảm dần
                saleProducts.sort(function(a, b) {
                    return b.sale - a.sale;
                });
        
                // Chỉ lấy 4 sản phẩm đầu tiên sau khi đã sắp xếp
                $scope.topSaleProducts = saleProducts.slice(0, 4);
            })
            .catch(function(error) {
                console.error("Lỗi khi tải sản phẩm: ", error);
                // Xử lý lỗi nếu có
            });
        }
        
        $scope.loadTopSaleProducts();
    
        
  
// Hàm xử lý sự kiện khi checkbox danh mục được thay đổi
$scope.toggleCategory = function (category) {
    if ($scope.selectedCategories[category]) {
        delete $scope.selectedCategories[category];
    } else {
        $scope.selectedCategories[category] = true;
    }
    // Gọi hàm lọc sản phẩm khi checkbox được thay đổi
    $scope.filterProducts();
};

// Hàm xử lý sự kiện khi checkbox phạm vi giá được thay đổi
$scope.togglePriceRange = function (priceRange) {
    if ($scope.selectedPriceRanges[priceRange]) {
        delete $scope.selectedPriceRanges[priceRange];
    } else {
        $scope.selectedPriceRanges[priceRange] = true;
    }
    // Gọi hàm lọc sản phẩm khi checkbox được thay đổi
    $scope.filterProducts();
};

// Hàm lọc sản phẩm dựa trên các điều kiện được chọn từ các checkbox
$scope.filterProducts = function () {
    // Sao chép mảng ban đầu
    $scope.products = angular.copy(originalProducts);

    // Lọc sản phẩm theo các danh mục được chọn
    if (Object.keys($scope.selectedCategories).length > 0) {
        $scope.products = $scope.products.filter(function (product) {
            return Object.keys($scope.selectedCategories).some(function (category) {
                return product.MASP.startsWith(category);
            });
        });
    }

    // Lọc sản phẩm theo các phạm vi giá được chọn
    if (Object.keys($scope.selectedPriceRanges).length > 0) {
        $scope.products = $scope.products.filter(function (product) {
            return Object.keys($scope.selectedPriceRanges).some(function (priceRange) {
                var minPrice = parseInt(priceRange.split("-")[0]);
                var maxPrice = parseInt(priceRange.split("-")[1]);
                return product.price >= minPrice && product.price <= maxPrice;
            });
        });
    }
};

// Hàm reset các checkbox
$scope.resetFilters = function () {
    $scope.selectedCategories = {};
    $scope.selectedPriceRanges = {};
    $scope.filterProducts();
};
$scope.showAllProducts = function() {
    // Reset bản sao của mảng products ban đầu để hiển thị tất cả sản phẩm
    $scope.products = angular.copy(originalProducts);
};




    })