import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
const { App, BackgroundTask, LocalNotifications } = Plugins;

declare var window, cordova;

const MAX_TIME = 10 * 60; // in seconds

@Injectable({
  providedIn: "root"
})
export class BackgroundService {
  timer;
  constructor() {}

  init() {
    this.start();
    console.log(`task init`);
    // let taskId = BackgroundTask.beforeExit(async () => {

    const timer = (this.timer = new window.nativeTimer());
    let i = 0;
    timer.start(
      1,
      1000,
      function() {
        // invoked after successful start
        console.log("start");
      },
      errorMessage => {
        // invoked after unsuccessful start
        console.log(errorMessage);
        this.stop();
      }
    );

    timer.onTick = tick => {
      i++;
      console.log(`background mode`, cordova.plugins.backgroundMode.isActive());

      if (i >= MAX_TIME) {
        console.log(`ok that's all`);
        timer.stop();
      }
    };
    timer.onError = function(errorMessage) {
      // invoked after error occurs
    };
    timer.onStop = hasError => {
      // invoked after stop
      LocalNotifications.schedule({
        notifications: [
          {
            title: `success`,
            body: `background service finished`,
            id: Date.now(),
            schedule: {
              at: new Date(Date.now() + 1000 * 5)
            },
            sound: `default`,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
      this.stop();
      // BackgroundTask.finish({
      //   taskId
      // });
    };

    // });
  }

  stop() {
    cordova.plugins.backgroundMode.disable();
    // cordova.plugins.backgroundMode.setEnabled(false);
    this.timer.stop();
  }

  start() {
    cordova.plugins.backgroundMode.enable();
    // cordova.plugins.backgroundMode.setEnabled(true);
  }
}
