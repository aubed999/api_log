import React from 'react'
import axios from 'axios';
import Uploades from "../components/Uploades"
import { Box } from '@mui/system';

 
class FileUpload extends React.Component{
    

    constructor(){
        super();
        this.state = {
            selectedFile:'',
        }
 
        this.handleInputChange = this.handleInputChange.bind(this);
    }
 
    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }
 
    submit(){
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        console.warn(this.state.selectedFile);
        let url = "http://localhost:8000/api/upload/";
 
        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.warn(res);
        })
        window.location.reload(1); 
    }
 
    render(){
        return(
            <div>
              <Box>
                <Uploades/>
              </Box>
              <Box sx={{
              height: 145,
              width: `calc(100% - 13px)`,
              marginLeft: 0.5,
              mt:2,
              bgcolor: 'secondary.main',
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="text-white">Select File :</label>
                                    <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                                </div>
                            </div>
 
                            <div className="form-row">
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
                                </div>
                            </div>
                    </div>
                </div>
              </Box>
            </div>
        )  
    }
}
 
export default FileUpload;