import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
const { App, BackgroundTask, LocalNotifications } = Plugins;

declare var window;

const MAX_TIME = 240; // in seconds

@Injectable({
  providedIn: "root"
})
export class BackgroundService {
  constructor() {}

  init() {
    console.log(`task init`);
    let taskId = BackgroundTask.beforeExit(async () => {
      // In this function We might finish an upload, let a network request
      // finish, persist some data, or perform some other task

      const timer = new window.nativeTimer();
      let i = 0;
      timer.start(
        1,
        1000,
        function() {
          // invoked after successful start
          console.log("start");
        },
        function(errorMessage) {
          // invoked after unsuccessful start
          console.log(errorMessage);
        }
      );

      timer.onTick = tick => {
        // invoked on tick

        // i++;
        // console.log("tick", i);

        if (i >= MAX_TIME) {
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
        BackgroundTask.finish({
          taskId
        });
      };

      // setTimeout(() => {
      //   console.log(`finish task`);
      //   // Must call in order to end our task otherwise
      //   // we risk our app being terminated, and possibly
      //   // being labled as impacting battery life
      //   LocalNotifications.schedule({
      //     notifications: [
      //       {
      //         title: ``,
      //         body: `background service`,
      //         id: Date.now(),
      //         schedule: {
      //           at: new Date(Date.now() + 1000 * 5)
      //         },
      //         sound: `default`,
      //         attachments: null,
      //         actionTypeId: "",
      //         extra: null
      //       }
      //     ]
      //   });
      //   BackgroundTask.finish({
      //     taskId
      //   });
      //   //clearInterval(counter);
      // }, 5 * 1000); // Set a long timeout as an example
    });
  }
}
