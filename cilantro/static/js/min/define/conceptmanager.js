define(["cilantro/define/view"],function(a){var b={};$(function(){var c=$("#plugin-panel"),d=$("#plugin-title"),e=$("#plugin-tabs"),f=$("#plugin-dynamic-content"),g=$("#plugin-static-content");(function(){function N(a,b,e,f){c.fadeIn();parseInt(a.id)!==j&&(b&&(a.query=b),j!==null&&(d[j]["static"]=g.children().detach()),d[a.id]&&d[a.id].globalsLoaded?K(a):J(a,K))}function M(a){d[a.id]===undefined?d[a.id]=a:($.extend(d[a.id],a),a=d[a.id]),a.ds||(a.query?a.ds=z(a.query):a.ds={}),a.invalid_fields||(a.invalid_fields={});return a}function L(a,b){var c=e.children().index(b);e.trigger("ShowViewEvent",c)}function K(a){a=M(a),j=parseInt(a.id),a.globalsLoaded=!0,a.views.length<2?e.hide():e.show();var b=$.jqote(h,a.views);e.html(b),a["static"]?(g.append(a["static"]),l=g.find("#add_to_query")):(g.append(i),l=g.find("#add_to_query"),l.click(function(){var a=$.Event("UpdateQueryButtonClicked");$(this).trigger(a);return!1})),$.inArray(j,m)<0?(l.html('<span class="icon plus"/> <span>Add Condition</span>'),$(".success",g).hide()):(l.html('<span class="icon refresh"/> <span>Update Condition</span>'),$(".success",g).show()),e.children(":first").click()}function J(b,c){c=c||function(){},b.css&&a.loadCss(b.css),b.js?require([b.js],function(a){c(b)}):c(b)}function I(a){a.reason=a.reason?"_"+a.reason:"";var b=d[j].invalid_fields,c=$(a.target).attr("name");$.each(d[j].views,function(b,d){d.contents&&d.contents.dom().find("[name="+c+"]").removeClass("invalid"+a.reason),d.contents&&d.contents.dom().find("[name="+c+"]").children().removeClass("invalid"+a.reason)});var e=b[c+a.reason].data("ref_count")-1;e===0?b[c+a.reason].remove():b[c+a.reason].data("ref_count",e),delete d[j].invalid_fields[c+a.reason],$.isEmptyObject(d[j].invalid_fields)&&g.find("#add_to_query").attr("disabled","")}function H(a){a.reason=a.reason?"_"+a.reason:"";var b=d[j].invalid_fields,c=$(a.target).attr("name");$.each(d[j].views,function(b,d){d.contents&&d.contents.dom().find("[name="+c+"]").addClass("invalid"+a.reason),d.contents&&d.contents.dom().find("[name="+c+"]").children().addClass("invalid"+a.reason)});var e=a.message?a.message:"This query contains invalid input, please correct any invalid fields.",f=!1;$.each(g.find(".error"),function(d,g){g=$(g);var h=g.data("ref_count");if(g.text()===e){f=!0;if(a.ephemeral)return;if(b[c+a.reason]===undefined)b[c+a.reason]=g,g.data("ref_count",h+1);else if(g.text()!==b[c+a.reason].text()){var i=b[c+a.reason].data("ref_count");b[c+a.reason].data("ref_count",i-1),b[c+a.reason].data("ref_count")===0&&b[c+a.reason].remove(),b[c+a.reason]=g,g.data("ref_count",h+1)}}});if(!f){var h=$('<div class="message error">'+e+"</div>");h.data("ref_count",1),a.ephemeral||(b[c+a.reason]=h),g.prepend(h),a.ephemeral?h.fadeOut(3e3,function(){h.remove()}):g.find("#add_to_query").attr("disabled","true")}}function G(a){$(k.contents).triggerHandler("UpdateQueryButtonClicked")}function F(a,b){b=b||d[j].ds;if(!E(b)){var c=$.Event("InvalidInputEvent");c.ephemeral=!0,c.message="No value has been specified.",$(a.target).trigger(c);return!1}var e=y(b);$(a.target).trigger("UpdateQueryEvent",[e]);return!0}function E(a){var b=!1;if($.isEmptyObject(a))b=!0;else{b=!0;for(var c in a){if(!a.hasOwnProperty(c))continue;if(p.test(c)){if(a[c]&&a[c].indexOf("isnull")>=0){b=!1;break}}else if(q.test(c)||o.test(c)||n.test(c)){b=!1;break}}}if(b)return!1;for(var c in a){if(!a.hasOwnProperty(c))continue;if(a[c]===undefined||a[c]==="")return!1;if($.isArray(a[c])&&a[c].length===0)return!1}return!0}function D(a,b){var c=d[j].ds,e=!1;if(b.value instanceof Array||c[b.name]!==b.value){if(b.value instanceof Array&&c[b.name]instanceof Array){for(var f=0;f<b.value.length;f++)if($.inArray(b.value[f],c[b.name])==-1){e=!0;break}if(e===!1&&b.value.length==c[b.name].length)return}b.value===undefined?delete d[j].ds[b.name]:d[j].ds[b.name]=b.value instanceof Array?b.value.slice(0):b.value,$.each(d[j].views,function(a,c){k!==c&&c.contents&&c.contents.trigger("UpdateElementEvent",[b])})}}function C(a,b){}function B(b,e){k!==null&&(k.contents.dom().css("display","none"),$(k.contents).trigger("LostFocusEvent"),k.contents.dom().detach()),k=d[j].views[e];if(k.loaded)A(null,k.contents);else{var f=null;k.concept_id=j,c.fadeIn().trigger("ViewReadyEvent",[new a(k,d[j].name)])}}function A(a,b){k.contents=b;var c=k.contents.dom();f.append(c),c.css("display","block"),$(".chart",k.contents).css("display","block"),k.loaded||($(b).trigger("UpdateDSEvent",[d[j].ds]),$(b).trigger("RegisterElementsEvent")),$(b).trigger("GainedFocusEvent"),k.loaded=!0}function z(a,b){var c=b||{},d,e;if(a.hasOwnProperty("type"))$.each(a.children,function(a,b){z(b,c)});else{a.hasOwnProperty("id_choices")?(e=a.id_choices.join("OR"),c[e]=a.id):e=a.id,d=a.concept_id+"_"+e;if(!a.operator.match(/null/))if(a.datatype in{number:1,date:1}){var f=a.value instanceof Array?a.value:[a.value];for(var g=0;g<f.length;g++)c[d+"_input"+g]=f[g]}else c.hasOwnProperty(d)?c[d]instanceof Array?c[d].push(a.value):(c[d]=[c[d]],c[d].push(a.value)):c[d]=a.value;c[d+"_operator"]=c[d]instanceof Array&&a.datatype&&a.datatype.indexOf("boolean")>=0?t[a.operator]:a.operator}return c}function y(a){var b={};for(var c in a){if(!a.hasOwnProperty(c))continue;var d=o.exec(c);if(d){b.hasOwnProperty(d[2])?$.extend(b[d[2]],{val0:a[c],val1:undefined,op:undefined}):b[d[2]]={val0:a[c],val1:undefined,op:undefined};continue}d=n.exec(c);if(d){b.hasOwnProperty(d[2])?b[d[2]]["val"+d[3]]=Number(a[c])||a[c]:(b[d[2]]={val0:undefined,val1:undefined,op:undefined},b[d[2]]["val"+d[3]]=Number(a[c])||a[c]);continue}d=q.exec(c),d&&(b.hasOwnProperty(d[0])?b[d[0]].pk=a[c]:b[d[0]]={val0:undefined,val1:undefined,op:undefined,pk:a[c]})}for(c in a){if(!a.hasOwnProperty(c))continue;d=p.exec(c),d&&(b[d[2]]||a[c].match(/null/))&&(b.hasOwnProperty(d[2])||(b[d[2]]={val0:undefined,val1:undefined,op:undefined}),b[d[2]].op=a[c])}var e=[];for(var f in b){var g=b[f],h=!1,i=null;q.exec(f)&&(i=f.split("OR"),f=g.pk,h=!0),f=Number(f);if(g.val0===undefined&&g.val1===undefined&&g.op!==undefined)e.push({operator:g.op,id:f,concept_id:j,value:!0,datatype:x(f)});else if(g.val0!==undefined&&g.val1!==undefined&&g.op!==undefined)e.push({operator:g.op,id:f,value:[g.val0,g.val1],concept_id:j,datatype:x(f)});else if(g.val0===undefined||g.op===undefined||g.val0 instanceof Array)if(g.val0!==undefined&&g.val0 instanceof Array){g.op=g.op!==undefined?g.op:"in";var l=x(f);switch(l){case"boolean":case"nullboolean":var m=[],t=s[g.op];$.each(g.val0,function(a,b){m.push({operator:t,id:f,value:u[b]!==undefined?u[b]:b,concept_id:j,datatype:l})}),m.length>1?e.push({type:r.test(g.op)?"and":"or",children:m,concept_id:j}):e.push(m[0]);break;default:e.push({operator:g.op,id:f,value:g.val0,concept_id:j})}}else{if(g.val0===undefined||g.val0 instanceof Array||g.val1!==undefined)throw"Unable to determine field "+g+" in concept "+j;e.push({operator:"exact",id:f,value:g.val0,concept_id:j})}else e.push({operator:g.op,id:f,value:g.val0,concept_id:j,datatype:x(f)});h&&(e[e.length-1].id_choices=i)}var v;e.length===1?v=e[0]:v={type:k.join_by||"and",children:e,concept_id:j};return v}function x(a){var b=k.elements,c=null;$.each(b,function(b,d){if(d.type==="custom")return d.datatype;if(d.data){if(d.data.pk==a){c=d.data.datatype;return!1}if(d.data.pkchoices&&$.inArray(a,$.map(d.data.pkchoices,function(a,b){return a[0]}))>=0){c=d.data.datatype;return!1}}else{$.each(d.fields,function(b,d){if(d.pk==a){c=d.datatype;return!1}if(d.pkchoices&&$.inArray(a,$.map(d.pkchoices,function(a,b){return a[0]}))>=0){c=d.datatype;return!1}});if(c!==null)return!1}});return c}function w(a){var b=$.inArray(parseInt(a.concept_id),m);b>=0&&(m.splice(b,1),j===parseInt(a.concept_id)&&(l.html('<span class="icon plus"/> <span>Add Condition</span>'),$(".success",g).hide())),a.stopPropagation()}function v(a){$.inArray(a.concept_id,m)<0&&(m.push(parseInt(a.concept_id)),j===parseInt(a.concept_id)&&(l.html('<span class="icon refresh"/> <span>Update Condition</span>'),$(".success",g).show())),a.stopPropagation()}var d={},h='<a class="tab" href="#"><%= this.tabname %></a> ',i=['<div class="message success">Condition has been added.</div>','<button id="add_to_query"></button>'].join(""),j=null,k=null,l=null,m=[],n=/^(\d+)_(\d+(?:OR\d+)*)_input([01])$/,o=/^(\d*)_(\d+(?:OR\d+)*)$/,p=/^(\d*)_(\d+(?:OR\d+)*)_operator$/,q=/^\d+(?:OR\d+)+$/,r=/-/,s={"in":"exact","-in":"-exact",exact:"exact","-exact":"-exact"},t={exact:"in","-exact":"-in"},u={"true":!0,"false":!1,"null":null};c.bind({ViewReadyEvent:A,ViewErrorEvent:C,ShowViewEvent:B,ElementChangedEvent:D,UpdateQueryButtonClicked:G,InvalidInputEvent:H,InputCorrectedEvent:I,ConstructQueryEvent:F,ConceptDeletedEvent:w,ConceptAddedEvent:v}),e.bind("ConceptTabClickedEvent",L),e.tabs(!0,function(a,b){b.trigger("ConceptTabClickedEvent",b)}),b.show=N,b.isConceptLoaded=function(a){return a in d},b.buildQuery=y,b.constructQueryHandler=F})()});return b})