var TagTipsView = View.extend({
  tagName: 'div',
  className: 'centre',
  render: function() {
    // show tips tagged with a tag

    this.clear();

    var sorted = this.sortCidReverse(this.models);

    for(var i = 0, len = sorted.length; i < len; i++) {
      var tipView = new TipView();

      this.$el.append(tipView.set({model: sorted[i]}).render().el);
    }

    return this;
  }
});