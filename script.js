function createMessageobj (messageNode) {
    var div = $('<div>');
    div.html( messageNode );
    return div;
}

function displayResponse(message) {
    var div = createMessageobj(message);
    div.addClass('response');
    $('#dialogue').append(div);
}

function displayMessage(message) {
    var div = createMessageobj(message);
    div.addClass('message');
    $('#dialogue').append(div);
}

var rs = new RiveScript({utf8: true, debug_div: 'debug', debug: true});

rs.loadFile(['registrering.rive', 'dummy.rive'], on_load_success, on_load_error);

function on_load_success () {
	console.log('Loading completed!');
	$('#message').removeAttr('disabled');
	$('#message').attr('placeholder', 'Send message');
	$('#message').focus();

	// Now to sort the replies!
	rs.sortReplies();
}

function on_load_error (err) {
    console.log('is explode: ', err);
}

function sendMessage () {
	var text = $("#message").val();
	$("#message").val("");
    displayMessage(text);
	try {
	var reply = rs.reply("soandso", text);
	reply = reply.replace(/\n/g, "<br>");
    displayResponse(reply);
	$("#dialogue").animate({ scrollTop: $("#dialogue")[0].scrollHeight }, 1000);
	} catch(e) {
		window.alert(e.message + "\n" + e.line);
		console.log(e);
	}

	return false;
}

setTimeout(function () {
    displayResponse(document.createTextNode('Hei! dsfldsjlfjdlgøfgljflkhøjfdlhjfdkljfdlkøj'));
}, 800);

