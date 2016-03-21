hikingworld<br />
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

