import { Route } from 'react-router-dom';
import './App.css';
import Documents from './components/Documents/Documents';
import DocumentsItem from './components/DocumentsItem/DocumentsItem';
import Folders from './components/Folders/Folders';
import Header from './components/Header/Header';
import SpinnerLine from './components/SpinnerLine/SpinnerLine';

function App() {
  return (
    <div className="App">
      <Header>
        <Route exact path="/" component={Folders} />
        <Route exact path="/:folderId" component={Documents} />
        <Route path="/:folderId/:documentId" component={DocumentsItem} />
      </Header>
    </div>
  );
}

export default App;