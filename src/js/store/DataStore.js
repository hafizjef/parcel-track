import { action, computed, observable, autorun } from "mobx"
import api from "../api/index"

import _ from "lodash"

class Parcel {
    @observable item = "this is a test"

    constructor(item) {
        this.item = item
    }
}

export class ParcelStore {

    constructor(){
        this.detectTracking = _.debounce(this.detectTracking, 500)
    }

    // Data handlers
    @observable trackingInput = ""

    // App state
    @observable errMessage = ""
    @observable isLoading = false

    @action addParcel() {
        this.parcels.push(new Parcel(api.callCour()))
        console.log('parcel added')
    }

    @action detectTracking() {
        //call API
        console.log(this.trackingInput)
    }

    @action validator(input) {
        this.trackingInput = input.replace(/[^0-9a-z]/gi, '').toUpperCase()
        if (this.trackingInput.length > 10) {
            this.detectTracking()
            this.errMessage = ""
        } else if (this.trackingInput.length === 0) {
            this.errMessage = ""
        } else {
            this.errMessage = "Tracking number must be more than 10"
        }
    }
}

export default new ParcelStore