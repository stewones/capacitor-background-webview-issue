# capacitor background bug

currently capacitor's background plugin cant go over 181 seconds, this is a simple example reproduction.

## error

```
[ProcessSuspension] Background task expired while holding WebKit ProcessAssertion (isMainThread? 1).
```

## video

... soon

## steps

- git clone this repo
- npm install
- cd ios/App
- in Podfile change the capacitor's path to your own. I couldnt run the currently capacitor beta17 version due to swift 4.2 incompatibilities (would require a lot of changes) so I'm running from [my own capacitor stable repo](https://github.com/stewwan/capacitor-stable). Feel free to fork and test.
- pod install
- ionic cap run ios
- check in xcode the capabilities `Background fetch`, `Audio, Air, and Picture in Picture`

relevant code is located at `src/app/background.service.ts`
