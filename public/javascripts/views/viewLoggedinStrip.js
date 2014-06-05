var LoggedinStripView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px',
  events: {
    click: 'signout'
  },
  render: function() {
    // show logged in strip

    var html = $('#loggedinStripTemplate').html();

    var compiled = Handlebars.compile(html);

    this.$el.html((this.userSignedin()) ? compiled(this.getUserSignedin()) : '');

    return this;
  },
  signout: function(e) {
    // signout user
    
    e.preventDefault();

    this.trigger('user:signout');
  }
});