ManagerApp.factory('SongFactory', function($rootScope) {

    return {
        getSongsList : function(callback) {
            try {
                cordova.exec(function(data) {
                    console.log(data);
                    $rootScope.$apply(function() {
                        callback(data);
                    });
                }, function() {
                    alert('Error in finding songs');
                }, "SongsPlugin", "getSongs", [""]);

            } catch (e) {
                callback(list);
            }
        },
        getAlbumList : function(list){
            var res = {};
            list.map(function(obj){
                if(!res[obj.album])
                    res[obj.album] = {name:obj.album,list:[]};
                res[obj.album].list.push(obj);
            });
            return res;
        }
    }
});

ManagerApp.factory('deviceReady', function(){
          return function(done) {
            if (typeof window.cordova === 'object') {
              document.addEventListener('deviceready', function () {
                done();
              }, false);
            } else {
              done();
            }
          };
        });