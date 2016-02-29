// onRendered
Template.blankLayout.onRendered(function(){

    // Add gray color for background in blank layout
    $('body').addClass('gray-bg');
});

// onDestroyed
Template.blankLayout.onDestroyed(function(){

    // Remove special color for blank layout
    $('body').removeClass('gray-bg');
});
