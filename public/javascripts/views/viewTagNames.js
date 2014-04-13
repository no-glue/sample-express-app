var TagNamesView = View.extend({
  tagName: 'ul',
  className: 'margin-top-64px',
  render: function() {
    // show tag names for home page

    _.each(this.models, function(model) {
      tagNameView = new TagNameView();

      this.$el.append(tagNameView.set({model: model}).render().el);
    }, this);

    return this;
  }
});