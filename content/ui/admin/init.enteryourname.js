/*
 * your_settings.js:
 *
 *
 Author
 cf AUTHORS.txt

 License
 Copyright (c) 2010-2012 Massachusetts Institute of Technology.
 MIT License (cf. MIT-LICENSE.txt or http://www.opensource.org/licenses/mit-license.php)
*/
/*global NB$:true NB:true $:true*/

define(function(require) {
  var Conf            = require('conf');
  var Dom             = require('dom');
  var Models          = require('models');
  var Pers            = require('pers');
  var Handlebars 	= require('handlebars');
  var concierge       = require('concierge');
  var $               = require('jquery');
  var ckey = window.location.href.split(document.location.pathname + "?ckey=")[1];
  var url = "/user_name_form?ckey=" + ckey;

  if (NB$) {
    var $ = NB$;
  }

  function cb(data, status){
    if(data.status.errno){
      $(".nb-widget-body").append("<h1>Error: " + data.status.msg + "</h1>");
      return;
    }
    var p = data.payload
    if(p.redirect){
      window.location.href = p.redirect;
      return;
    }
    $(".nb-widget-body").empty();
    $(".nb-widget-body").append(require("hbs!templates_dir/enteryourname")({"form": p.form}));
    setPageHandlers();
  };

  Pers.init = function () {
    $.get(url, cb, "json");
  };

  function setPageHandlers() {
    $("form").submit(function(e){
      e.preventDefault();
      data = {};
      data.firstname = $("#id_firstname").val();
      data.lastname = $("#id_lastname").val();
      $.post(url, data, cb, "json");
    });
  }

});
