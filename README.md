# Jchat
For personal study about Firebase only.

ionic cordova build android --release

keytool -genkey -v -keystore jchat.keystore -alias jchat.keystore -keyalg RSA -validity 20000

jarsigner -verbose -keystore jchat.keystore -signedjar D:\Jet\Dev\github\Jchat\platforms\android\app\build\outputs\apk\release\jchat.apk D:\Jet\Dev\github\Jchat\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk jchat.keystore