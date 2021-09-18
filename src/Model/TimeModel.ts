class TimeModel {
  private _hours: number
  private _minutes: number
  private _seconds: number

  public get hours (): number {
    return this._hours
  }

  public get minutes (): number {
    return this._minutes
  }

  public get seconds (): number {
    return this._seconds
  }

  public setCurrentTime (currentSeconds: number): void {
    this._hours = Math.floor(currentSeconds / 60 / 60)

    this._minutes = Math.floor(currentSeconds / 60)

    this._seconds = Math.floor(currentSeconds - this._minutes * 60)

    this._minutes -= this._hours * 60
  }

  public toString (): string {
    return (
      (this._hours > 0
        ? this._hours + ':' + this.addLeadingZero(this._minutes)
        : this._minutes) +
      ':' +
      this.addLeadingZero(this._seconds)
    )
  }

  private addLeadingZero (number: number): string {
    return ((number + '').length < 2 ? '0' : '') + number
  }
}

export default TimeModel
