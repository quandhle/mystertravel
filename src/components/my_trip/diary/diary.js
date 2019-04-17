import React, {Component} from 'react';
import DiaryForm from './diary_form';

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
                <div className="diarys-container">
                    <div className="diary-input-toggle" onClick={this.toggleInput}>
                        Add Diary<i className="fas fa-plus"></i>
                    </div>
                    <DiaryForm diary={this.handleInput} show={this.state.showInput}/>
                    <div className="hardcode-diary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quas alias eum modi odio quod sequi, minus voluptatibus consectetur dolor ipsam pariatur voluptatum aut dolorem totam! Doloremque aliquam molestias iure.Aliquam aperiam, eligendi facilis hic quibusdam deleniti culpa modi? Laborum autem tenetur officia possimus sequi animi illum, corrupti asperiores at eveniet est nesciunt saepe, repudiandae placeat ullam enim earum iste!
                    </div>
                </div>
            </div>
        )
    }
}

export default Diary;