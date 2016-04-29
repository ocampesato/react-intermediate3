import {bootstrap}      from 'angular2/platform/browser';
import {Component}      from 'angular2/core';
import {Inject}         from 'angular2/core';
import {Http}           from 'angular2/http';
import {HTTP_BINDINGS}  from 'angular2/http';
import 'rxjs/add/operator/map';

@Component({
   selector: 'my-app',
   template: `<button (click)="httpRequest()">User Info</button>
              <div>
                <li *ngFor="#user of graphqlUsers">
                  {{user.id}}
                  {{user.fname}}
                  {{user.lname}}
                </li>
              </div>
             `
})
class MyApp {
  graphqlUsers = [];

  constructor(@Inject(Http) public http:Http) { 
  }

  httpRequest() {  
   var userDetails = "{user(id:%22200%22){fname,lname,id}}";
   var userQuery   = "http://localhost:3000/graphql?query="+userDetails;

   this.http.get(userQuery)
      .map(res => res.json())
      .subscribe(
        data => this.graphqlUsers = JSON.stringify(data),
        err => console.log('error'),
        () => this.graphqlInfo()
      );
  }

  graphqlInfo() {  
     //----------------------------------------------
     // the 'eval' statement is required in order to
     // convert the data retrieved from json-server
     // to an array of JSON objects (else an error) 
     //----------------------------------------------
     var myObject = eval('(' + this.graphqlUsers + ')');
     this.graphqlUsers = [myObject.data.user];
  }
}

bootstrap(MyApp, [HTTP_BINDINGS]);

