function go() {
    
    document.write("<h1>SuiteJS Self-Test</h1>")
    document.write("<h2>Below should be a single pass and fail</h2>")
    
    var suite = suiteJS.createSuite("SuiteJS Test Suite")
    
    // Test where fails count as passes and vice versa
    var reverseSuite = suiteJS.createSuite("SuiteJS Reverse Test Suite")
    
    var passes = []
    var fails = []
    
    suite.setPass(function(msg) {
        passes.push(msg)
    })

    suite.setFail(function(msg) {
        fails.push(msg)
    })
    
    reverseSuite.setPass(function(msg) {
        fails.push(msg)
    })

    reverseSuite.setFail(function(msg) {
        passes.push(msg)
    })

    // Test default pass on suiteJS obj
    suite.testDefaultPass = function() {
        suiteJS.assert(true, 'SHOULD PASS<span id="foo"/>')
        this.assert(document.getElementById("foo"))
    }
    
    // Test default pass on suiteJS obj
    suite.testDefaultFail = function() {
        suiteJS.assert(false, 'SHOULD FAIL<span id="bar"/>')
        this.assert(document.getElementById("bar"))
    }
    
    // Test modifying pass function on suiteJS obj
    suite.testModifyPassForSuiteJS = function() {
        var lastPass = false
        var defaultPass = suiteJS.getPass()
        suiteJS.setPass(function() {
            lastPass  = true
        })
        suiteJS.assert(true, "I should not print out<br/>")
        suiteJS.setPass(defaultPass)
        this.assert(lastPass)
    }
    
    // Test modifying fail function on suiteJS obj
    suite.testModifyFailForSuiteJS = function() {
        var lastFail = false
        var defaultFail = suiteJS.getFail()
        suiteJS.setFail(function() {
            lastFail = true
        })
        suiteJS.assert(false, "I should not print out<br/>")
        suiteJS.setFail(defaultFail)
        this.assert(lastFail)
    }
    
    // Modify pass function for a suite
    suite.testModifyPassForSuite = function() {
        var suite = suiteJS.createSuite("ModifyPassTest")
        suite.lastPass = false
        suite.setPass(function() {
            this.lastPass = true
        })
        suite.test = function() {
            this.assert(true, "Should not see me")
        }
        suite.run()
        this.assert(suite.lastPass)
    }
    
    // Modify fail function for a suite
    suite.testModifyFailForSuite = function() {
        var suite = suiteJS.createSuite("ModifyFailTest")
        suite.lastFail = false
        suite.setFail(function() {
            this.lastFail = true
        })
        suite.test = function() {
            this.assert(false, "should not see me")
        }
        suite.run()
        this.assert(suite.lastFail)
    }
    
    // Test naming of suites with no specified name
    suite.testAnonSuiteNumbering = function() {
        var thisSuite = suiteJS.createSuite()
        thisSuite.setPass(function(msg) {
            thisSuite.result = msg
        })
        thisSuite.assert(true)
        var suiteNum1 = Number(thisSuite._name.match(/(\d+)$/)[1])
        
        thisSuite = suiteJS.createSuite()
        thisSuite.setPass(function(msg) {
            thisSuite.result = msg
        })
        thisSuite.assert(true)
        var suiteNum2 = Number(thisSuite._name.match(/(\d+)$/)[1])
        
        this.assertEquals(suiteNum1 + 1, suiteNum2)
    }
    
    // Test simple assert
    suite.testAssert = function() {
        this.assert(5, "Number should pass")
        this.assert({}, "Object should pass")
        this.assert([], "Array should pass")
        this.assert("Hello world", "String should pass")
        this.assert(true, "Boolean true should pass")
        this.assert(true, "Custom message")
    }
    reverseSuite.testAssert1 = function() {
        this.assert(null, "Null should fail")
    }
    reverseSuite.testAssert2 = function() {
        this.assert(undefined, "Undefined should fail")
    }
    reverseSuite.testAssert3 = function() {
        this.assert(NaN, "NaN should fail")
    }
    reverseSuite.testAssert4 = function() {
        this.assert(false, "Boolean false should fail")
    }
    reverseSuite.testAssert5 = function() {
        this.assert(false, "Custom message")
    }
    
    // Test assertMatches
    suite.testAssertMatches = function() {
        this.assertMatches(/greg/, "icontaingregwhee", "Simple match (positive)")
        this.assertMatches(/g[fR]e.*99/, "gReG99", "Fancy match (positive)")
    }
    reverseSuite.testAssertMatches1 = function() {
        this.assertMatches("icontaingregwhee", /fred/, "Simple match (negative)")
    }
    reverseSuite.testAssertMatches2 = function() {
        this.assertMatches("icontaingregwhee", "sfop", "TypeError")
    }
    
    // Test assertEquals
    suite.testAssertEquals = function() {
        this.assertEquals(2, 2, "Two numbers")
        this.assertEquals(2, "2", "Equivelent number and string")
    }
    reverseSuite.testAssertEquals1 = function() {
        this.assertEquals(2, "4", "Inequivelent number and string")
    }
    reverseSuite.testAssertEquals2 = function() {
        this.assertEquals(2, 4, "Different numbers")
    }
    
    // Test assertNotEqual
    reverseSuite.testAssertNotEqual1 = function() {
        this.assertNotEqual(2, "2", "Equivelent number and string")
    }
    reverseSuite.testAssertNotEqual2 = function() {
        this.assertNotEqual(2, 2, "Two numbers")
    }
    suite.testAssertNotEqual = function() {
        this.assertNotEqual(2, 4, "Different numbers")
        this.assertNotEqual(2, "4", "Inequivelent number and string")
    }
    
    // Test assertSame
    suite.testAssertSame = function() {
        this.assertSame(2, 2, "Two numbers")
    }
    reverseSuite.testAssertSame1 = function() {
        this.assertSame(2, 4, "Different numbers")
    }
    reverseSuite.testAssertSame2 = function() {
        this.assertSame(2, "4", "Inequivelent number and string")
    }
    reverseSuite.testAssertSame3 = function() {
        this.assertSame(2, "2", "Equivelent number and string")
    }
    
    // Test assertSameType
    suite.testAssertSameType = function() {
        this.assertSameType(2, 2, "Two numbers")
        this.assertSameType(2, 4, "Different numbers")
    }
    reverseSuite.testAssertSameType1 = function() {
        this.assertSameType(2, "2", "Equivelent number and string")
    }
    reverseSuite.testAssertSameType2 = function() {
        this.assertSameType(2, "4", "Inequivelent number and string")
    }
    
    // Test assertNull
    suite.testAssertNull = function() {
        this.assertNull(null, "Literal null")
    }
    reverseSuite.testAssertNull = function() {
        this.assertNull("wheee", "Str literal")
    }
    
    // Test assertNotNull
    suite.testAssertNotNull = function() {
        this.assertNotNull("wheee", "Str literal")
    }
    reverseSuite.testAssertNotNull = function() {
        this.assertNotNull(null, "Literal null")
    }
    
    // Test assertDefined
    suite.testAssertDefined = function() {
        this.assertUndefined(undefined, "Literal undefined")
        this.assertUndefined(this.foobarlove, "Undef reference")
    }
    reverseSuite.testAssertDefined1 = function() {
        this.assertUndefined(null, "null is defined")
    }
    reverseSuite.testAssertDefined2 = function() {
        this.assertUndefined("wheee", "Str literal")
    }
    
    // Test assertUndefined
    suite.testAssertUndefined = function() {
        this.assertUndefined(undefined, "Literal undefined")
        this.assertUndefined(this.foobarlove, "Undef reference")
    }
    reverseSuite.testAssertUndefined1 = function() {
        this.assertUndefined(null, "null is defined")
    }
    reverseSuite.testAssertUndefined2 = function() {
        this.assertUndefined("wheee", "Str literal")
    }

    // Test fail
    reverseSuite.testFail = function() {
        this.fail("A failure!")
    }
    
    // Test assertTrue
    suite.testAssertTrue = function() {
        this.assertTrue(true)
        this.assertTrue(true, "Truth!")
    }
    reverseSuite.testAssertTrue1 = function() {
        this.assertTrue(false)
    }
    reverseSuite.testAssertTrue2 = function() {
        this.assertTrue(null)
    }
    reverseSuite.testAssertTrue3 = function() {
        this.assertTrue(5)
    }
    reverseSuite.testAssertTrue4 = function() {
        this.assertTrue()
    }
    reverseSuite.testAssertTrue5 = function() {
        this.assertTrue(false, "False!")
    }

    // Test assertFalse
    reverseSuite.testAssertFalse1 = function() {
        this.assertFalse(true)
    }
    reverseSuite.testAssertFalse2 = function() {
        this.assertFalse(null)
    }
    reverseSuite.testAssertFalse3 = function() {
        this.assertFalse(5)
    }
    reverseSuite.testAssertFalse4 = function() {
        this.assertFalse()
    }
    reverseSuite.testAssertFalse5 = function() {
        this.assertFalse(true, "Truth!")
    }
    suite.testAssertFalse = function() {
        this.assertFalse(false)
        this.assertFalse(false, "False!")
    }
    
    // Test setUp
    suite.testSetup = function() {
        var mySuite = suiteJS.createSuite("Setup Test")
        mySuite.setPass(function(){this.passed = true})
        mySuite.setFail(function(){this.passed = false})
        mySuite.setUp = function() {
            this.freaky = "Friday"
        }
        mySuite.testSetup = function() {
            this.assertSame("Friday", this.freaky, "They were the same!")
        }
        mySuite.run()
        this.assert(mySuite.passed, "Test setUp passed")
    }
    
    // Test tearDown
    suite.testTearDown = function() {
        var mySuite = suiteJS.createSuite("Setup TearDown")
        mySuite.setPass(function(){this.passed = true})
        mySuite.setFail(function(){this.passed = false})
        mySuite.setUp = function() {
            this.freaky = "Monday?"
        }
        mySuite.tearDown = function() {
            this.freaky = "Friday"
        }
        mySuite.testTearDown = function() {
            this.assertEquals("Monday?", this.freaky)
        }
        mySuite.run()
        this.assert(mySuite.passed, "Test tearDown: tearDown had not run yet...")
        this.assert(mySuite.freaky, "Test tearDown: tearDown ran")
    }

    suite.testGetStaticPassFailCount = function() {
        var passCount = suiteJS.getPassCount()
        var failCount = suiteJS.getFailCount()
        var mySuite = suiteJS.createSuite()
        mySuite.setPass(function(){})
        mySuite.setFail(function(){})
        mySuite.testFoo = function() {
            this.assert(true)
            this.assert(false)
        }
        mySuite.run()
        this.assertEquals(passCount + 1, suiteJS.getPassCount())
        this.assertEquals(failCount + 1, suiteJS.getFailCount())
    }
    
    suite.testGetSuitePassFailCount = function() {
        var mySuite = suiteJS.createSuite()
        mySuite.setPass(function(){})
        mySuite.setFail(function(){})
        mySuite.testGetPassCount1 = function() {
            this.assert(true)
        }
        mySuite.testGetPassCount2 = function() {
            this.assert(false)
        }
        mySuite.run()
        this.assertEquals(1, mySuite.getPassCount(), "Pass count")
        this.assertEquals(1, mySuite.getFailCount(), "Fail count")
    }
    
    suite.testChaining = function() {
        var mySuite = suiteJS.createSuite()
        mySuite.setPass(function(){})
        mySuite.setFail(function(){})
        mySuite.testChaining = function() {
            suite.assertTrue(this.assert(true).assert(true).assert(true).ok())
        }
        mySuite.run()
        this.assertEquals(1, mySuite.getPassCount())
    }
    
    suite.testStaticChaining = function() {
        var oldFail = suiteJS.getFail()
        var oldPass = suiteJS.getPass()
        suiteJS.setFail(function(){})
        suiteJS.setPass(function(){})
        this.assertTrue(suiteJS.assert(false).assert(true).ok())
        this.assertFalse(suiteJS.assert(true).assert(false).ok())
        suiteJS.setFail(oldFail)
        suiteJS.setPass(oldPass)
    }
    
    suite.testSuitePassCount = function() {
        var mySuite = suiteJS.createSuite()
        mySuite.setPass(function(){})
        mySuite.setFail(function(){})
        mySuite.testPass = function() {
            this.assert(true)
            this.assert(true)
        }
        mySuite.run()
        this.assertEquals(1, mySuite.getPassCount())
    }
    
    suite.testSuiteFailCount = function() {
        var mySuite = suiteJS.createSuite()
        mySuite.setPass(function(){})
        mySuite.setFail(function(){})
        mySuite.testFail = function() {
            this.assert(true)
            this.assert(false)
        }
        mySuite.testPass = function() {
            this.assert(true)
            this.assert(true)
        }
        mySuite.run()
        this.assertEquals(1, mySuite.getFailCount())
    }
    
    suite.testGetStaticStatus = function() {
        this.assertMatches(/^Passed \d+ out of \d+$/, suiteJS.getStatus())
    }
    
    suite.testGetSuiteStatus = function() {
        var mySuite = suiteJS.createSuite()
        mySuite.setPass(function(){})
        mySuite.setFail(function(){})
        mySuite.testPass = function() {
            this.assert(true)
        }
        mySuite.testFail = function() {
            this.assert(false)
        }
        mySuite.run()
        this.assertEquals("Passed 1 out of 2", mySuite.getStatus(), "Suite getStatus")
    }
    
    suite.testStopAfterFailInSuite = function() {
        var mySuite = suiteJS.createSuite()
        mySuite.setPass(function(){})
        mySuite.setFail(function(){})
        mySuite.testPass = function() {
            this.assert(false)
            this.foo = "bar"
        }
        mySuite.run()
        this.assertUndefined(mySuite.foo)
    }
    
    suite.testNamedSuite = function() {
        var mySuite = suiteJS.createSuite("Fun Suite")
        mySuite.good = false
        mySuite.setPass(function(msg){this.good = /Fun Suite/.test(msg)})
        mySuite.testFoo = function() {
            this.assert(true)
        }
        mySuite.run()
        this.assertTrue(mySuite.good)
    }
    
    suite.run()
    reverseSuite.run()
    
    document.write("<h2>And here are the actual results of the self test</h2>")

    document.write("<h3>Status</h3>")
    document.write("Positive tests: " + suite.getStatus() + " (should pass all)")
    document.write("<br/>Negative tests: " + reverseSuite.getStatus() + " (should pass none)")
    
    document.write("<h3>Fails</h3>" + fails.join("<br/>"))
    
    document.write("<h3>Passes</h3>" + passes.join("<br/>"))

    document.close()
    
}
