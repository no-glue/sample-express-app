var TipView = View.extend({
  tagName: 'div',
  className: 'centre',
  render: function() {
    // show latest tip on home page

    this.clear();

    var latestTipContentView = new LatestTipContentView();

    this.$el.append(latestTipContentView.set({model: this.model}).render().el);

    var latestTipTimeView = new LatestTipTimeView();

    this.$el.append(latestTipTimeView.set({model: this.model}).render().el);

    var latestTipTagView = new LatestTipTagView();

    this.$el.append(latestTipTagView.set({model: this.model}).render().el);

    return this;
  }
});