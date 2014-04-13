var tipsControllerOptions = function(options) {
  // place controller options

  if(!options) {
    options = {
      collection: new TipsCollection(),
      latestTipView: new LatestTipView(),
      tagTipsView: new TagTipsView(),
      tagCreateFormView: new TagCreateFormView(),
      element: '#app'
    };
  }

  return options;
};