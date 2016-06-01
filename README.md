hikingworld<br />

How to run this project:

1. Install Node.js version 6.x+
2. Install Mysql and create a database called hikingworld
3. cd into the project
4. Do Npm install
5. Copy ./src/server/config/defaults/defaultconfiguration.json into ./src/server/config/configuration/configuration.json(You maybe have to create the configuration directory your self before you can copy it) and btw, in the database section you should put force: true the first time you run the application.
6. Change the newly copied configuration.json file, to something that makes sense, the server and database brackets are the most important
7. Then you should go inside of package.json and copy the matti-migrate line, right below, you can call it,
teacher-migrate, change the sql connection string to something that makes sense on your pc, then you should run that command and it will migrate the database, add a few tables and such.
8.if everything went okay, you should be able to run "npm run build" open another tab and run npm start.  That should work.
9. if something went wrong, you can honestly see the application live at 188.166.167.22(albeit not the 100% newest) or go to mattinielsen.com 
which is a pretty current version


===========

In general, the way i imagine the project right now, is that we do a backend completely framework free,
then a section of the frontend with no frameworks, specifically for web security including a login, register and facebook wall.
This login should then bring us to a single page application from that point, to more easily implement the rest of the functionality.


Development of large systems(most important concepts)<br />
===========
-Frontend vs Backend MVC<br />
-Microservices(how can we do this with symfony?)<br />
-git workflow(feature branching, they want to see a history in our commits that doesn't just contain master)<br />
-Agile development, requirements gathering, modeling and furps. (???)<br />
-SOA(how can we do this with symfony?)<br />
-Splitting up functionality(SSO, SAML, OpenID,Xauth, Oauth)<br />
-Debugging & reverse engineering<br />
-continious integration(e.g. jenkins + can read up on it in regards to student presentations aswell)<br />
-TTD<br />
-Stress performance test<br />



Systems integration<br />
============
-sockets<br />
-RMI(probably not gonna happend in our project)<br />
-Restful(maybe try to support various formats like xml and json.<br />
-Security in webservices(??)<br />



Web security<br />
============
-Multilevel login with backend authentication<br />
-New user registration<br />
-Data stored in cookie or other form (localstorage etc.)<br />
-interface for user input(using content editor eventually in BB-code)<br />
-Facebook like wall for user to user chats<br />
-File upload(images)<br />
-Integration with an external service(email, sms)<br />
-Frameworks are not allowed (??????)<br />
regarding web security we have to consider the following:<br />
-Firewall<br />
-Php configuration settings for your project<br />
-Use of SSL<br />
-Use of encryption and hashing<br />
-Use of cookies<br />
We should implement code that prevents or minimizes the risk of the following attacks:<br />
-SQL-Injection<br />
-XSS<br />
-CSRF<br />
-Client side manipulation<br />
General:<br />
-Code blocks should be documented<br />
-Database dump should also be attached(partial data is fine)<br />
-Configuration files (php.ini .htaccess aso) should be attached if significant changes are done to these<br />

Deployment:<br />
-Remote ubuntu server will hold your web application
    -An early version containing ATLEAST login and user creation should be online latest on the 13th of may<br />
-Feel free to configure the server as you like<br />
    -Users, apache, PHP<br />
-Have a development environment<br />
-Use a repository(source control)<br />
-Make sure you have a running copy on your machine<br />
Penetration Tests:<br />
-Addresses of all groups servers published on the 13th of may<br />
-Hack-Attacks each other web applications<br />
-Attacks needs to be documented. And attacks should act as proof of concept: Don't be mean.<br />
-A prize for the first 10 documented successful attacks<br />

Limits:<br />

-No remote bruteforce<br />
-No DOS or DDOS<br />
-No physical hacking on each others machines<br />
-If i need to restore your server more than twice, then you give cake to the class<br />

Report:<br />
-Formal requirements (frontpage, discussion, conclusion etc)<br />
-Remember references <br />

