$(function() {
    $('#add-new-goal').click(function() {
        $.ajax({
          type: "POST",
          url: "./training",
          data: {
              name: $('#goal-name').val(),
              days: $('#days-sel').val()
          },
          success: function(data){
            console.log(data);
         }
        });
    });
});
