var LoginFormView = View.extend({
  tagName: 'form',
  render: function() {
    // renders login form
    
    var html = $('#loginFormTemplate').html();

    this.$el.html(html);

    return this;
  }
});