export function  formateDate(date){
    let NowDate = new Date(date);

    if(!NowDate) return ''
    var year = NowDate.getFullYear();
    var month = NowDate.getMonth()+1;
    var day = NowDate.getDate();

    var hours = NowDate.getHours();
    var min = NowDate.getMinutes();
    var minH = NowDate.getSeconds();

    return year + '-' + month + '-' + day + " " + hours + ':' + min + ':' + minH
}