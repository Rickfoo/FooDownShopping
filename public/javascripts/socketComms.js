$(document).ready(function () {  
var myCollection = {  
‘IN’: ‘India’,  
‘AUS’: ‘Australia’,  
‘ENG’: ‘England’  
};  
loadDropDownList(myCollection);  
});   
  
function loadDropDownList(collection) {  
$.each(collection, function (index, value) {  
var listItem = $(”<option></option>”).val(index).html(value);  
$(”#countries”).append(listItem);  
});  
  
}  

var graph;
var peopleCount;
var linksCount;

$(document).ready(function () {

    createGraph();

    var socket = io.connect('http://localhost');
    socket.on('newPersonCallback', onNewPersonCallback);
    socket.on('newLinkCallback', onNewLinkCallback);
    var allFields;

    $("#new-people-dialog").dialog({
        autoOpen: false,
        height: 250,
        width: 500,
        title: 'Enter a email for the new person',
        modal: true,
        buttons: {
            "Add email": function () {
                var isValid = true;
                var email = $('#NewPersonEmail');
                allFields = $([]).add(email);
                allFields.removeClass("ui-state-error");
                isValid = isValid && checkLength(email, 6, 80);
                // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                isValid = isValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                if (isValid) {
                    var emailValue = email.val();
                    socket.emit('addNewPersonMessage', { email: emailValue });
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
        }
    });

    $("#new-links-dialog").dialog({
        autoOpen: false,
        height: 300,
        width: 500,
        title: 'Enter a link between existing people',
        modal: true,
        buttons: {
            "Add link": function () {
                var isValid = true;
                var sourcePeople = $('#sourcePeople');
                var targetPeople = $('#targetPeople');

                allFields = $([]).add(sourcePeople, targetPeople);
                allFields.removeClass("ui-state-error");
                isValid = isValid && checkHasSelection('#sourcePeople option:selected');
                isValid = isValid && checkHasSelection('#targetPeople option:selected');
                if (isValid) {
                    var sourcePerson = $('#sourcePeople option:selected').text();
                    var targetPerson = $('#targetPeople option:selected').text();
                    socket.emit('addNewLinkMessage', { source: sourcePerson, target: targetPerson });
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
        }
    });

    var addPerson = $('#addPerson');
    addPerson.button();
    addPerson.click(function () {
        $("#new-people-dialog").dialog("open");
    });

    var addLink = $('#addLink');
    addLink.button();
    addLink.click(function () {
        populateEmailList($('#sourcePeople'));
        populateEmailList($('#targetPeople'));
        $("#new-links-dialog").dialog("open");
    });

});


function populateEmailList(selectElement) {
    selectElement.empty();
    $('.nodetext').each(function (index) {
        selectElement.append('<option value="' + $(this).text() + '">' + $(this).text() + '</option>');
    });
}

function checkHasSelection(selector) {
    if ($(selector).Length == 0) {
        o.addClass("ui-state-error");
        return false;
    }
    else {
        return true;
    }
}


function checkLength(element, min, max) {
    if (element.val().length > max || element.val().length < min) {
        element.addClass("ui-state-error");
        return false;
    } else {
        return true;
    }
}

function checkRegexp(element, regexp) {
    if (!(regexp.test(element.val()))) {
        element.addClass("ui-state-error");
        return false;
    } else {
        return true;
    }
}

function onNewPersonCallback(data) {
    peopleCount = peopleCount + 1;
    createSummary();
    graph.addNode(data._id, data.email);
}

function onNewLinkCallback(data) {
    console.log('onNewLinkCallback');
    console.log(data);
    linksCount = linksCount + 1;
    createSummary();
    graph.addLink(data.source, data.target);
}


function createSummary() {
    var summary = 'There are currently ' + peopleCount + ' users, and ' + linksCount + ' links saved in the database';
    $('#summary').html(summary);
}

function createGraph() {

    graph = new myGraph("#graph");

    var people = $.parseJSON($('#people').val());
    peopleCount = people.length;
    for (var i = 0; i < people.length; i++) {
        graph.addNode(people[i]._id, people[i].email);
    }

    var links = $.parseJSON($('#links').val());
    linksCount = links.length;
    for (var i = 0; i < links.length; i++) {
        graph.addLink(links[i].source, links[i].target);
    }
}

function myGraph(el) {

    // Add and remove elements on the graph object
    this.addNode = function (id, email) {
        nodes.push({ "id": id, "email": email });
        update();
    }


    this.removeNode = function (email) {
        var i = 0;
        var n = findNode(email);
        while (i < links.length) {
            if ((links[i]['source'] == n) || (links[i]['target'] == n)) links.splice(i, 1);
            else i++;
        }
        nodes.splice(findNodeIndex(email), 1);
        update();
    }

    this.addLink = function (source, target) {
        links.push({ "source": findNode(source), "target": findNode(target) });
        update();
    }

    var findNode = function (email) {
        for (var i in nodes) { if (nodes[i]["email"] === email) return nodes[i] };
    }

    var findNodeIndex = function (email) {
        for (var i in nodes) { if (nodes[i]["email"] === email) return i };
    }

    // set up the D3 visualisation in the specified element
    var w = $(el).innerWidth(),
            h = $(el).innerHeight();

    var vis = this.vis = d3.select(el).append("svg:svg")
                .attr("width", w)
                .attr("height", h);

    var force = d3.layout.force()
                .gravity(.05)
                .distance(100)
                .charge(-100)
                .size([w, h]);

    var nodes = force.nodes(),
                links = force.links();

    var update = function () {

        var link = vis.selectAll("line.link")
                .data(links, function (d) { return d.source.id + "-" + d.target.id; });

        link.enter().insert("line")
                .attr("class", "link");

        link.exit().remove();

        var node = vis.selectAll("g.node")
                .data(nodes, function (d) { return d.email; });

        var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .call(force.drag);

        nodeEnter.append("image")
                .attr("class", "circle")
                .attr("xlink:href", "../Images/Friend.png")
                .attr("x", "-8px")
                .attr("y", "-8px")
                .attr("width", "40px")
                .attr("height", "40px");

        nodeEnter.append("text")
                .attr("class", "nodetext")
                .attr("dx", 12)
                .attr("dy", ".35em")
                .text(function (d) { return d.email });

        node.exit().remove();

        force.on("tick", function () {
            link.attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

            node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        // Restart the force layout.
        force.start();
    }

    // Make it all go
    update();
}