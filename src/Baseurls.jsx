const allUrls = {
  LOCAL: {
    ai_tasks: "http://127.0.0.1:8001/",
    common: "http://127.0.0.1:8001/",
    bugs: "http://127.0.0.1:8001/",
    signin: "http://127.0.0.1:8001/signin/",
    bug_search: "http://127.0.0.1:8001/",
    admin: "http://127.0.0.1:8001/",
    test_cases: "http://127.0.0.1:8001/",
  },
  DEV: {
    ai_tasks: "https://n2k6xeku5a35vvvptxcmn3vara0egiba.lambda-url.us-east-1.on.aws/",
    common: "https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/",
    bugs: "https://esayaabfpizs3huhtuo6hevhia0parjp.lambda-url.us-east-1.on.aws/",
    signin: "https://c2r3hnk5frqsa6l7zbl43je7cu0lqjyy.lambda-url.us-east-1.on.aws/",
    bug_search: "https://v3dfk4mm6zkwbehcs5c6cvauae0yzksa.lambda-url.us-east-1.on.aws/",
    admin: "https://v72a476eo7ob3pyfp3ngjtfwpm0fbjkn.lambda-url.us-east-1.on.aws/",
    test_cases: "https://6igl2ic4ro3ans7cghpqod2hly0gaxfs.lambda-url.us-east-1.on.aws/",
  },
  QA: {
    ai_tasks: "https://d6cu2sspxbps7txwchuxd7ka6i0pruxo.lambda-url.us-east-1.on.aws/",
    admin: "https://ybgtxlwzdakpn4g663wzpftitu0fnbed.lambda-url.us-east-1.on.aws/",
    test_cases: "https://n627cg6qnpnkvygwihom6xn5e40tkhvu.lambda-url.us-east-1.on.aws/",
    bug_search: "https://n627cg6qnpnkvygwihom6xn5e40tkhvu.lambda-url.us-east-1.on.aws/",
    common: "https://eha3gadoamdtyxjud3jh7jjf6i0kooim.lambda-url.us-east-1.on.aws/",
    bugs: "https://v5zqnryyhzcvoj2wtwyopwwl240dapzm.lambda-url.us-east-1.on.aws/",
    signin: "https://iii4jpvfqess5tn7ufozxuudji0qsjmd.lambda-url.us-east-1.on.aws/",
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