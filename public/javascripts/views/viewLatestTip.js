var LatestTipView = View.extend({
  tagName: 'div',
  className: 'centre',
  render: function() {
    // show latest tip on home page

    this.clear();

    var model = this.collection.shift();

    var latestTipContentView = new LatestTipContentView();

    this.$el.append(latestTipContentView.set({model: model}).render().el);

    var latestTipTimeView = new LatestTipTimeView();

    this.$el.append(latestTipTimeView.set({model: model}).render().el);

    var latestTipButtonsView = new LatestTipButtonsView();

    this.$el.append(latestTipButtonsView.set({model: model}).render().el);

    this.collection.unshift(model);

    var tagNamesView = new TagNamesView();

    var models = this.unique(this.collection, 'tag');

    this.$el.append(tagNamesView.set({models: models}).render().el);

    var tagCreateLinkView = new TagCreateLinkView();

    this.$el.append(tagCreateLinkView.render().el);

    return this;
  }
});