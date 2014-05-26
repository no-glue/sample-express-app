var LoginStripView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px',
  render: function() {
    // render login strip

    var loginFormView = new LoginFormView();

    this.$el.html(loginFormView.render().el);

    return this;
  }
});