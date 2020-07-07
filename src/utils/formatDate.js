const formatDate = (date) => {
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let formatedDate = `${day.toString().length < 2 ? '0' + day : day}-${month}-${year}`
    return formatedDate
}

export default formatDate