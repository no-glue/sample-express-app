var TagCreateLinkView = View.extend({
  tagName: 'div',
  className: 'centre margin-top-64px',
  render: function() {
    // show create tag link

    this.clear();

    this.$el.html($('#tagCreateLinkTemplate').html());

    return this; 
  }
});