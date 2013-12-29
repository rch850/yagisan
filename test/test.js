var assert = require("assert"),
    crypto = require("crypto"),
    exec = require("child_process").exec;

describe("yagisan", function() {

  it("should have valid signature", function(done) {
    exec("node ./bin/yagisan -k hogehoge < test/mail01.txt", function(err, stdout, stderr) {
      if (err) throw err;
      if (stderr) throw stderr;
      var result = JSON.parse(stdout);
      var hmac = crypto.createHmac("sha256", "hogehoge");
      hmac.update(result.timestamp + result.token);
      assert.equal(hmac.digest("hex"), result.signature);
      done();
    });
  });

  it("should handle address having dot sequence", function(done) {
    exec("node ./bin/yagisan -k hogehoge < test/mail01.txt", function(err, stdout, stderr) {
      if (err) throw err;
      if (stderr) throw stderr;
      var result = JSON.parse(stdout);
      assert.equal("<test...8lo.ol8@docomo.ne.jp>", result.from);
      assert.equal("fooo", result.subject);
      done();
    });
  });

});
