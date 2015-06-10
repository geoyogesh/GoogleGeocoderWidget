define(['dojo/_base/declare',
        'dijit/_AttachMixin',
    'dijit/_WidgetsInTemplateMixin',
        'jimu/BaseWidget',
        'dojo/request',
       'dojo/text!./_templates/google-result.html',
       'dojo/parser',
       'dojo/dom-construct','dojox/dtl/_base', 'dojox/dtl/Context'
       ],
    function (declare, _AttachMixin, _WidgetsInTemplateMixin, BaseWidget, request, template,parser,domConst,dtl, context) {
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget, _WidgetsInTemplateMixin], {

            // Custom widget code goes here

            baseClass: 'google-geocoder-widget',
            // this property is set by the framework when widget is loaded.
            // name: 'GoogleGeocoderWidget',
            _apiUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
            _apiKey: 'AIzaSyC33aCsvTd4vAHA2f2gigNoEkd0IsbUhzc',
            _templateString: template,
            //methods to communication with app container:
            postCreate: function () {
                this.inherited(arguments);
                console.log('GoogleGeocoderWidget::postCreate');
            },

            startup: function () {
                this.inherited(arguments);
                console.log('GoogleGeocoderWidget::startup');
            },

            onOpen: function () {
                console.log('GoogleGeocoderWidget::onOpen');
            },

            onClose: function () {
                console.log('GoogleGeocoderWidget::onClose');
            },

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
            findAddress: function () {
                    var address = this.txtaddress.get('value');

                    var geocodeResultDiv = this.geocodeResultDiv;
                    var templateObj = new dtl.Template (this._templateString);



                    var requestURL = this._apiUrl + "?address=" + address + "&key=" + this._apiKey;
                    request(requestURL, {
                        headers: {
                            "X-Requested-With": null
                        },
                        handleAs: "json"
                    }).then(function (data) {
                        console.log(data);

                        geocodeResultDiv.innerHTML = ''; //removes the existing content
                        var contextObj  = new context({ result: data });
                        var compiledTemplate = templateObj.render(contextObj);
                        var node = domConst.toDom(compiledTemplate);

                        domConst.place(node, geocodeResultDiv);
                        parser.parse(geocodeResultDiv);
                    }, function (err) {
                        console.log(err.message);
                    });
                }
                //methods to communication between widgets:

        });

    });
