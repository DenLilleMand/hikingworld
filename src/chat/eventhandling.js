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
    var _inMemoryDictionary = {


    };

    io.use(sharedSession(session, {
        autoSave: true
    }));

    io.on('connection',  (socket) => {
        console.log('Connection was called');


        //var parsedCookies = connect.utils.parseCookie(socket.client.request.headers.cookie);
        //session.get('')

        socket.on('join', (data) => {
            console.log('Join data:', data);
            socket.to('/').emit('an event', { hello: 'world' });
        });

        socket.on('connect', (data) => {
            console.log('Connect:', data);
        });

        socket.on('disconnect', (err) => {
            console.log('disconnect err:', err);
        });
    });

};