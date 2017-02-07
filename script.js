function adjustDiaogueWindow () {
    $('#dialogue').height($('.input').position().top - $('#dialogue').position().top);
}

function createMessageobj (messageNode) {
    var div = $('<div>');
    div.addClass('text');
    div.html( messageNode );
    var div2 = $('<div>');
    div2.append(div);

    adjustDiaogueWindow();

    return div2;
}

function displayResponse(message) {
    var div = createMessageobj(message);
    div.append($('<div class="breven">'));
    div.addClass('response');
    $('#dialogue').append(div);
}

function displayMessage(message) {
    var div = createMessageobj(message);
    div.addClass('message');
    $('#dialogue').append(div);
}

var rs = new RiveScript({utf8: true, debug_div: 'debug', debug: true});

rs.loadFile(['registrering.rive', 'greetings.rive', 'rant.rive', 'dummy.rive'], on_load_success, on_load_error);

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

$('#dialogue').height($('.input').position.top )

setTimeout(function () {
    displayResponse('Hei, og velkommen til Digipost-registrering! Mitt navn er Breven, og jeg hjelper deg gjerne med å registrere deg i Digipost. Det tar et par minutter å registrere seg. Før du begynner er det lurt å hente BankIDen din, for du må logge inn i IDporten ved første innlogging.');
}, 600);

// setTimeout(function(){
//     displayResponse('Forresten - Det tar et par minutter å registrere seg. Før du begynner er det lurt å hente BankIDen din, for du må logge inn i IDporten ved første innlogging.');
// }, 2200 + 800 * Math.random());

setTimeout(function () {
    displayResponse('Vi kan jo begynne med navnet ditt! - Hva heter du?');
}, 3000 + 800 * Math.random());
