var TagNameView = View.extend({
  tagName: 'li',
  className: 'lineList',
  render: function() {
    // show single tag name

    var template = $('#latestTipTagTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled(this.model);

    this.$el.html(html);

    return this;    
  }
});