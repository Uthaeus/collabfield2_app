$(document).on('turbolinks:load ajax:complete', function() {
  var iScrollPos = 0;
  var isLoading = false;
  var currentLoadingIcon;

  $(document).ajaxComplete(function() {
    isLoading = false;

    if (currentLoadingIcon !== undefined) {
      currentLoadingIcon.hide();
    }
  });

  $(".messages-list", this).scroll(function() {
    var iCurScrollPos = $(this).scrollTop();

    if (iCurScrollPos > iScrollPos) {

    } else {
      if (iCurScrollPos < 300 && isLoading == false && ('.load-more-messages', this).length) {
        $('.load-more-messages', this)[0].click();
        isLoading = true;

        currentLoadingIcon = $('.loading-more-messages', this);
        currentLoadingIcon.show();
      }
    }
    iScrollPos = iCurScrollPos;
  });
});