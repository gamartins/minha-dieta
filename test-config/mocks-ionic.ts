import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTPResponse } from "@ionic-native/http";
import { NavParams, NavController } from "ionic-angular";

export class PlatformMock {
  public ready(): Promise<{String}> {
    return new Promise((resolve) => {
      const msg: any = "READY";
      resolve(msg);
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

export class NavParamsMock extends NavParams { 
  public static instance(getReturn?: any): any {
    let instance = jasmine.createSpyObj('NavParams', ['get']);
    instance.get.and.returnValue(getReturn);

    return instance;
  }

  public get(param: string): any {
    return null;
  }
}

export class HTTPMock {
  private result;
  
  get(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
    
    if (url.indexOf('search') !== -1 ) {
      const hit01 = [{
        _score: 12.130143,
        fields: {
        item_id: "513fceb475b8dbbc21000fd3",
        item_name: 'Bananas, raw - 1 medium (7" to 7-7/8" long)',
        brand_name: "USDA" }}];
      this.result = { total_hits: 6043, max_score: 12.130143, hits: hit01 };
    } 
    
    else if (url.indexOf('item') !== -1 ) {
      this.result = {
        item_id: "513fceb475b8dbbc21000fd3",
        item_name: 'Bananas, raw - 1 medium (7" to 7-7/8" long)',
        leg_loc_id: 328,
        brand_name: "USDA" };
    }

    const response : HTTPResponse = { status: null, headers: null, data: JSON.stringify(this.result)}
    
    return Promise.resolve(response);   
  }    

}
