// copied from some
$(document)
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

var tasks = [
    {
        descr: "print hello world",
        output: [
            "hello world"
        ],
        examples: [
            'print("what the fuck");',
            'print("brah");'
        ],
        defaultCode: ""
    }
];

var output = [];
var goodCount = 0;
var taskIdx = 0;
var curTask = tasks[taskIdx];

function print(x) {
    console.log(x);
    output.push(x);
};

// returns true if chad approves
function executeCode(code) {
    output = [];
    try {
        eval(code); 
    } catch (e) {
        console.log("you fucked up and broke it somehow");
        console.log(e.message);
        if (e instanceof SyntaxError) {
            output.push(e.message);
        }
    }
    var opdiv = $('#code-output');
    opdiv.empty();
    for (var i = 0; i < output.length; i++) {
        opdiv.append("<p>" + output[i] + "</p>");
    }
    if (output.length != curTask.output.length) {
        return false;
    }
    for (var i = 0; i < output.length; i++) {
        if (output[i] != curTask.output[i]) {
            return false;
        }
    }
    return true;
}

function updateChallenge() {
    var t = curTask;
    $("#task").text("Task " + (taskIdx + 1));
    $("#chads-commandment").text(t.descr);
    $("#descr").text(t.descr);
    var exdiv = $("#examples");
    exdiv.empty();
    for (var i = 0; i < t.examples.length; i++) {
        exdiv.append("<p>" + t.examples[i] + "</p>");
    }
}

function startChallenge() {
    updateChallenge();
}

function chadsButton() {
    var code = document.getElementById('code-input').value;
    var res = executeCode(code);
    if (res) {
        taskIdx += 1;
        if (taskIdx >= tasks.length) {
            showJoinChadsFraternity();
        }
        curTask = tasks[taskIdx];
    }
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
    
$(document).ready(function () {
    document.cookie = "username=12313; expires=Thu, 20 Jan 20 12:00:00 EST";;
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
