import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import baseURL from './config';

function App() {
  const [data, setData] = useState([])
  const [shortUrl, setShortUrl] = useState('')
  const [refresh, setRefresh] = useState('')


  if (refresh) {
    setTimeout(() => {
      setRefresh('')
    }, 1500)
  }
  // console.log(shortUrl)
  useEffect(() => {
    async function getAPi() {
      const response = await baseURL.get(`/generate-shorten-link`);
      setData(response?.data?.data);
    }
    getAPi();
  }, [refresh !== '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await baseURL.post(`/generate-shorten-link-url`, { url: shortUrl });
    if (response.status === 200) {
      setRefresh('Done');
    }
    console.log(response)
  }
  return (
    <div className="App">

      <div className="card">
        <div className="card-header">
          <form onSubmit={handleSubmit}>

            <div className="input-group mb-3">
              <input type="text" onChange={(e) => setShortUrl(e.target.value)} name="real_link" class="form-control" placeholder="Enter URL" />
              <div className="input-group-addon">
                <button className="btn btn-success" type='submit'>Generate Shorten Link</button>
              </div>
            </div>
            <p className="m-0 p-0 text-danger"></p>

          </form>
        </div>
      </div>

      <table>
        <tr>
          <th>Sl</th>
          <th>Short Link</th>
          <th>Real Link</th>
        </tr>

        {
          data?.map((item, index) =>
            <tr>
              <td>{item.id}</td>
              <td><a href={`${item.real_link}`} target="_blank">{item.short_code}</a></td>
              <td>{item.real_link}</td>
            </tr>
          )
        }
      </table>
    </div>
  );
}

export default App;
