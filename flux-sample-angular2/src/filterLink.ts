import {Component, ContentChildren, Inject} from 'angular2/core';
import {TodoActions} from './todoActions';

@Component({
  selector: 'filter-link',
  inputs: ['filter'],
  template: 
    `<a href="#" (click)="applyFilter(filter);"
        [ngClass]="{'active': active, 'inactive': !active}">` +
      `<ng-content></ng-content>` +  
    `</a>`
})
export class FilterLink implements OnInit, OnDestroy {
  constructor(
    @Inject('AppStore') private appStore: AppStore, 
    private todoActions: TodoActions
  ){
    this.unsubscribe = this.appStore
      .subscribe(() => this.updateActive());
  }
  
  private ngOnInit(){
    //set initial state
    this.updateActive();
  }
  
  private ngOnDestroy(){
    //remove change listener
    this.unsubscribe();
  }
  
  // Helper methods
  private applyFilter(filter) {
    this.appStore.dispatch(this.todoActions.setCurrentFilter(filter));
  }
  
  private updateActive(){
    this.active = (this.filter == this.appStore.getState().currentFilter);
  }
}