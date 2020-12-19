import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteMsg } from '../../actions/message';
import faker from 'faker';

const Msg = ({messages,deleteMsg,auth }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectTerm, setSelectTerm] = useState("subject");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {//handle when the user search
    setSearchTerm(event.target.value);
  };
  const onSelect= event =>{
    setSelectTerm(event.target.value)
  }
  useEffect(() => {//filter the search by the filter select and the select term
    let results=[]
    if(selectTerm==="subject"){
      results = messages.filter(message =>
        message.subject.toLowerCase().includes(searchTerm)
      );
    } else if (selectTerm==="name"){
      results = messages.filter(message =>
        message.sender.name.toLowerCase().includes(searchTerm)
      );
    }
    setSearchResults(results);
  }, [searchTerm,selectTerm,messages])
  const messagesData = searchResults.map(msg => (
     <div className="ui divided items" key={msg._id}>
        <Moment format="DD/MM/YYYY">{moment.utc(msg.date)}</Moment>
          <div className="item">
            <div className="image">
              <img className="round-img my-1" src={faker.image.image()} alt="avatar"/>
            </div>
            <div className="content">
              <a className="header"> {msg.subject}</a>
              <div className="meta">
                <span className="cinema">{msg.type===1?'Real estate':'Cars'} by {msg.sender.name}</span>
              </div>
              <div className="description">
                <p>{msg.desc}</p>
              </div>
              <div className="extra">
                <div className="ui label"><i className="phone icon"></i><a href={`tel:${msg.phone}`}>{msg.phone}</a></div>
                <div className="ui label"><i className="globe icon"></i><a href={`mailto:${msg.email}`}>{msg.email}</a></div>
              </div>
            </div>
              {(auth.user.level===1)?
              (
                <div>
                  <button
                    className="btn btn-danger" onClick={() => deleteMsg(msg._id)}
                  >
                    Delete
                  </button>
                </div>
              ):null}
              
          </div>
      </div>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Offers</h2>
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <i className="search icon"></i>
        <select className="ui dropdown" onChange={onSelect}>
          <option value="subject">By subject</option>
          <option value="name">By user name</option>
        </select>
      </div>
      {messagesData}
    </Fragment>
  );
};

const mapStateToProps=state=>({
  auth: state.auth,
})

export default connect(mapStateToProps,{deleteMsg})(Msg);