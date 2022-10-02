Survey.StylesManager.applyTheme("defaultV2");
var json = {
  questions: [
    {
      type: "rating",
      name: "satisfaction",
      title: "How satisfied are you with Xmarks?",
      minRateDescription: "Not Satisfied",
      maxRateDescription: "Completely satisfied"
    }
  ]
};
window.survey = new Survey.Model(json);
survey.onComplete.add(function (sender) {
  document.querySelector('#surveyResult').textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
});
$("#surveyElement").Survey({model: survey});