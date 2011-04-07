var Base=function(){};Base.extend=function(a,b){var c=Base.prototype.extend;Base._prototyping=!0;var d=new this;c.call(d,a),d.base=function(){},delete Base._prototyping;var e=d.constructor,f=d.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==f)this._constructing=!0,e.apply(this,arguments),delete this._constructing;else if(arguments[0]!=null)return(arguments[0].extend||c).call(arguments[0],d)};f.ancestor=this,f.extend=this.extend,f.forEach=this.forEach,f.implement=this.implement,f.prototype=d,f.toString=this.toString,f.valueOf=function(a){return a=="object"?f:e.valueOf()},c.call(f,b),typeof f.init=="function"&&f.init();return f},Base.prototype={extend:function(a,b){if(arguments.length>1){var c=this[a];if(c&&typeof b=="function"&&(!c.valueOf||c.valueOf()!=b.valueOf())&&/\bbase\b/.test(b)){var d=b.valueOf();b=function(){var a=this.base||Base.prototype.base;this.base=c;var b=d.apply(this,arguments);this.base=a;return b},b.valueOf=function(a){return a=="object"?b:d},b.toString=Base.toString}this[a]=b}else if(a){var e=Base.prototype.extend;!Base._prototyping&&typeof this!="function"&&(e=this.extend||e);var f={toSource:null},g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;while(i=g[h++])a[i]!=f[i]&&e.call(this,i,a[i]);for(var i in a)f[i]||e.call(this,i,a[i])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,b,c){for(var d in a)this.prototype[d]===undefined&&b.call(c,a[d],d,a)},implement:function(){for(var a=0;a<arguments.length;a++)typeof arguments[a]=="function"?arguments[a](this.prototype):this.prototype.extend(arguments[a]);return this},toString:function(){return String(this.valueOf())}})define("lib/base", function(){});
define("rest/basext",["lib/base"],function(){var a=Base.extend({__defargslist:function(a,b){a=a||this.constructor,b=b||[],a.ancestor&&(b=this.__defargslist(a.ancestor,b)),a.defargs&&typeof a.defargs=="object"&&b.push(a.defargs);return b},_defargs:function(){var a=this.__defargslist();return $.extend.apply(this,[{}].concat(a))},constructor:function(a){var b=this._defargs(),c=$.extend({},b,a);for(var d in c)b.hasOwnProperty(d)&&(this[d]=c[d])}},{defargs:{}});return a})define("rest/datasource",["rest/basext"],function(a){var b=a.extend({}),c=b.extend({_cache:undefined,get:function(a,b){b=b||!1,a=a||{};if(!b&&this._cache)return this._cache;var c=this,d=$.extend({},this.ajax,a),e=d.success;d.success=function(a){var b=c.decode(a);c._cache=b,e(a,b)},this.xhr=$.ajax(d);return this._cache}},{defargs:{ajax:{url:window.location,data:{},success:function(){},error:function(){},cache:!1},decode:function(a){return a}}});return{ajax:c}})define("rest/renderer",["rest/basext"],function(a){var b=a.extend({},{defargs:{target:null}}),c=b.extend({render:function(a,b){b=!b?this.replace:b,b===!0&&this.target.html("");if(this.bindData===!0){l=[];for(var c,d,e=0;e<a.length;e++)c=a[e],d=$.jqoteobj(this.template,c),d.data(c),l.push(d)}else l=[$.jqoteobj(this.template,a)];var f=this.target;b==="prepend"?$.each(l.reverse(),function(){f.prepend(this)}):$.each(l,function(){f.append(this)});return this.target}},{defargs:{template:null,replace:!0,bindData:!1}});return{base:b,template:c}})define("report/templates",function(){return{columns:$.jqotec(['<div data-model="category" data-id="<%= this.id %>">','<h4><%= this.name %> <a class="ht add-all" href="#<%= this.id %>">Add All</a></h4>',"<ul>","<% for (var e,k=0; k<this.columns.length; k++) { %>","<% e = this.columns[k]; %>",'<li class="active" data-model="column" data-id="<%= e.id %>">','<a class="fr ht add-column" href="#<%= e.id %>">Add</a>',"<%= e.name %>",'<% if (e.description) { %><p class="ht mg"><%= e.description %></p><% } %>',"</li>","<% } %>","</ul>","</div>"].join("")),active_columns:$.jqotec(['<li data-model="column" data-id="<%= this.id %>">','<a class="fr ht remove-column" href="#<%= this.id %>">Remove</a>',"<%= this.name %>",'<% if (this.description) { %><p class="ht mg"><%= this.description %></p><% } %>',"</li>"].join("")),header:$.jqotec('<th data-model="column" data-id="<%= this.id %>" class="header <%= this.direction %>"><span><%= this.name %></span></th>'),row:$.jqotec(["<tr>","<% for(var k=1; k<this.length; k++) { %>","<td><%= this[k] %></td>","<% } %>","</tr>"].join("")),pages:$.jqotec(["<% if (this.page > 1) { %>",'<span>&laquo; <a href="#1">First</a></span>',"<% if (this.page > 2) { %>",'<span>&lsaquo; <a href="#<%= this.page-1 %>">Previous</a></span>',"<% } %>","<% } %>","<% for (var e,k=0; k<this.pages.length;k++) { %>","<% e = this.pages[k]; %>","<% if (this.page == e) { %>","<strong><%= e %></strong>","<% } else { %>","<% if (e) { %>",'<a href="#<%= e %>"><%= e %></a>',"<% } else { %>","<span>...</span>","<% } %>","<% } %>","<% } %>","<% if (this.page < this.num_pages) { %>","<% if (this.page < this.num_pages - 1) { %>",'<span><a href="#<%= this.page+1 %>">Next</a> &rsaquo;</span>',"<% } %>",'<span><a href="#<%= this.num_pages %>">Last</a> &raquo;</span>',"<% } %>"].join(""))}})define("report/table",["rest/datasource","rest/renderer","report/templates"],function(a,b,c){function e(){var e=!0,f=$("body"),g=$("#content"),h=$("#report"),i=$("#report-info"),j=$("#actions"),k=$("#details"),l=h.find(".toolbar"),m=$("#table"),n=m.find("thead tr"),o=m.find("tbody"),p=$(".per-page"),q=$(".page-links"),r=$("#unique-count"),s=$("#count"),t={table_header:new b.template({target:n,template:c.header}),table_rows:new b.template({target:o,template:c.row}),pages:new b.template({target:q,template:c.pages})},u={scope_info:new a.ajax({ajax:{url:API_URLS.scope,success:function(a){if(a.text){var b="";if(typeof a.text==="string")b="<li>"+a.text+"</li>";else{var c=a.text.conditions;for(var d=0;d<c.length;d++)b+="<li>"+c[d]+"</li>"}k.html(b)}}}}),table_header:new a.ajax({ajax:{url:API_URLS.perspective,success:function(a){t.table_header.render(a.header)}}}),table_rows:new a.ajax({ajax:{url:API_URLS.report,beforeSend:function(){h.block()},complete:function(){h.unblock()},success:function(a){a.unique!==undefined&&r.html(a.unique),a.count!==undefined&&s.html(a.count);a.count===0?($(".content").html(d).css("text-align","center"),j.hide()):(t.table_rows.render(a.rows),a.pages?t.pages.render(a.pages):(e&&p.hide(),t.pages.target.hide()),a.per_page&&p.val(a.per_page),h.trigger("resize-report"),e&&(e=!1,setTimeout(function(){i.show(),l.show(),m.show()},500)))}}})};u.scope_info.get(),u.table_header.get(),u.table_rows.get(),h.bind("resize-report",function(a){var b=900,c=h.innerWidth(),d=m.outerWidth(!0)+20;nInnerWidth=Math.min(d,$(window).width()-30),nInnerWidth=Math.max(b,nInnerWidth);nInnerWidth!=c&&(half=(nInnerWidth-c)/2,nLeft=parseInt(g.css("margin-left").match(/-?\d+/)[0])-half,g.animate({marginLeft:nLeft}),h.animate({width:nInnerWidth}))});var v;$(window).resize(function(){clearTimeout(v),v=setTimeout(function(){h.trigger("resize-report")},200)}),f.bind("update.report",function(a,b){var c={data:b};u.table_rows.get(c,!0);return!1}),f.bind("update.perspective",function(a,b){$.putJSON(API_URLS.perspective,JSON.stringify(b),function(){f.trigger("update.report"),"columns"in b&&u.table_header.get(null,!0)});return!1}),h.delegate(".per-page","change",function(a){this.value&&f.trigger("update.report",{n:this.value});return!1}),n.delegate(".header","click",function(a){var b,c=$(this),d=c.attr("data-id"),e=c.siblings();e.removeClass("asc").removeClass("desc"),c.hasClass("asc")?(c.removeClass("asc").addClass("desc"),b="desc"):c.hasClass("desc")?(c.removeClass("desc"),b=""):(c.addClass("asc"),b="asc"),f.trigger("update.perspective",[{ordering:[[d,b]]}]);return!1}),q.delegate("a","click",function(a){f.trigger("update.report",{p:this.hash.substr(1)});return!1})}var d='<div style="text-align: center; display: inline;" class="message warning">No results match your conditions. <a href="'+URLS.define+'">Refine your conditions</a>.</div>';return{init:e}})define("report/columns",["rest/datasource","rest/renderer","report/templates"],function(a,b,c){function d(){var b=$("body"),c=$("#columns"),d=$("#active-columns"),e=$("#columns-dialog"),f=$("#search"),g=$("form",e),h=$("#data-columns");e.cache={},e.get=function(a){if(!e.cache[a]){var b="[data-model=column][data-id="+a+"]";e.cache[a]={src:c.find(b),tgt:d.find(b)}}return e.cache[a]},e.bind("addall.column",function(a,b){var c=$("[data-model=category][data-id="+b+"]"),d=c.find(".active:not(.filtered)");c.hide();for(var f=0;f<d.length;f++)e.trigger("add.column",[$(d[f]).attr("data-id")]);return!1}),e.bind("add.column",function(a,b){map=e.get(b),map.src.removeClass("active");var c=map.src.siblings(".active:not(.filtered)");c.length==0&&map.src.parents("[data-model=category]").hide(),d.append(map.tgt.detach().addClass("active"));return!1}),e.bind("remove.column",function(a,b){map=e.get(b),map.tgt.removeClass("active"),map.src.addClass("active").parents("[data-model=category]").show();return!1}),e.bind("removeall.column",function(a){for(var b in e.cache)e.trigger("remove.column",[b]);return!1}),e.bind("search.column",function(a,b){f.trigger("search",b);return!1}),e.bind("save.column",function(a){var c=d.children(".active"),e=$.map(c,function(a,b){return parseInt($(a).attr("data-id"))});b.trigger("update.perspective",[{columns:e}]);return!1}),e.bind("filter.column",function(a,b){map=e.get(b),map.src.addClass("filtered");var c=map.src.siblings(".active:not(.filtered)");c.length==0&&map.src.parents("[data-model=category]").hide()}),e.bind("filterall.column",function(a){var b=c.find("[data-model=column]");for(var d=b.length;d--;)e.trigger("filter.column",[$(b[d]).attr("data-id")]);return!1}),e.bind("unfilter.column",function(a,b){map=e.get(b),map.src.removeClass("filtered"),map.src.parents("[data-model=category]").show();return!1});var i={perspective:new a.ajax({ajax:{url:API_URLS.perspective,success:function(a){if(a.store){var b=a.store.columns;for(var c=0;c<b.length;c++)e.trigger("add.column",[b[c]])}}}})};i.perspective.get();var j=$('<div id="description"></div>').appendTo("body"),k=null;$("#columns").delegate("li","mouseenter",function(){clearTimeout(k);var a=this;k=setTimeout(function(){var b=$(a),c=b.offset(),d=b.outerWidth(),e=b.children(".description").html();j.html(e),j.css({left:c.left+d+20,top:c.top}).show()},700)}).delegate("li","mouseleave",function(){clearTimeout(k),j.hide()}),f.autocomplete2({success:function(a,b){f.trigger("filterall.column");for(var c=0;c<b.length;c++)f.trigger("unfilter.column",[b[c]])}},null,50),c.delegate(".add-column","click",function(a){clearTimeout(k),j.hide();var b=this.hash.substr(1);e.trigger("add.column",[b]);return!1}),c.delegate(".add-all","click",function(a){var b=this.hash.substr(1);e.trigger("addall.column",[b]);return!1}),d.delegate(".remove-column","click",function(a){var b=this.hash.substr(1);e.trigger("remove.column",[b]);return!1}),e.delegate(".remove-all","click",function(a){e.trigger("removeall.column");return!1}),e.dialog({autoOpen:!1,draggable:!0,resizable:!1,title:"Add or Remove Columns from this Report",height:600,width:900,buttons:{Cancel:function(){e.dialog("close")},"Update Columns":function(){e.trigger("save.column"),e.dialog("close")}}}),d.sortable({placeholder:"placeholder",forcePlaceholderSize:!0,forceHelperSize:!0,opacity:.5,cursor:"move",tolerance:"intersect"}).disableSelection(),h.bind("click",function(a){e.dialog("open")})}return{init:d}})define("utils/html5fix",function(){$(function(){Modernizr.input.placeholder||$("input[placeholder]").placeholder(),Modernizr.input.autofocus||$("input[autofocus]").focus()})})var OVERLAY=$("#overlay");$("body").bind({ajaxComplete:function(a,b,c){if(b.status===302){var d=$.parseJSON(b.responseText);d.redirect&&(window.location=d.redirect)}},ajaxError:function(a,b,c,d){}})define("utils/ajaxsetup", function(){});
Array.prototype.map||(Array.prototype.map=function(a){var b=this.length>>>0;if(typeof a!="function")throw new TypeError;var c=Array(b),d=arguments[1];for(var e=0;e<b;e++)e in this&&(c[e]=a.call(d,this[e],e,this));return c}),function(a){a.extend({putJSON:function(b,c,d,e){return a.ajax({type:"PUT",url:b,contentType:"application/json",data:c,success:d,dataType:e})},postJSON:function(b,c,d,e){return a.ajax({type:"POST",url:b,contentType:"application/json",data:c,success:d,dataType:e})},log:function(a){window.console?console.log(a):alert(a)},jqoteobj:function(b,c,d){out=a.jqote(b,c,d);return a(out)}}),a.fn.placeholder=function(b){var c=this;c.each(function(){var d=a(this),e=d.css("color");b=b||d.attr("placeholder");if(!d.is("input")&&!d.is("textarea"))return c;(d.val()===""||d.val()===b)&&d.val(b).css("color","#999"),d.focus(function(){d.val()===b&&d.css("color",e).val("")}).blur(function(){d.css("color",e),d.val()===""&&d.css("color","#999").val(b)})});return this},a.fn.jdata=function(b,c){var d=a.grep(this,function(d){return a(d).data(b)==c});return a(d)},a.fn.autocomplete2=function(b,c,d,e){if(!this.is("input[type=text]")&&!this.is("input[type=search]"))throw new TypeError("A text or search field is required");c=c||null,d=d||300,e=e||!1;var f=a.extend({},b),g=f.success||function(){},h=f.error||function(){},i=f.start||function(){},j=f.end||function(){};f.data={};return this.each(function(b){var k=a(this),l,m,n,o=null,p=null,q=null,r=!1;l=k.closest("form").submit(function(a){return!1}),f.url=l.attr("action"),f.success=function(a,b,c){g(m,a,b,c),q==null&&e&&(q={resp:a,status:b,xhr:c}),n&&b=="success"&&(k.cache[m]=a),o=m,r=!1,f.end()},f.error=function(a,b,c){h(m,a,b,c),f.end()},f.start=function(){r=!0,i(m)},f.end=function(){r=!1,j()};var s="search-"+b;k.cache={},k.bind(s,function(b,g,h){n=h?!0:!1,m=g;n&&k.cache[m]?f.success(k.cache[m],"cached",null):(clearTimeout(p),c!==null&&m===c&&(m=""),m=m||"",m=SearchSanitizer.clean(m).toLowerCase(),m!==o?(r==!1&&f.start(),f.data.q=m,p=setTimeout(function(){e&&q?f.success(q.resp,q.status,q.xhr):a.ajax(f)},d)):f.end())}),k.keyup(function(a){k.trigger(s,[this.value]);return!1})})},a.fn.tabs=function(){var b={nextTab:function(a,b,c,d){b=b===undefined?a.data("tabindex"):b,c=c||a.attr("children").length,d=d===undefined?0:d+1;if(d==c)return null;if(c+1<=b)return this.nextTab(a,0,c,d);if(a.children(":nth("+b+")").hasClass("disabled"))return this.nextTab(a,b+1,c,d);return b},getTab:function(a,b){return a.children(":nth("+b+")")}},c={init:function(b,c,e){b.data("tabified",!0),c=c===!0?!0:!1,e=e||function(){};var f=b.children(".tab");c?a(".tab",b).live("click",d(e)):f.click(d(e)),f.filter(".active").length===0&&f.not(".disabled").filter(":first").click()},toggle:function(a,c){b.getTab(a,c).click(),a.data("tabindex",c)},disable:function(a,c){b.getTab(a,c).addClass("disabled").removeClass("active"),nindex=b.nextTab(a,c),nindex!==null&&this.toggle(a,nindex)},enable:function(a,c){b.getTab(a,c).removeClass("disabled")}},d=function(b){return function(c){c.preventDefault();var d=a(this).not(".disabled");if(d.length==0||d.hasClass("active"))return!1;var e=d.siblings(".tab");d.addClass("active"),e.removeClass("active"),b(c,d)}};return function(a,b){if(typeof a==="string"){if(this.data("tabified")===null)throw new TypeError("tabs have not been initialized yet");c[a](this,b)}else c.init(this,a,b);return this}}()}(jQuery)define("utils/extensions", function(){});
var SearchSanitizer={regexes:{truncateWhiteSpace:[/\s{2,}/g," "],removeNonAlphaNumeric:[/[^\sA-Za-z0-9]/g,""],removeStopWords:[/\b(a|able|about|across|after|all|almost|also|am|among|an|and|any|are|as|at|be|because|been|but|by|can|cannot|could|dear|did|do|does|either|else|ever|every|for|from|get|got|had|has|have|he|her|hers|him|his|how|however|i|if|in|into|is|it|its|just|least|let|like|likely|may|me|might|most|must|my|neither|no|nor|not|of|off|often|on|only|or|other|our|own|rather|said|say|says|she|should|since|so|some|than|that|the|their|them|then|there|these|they|this|tis|to|too|twas|us|wants|was|we|were|what|when|where|which|while|who|whom|why|will|with|would|yet|you|your)\b/g,""],trimRightWhiteSpace:[/^\s+/,""],trimLeftWhiteSpace:[/\s+$/,""]},clean:function(a){for(var b in this.regexes){var c=this.regexes[b];a=a.replace(c[0],c[1])}return a}}define("utils/sanitizer", function(){});
// report/main

require(
    
    [
        'report/table',
        'report/columns',
        'utils/html5fix',
        'utils/ajaxsetup',
        'utils/extensions',
        'utils/sanitizer'       
    ],

    function(m_table, m_columns) {

        $(function() {
            $('body').ajaxComplete(function() {
                OVERLAY.fadeOut();
            });

            m_columns.init();
            m_table.init();

            var e = $('#export-data');

            e.bind('click', function() {
                e.attr('disabled', true);
                window.location = API_URLS.report + '?f=csv';
                setTimeout(function() {
                    e.attr('disabled', false);
                }, 5000);
                return false;
            });
        });

    }
);
define("report/main", function(){});
