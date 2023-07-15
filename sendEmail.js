var querystring = require("querystring");
var http = require("http");
var fs = require("fs");

async function SendEmailTemplate() {
  let text_data = fs.readFileSync("./index.html");
  //   let text_data = await fs.readFile("./index.html", { encoding: "utf8" });
  // let text_data = "Hello";
  console.log(text_data.toString(), "TEXT");
  const data = {
    touchpoint: {
      channel: "email",
      source: "email",
      id: "nam.test.subiz@gmail.com",
    },
    by: {
      id: "agrjulxtzdhhwabuym",
      type: "agent",
    },
    data: {
      message: {
        text: text_data.toString(),
        format: "html",
        fields: [
          {
            value: '"support@subiz.com"',
            key: "from",
          },
          {
            value: '["nam.test.subiz@gmail.com"]',
            key: "to",
          },
          {
            value: "[]",
            key: "ccs",
          },
          {
            value: '"X1114"',
            key: "subject",
          },
        ],
        tos: ["usrseljdmkwzrevmnitmq"],
      },
    },
    type: "message_sent",
  };
  console.log(data, "DDa");
  const response = await fetch(
    "https://api.subiz.com.vn/4.0/messages?x-access-token=acpxkgumifuoofoosble_agrjulxtzdhhwabuym_AKrtrselmbmambkhohrtvteuagxplgceqrctjgdxihsxkbc",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  ).then(async (response) => {
    console.log("JSONNNNNN");
    var body = await response.json();
    return body;
  });
  // console.log("DONEEEE", response);
}

SendEmailTemplate();
