app.controller("detailController", function ($scope, $http, $routeParams) {
    console.log($routeParams.id);
    $scope.detailsp = {};
    $scope.topSaleProducts = [];

    // Gọi $http.get để lấy dữ liệu sản phẩm chi tiết
    $http.get("http://localhost:3000/products/" + $routeParams.id)
        .then(
            function (res) {
                $scope.detailsp = res.data;
                // Gán giá trị cho mainImageUrl sau khi dữ liệu đã được tải thành công
                $scope.mainImageUrl = $scope.detailsp.image;
                // Lấy mã sản phẩm của sản phẩm chi tiết
                var productId = res.data.MASP;

                // Gọi $http.get để lấy tất cả dữ liệu sản phẩm từ cơ sở dữ liệu
                $http.get("http://localhost:3000/products")
                    .then(function (res) {
                        // Lọc ra những sản phẩm có cùng mã sản phẩm với sản phẩm chi tiết
                        $scope.topSaleProducts = res.data.filter(function (product) {
                            var productIdPrefix = productId.substring(0, 3); // Lấy 3 ký tự đầu của mã sản phẩm chi tiết
                            var productPrefix = product.MASP.substring(0, 3); // Lấy 3 ký tự đầu của mã sản phẩm trong danh sách sản phẩm

                            var productIdSuffix = productId.substring(3); // Lấy 3 ký tự cuối của mã sản phẩm chi tiết
                            var productSuffix = product.MASP.substring(3); // Lấy 3 ký tự cuối của mã sản phẩm trong danh sách sản phẩm

                            // So sánh 3 ký tự đầu và 3 ký tự cuối của mã sản phẩm
                            return productIdPrefix === productPrefix && productIdSuffix !== productSuffix;
                        }).slice(0, 4); // Chỉ lấy 4 sản phẩm đầu tiên sau khi lọc
                    },
                        function (res) {
                            alert('Có lỗi khi lấy dữ liệu sản phẩm');
                        }
                    );
            },
            function (res) {
                alert('Có lỗi khi lấy dữ liệu sản phẩm chi tiết');
            }
        );

    // Hàm thay đổi hình ảnh chính
    $scope.changeMainImage = function (imageUrl) {
        $scope.mainImageUrl = imageUrl;
    };
});
