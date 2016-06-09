var session = require('express-session');
var sharedSession = require('express-socket.io-session');
module.exports = (io, session) => {
    /**
     * Should contain a userId as key, and socket id as values in array.
     * when we retrieve a socket request, we check the sessions id,
     * retrieve user id, and we're then able to add or disconnect the given user.
     * Inside of a user, we should have an array of chat messages and timestamps,
     * and we should also remember to check for isAuthenticated
     * @type {{}}
     * @private
     */
    var _inMemoryDictionary = { };
    //_inMemoryDictionary["nikolaj@hotmail.com"] = ["dsdfjdsfj23"];
    //var _inMemoryMessages = [{text: "herpderp", user: "nikolaj@hotmail.com", timestamp: new Date()}];
    var _inMemoryMessages = [];

    io.use(sharedSession(session, {
        autoSave: true
    }));

    /** When we receive a socket. We allready have the username in the session,
     * so we just have to collate the username as a key in the dictionary, with
     * the socket.id, The socket id, we should look up in the documentation, that we're able to broadcast
     * to that id by it self, so we should sent the current state of the dictionary,
     * so all of the users as keys. each user should have an array of messages and a timestamp.
     **/
    io.on('connection',  (socket) => {
        console.log('Connection was called');
        var username = socket.handshake.session.user;
        var user = _inMemoryDictionary[socket.handshake.session.user];
        if(!user) {
            _inMemoryDictionary[username] = [socket.id];
        } else {
            user.push(socket.id);
        }

        var users = [];
        for(var key in _inMemoryDictionary) {
            users.push(key);
        }
        socket.emit('initial', { users: users, messages: _inMemoryMessages, currentUser: username });


        socket.on('message', (data) => {
            console.log('received message!');
            socket.broadcast.emit('message', { text: data.text, user: socket.handshake.session.user });
        });

        /**socket.on('join', (data) => {
            console.log('Join data:', data);
            socket.to('/').emit('an event', { hello: 'world' });
        });*/

        socket.on('disconnect', (err) => {
            console.log('disconnect err:', err);
            //remember to remove the socket.id from the array, and if the array is empty afterwards,
            //we should remove the user.
        });
    });

};