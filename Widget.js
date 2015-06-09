define(['dojo/_base/declare', 'jimu/BaseWidget'],
function(declare, BaseWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'google-geocoder-widget',
    // this property is set by the framework when widget is loaded.
    // name: 'GoogleGeocoderWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('GoogleGeocoderWidget::postCreate');
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('GoogleGeocoderWidget::startup');
    // },

    // onOpen: function(){
    //   console.log('GoogleGeocoderWidget::onOpen');
    // },

    // onClose: function(){
    //   console.log('GoogleGeocoderWidget::onClose');
    // },

    // onMinimize: function(){
    //   console.log('GoogleGeocoderWidget::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('GoogleGeocoderWidget::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('GoogleGeocoderWidget::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('GoogleGeocoderWidget::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('GoogleGeocoderWidget::onPositionChange');
    // },

    // resize: function(){
    //   console.log('GoogleGeocoderWidget::resize');
    // }

//methods to communication between widgets:

  });

});
