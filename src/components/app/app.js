import React, {Component} from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import Todolist from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

export default class App extends Component {
    maxId = 100
    state = {
        todoData : [
            // this.createTodoItem('Drink Coffee');

            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Learn react'),
            this.createTodoItem('Make awesome App'),

        ],
        term: '',
        filter: 'all' // active, all , done
    }

    createTodoItem(label) {
        return {
            label,
            important:false,
            done:false,
            id: this.maxId++
        }

    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
           /* const idx = todoData.findIndex((el) => {
               return  el.id  === id
            })*/
            const idx = todoData.findIndex((el) => el.id  === id)
            // todoData.splice(idx, 1)
            /*const before = todoData.slice(0, idx)
            const afrer = todoData.slice(idx+1)*/

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx+1)
            ]

            // [a,b,c,d,e]
            return {
                todoData: newArray
            }
            // console.log(`Id ${idx}`)
        })
    }
    addItem = (text) => {
        //generate id + add element in array
        const newItem = this.createTodoItem(text)
        // console.log('item added')
        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ]

            return {
                todoData: newArray
            }
        })
    }
    toggleProperty = (arr, id, propName) => {

            const idx = arr.findIndex((el) => el.id  === id)
            // update object
            const oldItem = arr[idx]
            const newItem = {...oldItem, [propName]: !oldItem[propName]}

            // construct
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx+1)
            ]


    }
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            /*const idx = todoData.findIndex((el) => el.id  === id)
            // update object
            const oldItem = todoData[idx]
            const newItem = {...oldItem, done: !oldItem.done}

            // construct
            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx+1)
            ]*/
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            /*const idx = todoData.findIndex((el) => el.id  === id)
            // update object
            const oldItem = todoData[idx]
            const newItem = {...oldItem, done: !oldItem.done}

            // construct
            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx+1)
            ]*/
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
        // console.log('Toggle done', id)
    }
    onSearchChange = (term) => {
        this.setState({term})
    }
    onFilterChange = (filter) => {
        this.setState({filter})
    }
    search(items, term) {
        if (term.length === 0){
            return items
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    filter(items, filter) {
        switch (filter) {
            case 'all' :
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                 return items;
        }
    }
    render() {
        const {todoData , term, filter} = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const doneCount = todoData.filter(
            (el) => el.done).length
        const todoCount = todoData.length - doneCount

        return (
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={this.onFilterChange} />
                </div>

                <Todolist todos={visibleItems}
                          onDeleted={this.deleteItem}
                          addItem={this.addItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}

                />
                <ItemAddForm addItem={this.addItem}/>
            </div>
        )
    }



}
