/*
Copyright (c) 2008 Greg Smith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var suiteJS = new function() {

    this._lastPassed = true;
    this._passCount = 0;
    this._failCount = 0;

    // Internal: By default, output will assume a browser and write out HTML
    this._defaultDoMsg = function(msg, passFailStr) {
        document.write(passFailStr + ": " + msg + "<br/>");
    };

    // Internal default pass message HTML
    this._doPass = function(msg) {
        this._defaultDoMsg(msg, '<span style="color:green;">PASS</span>');
    };
    
    // Internal default fail message HTML
    this._doFail = function(msg) {
        this._defaultDoMsg(msg, '<span style="color:red;">FAIL</span>');
    };
    
    // Helper to send a log message. Func is either this._doFail or this._doPass
    this._logMsg = function(msg, func) {
        if (this._name) {
            msg = this._name + "->" + this._testName + ": " + msg;
        }
        func.call(this, msg);
    };
    
    // Fail with given message
    this.fail = function(msg) {
        this._logMsg(msg, this._doFail);
        suiteJS._failCount++;
        if (this._suiteFailCount !== undefined) {
            this._suiteFailCount++;
        }
        this._lastPassed = false;
        if (this._suiteFailCount !== undefined) {
            throw "Test Failed";
        }
        else {
            return this;
        }
    };
     
    // Pass with given message
    this.pass = function(msg) {
        this._logMsg(msg, this._doPass);
        suiteJS._passCount++;
        if (this._suitePassCounts !== undefined) {
            if (this._suitePassCounts[this._testName] !== undefined) {
                this._suitePassCounts[this._testName]++
            }
            else {
                this._suitePassCounts[this._testName] = 1;
            }
        }
        this._lastPassed = true;
        return this;
    };

    // Helper for assertion messages
    this._sendAssertMessage = function(obj1, obj2, msg, msgFunc) {
        obj1 = obj1 !== undefined ? obj1 : "Undefined";
        obj2 = obj2 !== undefined ? obj2 : "Undefined";
        var msgs = [];
        if (msg === undefined) {
            msgs.push("Assertion");
        }
        else {
            msgs.push(msg);
        }
        if (obj2 !== "Undefined") {
            msgs.push('Expected: "' + obj1 + '"');
            msgs.push('Actual: "' + obj2 + '"');
        }
        else {
            msgs.push('Asserted: "' + obj1 + '"');
        }
        msgFunc.call(this, msgs.join(" -- "));
    };

    // Set the pass function, called on all passes
    this.setPass = function(func) {
        this._doPass = func;
        return this;
    };
    
    // Set the fail function, called on all failures
    this.setFail = function(func) {
        this._doFail = func;
        return this;
    };

    // Get pass function
    this.getPass = function() {
        return this._doPass;
    };
    
    // Get fail function
    this.getFail = function() {
        return this._doFail;
    };

    // Called by assert and related functions
    this._assertHelper = function(test, obj1, obj2, msg) {
        try {
            if (test()) {
                this._sendAssertMessage(obj1, obj2, msg, this.pass);
            }
            else {
                this._sendAssertMessage(obj1, obj2, msg, this.fail);
            }
        }
        catch (e) {
            if (e === "Test Failed") {
                throw e;
            }
            this._sendAssertMessage(obj1, obj2, "EXCEPTION IN ASSERT: " + e.name, this.fail);
        }
    };
    
    // Assertions follow, most are self-explanatory

    this.assert = function(obj, msg) {
        this._assertHelper(function(){return obj}, obj, undefined, msg);
        return this;
    };

    this.assertMatches = function(regex, actual, msg) {
        this._assertHelper(function(){return regex.test(actual)}, regex, actual, msg);
        return this;
    };
    
    
    this.assertEquals = function(obj1, obj2, msg) {
        this._assertHelper(function(){return obj1 == obj2}, obj1, obj2, msg);
        return this;
    };
    
    this.assertNotEqual = function(obj1, obj2, msg) {
        this._assertHelper(function(){return obj1 != obj2}, obj1, obj2, msg);
        return this;
    };
    
    this.assertSame = function(obj1, obj2, msg) {
        this._assertHelper(function(){return obj1 === obj2}, obj1, obj2, msg);
        return this;
    };
    
    this.assertSameType = function(obj1, obj2, msg) {
        this._assertHelper(function(){return typeof(obj1) === typeof(obj2)}, obj1, obj2, msg);
        return this;
    };
    
    this.assertNull = function(obj, msg) {
        this._assertHelper(function(){return obj === null}, obj, undefined, msg);
        return this;
    };
    
    this.assertNotNull = function(obj, msg) {
        this._assertHelper(function(){return obj !== null}, obj, undefined, msg);
        return this;
    };
    
    this.assertDefined = function(obj, msg) {
        this._assertHelper(function(){return obj !== undefined}, obj, undefined, msg);
        return this;
    };
    
    this.assertUndefined = function(obj, msg) {
        this._assertHelper(function(){return obj === undefined}, obj, undefined, msg);
        return this;
    };
    
    this.assertTrue = function(obj, msg) {
        this._assertHelper(function(){return obj === true}, obj, undefined, msg);
        return this;
    };
    
    this.assertFalse = function(obj, msg) {
        this._assertHelper(function(){return obj === false}, obj, undefined, msg);
        return this;
    };
    
    this.getPassCount = function() {
        return this._passCount;
    };
    
    this.getFailCount = function() {
        return this._failCount;
    };
    
    this.resetCounts = function() {
        this._passCount = 0;
        this._failCount = 0;
    };
    
    // Return a useful status string
    this.getStatus = function() {
        return "Passed " + this._passCount + " out of " + (this._passCount + this._failCount);
    };

    // Check if last test passed
    this.ok = function() {
        return this._lastPassed;
    };
    
    // The number of suites that have been made
    suiteCount = 0;
    
    // Test suite constructor, used by suiteJS.createSuite
    function JSSuite(arg) {

        this._suitePassCounts = {};
        this._suiteFailCount = 0;

        this.getFailCount = function() {
            return this._suiteFailCount;
        };

        this.getPassCount = function() {
            var count = 0;
            for (testName in this._suitePassCounts) {
                count++;
            }
            return count;
        };

        this.getStatus = function() {
            return "Passed " + this.getPassCount() + " out of " +
                   (this.getPassCount() + this.getFailCount());
        };

        // Set suite name if provided, or make a default one
        if (arg) {
            this._name = arg;
        }
        if (!arg) {
            this._name = "Suite#" + ++suiteCount;
        }
        this.setUp = null;
        this.tearDown = null;
        
        // Execute all test methods
        this.run = function() {
            var prop;
            for (prop in this) {
                if (/^test/.test(prop)) {
                    if (this.setUp) {
                        this.setUp();
                    }
                    this._testName = prop;
                    try {
                        this[prop]();
                    }
                    catch (e) {
                        if (e !== "Test Failed") {
                            throw e;
                        }
                    }
                    if (this.tearDown) {
                        this.tearDown();
                    }
                }
            }
        };

    }
    JSSuite.prototype = this;
    
    // Return a new test suite with given name
    // Test methods can be added to the returned object
    // var suite = suiteJS.createSuite("My Test Suite");
    // suite.testExample = function() {
    //     this.assert(true);
    // }
    this.createSuite = function(arg) {
        return new JSSuite(arg);
    };

}();
