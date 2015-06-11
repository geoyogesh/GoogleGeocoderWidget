define(['dojo/_base/declare',
        'dijit/_AttachMixin',
    'dijit/_WidgetsInTemplateMixin',
        'jimu/BaseWidget',
        'dojo/request',
       'dojo/text!./_templates/google-result.html',
       'dojo/parser', 'esri/geometry/Point', 'esri/SpatialReference', "dgrid/OnDemandGrid",
      "dgrid/Selection", "dojo/number", "dojo/_base/array", "dojo/store/Memory","dojo/dom-style",
       'dojo/dom-construct', 'dojox/dtl/_base', 'dojox/dtl/Context'

       ],
    function (declare, _AttachMixin, _WidgetsInTemplateMixin, BaseWidget, request, template, parser, Point, SpatialReference, Grid,
        Selection, dojoNum, array, Memory,domStyle,
        domConst, dtl, context) {
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget, _WidgetsInTemplateMixin], {

            // Custom widget code goes here

            baseClass: 'google-geocoder-widget',
            // this property is set by the framework when widget is loaded.
            // name: 'GoogleGeocoderWidget',
            _templateString: template,
            //methods to communication with app container:
            postCreate: function () {
                this.inherited(arguments);
                console.log('GoogleGeocoderWidget::postCreate');
                this.grid = new(declare([Grid, Selection]))({
                    // use Infinity so that all data is available in the grid
                    bufferRows: Infinity,
                    columns: {
                        "select": "Select",
                        "type": {
                            "label": "Type"
                        },
                        "address": {
                            "label": "Address"
                        }
                    }
                }, this.cusgrid);
                this.grid.on(".field-select:click", this.selectState);
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
            zoomTo: function (x, y) {
                console.log(x + ',' + y);
                var point = new Point([x, y], new SpatialReference({
                    wkid: 4326
                }));
                this.map.centerAndZoom(point, 12);
            },
            findAddress: function () {
                    var that = this;
                    var address = this.txtaddress.get('value');

                    var geocodeResultDiv = this.geocodeResultDiv;
                    var templateObj = new dtl.Template(this._templateString);



                    var requestURL = this.config.apiUrl + "?address=" + address + "&key=" + this.config.apiKey;
                    request(requestURL, {
                        headers: {
                            "X-Requested-With": null
                        },
                        handleAs: "json"
                    }).then(function (data) {
                        console.log(that);
                        console.log(data);

                        var ndata = array.map(data.results, function (feature) {
                            return {
                                "select": 'select',
                                "type": feature.geometry.location_type,
                                "address": feature.formatted_address
                            };
                        });
                        var memStore = new Memory({
                            data: ndata
                        });
                        console.log(ndata);
                        that.grid.set("store", memStore);
                        that.grid.startup();
                        //parser.parse(that.grid);
                        //that.grid.renderArray(ndata);
                        /*
                        var resultdata = new Object();
                        resultdata.address = data.results[0].formatted_address;
                        resultdata.lon = data.results[0].geometry.location.lng;
                        resultdata.lat = data.results[0].geometry.location.lat;
                        resultdata.type = data.results[0].geometry.location_type;
                        that.zoomTo(resultdata.lon, resultdata.lat);
                        geocodeResultDiv.innerHTML = ''; //removes the existing content
                        var contextObj = new context({
                            result: resultdata,
                            zoomTo: function (x, y) {
                                console.log(x + ',' + y);
                            }
                        });
                        var compiledTemplate = templateObj.render(contextObj);
                        var node = domConst.toDom(compiledTemplate);

                        domConst.place(node, geocodeResultDiv);
                        parser.parse(geocodeResultDiv);
                        */
                    }, function (err) {
                        console.log(err.message);
                    });
                },
            selectState:function(e){
                console.log(e);
            }
                //methods to communication between widgets:

        });

    });
