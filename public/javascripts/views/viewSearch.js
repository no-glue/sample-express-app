var SearchView = View.extend({
  tagName: 'form',
  events: {
    'keyup': 'keyup'
  },
  render: function() {
    // show search form

    var template = $('#searchTemplate').html();

    this.$el.html(template);

    return this;
  },
  keyup: function(e) {
    // searches text

    this.trigger('text:search', this.formJson(this.$el.serializeArray()));
  }
});