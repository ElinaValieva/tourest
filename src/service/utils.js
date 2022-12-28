export function DateUtil() {
    let date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // eslint-disable-next-line no-extend-native
    Date.prototype.formatTime = function () {
        let hours = this.getHours();
        let minutes = this.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    // eslint-disable-next-line no-extend-native
    Date.prototype.formatDay = function () {
        return this.getDay() + ' ' + monthNames[this.getMonth()] + ' ' + this.getFullYear();
    }
    return date;
}

// eslint-disable-next-line no-extend-native
String.prototype.formatSpacesAsText = function () {
    return this.replaceAll('<br/>', "\n")
}

// eslint-disable-next-line no-extend-native
String.prototype.formatSpacesAsHtml = function () {
    return this.replace(/(?:\r\n|\r|\n)/g, '<br/>')
}
