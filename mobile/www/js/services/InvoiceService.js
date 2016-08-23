angular.module('dankotuwa')

.factory('InvoiceService', function(store, APIService) {

  var profile = store.get('profile');
  var o = {};

  o.generateInvoice = function(items) {
    console.log (JSON.stringify(items[0]));
    var doc = "<h1>Dankotuwa Porcelain</h1><br>";
    doc += "Sales representative: " + profile.name + "<br>";
    doc += "Dealer name:" + "Sameera Vithanage" +"<br>";
    doc += "Date:" + getDateTime();
    doc += "<br><br><br>";
    doc += "<table border='1px'> <tr> <th>Product</th><th>Category</th><th>Quantity</th><tr>";
    doc += invoiceItems(items);
    return doc;
  };

  function invoiceItems(items) {
    var table = ''
    items.forEach(function(item) {
      table += "<tr><td>" + item.product.ProductName + "</td>";
      table += "<td>" + item.category.CategoryName + "</td>";
      table += "<td>" + item.quantity + "</td> </tr>";
    });
    return table;
  };

  function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
  };

  return o;
});
