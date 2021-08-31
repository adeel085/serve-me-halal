$(document).ready(function() {

    $(document).on("click", ".auto-complete-list>li", function() {
        let value = $(this).attr("data-value");
        $(this).closest(".auto-complete-input-wrapper").find("input:first-child").val(value);
        $(this).parent().css("display", "none");
    });

    $(document).mouseup(function(e) {
        let container = $(".auto-complete-list");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            container.hide();
        }
    });

    $(document).on("click", ".auto-complete-input-wrapper>input", function() {
        console.log("here");
        if ($(this).parent().find(">.auto-complete-list").children().length) {
            $(this).parent().find(">.auto-complete-list").show();
        }
    });
});