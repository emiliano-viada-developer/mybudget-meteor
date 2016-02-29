// onRendered
Template.layout.onRendered(function() {

    // Add special class for handel top navigation layout
    $('body').addClass('top-navigation');
});

// onDestroyed
Template.layout.onDestroyed(function() {

    // Remove special top navigation class
    $('body').removeClass('top-navigation');
});
