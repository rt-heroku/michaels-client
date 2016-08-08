Michael's Mobile app
==========


Installing Ionic
----------------

http://ionicframework.com/docs/v2/getting-started/installation/

Make sure nodejs is installed: https://nodejs.org/en/download/
```
npm install -g ionic@beta
```



Getting the code
----------------

clone this repo:
```
git clone https://github.com/rt-heroku/michaels-client.git
```

Or download as a zip file.


Platforms
---------

To add iOS and Android platforms

```
ionic platform add ios

ionic platform add android
```

To start all 3 platforms in a browser:
```
ionic serve —lab
```


To start one platform in a browser:
```
ionic serve -t ios
```


To build :
```
ionic build ios
```


To emulate:
```
ionic emulate ios
```


Modifying the app
-----------------

Once the server app is up and running, make sure to change the services of the app to point to the new url.

> **Note**
> The services are located in the following path:
> app -> services -> *-services.ts

And replace:
```
http://michaels-services.herokuapp.com
```
with your new url:
```
http://<your new app>.herokuapp.com
```
