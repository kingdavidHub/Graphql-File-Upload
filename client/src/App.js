import React from "react";
import axios from 'axios';
import './App.css';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { compose } from "recompose";



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null
    }
  }

  onChange = e => {
    this.setState({
     selectedFile: e.target.files[0]
    })
  }

onSubmit = async e => {
  e.preventDefault();
  const { selectedFile } = this.state;

  const formData = new FormData();
  formData.append('file', selectedFile);
  
  //! cloudinary for unsigned uploads
  formData.append('upload_preset', 'z5ngcl8u');

  await axios.post(`https://api.cloudinary.com/v1_1/dbkxx33pu/image/upload`, formData)
     .then((res) => {
      const { public_id, format, url, width, height } = res.data;
      console.log(res.data);
       
       const response = this.props.uploadFileMutation({
         variables: {
           file: {
             name: `${public_id}.${format}`,
             type: format,
             size: width * height,
             path: url
           }
         }
       });

       console.log(response);
    })
     .catch((err) => {
       throw err;
    })
}

  render() {
    return (
    <div className="container">
      <form method="post" action="#" id="#" onSubmit={this.onSubmit} >
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" multiple onChange={this.onChange} />
            </div>
            <input type="submit" className="btn btn-danger btn-sm" />
        </form>
    </div>
    );
  }
}


const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export default compose(
  graphql(uploadFileMutation, {name: "uploadFileMutation"})
)(App);