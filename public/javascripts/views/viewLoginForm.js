var LoginFormView = View.extend({
  tagName: 'form',
  events: {
    submit: 'submit'
  },
  render: function() {
    // renders login form

    var html = $('#loginFormTemplate').html();

    this.$el.html(html);

    return this;
  },
  submit: function(e) {
    // submit sign in form

    e.preventDefault();

    this.trigger('user:signin', this.formJson(this.$el.serializeArray()));
  }
});