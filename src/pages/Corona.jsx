import React, { Component } from "react";
import Axios from "axios";
import Header from '../components/Header';

class Corona extends Component {
  state = {
    listNegara: [],
    negarapilihan: "",
    negaraDefault: "Indonesia",
    confirmed: 1329074,
    deaths: 35981,
    recovered: 1136054,
    loading: false,
  };

  componentDidMount() {
    Axios.get("https://covid19.mathdro.id/api/countries")
      .then((res) => {
        console.log(res);
        this.setState({ listNegara: res.data.countries });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderNegara = () => {
    return this.state.listNegara.map((val) => {
      return (
        <option key={val.iso2} value={val.name}>
          {val.name}
        </option>
      );
    });
  };

  onNegarachange = (e) => {
    this.setState({ negarapilihan: e.target.value, loading: true, });
    Axios
      .get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
      .then((res) => {
        this.setState({
          loading: false,
          confirmed: res.data.confirmed.value,
          deaths: res.data.deaths.value,
          recovered: res.data.recovered.value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="pt-5 px-5 mx-5">
          <h1 className='mb-5'>Ringkasan kasus corona di {this.state.negarapilihan ? this.state.negarapilihan : this.state.negaraDefault} </h1>
          <div className="row">
            <div className="col-md-4 ">
              <div className="border border-primary">
                <div className="text-primary text-center">Total kasus</div>
                <h1 className="text-primary mt-3 text-center">
                  {this.state.loading ? "Loading" : this.state.confirmed}
                </h1>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border border-danger">
                <div className="text-danger text-center">Meninggal</div>
                <h1 className="text-danger mt-3 text-center">
                  {this.state.loading ? "Loading" : this.state.deaths}
                </h1>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="border-success border">
                <div className="text-success text-center">Sembuh</div>
                <h1 className="text-success mt-3 text-center">
                  {this.state.loading ? "Loading" : this.state.recovered}
                </h1>
              </div>
            </div>
          </div>
          <select
            className="form-control mt-5"
            value={this.state.negarapilihan}
            onChange={this.onNegarachange}
          >
            <option hidden value="">
              pilih negara
            </option>
            {this.renderNegara()}
          </select>

          <h2 className='mt-3'>
            {this.state.negarapilihan
              ? `Negara ${this.state.negarapilihan}`
              : `Negara ${this.state.negaraDefault}`}
          </h2>
        </div>
      </div>
    );
  }
}

export default Corona;