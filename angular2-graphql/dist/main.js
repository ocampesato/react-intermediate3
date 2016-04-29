System.register(['angular2/platform/browser', 'angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var browser_1, core_1, core_2, http_1, http_2;
    var MyApp;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            MyApp = (function () {
                function MyApp(http) {
                    this.http = http;
                    this.graphqlUsers = [];
                }
                MyApp.prototype.httpRequest = function () {
                    var _this = this;
                    var userDetails = "{user(id:%22200%22){fname,lname,id}}";
                    var userQuery = "http://localhost:3000/graphql?query=" + userDetails;
                    this.http.get(userQuery)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.graphqlUsers = JSON.stringify(data); }, function (err) { return console.log('error'); }, function () { return _this.graphqlInfo(); });
                };
                MyApp.prototype.graphqlInfo = function () {
                    var myObject = eval('(' + this.graphqlUsers + ')');
                    this.graphqlUsers = [myObject.data.user];
                };
                MyApp = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<button (click)=\"httpRequest()\">User Info</button>\n              <div>\n                <li *ngFor=\"#user of graphqlUsers\">\n                  {{user.id}}\n                  {{user.fname}}\n                  {{user.lname}}\n                </li>\n              </div>\n             "
                    }),
                    __param(0, core_2.Inject(http_1.Http)), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], MyApp);
                return MyApp;
                var _a;
            })();
            browser_1.bootstrap(MyApp, [http_2.HTTP_BINDINGS]);
        }
    }
});
//# sourceMappingURL=main.js.map