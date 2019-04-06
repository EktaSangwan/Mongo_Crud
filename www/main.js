

$(document).ready(function(){
    const getTodos=()=>{
        fetch('/getTodos',{method:"get"}).then((response)=>{
            return response.json();    
        }).then((data)=>{
            console.log(data);
            displayTodos(data);
        });
    
    }
    getTodos();

    const postTodos=()=>{
        fetch('/postTodos',{method:"post"}).then((response)=>{
            return response.json();    
        }).then((data)=>{
            console.log(data);
            displayTodos(data);
        });
    
    }
    //postTodos();
 });


 



 function makeTable(container, data) {
    var table = $("<table/>").addClass('CSSTableGenerator');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) { 
            row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
        });
        table.append(row);
    });
    return container.append(table);
}

$(document).ready(function() {
    var data = [["S No.", "Item Code", "Item Name","Unit Price","Quantity","Price"], //headers
                ]
    var salesTable = makeTable($(document.body), data);
});
