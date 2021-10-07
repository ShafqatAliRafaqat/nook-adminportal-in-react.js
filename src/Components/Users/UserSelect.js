import React, {Component} from "react";
import { connect } from "react-redux";
import AsyncSelect from 'react-select/lib/Async';

import * as actions from "../../Store/Actions/UserActions";

class UserSelect extends Component {

  onChange = (m) => {
    let models = m;
    if (!Array.isArray(m)) {
      models = [m];
    }

    let modelIds = models.map(m => ({ id: m.value, name: m.label }));

    let { onChange } = this.props;

    onChange(modelIds);
  };


  get = (value, callback) => {
    let {get,user,alertify,withAllOption,autoSelect} = this.props;
    let search = "?search="+value;
    get(user.accessToken,search).then(res => {
      let rests = res.data.data.map(user => ({value:user.id,label:(user.number !== null)?user.name+ ' - '+user.number:user.name}));
      if(withAllOption){
        rests.unshift({value:"",label:"All"});
      }
      callback(rests);

      if (autoSelect) {
        if (rests.length > 0) {
          this.onChange(rests[0]);
        }
      }

    }).catch(({response}) => {
      alertify.alert('Error '+response.status+' - '+response.statusText,response.data.message);
    });
  };

  render(){
    const {users} = this.props;
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        defaultValue={(users)?users.map(m => ({value:m.id,label:(m.number !== null)?m.name+ ' - '+m.number:m.name})):[]}
        loadOptions={this.get}
        {...this.props}
        onChange={this.onChange}
      />
    );
  }
}

const mapDispatchToProps = () => {
  return {
    get: (token,search) => actions.getAllUsers(token,search),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserSelect);
