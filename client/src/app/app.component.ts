import { Component,NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private sse : any;
  private records : Observable < any >;

  constructor(private zone : NgZone){
    var EventSource = window['EventSource'];
    this.sse = new EventSource('http://localhost:3001/api/records');
    this.records = this.getLiveRecord();
    // this.getLiveRecord().subscribe(
    //   (res) => {
    //     console.log('Record',res);
    //   },
    //   (error)=>{
    //     console.log(error)
    //   }

    // );
    console.log('records varaible from get live record is : '+this.records);
  }

  getLiveRecord() : Observable<any> {
    var observable = new Observable(observer=>{
      this.sse.onmessage = evt=>{
        console.log("new record",evt)
        // observer.next(evt.data.json)
        this.zone.run(()=>observer.next(JSON.parse(evt.data)))
      }
    })
    return observable;
  }
}
