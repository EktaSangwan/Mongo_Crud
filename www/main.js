/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>


$(document).ready(()=>{
    //const list=$
    const getTodos=()=>{
        fetch('/getTodos',{method:"get"}).then((response)=>{
            return response.json();    
        }).then((data)=>{
            console.log(data);
            displayTodos(data);
        });
    
    }
    getTodos();
})






const displayTodos=(data)=>{
    data.forEach((todo)=>{
        let ids=buildIDS(todo);
        display.append(buildTemplate(todo,ids));
    });
} */

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
