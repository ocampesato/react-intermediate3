//our root app component
import {Component} from 'angular2/core'
import {AddTodo} from './addTodo';
import {TodoList} from './todoList';
import {Filters} from './filters';

@Component({
  selector: 'root', 
  template: 
    `<div>
      <add-todo></add-todo>
      <todo-list></todo-list>
      <filters></filters>
    </div>`,
  directives: [AddTodo, TodoList, Filters]
})
export class App { }