/**
 * date: 2017-03-13 15:10:39
 * author: AllocatorXy
 * description: controller for comment module
 */

'use strict';

angular.module('comment', []).controller('cm-ctrl', ($scope, $http) => {
    // add comment
    $scope.add = function() {
        if (!$scope.content) {
            alert('留言不能为空');
            return;
        }
        $http.get(`/cmt?act=add&content=${$scope.content}`).then(r => {
            if (!r.data.err) {
                alert('留言发布成功');
                $scope.content = '';
                $scope.page = 1; // return to page 1
                $scope.getPage();
            } else {
                alert('留言失败! ' + r.msg);
            }
        }, r => {
            console.log('ajax failed: ' + r);
        });
    };
    // keydown event
    $scope.enter = function($event) {
        if ($event.keyCode == 13) {
            $event.preventDefault();
            $scope.add();
        }
    };
    // get page count
    $scope.getCount = function() {
        $http.get('/cmt?act=get_page_count').then(r => {
            if (!r.data.err) {
                $scope.pageCount = [];
                for (let i = 1; i < Math.ceil(r.data.data[0].count) + 1; i++) {
                    $scope.pageCount.push(i);
                }
            } else {
                console.log(r.msg);
            }
        }, r => {
            console.log('ajax failed: ' + r);
        });
    };
    // load page x
    $scope.getPage = function() {
        $http.get(`/cmt?act=get&page=${$scope.page}`).then(r => {
            if (!r.data.err && r.data.data.length > 0) {
                $scope.show = false;
                $scope.dataset = r.data.data;
                $scope.getCount();
            } else {
                r.msg && console.log(r.msg); // 若有msg说明数据有错
                $scope.show = true;
                $scope.getCount();
            }
        }, r => {
            console.log('ajax failed: ' + r);
        });
    };
    // page clk
    $scope.pageChange = function(i) {
        $scope.page = i;
        $scope.getPage();
    };
    // handle
    $scope.handle = function(id, act) {
        $http.get(`/cmt?act=${act}&id=${id}`).then(r => {
            if (!r.data.err) {
                $scope.getPage();
            } else {
                console.log(r.msg);
            }
        }, r => {
            console.log('ajax error: ' + r);
        });
    };
    // init
    $scope.page = 1;
    $scope.getPage();
});
