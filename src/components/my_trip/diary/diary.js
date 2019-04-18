import React, {Component} from 'react';
import DiaryForm from './diary_form';
import './diary.scss';

class Diary extends Component{
    constructor(props){
        super(props)

        this.state = {
            showInput: false
        }

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
            <div className="diary-page">
                <div className="diary-input-toggle" onClick={this.toggleInput}>
                    Add Diary<i className="fas fa-plus"></i>
                </div>
                <DiaryForm diary={this.handleInput} show={this.state.showInput}/>

                <div className="diary-box">
                    <div className="diary">
                        <div className="diary-item">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia modi, nihil animi quae sequi commodi    sed  quibusdam, laborum error eveniet nam distinctio? Explicabo amet vel rerum, laudantium obcaecati eius  quam.  
                            </p>
                        </div>
                        <div className="diary-item">
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

export default Diary;