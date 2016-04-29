import {Component, Inject} from 'angular2/core';
import {TodoActions} from './todoActions';

@Component({
  selector: 'add-todo', 
  template: 
    `<div>
      <input #todo>
      <button (click)="addTodo(todo)">Add todo</button>
    </div>`
})
export class AddTodo {
  constructor(
    @Inject('AppStore') private appStore: AppStore, 
    private todoActions: TodoActions
  ){ }
  
  private addTodo(input) {
    this.appStore.dispatch(this.todoActions.addTodo(input.value));
    input.value = '';
  }
}