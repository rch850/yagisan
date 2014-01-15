"use strict";

var program = require("commander"),
    pkg = require("../package.json"),
    request = require("request"),
    crypto = require("crypto"),
    MailParser = require("mailparser").MailParser;

function randomBase64(len) {
  return new Buffer(crypto.randomBytes(len)).toString("base64");
}

function mailgunHash(timestamp, token) {
  var hmac = crypto.createHmac("sha256", program.key);
  hmac.update(timestamp + token);
  return hmac.digest("hex");
}

exports.argv = function(argv) {
  program
    .version(pkg.version)
    .option("-k, --key <key>", "encryption key (required)")
    .option("-d, --dest <url>", "url to post")
    .parse(argv);

  if (!program.key) {
    program.help();
  }

  var mailparser = new MailParser();

  mailparser.on("end", function(mail) {
    var formData = {
      from: mail.headers.from,
      subject: mail.subject,
      "body-plain": mail.text
    };
    formData.timestamp = (new Date()).getTime();
    formData.token     = randomBase64(50);
    formData.signature = mailgunHash(formData.timestamp, formData.token);

    if (program.dest) {
      request.post({
        uri: program.dest,
        form: formData
      }, function(error, response, body) {
        console.log("OK");
        process.exit();
      });
    } else {
      console.log(JSON.stringify(formData));
      process.exit();
    }
  });

  var stdin = process.openStdin();
  stdin.on("data", function(chunk) {
    mailparser.write(chunk);
  });
  stdin.on("end", function() {
    mailparser.end();
  });
}
