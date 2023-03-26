
function postBox(){
    const dirName = $("#dirName").val();
    if(dirName){
        $.ajax({
            type: "POST",
            url: "/dir?dirName=" + dirName, 
            success: (data) => {
                if(data.stat != 'success'){
                    alert(data.msg)
                    return;
                }
                location.reload();
            },
        });
        
    }
}

function deleteCall(type, name){
    if(dirName){
        $.ajax({
            type: "DELETE",
            url: "/" + type + "?path=" + name, 
            success: (data) => {
                if(data.stat != 'success'){
                    alert(data.msg)
                    return;
                }
                location.reload();
            },
        });
        
    }
}

function dragFile(ev){
  ev.preventDefault();
}

function addFile(ev){
    ev.preventDefault();

    var file = null;
    if (ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") file = item.getAsFile();
        });
    }

    //if(file != null){
        $.ajax({
            type: "POST",
            url: "/file",
            data: {file:"test", oi: "test2"/* JSON.stringify(file)*/},
            success: (data) => {
                if(data.stat != 'success'){
                    alert(data.msg)
                    return;
                }
                location.reload();
            },
        });
    //}
}

function showAddBox(){
    $("#textbox").show();
    $("#addBoxBtn").hide();
}

function hideAddBox(){
    $("#textbox").hide();
    $("#addBoxBtn").show();
    $("#dirName").val('');
}

function showRemoveBtns(){
    if($(".removeBtns").is(':visible')){
        $(".removeBtns").hide();
    } else {
        $(".removeBtns").show();
    }
}