import React from "react";
import {observer} from "mobx-react";

@observer
export default class DataList extends React.Component {

    validate(e) {
        //this.props.store.detectTracking(e.target.value)
        this.props.store.validator(e.target.value)
        //this.logger(e.target.value)
    }

    actionHandler(e) {
        const {
            trackingInput,
            errMessage,
        } = this.props.store

        if(e.key === 'Enter' &&
            trackingInput.length !== 0 &&
            errMessage.length ===0) {

            this.apiCaller()
        }
    }

    apiCaller() {
        console.log("Api Called!")
    }

    render() {

        const {
            trackingInput,
            errMessage,

        } = this.props.store

        // const parceLis = parcels.map(parcel => (
        //     <li key={parcel.name}>
        //         <span>{parcel.name}</span>
        //         <span>{parcel.value}</span>
        //     </li>
        // ))

        return (
            <div>
                <section className="hero is-dark is-small">
                    <div className="hero-body">
                        <div className="container is-fluid">
                            <h1 className="title">Parcel Tracking System</h1>
                            <h2 className="subtitle">Your one stop tracking solution</h2>
                        </div>
                    </div>
                </section>
                <div style={{padding: 20}}>
                    <div style={{maxWidth:600}} className="container">
                        <div className="field has-addons has-addons-centered">
                            <div className="control has-icons-left has-icons-right is-expanded">
                                <input className={"input " + (errMessage.length > 0 ? 'is-danger' : '')}
                                       onChange={this.validate.bind(this)} value={trackingInput}
                                       onKeyPress={this.actionHandler.bind(this)}
                                       placeholder="Tracking number..."/>
                                <span className="icon is-left">
                                    <i className="fa fa-search"></i>
                                </span>
                                {errMessage.length > 0 &&
                                    <div>
                                        <span className="icon is-right">
                                            <i className="fa fa-warning"></i>
                                        </span>
                                        <p className="help is-danger">{errMessage}</p>
                                    </div>
                                }
                            </div>
                            <div className="control">
                                <button className="button is-info"
                                   disabled={errMessage.length > 0 || trackingInput.length === 0}
                                   onclick={this.apiCaller}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{maxWidth: 600, marginTop: 30}} className="container">
                        <div className="field has-addons has-addons-centered">
                            <div className="control is-expanded">
                                <div className="box">
                                    <div>
                                        <span>Param</span>
                                        <button className="button is-pulled-right">Butt</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}