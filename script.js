'use strict';

var $ = function (x) {return document.getElementById(x);}

var glo = {};
glo.strings = ["MI"];

var checkWhichRulesApply = function (string) {
  var results = [];
  //rule1
  if (string[string.length-1] && string[string.length-1] === "I") {
    results.push(true);
  } else {
    results.push(false);
  }

  //rule2
  if (string.length > 1) {
    results.push(true);
  } else {
    results.push(false);
  }

  //rule3
  var next = string.search(/III/);
  if (next !== -1) {
    results.push(true);
  } else {
    results.push(false);
  }

  //rule4
  var next = string.search(/UU/);
  if (next !== -1) {
    results.push(true);
  } else {
    results.push(false);
  }

  //
  return results;
}

var updateDisplay = function () {
  $('rule3and4extra').style.display = 'none';
  $('display-string').innerHTML = glo.strings[glo.strings.length-1];
  var arr = checkWhichRulesApply(glo.strings[glo.strings.length-1]);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      $("button"+(i+1)).disabled = false;
    } else {
      $("button"+(i+1)).disabled = true;
    }
  }
  if (glo.strings.length > 1) {
    $('stepBack').style.display = 'unset';
  } else {
    $('stepBack').style.display = 'none';
  }
  glo.underlineArr = null;
  glo.underlineLength = null;
  glo.underlinePos = null;
}

var rule1 = function () {
  var string = glo.strings[glo.strings.length-1];
  glo.strings.push(string + "U");
  updateDisplay();
}

var rule2 = function () {
  var string = glo.strings[glo.strings.length-1];
  glo.strings.push(string + string.slice(1));
  updateDisplay();
}

var rule3 = function () {
  // are we already set up?
  if (glo.underlineLength === 3) {
    return rule3pt2();
  }
  // how many "III" are there?
  var pos = 0; // Position Ref
  var result = []; // Final output of all index's.
  // Loop to check all occurrences
  var string = glo.strings[glo.strings.length-1];
  while (string.indexOf("III", pos) !== -1) {
    result.push(string.indexOf("III" , pos));
    pos = string.indexOf("III" , pos) + 1;
  }
  if (result && result[0]) {
    glo.underlineArr = result;
    glo.underlinePos = 0;
    glo.underlineLength = 3;
    if (!result[1]) {
      rule3pt2();
    } else {
      showUnderline(result[0],3);
      $('rule3and4extra').style.display = 'block';
      $('rule3and4splain').innerHTML = '(select which "III" you want to swap for "U" and then press rule3 again to complete the swap)';
    }
  } else {
    console.log('error323');
  }
}
var rule3pt2 = function () {
  var start = glo.underlineArr[glo.underlinePos];
  var string = glo.strings[glo.strings.length-1];
  glo.strings.push(string.slice(0,start) + "U" + string.slice(start+3));
  updateDisplay();
}

var rule4 = function () {
  // are we already set up?
  if (glo.underlineLength === 2) {
    return rule4pt2();
  }
  // how many "III" are there?
  var pos = 0; // Position Ref
  var result = []; // Final output of all index's.
  var string = glo.strings[glo.strings.length-1];
  // Loop to check all occurrences
  while (string.indexOf("UU", pos) !== -1) {
    result.push(string.indexOf("UU" , pos));
    pos = string.indexOf("UU" , pos) + 1;
  }
  if (result && result[0]) {
    glo.underlineArr = result;
    glo.underlinePos = 0;
    glo.underlineLength = 2;
    if (!result[1]) {
      rule4pt2();
    } else {
      showUnderline(result[0],2);
      $('rule3and4extra').style.display = 'block';
      $('rule3and4splain').innerHTML = '(select which "UU" you want to remove then press rule3 again to complete the removal)';
    }
  } else {
    console.log('error323');
  }
}
var rule4pt2 = function () {
  var start = glo.underlineArr[glo.underlinePos];
  var string = glo.strings[glo.strings.length-1];
  glo.strings.push(string.slice(0,start) + string.slice(start+2));
  updateDisplay();
}

var shiftUnderline = function (forward) {
  var x = -1;
  if (forward) {
    x = 1;
  }
  glo.underlinePos += x;
  if (glo.underlinePos === -1) {
    glo.underlinePos = glo.underlineArr.length - 1;
  } else if (glo.underlinePos === glo.underlineArr.length) {
    glo.underlinePos = 0;
  }
  showUnderline(glo.underlineArr[glo.underlinePos], glo.underlineLength);
}
var showUnderline = function (start, length) {
  var string = glo.strings[glo.strings.length-1];
  var displayString = string.slice(0,start) + "<u>" + string.slice(start,start+length) + "</u>" + string.slice(start+length);
  $('display-string').innerHTML = displayString;
}

var stepBack = function () {
  glo.strings.pop();
  updateDisplay();
}

// init
updateDisplay()
