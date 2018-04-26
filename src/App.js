import React                from 'react'
import FileManager        from 'components/filemanager'
class App extends React.Component {

    fileSelected =() => {
        console.log("fileSelected");
    }

    render() {
        return (
            <FileManager auth_url="http://localhost:3000/api/v1/admin/aws_auth" onSelect={this.fileSelected}>
                <button name="myFile" >Hello</button>
            </FileManager>
        )
    }
}
export default App;