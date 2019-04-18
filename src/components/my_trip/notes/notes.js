import React, {Component} from 'react';
import NotesForm from './notes_form';
import './notes.scss';

class Notes extends Component{
    constructor(props){
        super(props);

        this.state = {
            showInput: false
        };

        this.toggleInput = this.toggleInput.bind(this);
    }
    handleInput(value){
        console.log(value)
    }
    toggleInput(){
        const {showInput} = this.state;

        if(showInput){
            this.setState({
                showInput: false
            })
        } else {
            this.setState({
                showInput: true
            })
        }

    }
    render(){
        return(
            <div className="notes-page">
                <div className="notes-input-toggle" onClick={this.toggleInput}>
                    Add Note<i className="fas fa-plus"></i>
                </div>
                <NotesForm notes={this.handleInput} show={this.state.showInput}/>

                <div className="notes-box">
                    <div className="notes">
                        <div className="notes-item">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia modi, nihil animi quae sequi commodi    sed  quibusdam, laborum error eveniet nam distinctio? Explicabo amet vel rerum, laudantium obcaecati eius  quam.  
                            </p>
                        </div>
                        <div className="notes-item">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia modi, nihil animi quae sequi commodi    sed  quibusdam, laborum error eveniet nam distinctio? Explicabo amet vel rerum, laudantium obcaecati eius  quam.  
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Notes;