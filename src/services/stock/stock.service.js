import service from "../service";
import Moment from 'moment';

class StockService {

  getStocks(cCode, sDate, eDate) {
    let startDate = Moment(sDate).format('YYYY-MM-DD');
    let endDate = Moment(eDate).format('YYYY-MM-DD');

    let data = service.get('https://localhost:44327/api/v1.0/market/stock/get/' + cCode + '/' + startDate + '/' + endDate);
    return data;
  }

  addStock(data) {
    return service.post("https://localhost:44327/api/v1.0/market/stock/add", data);
  }
}

export default new StockService();