import {Component, ContentChildren, Inject} from 'angular2/core';
import {TodoActions} from './todoActions';

@Component({
  selector: 'todo',
  inputs: ['completed', 'id'],
  template: `
    <li (click)="onTodoClick(id)"
      [style.textDecoration]="completed?'line-through':'none'">
      <ng-content></ng-content>
    </li> 
  `
})
export class Todo { 
  constructor(
    @Inject('AppStore') private appStore: AppStore, 
    private todoActions: TodoActions
  ){ }
  
  private onTodoClick(id){
    this.appStore.dispatch(this.todoActions.toggleTodo(id));
  }
  
  private removeTodo(id){
    this.appStore.dispatch(this.todoActions.removeTodo(id));
  }
}