class TimeModel {
    get hours() {
        return this._hours;
    }
    get minutes() {
        return this._minutes;
    }
    get seconds() {
        return this._seconds;
    }
    setCurrentTime(currentSeconds) {
        this._hours = Math.floor(currentSeconds / 60 / 60);
        this._minutes = Math.floor(currentSeconds / 60);
        this._seconds = Math.floor(currentSeconds - this._minutes * 60);
        this._minutes -= this._hours * 60;
    }
    toString() {
        return (this._hours > 0 ? this._hours + ":" + this.addLeadingZero(this._minutes) : this._minutes) + ":" + this.addLeadingZero(this._seconds);
    }
    addLeadingZero(number) {
        return ((number + "").length < 2 ? "0" : "") + number;
    }
}
export default TimeModel;
