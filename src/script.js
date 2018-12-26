
$(document )// doesn't even work lmao
    .one('focus.autoExpand', 'textarea.expand-like-chads-cock', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.expand-like-chads-cock', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });

// NOTE FOR VIRGINS: work on this

var tasks = [
    {
        descr: "print hello chad",
        dataGen: () => "",
        dataToHeader: g => g,
        outputValidator: (g, o) => o == "hello chad",
        inputValidator: (g, i) => true,
        examples:
            `print("what the fuck")
             print("brah")`,
        defaultCode: "write your code here",
        hints: "fuck you"
    },
    {
        descr: "make a variable with 10 as the value and print it",
        examples:
            `var chadsDicklength = 9999
             print(chadsDicklength)`,
        dataGen: () => "",
        dataToHeader: g => "var chadsDicklength = 9999",
        outputValidator: (g, o) => o == 10,
        inputValidator: (g, i) => i.includes("var"),
        defaultCode: "i love chad",
        hints: "what the fuck do you need help for"
    },
    {
        descr: "if x is bigger than 5, then print chad is king. otherwise print chad is lord.",
        examples:
        `var chadsGirth = 9999
         if (chadsGirth < 1000) {
             print("impossible!")
         }
         else {
             print("chad is big and ready for you to please him.")
         }`,
        dataGen: () => (Math.floor(Math.random() * 10)),
        dataToHeader: g => `
            var chadsGirth = 9999
            var x = ` + g,
        outputValidator: (g, o) => {
            if (g > 5) {
                return o == "chad is king"
            }
            else {
                return o == "chad is lord"
            }
        },
        inputValidator: (g, i) => i.includes("x") && i.includes("if") && i.includes("else"),
        defaultCode: "chad is teaching me so well",
        hints: "Chad thinks about the math teacher he banged. > = >= < <= if you know what he means."
    }
];

var outputLines = [];
var output = "";
var goodCount = 0;
var taskIdx = 0;
var curTask = tasks[taskIdx];

function print(x) {
    console.log(x);
    if (output == "") {
        output = x;
    }
    else {
        output = output + "\n" + x;
    }
    outputLines.push(x);
};

// returns true if chad approves
function executeCode(code) {
    output = "";
    outputLines = [];
    var g = curTask.dataGen();
    var isError = false;
    try {
        var inputCode = curTask.dataToHeader(g);
        var allCode = inputCode + "\n" + code;
        eval(allCode); 
    } catch (e) {
        console.log("you fucked up and broke it somehow");
        console.log(e.message);
        isError = true;
        if (e instanceof SyntaxError) {
            outputLines.push(e.message);
        }
    }
    var opdiv = $('#code-output');
    opdiv.empty();
    for (var i = 0; i < outputLines.length; i++) {
        opdiv.append("<p>" + outputLines[i] + "</p>");
    }
    if (isError) {
        return false;
    }
    return curTask.inputValidator(g, code) && curTask.outputValidator(g, output);
}

function updateChallenge() {
    var t = curTask;
    $("#task").text("Task " + (taskIdx + 1));
    $("#chads-commandment").text(t.descr);
    $("#descr").text(t.descr);
    var exdiv = $("#examples");
    exdiv.empty();
    var opdiv = $('#code-output');
    opdiv.empty();
    var exlines = t.examples.split('\n');
    for (var i = 0; i < exlines.length; i++) {
        exdiv.append("<p>" + exlines[i] + "</p>");
    }
    $('#hints').text(t.hints);
    document.getElementById('code-input').value = t.defaultCode;
}

function startChallenge() {
    updateChallenge();
}


function banUntilTrumpLeavesTheOffice() {
    document.cookie = "username=virgin; expires=Thu, 20 Jan 20 12:00:00 EST";
    dropchadsOtherBanhammer();
}

function dropchadsOtherBanhammer() {
    $("#fitness-test").addClass("hidden");
    $("#banned").removeClass("hidden");
    $("#chads-castle").addClass("hidden");
}

function unlockChadsCastle() {
    $("#fitness-test").addClass("hidden");
    $("#chads-castle").removeClass("hidden");
    startChallenge();
}

function unlockChadsGarden() {
    $("#fitness-test").addClass("hidden");
    $("#chads-castle").addClass("hidden");
    $("#banned").addClass("hidden");
    $("#chads-garden").removeClass("hidden");
    startChallenge();
}
function chadsButton() {
    var code = document.getElementById('code-input').value;
    var res = executeCode(code);
    if (res) {
        taskIdx += 1;
        if (taskIdx >= tasks.length) {
            unlockChadsGarden();
        }
        else {
            curTask = tasks[taskIdx];
            updateChallenge();
        }
    }
}

    
$(document).ready(function () {
    try {
        var un = document.cookie.split(';')[0].split('=')[1];
        if (un == "virgin") {
            dropchadsOtherBanhammer();
        }
        else if (un == "bro") {
            unlockChadsCastle();
        }
        else {
            $("#fitness-test").removeClass("hidden");

        }
    }
    catch (e) {
        $("#fitness-test").removeClass("hidden");
    }

    $(".gay-button").each(function (index) {
        $(this).click(function () {
            banUntilTrumpLeavesTheOffice();
        });
    });
    
    $(".male-button").each(function (index) {
        var btn = $(this);
        btn.click(function () {
            btn.parent().addClass("hidden");
            goodCount += 1;
            if (goodCount >= 3) {
                document.cookie = "username=bro; expires=Thu, 20 Jan 20 12:00:00 EST";
                unlockChadsCastle();
            }
        });
      });
    
    $('#execute-button').click(chadsButton);
})
