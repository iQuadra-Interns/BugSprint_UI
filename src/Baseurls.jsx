const allUrls = {
  dev:{
    view_bug:
      "https://esayaabfpizs3huhtuo6hevhia0parjp.lambda-url.us-east-1.on.aws/api",
      
    common_constants:
      "https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/",
    edit_bug:
      "https://esayaabfpizs3huhtuo6hevhia0parjp.lambda-url.us-east-1.on.aws/api/update-bug/"
  },
  qa: {
    view_bug: "qa",
    common_constants: "qa",
    edit_bug: "qa",
  },
  staging: {
    view_bug: "staging",
    common_constants: "staging",
    edit_bug: "staging",
  },
  prod: {
    view_bug: "prod",
    common_constants: "prod",
    edit_bug: "prod",
  },
};


export default allUrls;