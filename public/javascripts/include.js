var controlPanel=function(){var n=function(){var n=this;n.setEvents=function(e,t){return e||(e=_.extend),t||(t=Backbone.Events),n.events=e({},t),n},n.getEvents=function(){return"undefined"==typeof n.events&&n.setEvents(),n.events}};return new n}();
var Comment=Backbone.Model.extend({url:"/comments",idAttribute:"_id"});
var Tip=Backbone.Model.extend({url:"/tips",idAttribute:"_id"});
var CommentsCollection=Backbone.Collection.extend({model:Comment,url:"/comments",reset:function(e,o){return Backbone.Collection.prototype.reset.call(this,e,o)}});
var TipsCollection=Backbone.Collection.extend({model:Tip,url:"/tips",reset:function(e,o){return Backbone.Collection.prototype.reset.call(this,e,o)}});
var View=Backbone.View.extend({set:function(r){for(var t in r)this[t]=r[t];return this},date:function(r){var t=r.toString().substring(0,8);return new Date(1e3*parseInt(t,16))},clear:function(){this.$el.html("")},unique:function(r,t){var n=r.toJSON(),e=_.property(t);return _.uniq(n,e)},formJson:function(r){for(var t={},n=0,e=r.length;e>n;n++){var i=r[n];t[i.name]=i.value}return t},trigger:function(r,t,n){n||(n=controlPanel),n.getEvents().trigger(r,t)},sortCid:function(r,t){return t||(t=1),_.sortBy(this.models,function(r){return t*parseInt(r.cid.substring(1,r.cid.length))})},sortCidReverse:function(r){return this.sortCid(r,-1)},markdown:function(r){return markdown.parse(r)},replace:function(r,t){return r.replace(/{{(.*?)}}/,t)},composite:function(r,t){for(var n in t){for(var e=t[n],i="",o=0,u=e.attributes.length;u>o;o++){var a=e.attributes[o];i+=r[a]}r[n]=i}return r}});
var CommentView=View.extend({tagName:"div",className:"line margin-top-64px code",render:function(){var e=$("#commentTemplate").html(),t=Handlebars.compile(e);return this.$el.html(t(this.model.attributes)),this}});
var CommentButtonView=View.extend({tagName:"span",className:"stripButton",render:function(){var t=$("#commentButtonTemplate").html(),e=Handlebars.compile(t);return this.$el.html(e(this.model.attributes)),this}});
var CommentButtonStripView=View.extend({tagName:"div",className:"line margin-top-64px",render:function(){var e=new CommentButtonView;return this.$el.html(e.set({model:this.model}).render().el),this}});
var CommentCreateFormView=View.extend({tagName:"form",className:"centre",render:function(){return this.$el.html($("#commentCreateFormTemplate").html()),this}});
var CommentsView=View.extend({tagName:"div",className:"centre",render:function(){this.$el.html("");for(var e=0,t=this.models.length;t>e;e++){var n=new CommentView;this.$el.append(n.set({model:this.models[e]}).render().el);var r=new CommentButtonStripView;this.$el.append(r.set({model:this.models[e]}).render().el)}return this}});
var LatestTipView=View.extend({tagName:"div",className:"centre",render:function(){this.clear();var e=this.collection.shift(),t=new LatestTipContentView;this.$el.append(t.set({model:e}).render().el);var i=new LatestTipTimeView;this.$el.append(i.set({model:e}).render().el);var n=new LatestTipButtonsView;this.$el.append(n.set({model:e}).render().el),this.collection.unshift(e);var s=new TagNamesView,a=this.unique(this.collection,"tag");this.$el.append(s.set({models:a}).render().el);var r=new TagCreateLinkView;return this.$el.append(r.render().el),this}});
var LatestTipButtonsView=View.extend({tagName:"div",className:"line margin-top-64px",render:function(){var e=new LatestTipTagView;this.$el.append(e.set({model:this.model}).render().el);var t=new LatestTipReportView;this.$el.append(t.set({model:this.model}).render().el);var i=new LatestTipSearchView;this.$el.append(i.set({model:this.model}).render().el);var s=new LatestTipCommentsView;return this.$el.append(s.set({model:this.model}).render().el),this}});
var LatestTipCommentsView=View.extend({tagName:"span",className:"stripButton",render:function(){var t=$("#latestTipCommentsTemplate").html(),e=Handlebars.compile(t),a=e(this.model.attributes);return this.$el.html(a),this}});
var LatestTipContentView=View.extend({tagName:"div",className:"line margin-top-64px code",render:function(){var t=$("#latestTipContentTemplate").html();return this.$el.html(this.replace(t,this.markdown(this.model.attributes.content))),this}});
var LatestTipReportView=View.extend({tagName:"span",className:"stripButton",events:{"click a":"report"},render:function(){var t=$("#latestTipReportTemplate").html();return this.$el.html(t),this.$el.attr("data-id",this.model.attributes._id),this},report:function(t){t.preventDefault(),this.trigger("tip:report",this.$el.attr("data-id"))}});
var LatestTipSearchView=View.extend({tagName:"span",className:"stripButton",render:function(){var t=$("#latestTipSearchTemplate").html();return this.$el.html(t),this.$el.attr("data-id",this.model.attributes._id),this}});
var LatestTipTagView=View.extend({tagName:"span",className:"stripButton",render:function(){var t=$("#latestTipTagTemplate").html(),e=Handlebars.compile(t),a=e(this.model.attributes);return this.$el.html(a),this}});
var LatestTipTimeView=View.extend({tagName:"div",className:"line margin-top-64px",render:function(){var e=$("#latestTipTimeTemplate").html(),t=Handlebars.compile(e),i=t({date:this.date(this.model.attributes._id)});return this.$el.html(i),this}});
var SearchView=View.extend({tagName:"div",render:function(){this.clear();var e=new SearchFieldView;this.$el.append(e.render().el);var r=new SearchResultsShowView;return this.$el.append(r.render().el),this}});
var SearchFieldView=View.extend({tagName:"form",events:{keyup:"keyup"},render:function(){var e=$("#searchFieldTemplate").html();return this.$el.html(e),this},keyup:function(){this.trigger("text:search",this.formJson(this.$el.serializeArray()))}});
var SearchResultsShowView=View.extend({tagName:"div",id:"searchResultsShow",render:function(){return this}});
var TagCreateFormView=View.extend({tagName:"form",className:"centre",events:{submit:"submit"},render:function(){return this.clear(),this.$el.html($("#tagCreateFormTemplate").html()),this},submit:function(t){t.preventDefault(),this.trigger("tag:create",this.composite(this.formJson(this.$el.serializeArray()),{text:{attributes:["tag","content"]}}))}});
var TagCreateLinkView=View.extend({tagName:"div",className:"centre margin-top-64px",render:function(){return this.clear(),this.$el.html($("#tagCreateLinkTemplate").html()),this}});
var TagNameView=View.extend({tagName:"li",className:"lineList",render:function(){var e=$("#latestTipTagTemplate").html(),a=Handlebars.compile(e),t=a(this.model);return this.$el.html(t),this}});
var TagNamesView=View.extend({tagName:"ul",className:"margin-top-64px",render:function(){return _.each(this.models,function(e){tagNameView=new TagNameView,this.$el.append(tagNameView.set({model:e}).render().el)},this),this}});
var TagTipsView=View.extend({tagName:"div",className:"centre",render:function(){this.clear();for(var e=this.sortCidReverse(this.models),r=0,i=e.length;i>r;r++){var t=new TipView;this.$el.append(t.set({model:e[r]}).render().el)}return this}});
var TipView=View.extend({tagName:"div",className:"centre",render:function(){this.clear();var e=new LatestTipContentView;this.$el.append(e.set({model:this.model}).render().el);var t=new LatestTipTimeView;this.$el.append(t.set({model:this.model}).render().el);var i=new LatestTipButtonsView;return this.$el.append(i.set({model:this.model}).render().el),this}});
var options=function(n){return n||(n={assure:assure,selector:$,navigate:function(n,t,e,r,a){if(e||(e="/"),t&&t.length){n+=e;for(var s=0,i=t.length;i>s;s++)n+=t[s]+e;n=n.substring(0,n.length-1)}r||(r=!0),a||(a=Backbone.history),a.navigate(n,r)}}),n};
var commentsControllerOptions=function(e){return e||(e={collection:new CommentsCollection,commentsView:new CommentsView,commentCreateFormView:new CommentCreateFormView,element:"#app"}),e};
var tipsControllerOptions=function(e){return e||(e={collection:new TipsCollection,latestTipView:new LatestTipView,tagTipsView:new TagTipsView,tagCreateFormView:new TagCreateFormView,searchView:new SearchView,element:"#app",elementSearchResultsShow:"#searchResultsShow"}),e};
var CommentsController=function(){var e=this;e.initialize=function(){return e},e.set=function(t){for(var n in t)e[n]=t[n];return e},e.get=function(t){return e[t]},e.fetch=function(){var t=e.assure();return e.get("collection").fetch({reset:!0,success:function(e){t.resolve(e.lenght)}}),t},e.filter=function(t,n){return n||(n="text"),e.get("collection").filter(function(e){var o=e.get(n);return"undefined"==typeof o?!1:-1!==o.toLowerCase().indexOf(t.toLowerCase())})},e.saveModel=function(t,n){var o=e.get("collection").get(t),r=e.assure();return o.save(n,{wait:!0,success:function(e){r.resolve(e)}}),r},e.react=function(t,n,o,r){o||(o=e.get("root")),r||(r=controlPanel),r.getEvents().bind(t,n,o)},e.create=function(){var t=e.fetch();t.then(function(){e.get("selector")(e.get("element")).html(e.get("commentCreateFormView").render().el)})},e.comments=function(t){var n=e.get("collection").where({postId:t});if(n&&n.length)e.get("selector")(e.get("element")).html(e.get("commentsView").set({models:n}).render().el);else{var o=e.fetch();o.then(function(){var n=e.get("collection").where({postId:t});e.get("selector")(e.get("element")).html(e.get("commentsView").set({models:n}).render().el)})}}};
var TipsController=function(){var e=this;e.initialize=function(){return e.react("tag:create",e.created),e.react("tip:report",e.reported),e.react("text:search",e.searched),e},e.set=function(t){for(var n in t)e[n]=t[n];return e},e.get=function(t){return e[t]},e.fetch=function(){var t=e.assure();return e.get("collection").fetch({reset:!0,success:function(e){t.resolve(e.lenght)}}),t},e.filter=function(t,n){return n||(n="text"),e.get("collection").filter(function(e){var r=e.get(n);return"undefined"==typeof r?!1:-1!==r.toLowerCase().indexOf(t.toLowerCase())})},e.saveModel=function(t,n){var r=e.get("collection").get(t),c=e.assure();return r.save(n,{wait:!0,success:function(e){c.resolve(e)}}),c},e.react=function(t,n,r,c){r||(r=e.get("root")),c||(c=controlPanel),c.getEvents().bind(t,n,r)},e.created=function(t){e.get("collection").create(t,{wait:!0,success:function(){e.navigate("home")}})},e.reported=function(t){var n=e.saveModel(t,{reported:!0});n.then(function(){})},e.searched=function(t){e.get("selector")(e.get("elementSearchResultsShow")).html(e.get("tagTipsView").set({models:e.filter(t.search)}).render().el)},e.latestTip=function(){var t=e.fetch();t.then(function(){e.get("selector")(e.get("element")).html(e.get("latestTipView").set({collection:e.get("collection")}).render().el)})},e.create=function(){var t=e.fetch();t.then(function(){e.get("selector")(e.get("element")).html(e.get("tagCreateFormView").render().el)})},e.search=function(){var t=e.fetch();t.then(function(){e.get("selector")(e.get("element")).html(e.get("searchView").render().el)})},e.tag=function(t){var n=e.get("collection").where({tag:t});if(n&&n.length)e.get("selector")(e.get("element")).html(e.get("tagTipsView").set({models:n}).render().el);else{var r=e.fetch();r.then(function(){var n=e.get("collection").where({tag:t});e.get("selector")(e.get("element")).html(e.get("tagTipsView").set({models:n}).render().el)})}}};
var Router=Backbone.Router.extend({initialize:function(t){_.extend(this,t)},routes:{"":"latestTip",home:"latestTip","tags/create":"create","tags/search":"search","tags/comments/create/:id":"commentsCreate","tags/comments/:id":"comments","tags/:tag":"tag"},latestTip:function(){this.controllers[this.urls.indexRoute].latestTip()},create:function(){this.controllers[this.urls.createRoute].create()},search:function(){this.controllers[this.urls.searchRoute].search()},tag:function(t){this.controllers[this.urls.tagRoute].tag(t)},comments:function(t){this.controllers[this.urls.commentsRoute].comments(t)},commentsCreate:function(t){this.controllers[this.urls.commentsCreateRoute].create(t)}});
!function(t){new Router(t);Backbone.history.start()}({urls:{indexRoute:"tipsController",createRoute:"tipsController",searchRoute:"tipsController",tagRoute:"tipsController",commentsCreateRoute:"commentsController",commentsRoute:"commentsController"},controllers:{tipsController:(new TipsController).set(_.extend(options(),tipsControllerOptions())).initialize(),commentsController:(new CommentsController).set(_.extend(options(),commentsControllerOptions())).initialize()}});