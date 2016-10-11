$.ajax({
    url: "Downloads/a01.csv",
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
        console.log(data);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
    
  
});