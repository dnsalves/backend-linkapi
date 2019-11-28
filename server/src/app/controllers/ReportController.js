import axios from 'axios';
import Report from '../models/Report';

class ReportController {
  async store(req, res) {
    const deals = await axios.get(
      `${process.env.PIPEDRIVE_URL}/v1/deals?status=won&api_token=${process.env.PIPEDRIVE_SECRET}`
    );

    deals.data.data.map(async deal => {
      const exists = await Report.findOne({ id: deal.id });

      if (!exists) await Report.create(deal);
    });

    return res.json({ message: 'Report updated with success!' });
  }

  async index(req, res) {
    const result = await Report.aggregate([
      {
        $project: {
          yearMonthDayUTC: {
            $dateToString: { format: '%Y-%m-%d', date: '$won_time' },
          },
          value: 1,
          // sum_of_value: { $sum: '$value' },
        },
      },
      {
        $group: {
          _id: '$yearMonthDayUTC',
          sum_of_value: { $sum: '$value' },
          deals: { $sum: 1 },
        },
      },
    ]);
    return res.json(result);
  }
}

export default new ReportController();

// https://developers.pipedrive.com/docs/api/v1/#!/Deals/get_deals
// https://dlsystem.pipedrive.com/deals
