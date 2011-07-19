var suiteJS=function(){function f(a){this._suitePassCounts={};this._suiteFailCount=0;this.getFailCount=function(){return this._suiteFailCount};this.getPassCount=function(){var b=0;for(testName in this._suitePassCounts)b++;return b};this.getStatus=function(){return"Passed "+this.getPassCount()+" out of "+(this.getPassCount()+this.getFailCount())};if(a)this._name=a;if(!a)this._name="Suite#"+ ++suiteCount;this.tearDown=this.setUp=null;this.run=function(){for(var b in this)if(/^test/.test(b)){this.setUp&&
this.setUp();this._testName=b;try{this[b]()}catch(c){if(c!=="Test Failed")throw c;}this.tearDown&&this.tearDown()}}}this._lastPassed=true;this._failCount=this._passCount=0;this._defaultDoMsg=function(a,b){document.write(b+": "+a+"<br/>")};this._doPass=function(a){this._defaultDoMsg(a,'<span style="color:green;">PASS</span>')};this._doFail=function(a){this._defaultDoMsg(a,'<span style="color:red;">FAIL</span>')};this._logMsg=function(a,b){if(this._name)a=this._name+"->"+this._testName+": "+a;b.call(this,
a)};this.fail=function(a){this._logMsg(a,this._doFail);suiteJS._failCount++;this._suiteFailCount!==undefined&&this._suiteFailCount++;this._lastPassed=false;if(this._suiteFailCount!==undefined)throw"Test Failed";else return this};this.pass=function(a){this._logMsg(a,this._doPass);suiteJS._passCount++;if(this._suitePassCounts!==undefined)if(this._suitePassCounts[this._testName]!==undefined)this._suitePassCounts[this._testName]++;else this._suitePassCounts[this._testName]=1;this._lastPassed=true;return this};
this._sendAssertMessage=function(a,b,c,e){a=a!==undefined?a:"Undefined";b=b!==undefined?b:"Undefined";var d=[];c===undefined?d.push("Assertion"):d.push(c);if(b!=="Undefined"){d.push('Expected: "'+a+'"');d.push('Actual: "'+b+'"')}else d.push('Asserted: "'+a+'"');e.call(this,d.join(" -- "))};this.setPass=function(a){this._doPass=a;return this};this.setFail=function(a){this._doFail=a;return this};this.getPass=function(){return this._doPass};this.getFail=function(){return this._doFail};this._assertHelper=
function(a,b,c,e){try{a()?this._sendAssertMessage(b,c,e,this.pass):this._sendAssertMessage(b,c,e,this.fail)}catch(d){if(d==="Test Failed")throw d;this._sendAssertMessage(b,c,"EXCEPTION IN ASSERT: "+d.name,this.fail)}};this.assert=function(a,b){this._assertHelper(function(){return a},a,undefined,b);return this};this.assertMatches=function(a,b,c){this._assertHelper(function(){return a.test(b)},a,b,c);return this};this.assertEquals=function(a,b,c){this._assertHelper(function(){return a==b},a,b,c);return this};
this.assertNotEqual=function(a,b,c){this._assertHelper(function(){return a!=b},a,b,c);return this};this.assertSame=function(a,b,c){this._assertHelper(function(){return a===b},a,b,c);return this};this.assertSameType=function(a,b,c){this._assertHelper(function(){return typeof a===typeof b},a,b,c);return this};this.assertNull=function(a,b){this._assertHelper(function(){return a===null},a,undefined,b);return this};this.assertNotNull=function(a,b){this._assertHelper(function(){return a!==null},a,undefined,
b);return this};this.assertDefined=function(a,b){this._assertHelper(function(){return a!==undefined},a,undefined,b);return this};this.assertUndefined=function(a,b){this._assertHelper(function(){return a===undefined},a,undefined,b);return this};this.assertTrue=function(a,b){this._assertHelper(function(){return a===true},a,undefined,b);return this};this.assertFalse=function(a,b){this._assertHelper(function(){return a===false},a,undefined,b);return this};this.getPassCount=function(){return this._passCount};
this.getFailCount=function(){return this._failCount};this.resetCounts=function(){this._failCount=this._passCount=0};this.getStatus=function(){return"Passed "+this._passCount+" out of "+(this._passCount+this._failCount)};this.ok=function(){return this._lastPassed};suiteCount=0;f.prototype=this;this.createSuite=function(a){return new f(a)}}();
