function create_node (type, parent)
{
    var new_node = document.createElement (type);
    parent.appendChild (new_node);
    return new_node;
}

function append_text (parent, text)
{
    var text_node = document.createTextNode (text);
    clear (parent);
    parent.appendChild(text_node);
}

function get_by_id (id)
{
    var element = document.getElementById (id);
    return element;
}

function clear (element)
{
    while (element.lastChild)
	element.removeChild (element.lastChild);
}

var moves;
var max_moves = 25;
var finished;

function flood_element (row, col, colour)
{
    game_table[row][col].colour = colour;
    game_table[row][col].element.className = "piece "+colour;
}

function test_colour_flood (row, col, colour)

{
    if (game_table[row][col].flooded)
	return;
    if (game_table[row][col].colour == colour) {
	game_table[row][col].flooded = true;
	flood_neighbours (row, col, colour);
    }
}

function flood_neighbours (row, col, colour)
{
    if (row < n_rows - 1)
	test_colour_flood (row + 1, col, colour);
    if (row > 0)
	test_colour_flood (row - 1, col, colour);
    if (col < n_cols - 1)
	test_colour_flood (row, col + 1, colour);
    if (col > 0)
	test_colour_flood (row, col - 1, colour);
}

function all_flooded ()
{
    for (var row = 0; row < n_rows; row++) {
	for (var col = 0; col < n_cols; col++) {
	    if (! game_table[row][col].flooded) {
		return false;
	    }
	}
    }
    return true;
}

function flood (colour, initial)
{
    if (finished)
	return;
    var old_colour = game_table[0][0].colour;
    if (! initial && colour == old_colour)
	return;
    moves++;
    append_text (get_by_id ("moves"), moves);
    for (var row = 0; row < n_rows; row++) 
	for (var col = 0; col < n_cols; col++) 
	    if (game_table[row][col].flooded)
		flood_element (row, col, colour);

    for (var row = 0; row < n_rows; row++)
	for (var col = 0; col < n_cols; col++)
	    if (game_table[row][col].flooded)
		flood_neighbours (row, col, colour);
    if (all_flooded ()) {
	finished = true;
	if (moves <= max_moves) {
	    alert ("You win.");
	} else {
	    alert ("Finished, at last!");
	}
    } else if (moves == max_moves) {
	alert ("You lost.");
    }
}

function help ()
{
    alert ("Press the circle buttons to flood fill the image\n"+
	   "with the colour from the top left corner. Fill the\n"+
	   "entire image with the same colour in twenty-five or\n"+
	   "fewer flood fills.");
}

var n_rows = 14;
var n_cols = 14;

var colours = "blue red green yellow pink purple".split (/\s+/);

function random_colour ()
{
    var colour_no = Math.floor (Math.random () * 6);
    return colours[colour_no];
}

var game_table = new Array (n_rows);
for (var row = 0; row < n_rows; row++) {
    game_table[row] = new Array (n_cols);
    for (var col = 0; col < n_cols; col++) {
	game_table[row][col] = new Object ();
    }
}

function create_table ()
{
    moves = -1;
    finished = false;
    var game_table_element = get_by_id ("game-table-tbody");
    for (var row = 0; row < n_rows; row++) {
	var tr = create_node ("tr", game_table_element);
	for (var col = 0; col < n_cols; col++) {
	    var td = create_node ("td", tr);
	    var colour = random_colour ();
	    td.className = "piece " + colour;
	    game_table[row][col].colour = colour;
            start_table[row][col] = colour;
	    game_table[row][col].element = td;
	    game_table[row][col].flooded = false;
	}
    }
    game_table[0][0].flooded = true;
    flood (game_table[0][0].colour, true);
    append_text (get_by_id("max-moves"), max_moves);
}

function new_game ()
{
    clear (get_by_id ("game-table-tbody"));
    create_table ();
}
