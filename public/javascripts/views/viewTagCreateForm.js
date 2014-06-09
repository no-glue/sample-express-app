var TagCreateFormView = View.extend({
  tagName: 'form',
  className: 'centre',
  events: {'submit': 'submit'},
  render: function() {
    // show tag create form

    this.clear();

    var compiled = Handlebars.compile($('#tagCreateFormTemplate').html());

    this.$el.html(compiled(this.getUserSignedin()));

    return this;
  },
  submit: function(e) {
    // submit form for creating tag

    e.preventDefault();

    this.trigger('tag:create', this.composite(this.formJson(this.$el.serializeArray()), {text: {attributes: ['tag', 'content']}}));
  }
});