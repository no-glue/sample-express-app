var SearchView = View.extend({
  tagName: 'form',
  render: function() {
    // show search form

    var template = $('#searchTemplate').html();
    
    this.$el.append(template);

    return this;
  }
});