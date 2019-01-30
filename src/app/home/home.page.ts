import { Component } from "@angular/core";
// import { BackgroundService } from "./background.service";
import { Plugins } from "@capacitor/core";
import { BackgroundService } from "../background.service";

const { BackgroundTask } = Plugins;
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  taskId: any;
  constructor(private background: BackgroundService) {}
  startTask() {
    this.background.init();
    // this.taskId = BackgroundTask.beforeExit(async () => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       console.log("TASK DONE!", this.taskId);

    //       // Must call in order to end our task
    //       BackgroundTask.finish({
    //         taskId: this.taskId
    //       });

    //       resolve();
    //     }, 5000);
    //   });
    // });
    // console.log("Starting background task:", this.taskId);
  }
}
