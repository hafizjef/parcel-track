import { action, computed, observable, autorun } from "mobx"
import api from "../api/index"

import debounce from "lodash/debounce"

class Parcel {
    @observable item = "this is a test"

    constructor(item) {
        this.item = item
    }
}

export class ParcelStore {

    constructor(){
        this.detectTracking = debounce(this.detectTracking, 500)
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
        this.trackingInput = input.replace(/[^0-9a-z-]/gi, '').toUpperCase()
        if (this.trackingInput.length >= 8 && this.trackingInput.length <= 18) {
            this.errMessage = ""
        } else if (this.trackingInput.length === 0) {
            this.errMessage = ""
        } else {
            this.errMessage = "Tracking number invalid [8-18]"
        }
    }
}

export default new ParcelStore