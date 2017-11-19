export default {
  appendAllMatchedDomToSelect2 (){
    var $div = $('<li class="select_all_matched">Select all search results</li>')
    var $select_result = $(".select2-result-selectable:visible").find("li")
    $div.on("click",function(){
        $(".select2-result-selectable:visible").find("li").trigger("mouseup")
    }).on("hover",function(){
        $div.toggleClass("select2-highlighted")
    })
    if($select_result.length){
        $(".select2-results:visible").prepend($div)
        $(".select2-results:visible").find(".select2-highlighted").removeClass("select2-highlighted");
        $(".select2-results:visible").find(".select_all_matched").addClass("select2-highlighted")
    }
  }  
}