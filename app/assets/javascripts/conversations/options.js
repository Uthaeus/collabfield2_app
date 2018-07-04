$(document).on('turbolinks:load', function() {
  $('body').on('click', '.add-people-to-chat', function(e) {
    $(this).next().toggle(100, 'swing');
  });
});