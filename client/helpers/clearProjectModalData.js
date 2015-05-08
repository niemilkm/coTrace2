
clearProjectModal = function()
{
  Template.instance().advancedTab.set(false);
  $('#projectName').val('');
  $('#clientName').val('');
  $('#categoryName').val('');
  $('#startDatePicker').val('');
  $('#endDatePicker').val('');
  $('#tag').val('');
  set.clear();
  title = "";
  var html = '<span title="' + title + '">' + title + '</span>';
  $('dl dd ul input[type="checkbox"]').prop('checked', '');
  $('.multiSel').html(html);
}
