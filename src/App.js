import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode : 'update',
      selected : 2,
      subject : {title:'WEB', sub:'world wide web'},
      welcome : {title:'welcome', desc:'Hello, React'},
      contents : [
        {id:1, title:'html', desc:'html is markup language'},
        {id:2, title:'css', desc:'css is style'},
        {id:3 , title:'javascript', desc:'javascript is dynamic'},
      ]
    }
  }
  getReadContent() {
    var i = 0;
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected){
          return data;
        }
        i = i + 1;
      }
  }
  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat({
          id:this.max_content_id, title:_title, desc:_desc
        });
        this.setState({
          contents : _contents,
          mode : 'read',
          selected : this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {id : _id, title : _title, desc : _desc};
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents : _contents,
          mode : 'read'
        });
      }.bind(this)}></UpdateContent>
    }

    return _article;
  }
  render() {
    
    return (
      <div className="App">
        <Subject title={this.state.subject.title} 
                 sub={this.state.subject.sub}
                 onPageChange={function(){
                   this.setState({
                     mode:'welcome'
                   })
                 }.bind(this)}> </Subject>
        <Control onChangeMode={function(_mode){
          this.setState({mode:_mode})
        }.bind(this)}></Control>
        <TOC data={this.state.contents}
             onPageChange={function(id){
               this.setState({
                 mode:'read',
                 selected : Number(id)
                });
             }.bind(this)}
        > 
        </TOC>
        {this.getContent()}
      </div>
    )
  }
}

export default App;
