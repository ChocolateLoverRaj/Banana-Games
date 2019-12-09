//Create a random string with letters and numbers
const allowedCharacters = "abcdefghijklmnopqrstuvwxyz1234567890";

//The function
const randomString = characters => {
    //Sanity check
    characters = typeof (characters) == 'number' && Number.isSafeInteger(characters) ? characters : false;

    if (characters) {
        var string = '';

        for (var i = 0; i < characters; i++) {
            //Add a random character to string
            string += allowedCharacters.charAt(Math.floor(Math.random() * allowedCharacters.length));
        };

        return string;
    }
    else {
        return false;
    }
};

//Export the function
module.exports = randomString;