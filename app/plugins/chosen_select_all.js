export default {
  appendAllMatchedDomToChosen ($dom){
    var $div = $('<li class="select_all_matched">Select all search results</li>')
    var $select_result = $(".active-result")

    $div.on("click",function(){
        var $clone = $(".chosen-results").find(".active-result").clone()
        $clone.on("mouseup", function(e){
            $dom.data("chosen").search_results_mouseup(e)
        })
        $clone.each(function(){
            $(this).trigger("mouseup")
        })
        $dom.click()
        
    }).on("hover",function(){
        $div.toggleClass("highlighted")
    })
    if($select_result.length && $(".active-result:first").text() !== "All"){
        $(".chosen-results:visible").prepend($div)
        $(".chosen-results:visible").find(".highlighted").removeClass("highlighted");
        $(".chosen-results:visible").find(".select_all_matched").addClass("highlighted")
    }
  }  
}