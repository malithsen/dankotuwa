angular.module('dankotuwa')

.factory('SearchHistory', function() {

  var o = {};

  o.get = function() {
    var history = JSON.parse(localStorage.getItem('history')) || [];
    return history;
***REMOVED***

  o.set = function(item) {
    var item = item.toLowerCase();

    var searchHistory = o.get();

    if(searchHistory.indexOf(item) === -1){
      searchHistory.unshift(item);
    } else{
      var searchHistory = _.filter(searchHistory, function(c){
        return c != item
      });
      searchHistory.unshift(item);
    }

    searchHistory = searchHistory.slice(0, 5);
    localStorage.setItem("history", JSON.stringify(searchHistory));
***REMOVED***

  return o;
});
