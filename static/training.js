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
            location.reload();
         }
        });
    });
});

function updateGoalData(_goalId, _dataId, _val) {
    $.ajax({
      type: "POST",
      url: "./training/data",
      data: {
          goalId: _goalId,
          dataId: _dataId,
          val: _val
      },
      success: function(data){
        console.log(data);
     }
    });
}
