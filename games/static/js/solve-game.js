function createXmlHttp ()
{
    xmlhttp = false;

    try {
	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
	try {
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} catch (E) {
	    xmlhttp = false;
	}
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
	xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
function sendit (sendmessage, callback, cgi_override)
{
    var cgi;
    if (cgi_override) {
        cgi = cgi_override;
    } else {
        cgi = cgiscript;
    }
;;; if (debug) {
;;;     var msg = "Sending `"+sendmessage+"'";
;;;     if (cgi_override) {
;;;         msg += "\n CGI OVERRIDE: " + cgi_override;
;;;     }
;;;     message_handler (msg);
;;; }
    if (! this.xmlhttp)
        this.xmlhttp = createXmlHttp ();
    if (! this.xmlhttp)
        return;
    // Abort partially loaded requests
    if (this.xmlhttp.readyState == 1 ||
	this.xmlhttp.readyState == 2 ||
        this.xmlhttp.readyState == 3) {
	this.xmlhttp.abort (); 
    }
    this.xmlhttp.open ("POST", cgi, true);
    var self = this;
    this.xmlhttp.onreadystatechange = function() {
	if (self.xmlhttp.readyState == 4) {
            if (self.xmlhttp.status == 200) {
;;; 	        if (debug) {
;;;                 message_handler ("Calling back:\n" + self.xmlhttp.responseText);
;;;             }
	        callback (self.xmlhttp.responseText);
;;;         } else {
;;;             if (debug) {
;;;                 message_handler("Call to '" + cgi + "' failed " + " with status "+self.xmlhttp.status);
;;;             }
            }
        }
    }
    this.xmlhttp.send (sendmessage);
}

var debug = true;
var cgiscript = 'solve-flood.cgi';
var message_handler = alert;

var start_table = new Array (n_rows);
for (var row = 0; row < n_rows; row++) {
    start_table[row] = new Array (n_cols);
}


function solve ()
{
    var grid = new Array (n_rows);
    for (var row = 0; row < n_rows; row++) {
        grid[row] = "";
        for (var col = 0; col < n_cols; col++) {
            var colour_byte;
            colour_byte = start_table[row][col];
            if (colour_byte == "pink") {
                colour_byte = "Q";
            }
            else {
                colour_byte = colour_byte.substring (0, 1);
                colour_byte = colour_byte.toUpperCase ();
            }
            grid[row] += colour_byte;
        }
    }
    alert (grid.join ("\n"));
    sendit (grid.join ("\n"), show_solution);
}

function show_solution (data)
{

}

