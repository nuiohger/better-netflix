import NetflixSelectors from "../Constants/NetflixSelectors";

class HtmlModel {
    private static _videoBitrates;

    private static getResult(value, defaultValue) {
        return value === undefined || value === null ? defaultValue : value;
    }

    public static get videoBitrates(): HTMLCollection {
        let temp: any = document.querySelector("." + NetflixSelectors.videoBitrateClass);
        if(temp) {
            temp = temp.children;
            if(temp) {
                temp = temp[0].children;
                if(temp) {
                    temp = temp[1].getElementsByTagName("option");
                    if(temp.length > 0)
                        this._videoBitrates = temp;
                }
            }
        }

        return this.getResult(this._videoBitrates, []);
    }
}

export default HtmlModel;
