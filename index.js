
//https://stackoverflow.com/questions/32344482/how-to-access-data-from-a-tsv-file-with-multiple-lines
$(document).ready(function () {
  $.ajax({
    url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRrszziFs1rK536Of3FBhk_t_2CGDJ7RB8HUVpjSjOsZWsFMIcKjmZ8u9BRbjvt-6Rtshqb2MncMGUz/pub?gid=1861770708&single=true&output=tsv",
    type: "GET",
    dataType: "text",
    mimeType: "text/plain",
    success: function (data) {
      var lines = data.split("\n");
       console.log(lines.length)
                  var obj_key={}
        for (var i=0;i<lines.length;i++){
          var o = lines[i].split("\t");
          if (i==0){
            // create a key to access the columns by name
            for (var p=0;p<o.length;p++){
              // before storing the name, truncate if comma of bracket
              var short_name=o[p]
              short_name=truncate(short_name,",")
              short_name=truncate(short_name," (")
              
              obj_key[short_name]=p
            }
          }else{
            // show each lines with a heading column
             show_table(o,obj_key)
          }
         
        }
      
    }
  });
});
function truncate(txt,char){
  if(txt.indexOf(char)>0){
    txt=txt.substring(0,txt.indexOf(char))
  }
  return txt
}
///
function show_table(obj,key) {
    console.log(key)
   for (var k in key){
    //make sure the entry is more than spaces
     if(obj[key[k]].replace(/\s/g, '')!=""){
         if(k.indexOf("Name")==0){
            // first line
             $("#table_view").append( "<h3>"+obj[key[k]]+"</h3>")
         }else{
            $("#table_view").append("<label>"+k+":</label> ")
             // Add a line break for longer text
             if(obj[key[k]].length>200){
                $("#table_view").append("<br/>")
             }

            $("#table_view").append( "<span>"+obj[key[k]]+"</span><br/>")
        }
     }
     
   }
  $("#table_view").append("<br/>")
}
