var LatestTipButtonsView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px',
  render: function() {
    // shows latest tip time created for home page

    var latestTipTagView = new LatestTipTagView();

    this.$el.append(latestTipTagView.set({model: this.model}).render().el);

    var latestTipReportView = new LatestTipReportView();

    this.$el.append(latestTipReportView.set({model: this.model}).render().el);

    var latestTipSearchView = new LatestTipSearchView();

    this.$el.append(latestTipSearchView.set({model: this.model}).render().el);

    var latestTipCommentsView = new LatestTipCommentsView();

    this.$el.append(latestTipCommentsView.set({model: this.model}).render().el);

    return this;
  }
});