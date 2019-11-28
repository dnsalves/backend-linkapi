import axios from 'axios';
import Report from '../models/Report';

class PipedriveController {
  async index(req, res) {
    // Get data from pipedrive
    const deals = await axios.get(
      `${process.env.PIPEDRIVE_URL}/v1/deals?status=won&api_token=${process.env.PIPEDRIVE_SECRET}`
    );

    // For each data insert into database and send to bling
    deals.data.data.map(async deal => {
      const exists = await Report.findOne({ id: deal.id });

      if (!exists) {
        await Report.create(deal);
        // const xml = '';

        // const order = await axios.post(
        //   `${process.env.BLING_URL}/pedido/json?xml=${xml}&apikey=${process.env.BLING_SECRET}`
        // );
      }
    });

    return res.json({ message: 'Successfully obtained data!' });
  }
}

export default new PipedriveController();
