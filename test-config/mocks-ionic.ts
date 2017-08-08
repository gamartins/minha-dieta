import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTPResponse } from "@ionic-native/http";

export class PlatformMock {
  public ready(): Promise<{String}> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class HTTPMock {
  get(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
    const hit01 = [ {
      _index: "f762ef22-e660-434f-9071-a10ea6691c27",
      _type: "item",
      _id: "513fceb475b8dbbc21000fd3",
      _score: 12.130143,
      fields: {
      item_id: "513fceb475b8dbbc21000fd3",
      item_name: "Bananas, raw - 1 medium (7 to 7-7/8 long)",
      brand_name: "USDA",
      nf_serving_size_qty: 1,
      nf_serving_size_unit: "serving" }}];
    const result = { total_hits: 6043, max_score: 12.130143, hits: hit01 };
    const data : HTTPResponse = { status: null, headers: null, data: JSON.stringify(result) }

    return Promise.resolve(data);
  }    

}
