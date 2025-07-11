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
    view_bug: "https://v5zqnryyhzcvoj2wtwyopwwl240dapzm.lambda-url.us-east-1.on.aws/",
    common_constants: "https://eha3gadoamdtyxjud3jh7jjf6i0kooim.lambda-url.us-east-1.on.aws/",
    edit_bug: "https://n627cg6qnpnkvygwihom6xn5e40tkhvu.lambda-url.us-east-1.on.aws/",
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