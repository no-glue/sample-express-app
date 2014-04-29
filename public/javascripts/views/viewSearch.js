var SearchView = View.extend({
  tagName: 'div',
  render: function() {
    // show search form

    this.clear();

    var searchFieldView = new SearchFieldView();

    this.$el.append(searchFieldView.render().el);

    var searchResultsShowView = new SearchResultsShowView();

    this.$el.append(searchResultsShowView.render().el);

    return this;
  }
});