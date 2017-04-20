import React from 'react';
import { Collapse } from 'react-collapse';

class NotiListItem extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
       showDescription: false
     };
  }

  toggleDescription() {
    this.setState({
      showDescription: !this.state.showDescription
    });
  }

  render() {
    return (
      <div className='noti-list-item'>
        <div className='noti-list-label'>
          <input 
            className='noti-list-item-checkbox' 
            value={this.props.noti}
            type='checkbox' />

          <span 
            className='noti-list-item-noti' 
            onClick={this.toggleDescription.bind(this)}>
            
            {this.props.noti}
          </span>
        </div>

        <Collapse isOpened={this.state.showDescription}>
          <div className='noti-list-description'>
            <span className='noti-list-item-description'>
              {this.props.description}
            </span>
          </div>
        </Collapse>
        
      </div>
    );
  }
}

export default NotiListItem;