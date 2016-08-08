Ionic

Installing Ionic

http://ionicframework.com/docs/v2/getting-started/installation/

Make sure nodejs is installed: https://nodejs.org/en/download/
npm install -g ionic@beta

unzip clientcode.zip 

add iOS and Android platforms
ionic platform add ios
ionic platform add android

To start all 3 platforms in a browser:
ionic serve —lab


To start one platform in a browser:
ionic serve -t ios


To build :
ionic build ios


To emulate:
ionic emulate ios
