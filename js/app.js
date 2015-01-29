//document.addEventListener("deviceready", onDeviceReady, false);
//
//function onDeviceReady() {
//    console.log('device ready fired');
//    angular.bootstrap(document, ['ManagerApp']);
//}

$(function(){
    angular.bootstrap(document, ['ManagerApp']);
});

var ManagerApp = angular.module('ManagerApp', []);

ManagerApp.controller('appController', function($scope, SongFactory) {
    
    $scope.tabList = [{
        "tabname" : "Playlist"
    },{
        "tabname" : "Artist"
    },{
        "tabname" : "Album"
    },{
        "tabname" : "Tracks"
    }];
    $scope.selectTab = function(index){
        $scope.tabList.map(function(k){k.isSelected = false});
        $scope.tabList[index].isSelected = true;
    };
    $scope.getSongs = function() {
        SongFactory.getSongsList($scope.writeSongs);
    };
    $scope.writeSongs = function(data) {
        $scope.songsList = typeof data == "object" ? data : JSON.parse(data);
        if(!$scope.$$phase)
            $scope.$apply();
    };    
    $scope.getSongs();
    $scope.selectTab(2);
});

ManagerApp.controller('playlistController', function($scope, SongFactory) {
    
});

ManagerApp.controller('artistController', function($scope, SongFactory) {
    
});

ManagerApp.controller('albumController', function($scope, SongFactory) {
    $scope.albumList = SongFactory.getAlbumList($scope.$parent.songsList);
});

ManagerApp.controller('mp3Controller', function($scope, SongFactory) {
    
    $scope.songsList = $scope.$parent.songsList;
    $scope.toggleSelectAll = function () {
        $scope.selectAll = !$scope.selectAll;
        if($scope.selectAll)
            $scope.changeObj($scope.filteredList,"isChecked",true);  
        else
            $scope.changeObj($scope.filteredList,"isChecked",false);  
    };
    $scope.changeObj = function(elm,key,val) {
        elm.map(function(obj) {
              obj[key] = val;  
            });
    };
    $scope.checkObj = function(elm,key,val) {
        if(elm && elm.length > 0)
        var res = elm.every(function(obj){
                return obj[key] == val;
            });
         return res;
    };
    $scope.updateSelectAll = function(){
        if($scope.checkObj($scope.filteredList,"isChecked",true))
            $scope.selectAll = true;
        else
            $scope.selectAll = false;
    };
});