import React, {Component} from 'react'
import './todo-list-item.css'

export default class TodoListItem extends Component {

    /*constructor() {
        super();
        this.state = {
            done: false
        }
    }*/
    /*constructor() {
        super();
        this.onLabelClick = () => {
            console.log(`done ${this.props.label}`)
        }
    }*/
  /*  onLabelClick() {
        console.log(`done ${this.props.label}`)
    }*/
    /*onLabelClick = () => {
        // console.log(`done ${this.props.label}`)
        this.setState(({done}) => {
            return {
                done: !done
            }
        })
    }*/
    onMarkImportant = () => {
        // this.setState((state) =>{
        this.setState(({important}) =>{
          return {
              important: !important
          }
        })
    }
    render() {
        const {label, onDeleted,
            onToggleImportant, onToggleDone,
            done , important } = this.props;
        // const {done , important } = this.state;
        const Style = {
            color: important ? 'tomato' : 'blue',
            fontWeight: important ? 'bold' : 'normal'
        }


        let classNames = 'todo-list-item'
        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important';
        } 
        return (
            /*<span style={important ? {color:'red'} : {color:'blue'}}>
                Это тот код который прописал я
            */
            <span className={ classNames }>
                <span className='todo-list-item-label'
                      onClick={ onToggleDone }>
                    {label}
                </span>

                <button type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={onToggleImportant}
                >
                    <i className="fa fa-exclamation" />
                </button>
                <button className="btn btn-outline-danger btn-sm"
                onClick={onDeleted}
                >
                    <i className="fa fa-trash-o" />
                </button>
            </span>


        )
    }

}

/*
const TodoListItem = ({label, important = false}) => {

}*/
