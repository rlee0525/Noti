import React from 'react';
import PropTypes from 'prop-types';
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
          <div className='noti-list-container'>
            <div className='noti-list-item-noti-descriptions'>
              <span
                className='noti-list-item-noti'
                onClick={this.toggleDescription.bind(this)}>

                {this.props.noti}
              </span>
            </div>
            <div className='noti-list-item-noti-icons'>
              <label className="switch">
                <input
                  className='noti-list-item-checkbox'
                  value={this.props.noti}
                  type='checkbox' />
                <div className="slider round"></div>
              </label>
            </div>
          </div>
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

NotiListItem.propTypes = {
  noti: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default NotiListItem;
