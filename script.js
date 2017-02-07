function createMessageobj (message) {
    var div = document.createElement('div');
    var text = document.createTextNode(message);
    div.appendChild(text);
    return div;
}

function displayResponse(message) {
    var div = createMessageobj(message);
    div.setAttribute('class', 'response');
    document.getElementById('dialogue').appendChild(div);
}

function displayMessage(message) {
    var div = createMessageobj(message);
    div.setAttribute('class', 'message');
    document.getElementById('dialogue').appendChild(div);
}

var rs = new RiveScript({utf8: true, debug_div: 'debug', debug: true});

rs.loadFile(['dummy.rive', 'registrering.rive'], on_load_success, on_load_error);

function on_load_success () {
	console.log('Loading completed!');
	$('#message').removeAttr('disabled');
	$('#message').attr('placeholder', 'Send message');
	$('#message').focus();

	// Now to sort the replies!
	rs.sortReplies();
}

function on_load_error (err) {
	alert('is explode: ' + err);
    console.log(err);
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
    displayResponse('Hei! dsfldsjlfjdlgøfgljflkhøjfdlhjfdkljfdlkøj');
}, 800);

