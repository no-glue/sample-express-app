var tipsControllerOptions = function(options) {
  // tips controller options

  if(!options) {
    options = {
      collection: new TipsCollection(),
      latestTipView: new LatestTipView(),
      tagTipsView: new TagTipsView(),
      tagCreateFormView: new TagCreateFormView(),
      searchView: new SearchView(),
      element: '#app',
      elementSearchResultsShow: '#searchResultsShow'
    };
  }

  return options;
};